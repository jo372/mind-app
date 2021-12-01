import React, { useEffect, useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router";
import CustomRoutes from "../lib/CustomRoutes";
import CustomStorage from "../lib/CustomStorage";
import Key from "../lib/Key";
import Weather from "../lib/Weather";
import User from "../lib/User";

const messages = [
    "How are you feeling?",
    "What's up?",
    "What's going on?",
    "What's going on today?",
    "How are you feeling today?",
    "How are things going?",
    "How are you?",
]

const AddLogEntryScreen = () => {
    const navigate = useNavigate();
    const [userCoord, setUserCoord] = useState<GeolocationPosition | undefined >(undefined);
    const [error, setError] = useState<string | undefined>(undefined);

    useEffect(() => {
        if(!CustomStorage.getValueByKey(Key.PIN)) navigate(CustomRoutes.REGISTER)
        if(CustomStorage.getValueByKey(Key.AUTHENTICATED) !== "true") navigate(CustomRoutes.LOGIN);
        
        User.askForUserLocation(
            (position: GeolocationPosition) => setUserCoord(position), 
            (positionError: GeolocationPositionError) => setError(positionError.message)
        )
    }, [navigate]);
    
    const generateRandomMessage = () => {
        const randomIndex = Math.floor(Math.random() * messages.length);
        return messages[randomIndex];
    }

    const displayLatLong = () => {
        return <p>
            {   
                !userCoord && error ? error : 
                !userCoord ? "Loading..." : 
                `${userCoord.coords.latitude} ${userCoord.coords.longitude}`
            }
        </p>
    }

    return <div className="container text-center">
        <button className="back-button" onClick={() => navigate(CustomRoutes.HOME)}>
            <BiArrowBack/>
        </button>
        <h1>Add Log Entry</h1>
        <div className="container">
           { displayLatLong() }
           <textarea className="mood-entry-details" placeholder={
               React.useMemo(() => generateRandomMessage(), [])
            }></textarea>
        </div>
    </div>
}

export default AddLogEntryScreen;