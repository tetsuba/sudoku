import { fireEvent, render, screen } from '@testing-library/react'
import App from './App.tsx'
import * as solver from './lib/sudokuSolver.ts'
import { createBoardCells } from './lib/sudokuBuilder.ts'

describe('App', () => {
    const spySolveSudoku = vi.spyOn(solver, 'solveSudoku')
    const spyAlert = vi.spyOn(window, 'alert')

    afterEach(() => {
        spyAlert.mockReset()
    })

    test('window alert called when a number is placed in the wrong place', () => {
        render(<App />)
        const cells = screen.getAllByTestId('cell')
        fireEvent.change(cells[0], { target: { value: 1 } })
        fireEvent.change(cells[1], { target: { value: 1 } })
        expect(spyAlert).toHaveBeenCalledTimes(1)
    })

    test('window alert called when sudoku not solved', () => {
        spySolveSudoku.mockImplementationOnce(() => false)
        render(<App />)
        fireEvent.click(screen.getByTestId('solve-button'))
        expect(spyAlert).toHaveBeenCalledTimes(1)
    })

    test('sudoku board solved', () => {
        const board = createBoardCells()
        board[0].value = 1
        spySolveSudoku.mockImplementationOnce(() => board)
        render(<App />)
        const cells = screen.getAllByTestId('cell')
        expect(cells[0]).toHaveProperty('value', '')
        fireEvent.click(screen.getByTestId('solve-button'))
        expect(cells[0]).toHaveProperty('value', '1')
    })

    test('clearing the board', () => {
        render(<App />)
        const cells = screen.getAllByTestId('cell')
        fireEvent.change(cells[0], { target: { value: 1 } })
        fireEvent.change(cells[8], { target: { value: 5 } })

        expect(cells[0]).toHaveProperty('value', '1')
        expect(cells[8]).toHaveProperty('value', '5')
        fireEvent.click(screen.getByTestId('clear-button'))
        expect(cells[0]).toHaveProperty('value', '')
        expect(cells[8]).toHaveProperty('value', '')
    })

    test('adding and removing a number from a cell', () => {
        render(<App />)
        const cells = screen.getAllByTestId('cell')
        expect(cells[0]).toHaveProperty('value', '')
        fireEvent.change(cells[0], { target: { value: 1 } })
        expect(cells[0]).toHaveProperty('value', '1')
        fireEvent.change(cells[0], { target: { value: '' } })
        expect(cells[0]).toHaveProperty('value', '')
    })
})
