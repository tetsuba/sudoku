import './box.scss'
import Cell from '../Cell/Cell.tsx'
import { CellTypes } from '../../types.ts'

type PropTypes = {
    cells: CellTypes[]
    num: number
    update: (c: CellTypes, v: string) => void
}
export default function Box(props: PropTypes) {
    return (
        <div className="box">
            {props.cells
                .filter((cell) => {
                    return cell.box === props.num
                })
                .map((cell, i) => (
                    <Cell
                        key={`box-${props.num}-${i}`}
                        value={cell.value}
                        highlight={cell.userInput}
                        update={(newValue: string) =>
                            props.update(cell, newValue)
                        }
                    />
                ))}
        </div>
    )
}
