import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import PinInput from "../components/Pin/PinInput";
import CustomRoutes from "../lib/CustomRoutes";
import CustomStorage from "../lib/CustomStorage";
import Key from "../lib/Key";

const SignUpScreen = () => {
    const [firstPinEntry, setFirstPinEntry] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    
    const checkPinEntriesMatch = (secondPinEntry: string) => {
        const match = firstPinEntry === secondPinEntry;
        if(!match) {
            setError("Pins do not match, please try again.");
            setFirstPinEntry("");
        } else {
            setError("");
            CustomStorage.setKeyValue(Key.PIN, secondPinEntry);
            navigate(CustomRoutes.HOME, { replace: true });
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

    return <div className="pin-entry-screen container text-center">
        <h1>Setup Pin</h1>
        <span>{error}</span>
        {
            firstPinEntry === "" ?  displayFirstScreen(): displaySecondScreen()
        }
    </div>;
}

export default SignUpScreen;