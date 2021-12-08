import { useEffect } from "react";
import { BiMessageAdd } from "react-icons/bi";
import { CgTranscript } from "react-icons/cg";
import { useNavigate } from "react-router";
import CustomRoutes from "../lib/CustomRoutes";
import CustomStorage from "../lib/CustomStorage";
import Key from "../lib/Key";

const UserHomeScreen = () => {
    
    const navigate = useNavigate();

    useEffect(() => { 
        if(!CustomStorage.getValueByKey(Key.PIN)) navigate(CustomRoutes.REGISTER);
        if(CustomStorage.getValueByKey(Key.AUTHENTICATED) !== "true") navigate(CustomRoutes.LOGIN);

        const onKeyDown = ({key}: KeyboardEvent) => {
            key = key.toLowerCase();
            const keyAllowList = [
                "arrowleft",
                "arrowright",
            ];
            if(keyAllowList.includes(key)) {
                const selector = key === "arrowleft" ? '.left-column' : '.right-column';
                let el : HTMLDivElement | null = document.querySelector(selector);
                if(el) { 
                    el.click(); 
                    el.classList.toggle('active');
                    setTimeout(() => { 
                        el?.classList.toggle('active');
                    }, 100);
                }
            }
        }
        const body = document.body;

        body.addEventListener('keydown', onKeyDown);
        return () => body.removeEventListener('keydown', onKeyDown);
    });

    const showViewEntriesScreen = () => navigate(CustomRoutes.SHOW_LOGS);
    const showAddLogEntryScreen = () => navigate(CustomRoutes.ADD_LOG_ENTRY);

    return <div className="user-home">
            <div className="left-column" onClick={ () => showViewEntriesScreen() }>
                <div className="content">
                    <CgTranscript />
                    <p>View entries</p>
                </div>
            </div>
            <div className="right-column" onClick={ () => showAddLogEntryScreen() }>
                <div className="content">
                    <BiMessageAdd/>
                    <p>Add a new entry</p>
                </div>
            </div>
        </div>;
}

export default UserHomeScreen;