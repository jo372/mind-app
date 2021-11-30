import CustomStorage from "../../lib/CustomStorage";
import Key from "../../lib/Key";
import PinInput from "./PinInput";

interface PinConfirmationProps {
    onSuccess?: () => void, 
    onFailure?: () => void 
}

const PinConfirmation : React.FC<PinConfirmationProps> = ({onSuccess, onFailure}) => {

    const isPinValid = (hashed_pin: string) : boolean => {
        return hashed_pin === CustomStorage.getValueByKey(Key.PIN);
    }

    return <PinInput onSubmit={(hashed_pin) => {
        if(onSuccess || onFailure) {
            const validPin = isPinValid(hashed_pin);
            if(validPin && onSuccess) {
                onSuccess();
            } else if(!validPin && onFailure) {
                onFailure();
            }
        }
    }}/>
}

export default PinConfirmation;