import Board from './Components/Board/Board.tsx'
import Button from './Components/Button/Button.tsx'
import { useState } from 'react'
import { createBoardCells } from './lib/sudokuBuilder.ts'
import { isValid, solveSudoku } from './lib/sudokuSolver.ts'
import {CellTypes} from "./types.ts";

function App() {
    const [board, setBoard] = useState(() => createBoardCells())
    return (
        <main>
            <h1>SUDOKU SOLVER</h1>
            <Board
                data={board}
                update={(cell, newValue) => {
                    if (isValid(board, cell.index, Number(newValue))) {
                        const newBoard = [...board]
                        newBoard[cell.index].value =
                            newValue === '' ? '' : Number(newValue)
                        newBoard[cell.index].userInput = !(newValue === '')
                        setBoard(newBoard)
                    } else {
                        alert(
                            `Number ${newValue} can not be placed in this box`
                        )
                    }
                }}
            />
            <section>
                <Button
                    data-testid="clear-button"
                    onClick={() => {
                        setBoard([
                            ...board.map((cell) => ({
                                ...cell,
                                userInput: false,
                                value: ''
                            }))
                        ])
                    }}
                >
                    Clear
                </Button>
                <Button
                    data-testid="solve-button"
                    onClick={() => {
                        const solved = solveSudoku(board)
                        if (solved) {
                            setBoard([...solved as CellTypes[]])
                        } else {
                            alert(`Cannot be solved`)
                        }
                    }}
                >
                    Solve
                </Button>
            </section>
        </main>
    )
}

export default App
