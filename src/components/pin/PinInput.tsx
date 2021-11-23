import { useEffect, useState } from "react";
import PinButton from "./PinButton";
import { BsBackspace } from "react-icons/bs";
import { AiOutlineEnter } from "react-icons/ai";
import CryptoHelper from "../../lib/CryptoHelper";

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
        const onKeyDown = ({key}: KeyboardEvent) => {
            key = key.toLocaleLowerCase();
            const pinKey : HTMLButtonElement | null = document.querySelector(`#pin_button_${key}`);
            pinKey?.click();
        }
        body.addEventListener("keydown", onKeyDown);
        return () =>  body.removeEventListener('keydown', onKeyDown);
    });

    const createPinButtons = () : JSX.Element[] => {
        const buttons : JSX.Element[] = [];
        for(let i=0; i < 10; i++) {
            const button = <PinButton id={`pin_button_${i}`} key={`pin_button_${i}`} text={i} onClick={(e) => {
                const target = e.target as HTMLButtonElement;
                setInput(input + target.innerText)
            }}/>;
            buttons.push(button);
        }
        return buttons.reverse();
    }

    const eraseLastPinEntry = () => {
        if(input.length > 0) setInput(input.slice(0, input.length - 1));
    }

    const clearInput = () => {
        setInput("");
    }

    const onSubmit = () => {
        if(input === "") return;
        if(props.onSubmit) {
            const hashed_input = CryptoHelper.createSha512Hash(input);
            props.onSubmit(hashed_input);
            clearInput();
        }
    }

    return <div className="pin-input">
        <div className="pin-display-screen">
            <input className="pin-input-display disable-text-select" type="text" disabled/>
            <PinButton 
                id="pin_button_backspace" 
                onClick={eraseLastPinEntry}>
                    <BsBackspace/>
            </PinButton>
        </div>
        <div className="pin-buttons">
            { createPinButtons() }
            <PinButton 
                id="pin_button_enter" 
                onClick={onSubmit}>
                    <AiOutlineEnter/>
            </PinButton>
        </div>
    </div>
}

export default PinInput;