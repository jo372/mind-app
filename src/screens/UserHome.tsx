import { useEffect } from "react";
import { BiMessageAdd } from "react-icons/bi";
import { CgTranscript } from "react-icons/cg";

interface UserHomeScreenProps {
    
}

const UserHomeScreen = () => {

    useEffect(() => {
        const onKeyDown = ({key}: KeyboardEvent) => {
            key = key.toLowerCase();
            let el : HTMLDivElement | null = document.querySelector(key === "arrowleft" ? '.left-column' : '.right-column');
            if(el) { 
                el.click(); 
                el.classList.toggle('active');
                setTimeout(() => { 
                    el?.classList.toggle('active');
                }, 100);
            }
        }
        const body = document.body;

        body.addEventListener('keydown', onKeyDown);
        return () => body.removeEventListener('keydown', onKeyDown);
    });

    return <div className="user-home">
        <div className="left-column">
            <div className="content">
                <CgTranscript />
                <p>View entries</p>
            </div>
        </div>
        <div className="right-column">
            <div className="content">
                <BiMessageAdd/>
                <p>Add a new entry</p>
            </div>
        </div>
    </div>;
}

export default UserHomeScreen;