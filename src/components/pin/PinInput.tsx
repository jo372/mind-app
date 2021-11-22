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

    useEffect(() => {
        const body = document.body;
        const isNumber = (num: string) : boolean => {
            return num.match(/\d+/g) != null;
        }
        const onKeyDown = ({key}: KeyboardEvent) => {
            if(isNumber(key)) {
                const pinKey : HTMLButtonElement | null = document.querySelector(`#pin_button_${key}`);
                if(pinKey) pinKey.click();
            }
        }
        body.addEventListener("keydown", onKeyDown);
        return () =>  body.removeEventListener('keydown', onKeyDown);
    })
    const createPinButtons = () : JSX.Element[] => {
        const buttons : JSX.Element[] = [];
        for(let i=0; i < 10; i++) {
            buttons.push(<PinButton id={`pin_button_${i}`} key={`pin_button_${i}`} text={i} onClick={(e) => {
                const target = e.target as HTMLButtonElement;
                setInput(input + target.innerText)
            }}/>);
        }
        return buttons.reverse();
    }
    return <div className="pin-input">
        <input className="pin-input-display disable-text-select" type="text" disabled/>
        <div className="pin_buttons">
            { createPinButtons() }
        </div>
    </div>
}

export default PinInput;