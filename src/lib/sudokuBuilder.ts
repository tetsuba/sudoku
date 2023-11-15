import { CellTypes } from '../types.ts'

export const LETTERS = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i']
const LETTERS_OBJ = Object.assign({}, LETTERS)

function getBoxNumber(i: number) {
    const x = (i % 9) + 1
    const y = Math.floor((i % 81) / 9) + 1

    if (x <= 3 && y <= 3) {
        return 1
    } else if (x <= 6 && y <= 3) {
        return 2
    } else if (x <= 9 && y <= 3) {
        return 3
    } else if (x <= 3 && y <= 6) {
        return 4
    } else if (x <= 6 && y <= 6) {
        return 5
    } else if (x <= 9 && y <= 6) {
        return 6
    } else if (x <= 3 && y <= 9) {
        return 7
    } else if (x <= 6 && y <= 9) {
        return 8
    } else if (x <= 9 && y <= 9) {
        return 9
    } else {
        return 0
    }
}

export const grid: CellTypes[] = Array(81)
    .fill({})
    .map((_, i) => {
        return {
            x: LETTERS_OBJ[i % 9],
            y: Math.floor((i % 81) / 9) + 1,
            box: getBoxNumber(i),
            value: '',
            index: i,
            userInput: false,
            status: ''
        }
    })
