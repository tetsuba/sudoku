import './board.scss'
import { numberOfBoxes } from '../../lib/sudokuBuilder.ts'
import Box from '../Box/Box.tsx'
import { CellTypes } from '../../types.ts'

type PropTypes = {
    update: (c: CellTypes, v: string) => void
    data: CellTypes[]
}

export default function Board(props: PropTypes) {
    return (
        <>
            <div className="board">
                {numberOfBoxes.map((num) => (
                    <div className="board__box" key={num}>
                        <Box
                            cells={props.data}
                            update={props.update}
                            num={num}
                        />
                    </div>
                ))}
            </div>
        </>
    )
}
