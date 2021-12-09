import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import WeatherDisplay, { WeatherDisplayProps } from "../components/WeatherDisplay/WeatherDisplay";
import CustomRoutes from "../lib/CustomRoutes";
import CustomStorage from "../lib/CustomStorage";
import Key from "../lib/Key";
import { WeatherData } from "../lib/Weather";
import { LogEntry } from "./AddLogEntry";
import { AiFillEdit, AiOutlineMeh } from 'react-icons/ai';
import { RiEmotionHappyLine, RiEmotionUnhappyLine } from 'react-icons/ri';
import { Mood } from "../components/MoodSelector/MoodSelector";
import { BiArrowBack } from "react-icons/bi";
import { IoMdClose } from "react-icons/io";


const showWeatherDetails = (data: WeatherData) => {
    const props : WeatherDisplayProps = {
        description: data.weather.description,
        temperature: data.main.temp,
        iconId: data.weather.icon,
        locationName: data.name,
    }

    return <WeatherDisplay {...props}/>
}

const showSelectedMood = (mood: Mood) => {
    const { Happy, Sad, Meh } = Mood;

    let el;
    switch(mood) {
        case Happy: 
            el = <RiEmotionHappyLine/>
        break;
        case Sad:
            el = <RiEmotionUnhappyLine/>
            break;
        case Meh:
            el = <AiOutlineMeh/>
            break;
        default:
            el = <RiEmotionHappyLine/>
            break;
    }
    return <div className="btn mood">
        {el}
    </div>;
}


const ShowLogEntriesScreen = () => {
    const navigate = useNavigate();
    const [entries, setEntries] = useState<LogEntry[]>(JSON.parse(CustomStorage.getValueByKey(Key.LOG_ENTRIES) ?? "[]"));
    useEffect(() => {
        if(!CustomStorage.getValueByKey(Key.PIN)) navigate(CustomRoutes.REGISTER)
        if(CustomStorage.getValueByKey(Key.AUTHENTICATED) !== "true") navigate(CustomRoutes.LOGIN);
    })
    

    const editEntry  = (idx: number) => {
        navigate(`${CustomRoutes.ADD_LOG_ENTRY}?id=${idx}`);
    }
    
    const deleteEntry = (idx: number) => {
        const entries_copy = [...entries];
        entries_copy .splice(idx, 1);
        CustomStorage.setKeyValue(Key.LOG_ENTRIES, JSON.stringify(entries_copy));
        setEntries(entries_copy);
    }
    
    const createEntry = (data: LogEntry, idx: number) => {
        return <div key={`mood-entry-${idx}`} className="mood-entry container">
            <div className="mood-entry-header">
                <button onClick={() => editEntry(idx)}><AiFillEdit/></button>
                <button onClick={() => deleteEntry(idx)}className="btn"><IoMdClose/></button>
            </div>
            <div className="mood-entry-date-time">
                <p>{data.date}</p>
                <p>{data.time}</p>
            </div>
            <div>{data.location}</div>
            <div className="mood-weather">
                { data.weather ? showWeatherDetails(data.weather) : '' }
            </div>
            <div className="mood-entry-mood">
                { showSelectedMood(data.mood as Mood) }     
            </div>
            <div>
                <p>Details: { data.details }</p>
            </div>
        </div>
    }
    
    return entries.length === 0 ? <p>No Entries</p> : <div>
        { entries.map((entry: LogEntry, idx: number) => createEntry(entry, idx)).reverse()}
        <button
        className="back-button"
        onClick={() => navigate(CustomRoutes.HOME)}
      >
        <BiArrowBack />
      </button>
    </div>
}
export default ShowLogEntriesScreen;