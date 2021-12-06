import React, { useEffect, useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router";
import CustomRoutes from "../lib/CustomRoutes";
import CustomStorage from "../lib/CustomStorage";
import Key from "../lib/Key";
import Weather, { WeatherData, WeatherError } from "../lib/Weather";
import User from "../lib/User";
import MoodSelector, { Mood } from "../components/MoodSelector/MoodSelector";
import LoadingIcon from "../components/LoadingIcon/LoadingIcon";

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
    const [weatherData, setWeatherData] = useState<WeatherData | undefined>(undefined);

    useEffect(() => {
        if(!CustomStorage.getValueByKey(Key.PIN)) navigate(CustomRoutes.REGISTER)
        if(CustomStorage.getValueByKey(Key.AUTHENTICATED) !== "true") navigate(CustomRoutes.LOGIN);
        
        User.askForUserLocation(
            (position: GeolocationPosition) => setUserCoord(position), 
            (positionError: GeolocationPositionError) => setError(positionError.message)
        )
    }, [navigate]);

    useEffect(() => {
        if(userCoord && !error) {
            const { latitude: lat, longitude: long } = userCoord.coords;
            
            Weather.fromLatLon(lat, long).then((res : WeatherData | WeatherError) => {
                if(res instanceof WeatherData) setWeatherData(res);
                else setError(res.message);
            });
        }
    }, [userCoord]);
    
    const generateRandomMessage = () => {
        const randomIndex = Math.floor(Math.random() * messages.length);
        return messages[randomIndex];
    }

    // const displayLatLong = () => {
    //     return <p>
    //         {   
    //             !userCoord && error ? error : 
    //             !userCoord ? "Loading..." : 
    //             `${userCoord.coords.latitude} ${userCoord.coords.longitude}`
    //         }
    //     </p>
    // }

    const displayWeatherData = () => { 

        // {"name":"Brighton and Hove","main":{"temp":279.98,"feels_like":276.62,"temp_min":276.85,"temp_max":281.73,"pressure":1009,"humidity":86},"weather":{"id":802,"main":"Clouds","description":"scattered clouds","icon":"03d"}}
        // const locationName = weatherData?.name;
        // console.log(weatherData);
        if(weatherData) {
            const locationName = weatherData.name;
            const iconId = weatherData.weather.icon;
            const weatherDescription = weatherData.weather.description;
            const tempature = weatherData.main.temp;
            return <span>
                <img src={`https://openweathermap.org/img/wn/${iconId}@2x.png`} alt={weatherDescription} />
                <p>{locationName}</p>
                <p>{tempature}&deg;C</p>
            </span>
        } else {
            return <LoadingIcon/>
        }
    };

    return <div className="container text-center">
        <button className="back-button" onClick={() => navigate(CustomRoutes.HOME)}>
            <BiArrowBack/>
        </button>
        <h1>Add Log Entry</h1>
        <div className="container">
            { displayWeatherData() }
           <MoodSelector onClick={(mood: Mood | undefined) => console.log(mood)}/>
           <textarea className="mood-entry-details" placeholder={
               React.useMemo(() => generateRandomMessage(), [])
            }></textarea>
            <button className="btn right">Add Entry</button>
        </div>
    </div>
}

export default AddLogEntryScreen;