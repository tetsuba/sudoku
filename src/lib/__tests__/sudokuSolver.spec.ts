import { createBoardCells } from '../sudokuBuilder.ts'
import { isValid, solveSudoku } from '../sudokuSolver.ts'
import {
    expectedSolvedSudoku,
    mockSudokuFailNumbers,
    mockSudokuSuccessNumbers,
    testCase
} from './mockdata.ts'
import { CellTypes } from '../../types.ts'

/*
 * 00  01  02  |  03  04  05  |  06  07  08
 *
 * 09  10  11  |  12  13  14  |  15  16  17
 *
 * 18  19  20  |  21  22  23  |  24  25  26
 * ----------------------------------------
 * 27  28  29  |  30  31  32  |  33  34  35
 *
 * 36  37  38  |  39  40  41  |  42  43  44
 *
 * 45  46  47  |  48  49  50  |  51  52  53
 * ----------------------------------------
 * 54  55  56  |  57  58  59  |  60  61  62
 *
 * 63  64  65  |  66  67  68  |  69  70  71
 *
 * 72  73  74  |  75  76  77  |  78  79  80
 *
 * */

describe('sudokuSolver', () => {
    describe('isValid()', () => {
        const clone = createBoardCells()
        testCase.forEach((tc) => {
            clone[tc.index].value = tc.value
        })

        describe('should return false', () => {
            test.each(testCase)('box %#', (tc) => {
                expect(isValid(clone, tc.box.fail, tc.value)).toBeFalsy()
            })

            test.each(testCase)('horizontal %#', (tc) => {
                expect(isValid(clone, tc.horizontal.fail, tc.value)).toBeFalsy()
            })

            test.each(testCase)('vertical %#', (tc) => {
                expect(isValid(clone, tc.vertical.fail, tc.value)).toBeFalsy()
            })
        })
        describe('should return true', () => {
            test.each(testCase)('box %#', (tc) => {
                expect(isValid(clone, tc.box.success, tc.value)).toBeTruthy()
            })

            test.each(testCase)('horizontal %#', (tc) => {
                expect(
                    isValid(clone, tc.horizontal.success, tc.value)
                ).toBeTruthy()
            })

            test.each(testCase)('vertical %#', (tc) => {
                expect(
                    isValid(clone, tc.vertical.success, tc.value)
                ).toBeTruthy()
            })
        })
    })

    describe('solveSudoku()', () => {
        test('solved', () => {
            const clone = createBoardCells()
            mockSudokuSuccessNumbers.forEach((value, index) => {
                clone[index].value = value
            })
            const solved = solveSudoku(clone)
            expect((solved as CellTypes[]).map((cell) => cell.value)).toEqual(
                expectedSolvedSudoku
            )
        })
        test('failed', () => {
            const clone = createBoardCells()
            mockSudokuFailNumbers.forEach((value, index) => {
                clone[index].value = value
            })
            const solved = solveSudoku(clone)
            expect(solved).toBeFalsy()
        })
    })
})
