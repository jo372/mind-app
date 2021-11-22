import PinButton from "./PinButton";

interface PinInputProps {
    onSubmit?: (hashedPin: string) => void;
}

const PinInput : React.FC<PinInputProps> = (props) => {
    const createPinButtons = () : JSX.Element[] => {
        const buttons : JSX.Element[] = new Array();
        for(let i=0; i < 10; i++) {
            buttons.push(<PinButton key={`pin_button_${i}`} text={i}/>)
        }
        return buttons.reverse();
    }
    return <div className="pin-input">
        <input className="pin__input__display" type="text"/>
        { createPinButtons() }
    </div>
}

export default PinInput;