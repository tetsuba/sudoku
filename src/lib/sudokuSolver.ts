import {CellTypes} from "../types.ts";
const NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9]

export function hasDuplicate(grid: CellTypes[], index: number, newValue: number): number | null {
    const { x, y, box} = grid[index]
    const PAIRS = [['x', x], ['y', y], ['box', box]]
    let error = null

    PAIRS.forEach((pair) => {
        const [key, value] = pair
        let cache: number[] = [newValue]
        grid
            .filter((cell) => cell[key] === value)
            .forEach((cell) => {
                if (cell.value !== '') {
                    if (!cache.includes(cell.value)) {
                        cache = [...cache, cell.value]
                    } else {
                        error = [cell, pair]
                    }
                }
            }, [])
    })
    return error
}

function randomIndex(numTracker) {
    return Math.floor(Math.random() * numTracker.length)
}

const shuffle = (array: any[]) => {
    return array.slice().sort(() => Math.random() - 0.5);
}


function getValues(grid: CellTypes[], index: number): number[] {
    const { x, y, box} = grid[index]
    const PAIRS = [['x', x], ['y', y], ['box', box]]
    let numbers: number[] = []

    PAIRS.forEach((pair) => {
        const [key, value] = pair
        let cache: number[] = []
        grid
            .filter((cell) => cell[key] === value)
            .forEach((cell) => {
                if (cell.value !== '') {
                    if (!cache.includes(cell.value)) {
                        cache = [...cache, cell.value]
                    }
                }
            }, [])
        numbers = [...numbers, ...cache]
    })

    return shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]
        .filter((num) => !numbers.includes(num)))
}

export function solveSudoku(data) {
    const [grid, setGrid] = data
    let count = 0

    while (count < 81) {
        console.log(count)
        if (grid[count].value === '') {
            // if (numTracker.length === 0) {
            //     numTracker = [guessValue]
            //
            //     console.log(grid, guessValue)
            //
            //     let previousIndex = count - 1
            //     let rollback = true
            //     while(rollback && previousIndex > 0) {
            //         if (grid[previousIndex].userInput) {
            //             previousIndex -= 1
            //             console.error('previousIndex', previousIndex)
            //         } else {
            //             rollback = false
            //         }
            //     }
            //
            //     count = previousIndex
            //
            //
            //
            //     // ------------------------------------------
            //     // Solution that overwrites user input values
            //     // ------------------------------------------
            //
            //     // count -= 1
            //     grid[count].value = ''
            //     // ------------------------------------------
            // }

            const values = getValues(grid, count)
            console.log('values', values)

            if (values.length) {
                let newValue = values[0]
                const dup = hasDuplicate(grid, count, newValue)
                console.log('duplicate:', dup)
                if (dup === null) {
                    grid[count].value = newValue
                    count += 1
                } else {
                    console.log('cannot solve', values, count, newValue)
                    console.log(grid)
                    break
                }
            } else {
                console.log('No values found')
                break

            }

        } else {
            count += 1
        }
        if (count === grid.length) {
            // console.log('completed', grid)
            break;
        }
    }
    if (count !== grid.length) {
        grid[count - 1].value = ''
        console.log('Not Completed', grid)
        solveSudoku([grid, setGrid])
    } else {
        console.log('completed')

    }
    setGrid([...grid])

}



export function _solveSudoku_(data) {
    const [grid, setGrid] = data
    let count = 0
    let numTracker = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    let guessValue
    while (count < 81) {
        console.log(count)
        if (grid[count].value === '') {
            if (numTracker.length === 0) {
                numTracker = [guessValue]

                console.log(grid, guessValue)

                let previousIndex = count - 1
                let rollback = true
                while(rollback && previousIndex > 0) {
                    if (grid[previousIndex].userInput) {
                        previousIndex -= 1
                        console.error('previousIndex', previousIndex)
                    } else {
                        rollback = false
                    }
                }

                count = previousIndex



                // ------------------------------------------
                // Solution that overwrites user input values
                // ------------------------------------------

                // count -= 1
                grid[count].value = ''
                // ------------------------------------------
            }
            const index = randomIndex(numTracker)
            guessValue = numTracker.splice(index, 1)[0]
            // grid[count].value = guessValue
            // console.log('numTracker', numTracker, grid[count].value)
            // console.log(grid)
            const duplicate = hasDuplicate(grid, count, guessValue)
            if (duplicate === null) {
                grid[count].value = guessValue
                numTracker = [1, 2, 3, 4, 5, 6, 7, 8, 9]
                count += 1
            }
        } else {
            count += 1
        }
        if (count === grid.length) {
            // console.log('completed', grid)
            break;
        }
    }
    console.log('completed')
    setGrid([...grid])
}