import { useEffect } from "react";
import { useNavigate } from "react-router";
import CustomRoutes from "../lib/CustomRoutes";
import CustomStorage from "../lib/CustomStorage";
import Key from "../lib/Key";

const ShowLogEntriesScreen = () => {
    const navigate = useNavigate();
    useEffect(() => {
        if(CustomStorage.getValueByKey(Key.AUTHENTICATED) === "false") navigate(CustomRoutes.LOGIN);
    })
    return <><p>Show Log Entry Screen</p></>
}
export default ShowLogEntriesScreen;