import { useEffect } from "react";
import { useNavigate } from "react-router";
import CustomRoutes from "../lib/CustomRoutes";
import CustomStorage from "../lib/CustomStorage";
import Key from "../lib/Key";

const LogoutScreen = () => {
    const navigate = useNavigate();
    
    useEffect(() => {
        if(CustomStorage.getValueByKey(Key.AUTHENTICATED) !== "true") navigate(CustomRoutes.LOGIN); 
        if(!CustomStorage.getValueByKey(Key.PIN)) navigate(CustomRoutes.REGISTER)
        CustomStorage.setKeyValue(Key.AUTHENTICATED, "false");
        navigate("/");
    }, [navigate])

    return <div>
        <p>Logging out...</p>
    </div>
}

export default LogoutScreen;