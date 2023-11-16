import { CellTypes } from '../types.ts'

type PairTypes = [keyof CellTypes, string | number]

export function isValid(
    grid: CellTypes[],
    index: number,
    newValue: number
): boolean {
    const { x, y, box } = grid[index]
    const PAIRS: PairTypes[] = [
        ['x', x],
        ['y', y],
        ['box', box]
    ]
    let valid = true

    PAIRS.forEach((pair) => {
        const [key, value] = pair
        let cache: number[] = [newValue]
        grid.filter((cell) => cell[key] === value).forEach((cell) => {
            if (cell.value !== '') {
                if (!cache.includes(Number(cell.value))) {
                    cache = [...cache, Number(cell.value)]
                } else {
                    valid = false
                }
            }
        }, [])
    })
    return valid
}

export function solveSudoku(board: CellTypes[]): boolean | CellTypes[] {
    if (isSolved(board)) {
        return board
    }
    // Find an empty cell
    const cell = board.find((cell) => cell.value === '')

    // Try each number 1-9 in the empty cell
    for (let num = 1; num <= 9; num++) {
        if (isValid(board, cell!.index, num)) {
            board[cell!.index].value = num

            // Recursively try to solve the board with this number placed
            if (solveSudoku(board)) {
                return board
            }

            // Backtrack by resetting the cell if no solution found
            board[cell!.index].value = ''
        }
    }

    // No valid number found, return false
    return false
}

// Check if board is fully solved
function isSolved(board: CellTypes[]) {
    return board.every((cell) => cell.value !== '')
}
