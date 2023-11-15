export type CellTypes = {
    x: string
    y: number
    box: number
    value: string | number
    index: number
    userInput: boolean
    status: 'error' | 'userInput' | '' | 'highlight'
}
