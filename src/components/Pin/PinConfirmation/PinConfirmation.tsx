import CustomStorage from "../../../lib/CustomStorage";
import Key from "../../../lib/Key";
import PinInput from "../PinInput/PinInput";

interface PinConfirmationProps {
    onSuccess: () => void, 
    onFailure?: () => void 
}

const PinConfirmation : React.FC<PinConfirmationProps> = ({onSuccess, onFailure}) => {

    const isPinValid = (hashed_pin: string) : boolean => {
        return hashed_pin === CustomStorage.getValueByKey(Key.PIN);
    }
    
    return <PinInput onSubmit={(hashed_pin) => {
        const validPin = isPinValid(hashed_pin);
        if(validPin) {
            onSuccess();
        } else {
            if(onFailure) onFailure();
        }
    }}/>
}

export default PinConfirmation;