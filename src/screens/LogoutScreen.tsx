import { useEffect } from "react";
import { useNavigate } from "react-router";
import CustomStorage from "../lib/CustomStorage";
import Key from "../lib/Key";

const LogoutScreen = () => {
    const navigate = useNavigate();
    
    useEffect(() => {
        CustomStorage.setKeyValue(Key.AUTHENTICATED, "false");
        navigate("/");
    }, [])

    return <div>
        <p>Logging out...</p>
    </div>
}

export default LogoutScreen;