import { useEffect, useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router";
import CustomRoutes from "../lib/CustomRoutes";
import CustomStorage from "../lib/CustomStorage";
import Key from "../lib/Key";
import Weather from "../lib/Weather";
import User from "../lib/User";

const AddLogEntryScreen = () => {
    const navigate = useNavigate();
    const [userCoord, setUserCoord] = useState<GeolocationPosition | undefined >(undefined);
    const [error, setError] = useState<string | undefined>(undefined);

    useEffect(() => {
        if(CustomStorage.getValueByKey(Key.AUTHENTICATED) === "false") navigate(CustomRoutes.LOGIN);
        
        User.askForUserLocation(
            (position: GeolocationPosition) => setUserCoord(position), 
            (positionError: GeolocationPositionError) => setError(positionError.message)
        )
    }, [navigate]);
    
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
        </div>
    </div>
}

export default AddLogEntryScreen;