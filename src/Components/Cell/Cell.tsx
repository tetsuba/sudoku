type PropTypes = {
    update: (v: string) => void
    value: string | number
    highlight: boolean
    status: string
}

export default function Cell(props: PropTypes) {
    let styles = {}
    if (props.highlight) {
        styles = {backgroundColor: 'orange'}
    }

    return (
        <div className="grid-item" style={styles}>
            <input
                type="text"
                value={props.value}
                onChange={(e) => props.update(e.target.value)}
            />
        </div>
    )
}
