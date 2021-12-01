import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import PinInput from "../components/Pin/PinInput/PinInput";
import CustomRoutes from "../lib/CustomRoutes";
import CustomStorage from "../lib/CustomStorage";
import Key from "../lib/Key";

const SignUpScreen = () => {
    const [firstPinEntry, setFirstPinEntry] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    
    useEffect(() => {
        if(CustomStorage.getValueByKey(Key.PIN)) navigate(CustomRoutes.LOGIN);
        CustomStorage.setKeyValue(Key.AUTHENTICATED, "false");
    })

    const checkPinEntriesMatch = (secondPinEntry: string) => {
        const match = firstPinEntry === secondPinEntry;
        if(!match) {
            setError("Pins do not match, please try again.");
            setFirstPinEntry("");
        } else {
            setError("");
            CustomStorage.setKeyValue(Key.PIN, secondPinEntry);
            CustomStorage.setKeyValue(Key.AUTHENTICATED, "true");
            navigate(CustomRoutes.HOME);
        }
    }

    const displayFirstScreen = () => {
        return <>
            <h3>Initial Pincode - Step 1 of 2</h3>
            <span>{error}</span>
            <PinInput onSubmit={(hashed_pin) => setFirstPinEntry(hashed_pin)}></PinInput>
        </>
    }

    const displaySecondScreen = () => {
        return <>
        <h3>Pin Confirmation - Step 2 of 2</h3>
        <span>{error}</span>
        <PinInput onSubmit={(hashed_pin) => checkPinEntriesMatch(hashed_pin)}></PinInput>
        </>
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
        {/* <h1>Setup Pin</h1> */}

        {
            firstPinEntry === "" ?  displayFirstScreen(): displaySecondScreen()
        }
    </div>;
}

export default SignUpScreen;