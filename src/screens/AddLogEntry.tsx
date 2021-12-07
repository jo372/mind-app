import React, { useEffect, useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { NavigateFunction, useNavigate } from "react-router";
import CustomRoutes from "../lib/CustomRoutes";
import CustomStorage from "../lib/CustomStorage";
import Key from "../lib/Key";
import Weather, { WeatherData, WeatherError } from "../lib/Weather";
import MoodSelector, { Mood } from "../components/MoodSelector/MoodSelector";
import LoadingIcon from "../components/LoadingIcon/LoadingIcon";
import WeatherDisplay from "../components/WeatherDisplay/WeatherDisplay";

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
    const [error, setError] = useState<string | undefined>(undefined);
    const [weatherData, setWeatherData] = useState<WeatherData | undefined>(undefined);

    useEffect(() => {
        if(!CustomStorage.getValueByKey(Key.PIN)) navigate(CustomRoutes.REGISTER)
        if(CustomStorage.getValueByKey(Key.AUTHENTICATED) !== "true") navigate(CustomRoutes.LOGIN);
        
        const success = (position: GeolocationPosition) => {
            // setWeatherData()
            const { latitude, longitude } = position.coords;
            
            Weather.fromLatLon(latitude, longitude)
            .then((data: WeatherData | WeatherError) => {
                if(data instanceof WeatherError) {
                    setError(data.message);
                } else {
                    setWeatherData(data);
                }
            })
            .catch(setError);
        }

        const error = (error: GeolocationPositionError) => {
            setError(error.message);
        }

        // navigator.geolocation.getCurrentPosition();
        navigator.geolocation.getCurrentPosition(success, error, {
            enableHighAccuracy: true,
        })
    }, []);

    const generateRandomMessage = () => {
        const randomIndex = Math.floor(Math.random() * messages.length);
        return messages[randomIndex];
    }

    const displayWeatherData = () => { 

        // {"name":"Brighton and Hove","main":{"temp":279.98,"feels_like":276.62,"temp_min":276.85,"temp_max":281.73,"pressure":1009,"humidity":86},"weather":{"id":802,"main":"Clouds","description":"scattered clouds","icon":"03d"}}
        // const locationName = weatherData?.name;
        // console.log(weatherData);
        if(weatherData) {
            const { icon, description } = weatherData.weather; 
            const locationName = weatherData.name;
            const tempature = weatherData.main.temp;

            return <WeatherDisplay iconId={icon} description={description} locationName={locationName} temperature={tempature} />
        } 
        return error ? <p>{error}</p> : <LoadingIcon/>;
    };

    const createEntry : React.MouseEventHandler<HTMLButtonElement | undefined>  = () => {
        // const locationName = document.querySelector("#locationName")?.textContent;
        // const weatherIcon = document.querySelector("#weatherIcon")?.dataset?.iconId;
        const locationName = document.querySelector("#locationName") as HTMLSpanElement;
        const weatherIcon = document.querySelector("#weatherIcon") as HTMLImageElement;
        const moodDescription = document.querySelector("#moodDescription") as HTMLTextAreaElement;
        console.log(locationName.innerText, weatherIcon.dataset.iconid, moodDescription.value);
    }

    return <div className="container text-center">
        <button className="back-button" onClick={() => navigate(CustomRoutes.HOME)}>
            <BiArrowBack/>
        </button>
        <h1>Add Log Entry</h1>
        <div className="container">
            { displayWeatherData() }
            <h2>{React.useMemo(() => generateRandomMessage(), [])}</h2>
           <MoodSelector onClick={(mood: Mood | undefined) => console.log(mood)}/>
           <textarea id="moodDescription" className="mood-entry-details" placeholder="Add extra details here"></textarea>
            <button id="addMoodEntryButton" className="btn right" onClick={createEntry}>Add Entry</button>
        </div>
    </div>
}

export default AddLogEntryScreen;