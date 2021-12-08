import React, { useEffect, useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router";
import CustomRoutes from "../lib/CustomRoutes";
import CustomStorage from "../lib/CustomStorage";
import Key from "../lib/Key";
import Weather, { WeatherData, WeatherError } from "../lib/Weather";
import MoodSelector, { Mood } from "../components/MoodSelector/MoodSelector";
import LoadingIcon from "../components/LoadingIcon/LoadingIcon";
import WeatherDisplay from "../components/WeatherDisplay/WeatherDisplay";
import Modal from "../components/Modal/Modal";
export class LogEntry {
  constructor(
    public time: string,
    public location: string,
    public date: string,
    public weather: WeatherData,
    public mood: string,
    public details: string
  ) {
    this.time = time;
    this.location = location;
    this.date = date;
    this.weather = weather;
    this.mood = mood;
    this.details = details;
  }
}

const AddLogEntryScreen = () => {
  const messages = [
    "How are you feeling?",
    "What's up?",
    "What's going on?",
    "What's going on today?",
    "How are you feeling today?",
    "How are things going?",
    "How are you?",
  ];
  const navigate = useNavigate();
  const [error, setError] = useState<string | undefined>(undefined);
  const [weatherData, setWeatherData] = useState<WeatherData | undefined>(
    undefined
  );
  const [currentMood, setCurrentMood] = useState<Mood | undefined>(undefined);
  const [modalMessage, setModalMessage] = useState<string>("");
  const [isModalVisible, setModalVisible] = useState<boolean>(false);

  useEffect(() => {
    if (!CustomStorage.getValueByKey(Key.PIN)) navigate(CustomRoutes.REGISTER);
    if (CustomStorage.getValueByKey(Key.AUTHENTICATED) !== "true") {
      navigate(CustomRoutes.LOGIN);
    }
    const success = (position: GeolocationPosition) => {
      // setWeatherData()
      const { latitude, longitude } = position.coords;

      Weather.fromLatLon(latitude, longitude)
        .then((data: WeatherData | WeatherError) => {
          if (data instanceof WeatherError) {
            setError(data.message);
          } else {
            setWeatherData(data);
          }
        })
        .catch(setError);
    };

    const error = (error: GeolocationPositionError) => {
      setError(error.message);
    };

    navigator.geolocation.getCurrentPosition(success, error, {
      enableHighAccuracy: true,
      timeout: 3000,
    });
  }, [navigator]);

  const generateRandomMessage = () => {
    const randomIndex = Math.floor(Math.random() * messages.length);
    return messages[randomIndex];
  };

  const displayWeatherData = () => {
    if (weatherData) {
      const { icon, description } = weatherData.weather;
      const locationName = weatherData.name;
      const tempature = weatherData.main.temp;

      return (
        <WeatherDisplay
          iconId={icon}
          description={description}
          locationName={locationName}
          temperature={tempature}
        />
      );
    }
    return error ? <p>{error}</p> : <LoadingIcon />;
  };

  const createEntry: React.MouseEventHandler<HTMLButtonElement | undefined> =
    () => {
      // const locationName = document.querySelector("#locationName")?.textContent;
      // const weatherIcon = document.querySelector("#weatherIcon")?.dataset?.iconId;
        const mood = document.querySelector('.btn.mood.active') as HTMLButtonElement;
        if(!mood) {
          setModalMessage("Please select a mood!");
          setModalVisible(true);
        }
    };

  const hideModal = () => {
    setModalVisible(false);
  }
  return (
    <div className="container text-center">
      <button
        className="back-button"
        onClick={() => navigate(CustomRoutes.HOME)}
      >
        <BiArrowBack />
      </button>
      <h1>Add Log Entry</h1>
      <Modal title="Alert!" content={modalMessage} isHidden={isModalVisible} onClose={hideModal}/>
      <div className="container">
        {displayWeatherData()}
        <h2>{React.useMemo(() => generateRandomMessage(), [])}</h2>
        <MoodSelector onClick={(mood: Mood | undefined) => setCurrentMood(mood)} />
        <textarea
          id="moodDescription"
          className="mood-entry-details"
          placeholder="Add extra details here"
        ></textarea>
        <button
          id="addMoodEntryButton"
          className="btn right"
          onClick={createEntry}
        >
          Add Entry
        </button>
      </div>
    </div>
  );
};

export default AddLogEntryScreen;
