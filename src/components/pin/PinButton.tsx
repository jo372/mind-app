import { DetailsHTMLAttributes } from "react"

interface PinButtonProps extends Omit<DetailsHTMLAttributes<HTMLButtonElement>, 'className'> {
    text?: string | number
}
const PinButton : React.FC<PinButtonProps> = (props : PinButtonProps) => {
    return <button className="pin-btn" id={props.id} onClick={(e) => {
        if(props.onClick) props.onClick(e);
        
        const target = e.target as HTMLButtonElement;
        target.classList.toggle('active');
        setTimeout(() => { 
            target.classList.toggle('active');
        }, 100);
        
    }}>{props.text ?? props.children}</button>
}

export default PinButton;