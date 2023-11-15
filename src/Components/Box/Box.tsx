import Cell from '../Cell/Cell.tsx'
import { CellTypes } from '../../types.ts'
import {hasDuplicate} from "../../lib/sudokuSolver.ts";

type PropTypes = {
    grid: [CellTypes[], (v: CellTypes[]) => void]
    num: number
}
export default function Box(props: PropTypes) {
    const [grid, setGrid] = props.grid
    return (
        <div className="grid-container">
            {grid
                .filter((cell) => {
                    return cell.box === props.num
                })
                .map((cell, i) => (
                    <Cell
                        key={`box-${props.num}-${i}`}
                        value={cell.value}
                        highlight={cell.userInput}
                        status={cell.status}
                        update={(newValue: string) => {
                            const duplicate = hasDuplicate(grid, cell.index, Number(newValue))
                            console.log('duplicate', duplicate)
                            if (duplicate === null) {
                                const newBoard = [...grid]
                                newBoard[cell.index].value = newValue === '' ? '' : Number(newValue)
                                newBoard[cell.index].userInput = !(newValue === '')
                                // newBoard[cell.index].status = newValue === '' ? '' : 'userInput'
                                setGrid(newBoard)
                            } else {
                                alert(`Number ${newValue} can't be placed in this box`)
                            }
                        }}
                    />
                ))}
        </div>
    )
}
