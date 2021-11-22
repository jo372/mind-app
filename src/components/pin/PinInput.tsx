import { useEffect, useState } from "react";
import PinButton from "./PinButton";

interface PinInputProps {
    onSubmit?: (hashedPin: string) => void;
}

const PinInput : React.FC<PinInputProps> = (props) => {
    const [input, setInput] = useState<string>("");

    useEffect(() => {
        const node : HTMLInputElement | null = document.querySelector('.pin-input-display');
        if(node) {
            node.value = Array.from(input).map(() => "●").join('');
        }
    }, [input]);

    const createPinButtons = () : JSX.Element[] => {
        const buttons : JSX.Element[] = new Array();
        for(let i=0; i < 10; i++) {
            buttons.push(<PinButton key={`pin_button_${i}`} text={i} onClick={(e) => {
                const target = e.target as HTMLButtonElement;
                setInput(input + target.innerText)
            }}/>);
        }
        return buttons.reverse();
    }
    return <div className="pin-input">
        <input className="pin-input-display" type="text" disabled/>
        { createPinButtons() }
    </div>
}

export default PinInput;