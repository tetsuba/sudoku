import {useState} from 'react'
import { grid } from '../../lib/sudokuBuilder.ts'
import Box from '../Box/Box.tsx'
import {solveSudoku} from "../../lib/sudokuSolver.ts";

const numberOfBoxes = Array.from({ length: 9 }, (_, i) => i + 1)

export default function Board() {
    const data = useState(() => grid)

    return (
        <>
            <div className="grid-container">
                {numberOfBoxes.map((num) => (
                    <div className="grid-item" key={num}>
                        <Box grid={data} num={num} />
                    </div>
                ))}
            </div>
            <button onClick={() => solveSudoku(data)}>solve</button>
        </>
    )
}
