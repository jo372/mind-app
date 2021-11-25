import { useEffect } from "react";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router";
import CustomRoutes from "../lib/CustomRoutes";
import CustomStorage from "../lib/CustomStorage";
import Key from "../lib/Key";

const AddLogEntryScreen = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if(CustomStorage.getValueByKey(Key.AUTHENTICATED) === "false") navigate(CustomRoutes.LOGIN);
    });
    
    return <div className="container text-center">
        <div  className="back-button">
            <BiArrowBack onClick={() => {
                navigate(CustomRoutes.HOME)
            }}/>
        </div>
        <h1>Add Log Entry</h1>
        <div className="container">

        </div>
    </div>
}

export default AddLogEntryScreen;