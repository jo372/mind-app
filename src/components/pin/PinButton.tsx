import { DetailsHTMLAttributes } from "react"

interface PinButtonProps extends Omit<DetailsHTMLAttributes<HTMLButtonElement>, 'className'> {
    text?: string | number
}
const PinButton : React.FC<PinButtonProps> = (props : PinButtonProps) => {
    return <button className="pin-btn" id={props.id} onClick={props.onClick}>{props.text ?? props.children}</button>
}

export default PinButton;