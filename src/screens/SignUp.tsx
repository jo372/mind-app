import { useState } from "react";
import PinInput from "../components/pin/PinInput";

interface SignUpProps {
    onComplete ?: (hashed_pin: string) => void
}

const SignUp : React.FC<SignUpProps> = (props) => {
    const [firstPinEntry, setFirstPinEntry] = useState<string>("");
    const [error, setError] = useState<string | null>(null);

    const checkPinEntriesMatch = (secondPinEntry: string) => {
        const match = firstPinEntry === secondPinEntry;
        if(!match) {
            setError("Pins do not match, please try again.");
            setFirstPinEntry("");
        } else {
            setError("");
        }

    }

    const displayFirstScreen = () => {
        return <PinInput onSubmit={(hashed_pin) => setFirstPinEntry(hashed_pin)}></PinInput>
    }

    const displaySecondScreen = () => {
        return <PinInput onSubmit={(hashed_pin) => checkPinEntriesMatch(hashed_pin)}></PinInput>;
    }

    return <div className="pin-entry-scrreen">
        <p className="text-center error">{error}</p>
        {
            firstPinEntry === "" ?  displayFirstScreen(): displaySecondScreen()
        }
    </div>;
}

export default SignUp;