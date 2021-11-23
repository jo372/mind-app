import { useEffect, useState } from "react";
import PinInput from "../components/pin/PinInput";

interface SignUpScreenProps {
    onComplete: (hashed_pin: string) => void
}

const SignUpScreen : React.FC<SignUpScreenProps> = (props) => {
    const [firstPinEntry, setFirstPinEntry] = useState<string>("");
    const [error, setError] = useState<string | null>(null);

    const checkPinEntriesMatch = (secondPinEntry: string) => {
        const match = firstPinEntry === secondPinEntry;
        if(!match) {
            setError("Pins do not match, please try again.");
            setFirstPinEntry("");
        } else {
            setError("");
            props.onComplete(secondPinEntry);
        }
    }

    const displayFirstScreen = () => {
        return <PinInput onSubmit={(hashed_pin) => setFirstPinEntry(hashed_pin)}></PinInput>
    }

    const displaySecondScreen = () => {
        return <PinInput onSubmit={(hashed_pin) => checkPinEntriesMatch(hashed_pin)}></PinInput>;
    }

    useEffect(() => {
        const span : HTMLSpanElement | null = document.querySelector('.pin-entry-screen span');
        if(span) {
            if(error) {
                span.classList.add("error");
            } else {
                span.classList.remove("error");
            }
        }
    }, [error]);

    return <div className="pin-entry-screen">
        <span className="text-center">{error}</span>
        {
            firstPinEntry === "" ?  displayFirstScreen(): displaySecondScreen()
        }
    </div>;
}

export default SignUpScreen;