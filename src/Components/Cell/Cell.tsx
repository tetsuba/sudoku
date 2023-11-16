import './cell.scss'

type PropTypes = {
    update: (v: string) => void
    value: string | number
    highlight: boolean
}

export default function Cell(props: PropTypes) {
    let styles = {}
    if (props.highlight) {
        styles = { backgroundColor: 'orange' }
    }

    return (
        <div className="cell" style={styles}>
            <input
                data-testid="cell"
                type="number"
                value={props.value}
                onChange={(e) => props.update(e.target.value)}
            />
        </div>
    )
}
