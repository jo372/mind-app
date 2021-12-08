import { useEffect } from "react";
import { useNavigate } from "react-router";
import CustomRoutes from "../lib/CustomRoutes";
import CustomStorage from "../lib/CustomStorage";
import Key from "../lib/Key";
import { LogEntry } from "./AddLogEntry";

const ShowLogEntriesScreen = () => {
    const navigate = useNavigate();
    useEffect(() => {
        if(!CustomStorage.getValueByKey(Key.PIN)) navigate(CustomRoutes.REGISTER)
        if(CustomStorage.getValueByKey(Key.AUTHENTICATED) !== "true") navigate(CustomRoutes.LOGIN);
    })
    

    const entries = JSON.parse(CustomStorage.getValueByKey(Key.LOG_ENTRIES) ?? "[]");
    return entries.length === 0 ? "No entries" : entries.map((entry: LogEntry) => <div>{JSON.stringify(entry)}</div>)
}
export default ShowLogEntriesScreen;