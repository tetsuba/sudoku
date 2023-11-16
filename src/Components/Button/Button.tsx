import './button.scss'

type PropTypes = {
    children: string
    onClick: () => void
}
export default function Button(props: PropTypes) {
    const { children, ...rest } = props
    return (
        <button className="button" {...rest}>
            {children}
        </button>
    )
}
