export type CellBoxTypes = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9

export type CellTypes = {
    x: string
    y: number
    box: CellBoxTypes
    value: string | number
    index: number
    userInput: boolean
}
