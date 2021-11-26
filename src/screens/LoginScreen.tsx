import { useEffect } from "react"
import { useNavigate } from "react-router";
import PinConfirmation from "../components/pin/PinConfirmation";
import CustomRoutes from "../lib/CustomRoutes";
import CustomStorage from "../lib/CustomStorage";
import Key from "../lib/Key";

const LoginScreen = () => {
    const navigate = useNavigate();

      
    useEffect(() => {
        if(CustomStorage.getValueByKey(Key.AUTHENTICATED) == "true") navigate(CustomRoutes.HOME);
    });


    return <div className="container text-center">
        <h1>Login</h1>
        <PinConfirmation 
            onSuccess={() => {
                CustomStorage.setKeyValue(Key.AUTHENTICATED, "true");
                navigate(CustomRoutes.HOME)
            }} 
            onFailure={() => { 
                CustomStorage.setKeyValue(Key.AUTHENTICATED, "false");
                navigate(CustomRoutes.UNAUTHORIZED) 
            }}
        />
    </div>
}

export default LoginScreen;