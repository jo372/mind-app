import { useEffect, useState } from "react";
import { BiMessageAdd } from "react-icons/bi";
import { CgTranscript } from "react-icons/cg";
import AddLogEntryScreen from "./AddLogEntry";
import ShowLogEntriesScreen from "./ShowLogEntries";

enum Section {
    VIEW_ENTRIES,
    WRITE_ENTRY 
}

const UserHomeScreen = () => {
    const [section, setSection] = useState<Section | null>(null);
    const { VIEW_ENTRIES, WRITE_ENTRY } = Section;
    
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

    const showViewEntriesScreen = () => {
        return <ShowLogEntriesScreen/>
    }

    const showAddLogEntryScreen = () => {
        return <AddLogEntryScreen/>
    }

    if(section === VIEW_ENTRIES) return showViewEntriesScreen();
    if(section === WRITE_ENTRY) return showAddLogEntryScreen();

    return <div className="user-home">
            <div className="left-column" onClick={ () => setSection(Section.VIEW_ENTRIES) }>
                <div className="content">
                    <CgTranscript />
                    <p>View entries</p>
                </div>
            </div>
            <div className="right-column" onClick={ () => setSection(Section.WRITE_ENTRY) }>
                <div className="content">
                    <BiMessageAdd/>
                    <p>Add a new entry</p>
                </div>
            </div>
        </div>;
}

export default UserHomeScreen;