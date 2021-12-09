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
    public time: string | undefined,
    public location: string | undefined,
    public date: string | undefined,
    public weather: WeatherData | undefined,
    public mood: string | undefined,
    public details: string | undefined
  ) {
    this.time = time;
    this.location = location;
    this.date = date;
    this.weather = weather;
    this.mood = mood;
    this.details = details;
  }
}

enum EditMode {
  CreateEntry,
  EditEntry
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
  const [modalTitle, setModalTitle] = useState<string>("Alert!");
  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const [addedEntry, setAddedEntry] = useState<boolean>(false);
  
  const [mode, setMode] = useState<EditMode>(EditMode.CreateEntry);
  const [postId, setPostId] = useState<number | undefined>(undefined);
  const [entryDate, setEntryDate] = useState<string | undefined>(undefined);
  const [entryTime, setEntryTime] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (!CustomStorage.getValueByKey(Key.PIN)) navigate(CustomRoutes.REGISTER);
    if (CustomStorage.getValueByKey(Key.AUTHENTICATED) !== "true") {
      navigate(CustomRoutes.LOGIN);
    }


    const urlParams = new URLSearchParams(window.location.search);
    const hasId = urlParams.has("id");
    
    if (!hasId) {
      const success = (position: GeolocationPosition) => {

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
    } else {
      let entryId : string | number  | null = urlParams.get("id");
      if(entryId) {
        entryId = parseInt(entryId);
        setMode(EditMode.EditEntry);
        setPostId(entryId);
        
        const entryJSONStr : string | null = CustomStorage.getValueByKey(Key.LOG_ENTRIES);
        if(entryJSONStr) {
          const entry = JSON.parse(entryJSONStr)[entryId] as LogEntry;
          setEntryDate(entry.date);
          setEntryTime(entry.time);
          setWeatherData(entry.weather as WeatherData ?? null);
          setCurrentMood(entry.mood as Mood);
          setError("Unable to find previous Weather Data");
          const details = document.querySelector('#moodDescription') as HTMLTextAreaElement;
          if(details) details.innerText = `${entry.details}`;
        }
      } else {
        navigate(CustomRoutes.ADD_LOG_ENTRY);
      }
    }

    
  }, [navigate]);

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
        const mood = document.querySelector('.btn.mood.active') as HTMLButtonElement;
        const moodDescription = document.querySelector('#moodDescription') as HTMLTextAreaElement;

        const moodDescriptionValue = moodDescription.value.trim() ?? "";

        if(!mood) {
          setModalTitle("Warning!");
          setModalMessage("Please select a mood!");
          setModalVisible(true);
          return;
        }

        if(moodDescriptionValue.length === 0) {
          setModalTitle("Warning!");
          setModalMessage("Please write a description");
          setModalVisible(true);
          return;
        }

        const entry : LogEntry = {
          time: entryTime ? entryTime : new Date().toLocaleTimeString(),
          location: weatherData?.name ?? undefined,
          date: entryDate ? entryDate : new Date().toLocaleDateString(),
          weather: weatherData ?? undefined,
          mood: currentMood,
          details: moodDescriptionValue
        };
        
        const previousEntries = JSON.parse(CustomStorage.getValueByKey(Key.LOG_ENTRIES) ?? "[]");

        
        // const entries = JSON.stringify(mode === EditMode.CreateEntry ?  : JSON.parse(previousEntries));
        let entries : Array<LogEntry> = [...previousEntries];
        if(postId) {
          entries[postId] = entry;
        } else {
          entries = [...entries, entry];
        }

        CustomStorage.setKeyValue(Key.LOG_ENTRIES, JSON.stringify(entries));

        setModalTitle("Success");
        setModalMessage(`Your entry has ${mode === EditMode.CreateEntry ? "been created" : "updated"} successfully!`);
        setModalVisible(true);
        setAddedEntry(true);
    };

  const hideModal = () => {
    if(addedEntry) {
      navigate(CustomRoutes.HOME);
    }
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
      
      { mode === EditMode.CreateEntry ? <h2>Create Log Entry</h2> : <h2>Edit Log Entry</h2> }

      <Modal title={modalTitle} content={modalMessage} isHidden={isModalVisible} onClose={hideModal}/>
      <div className="container">
        {displayWeatherData()}
        <h2>{React.useMemo(() => generateRandomMessage(), [])}</h2>
        <MoodSelector currentActiveMood={currentMood} onClick={(mood: Mood | undefined) => setCurrentMood(mood)} />
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
          {mode === EditMode.CreateEntry ? "Add Entry" : "Update Entry"}
        </button>
      </div>
    </div>
  );
};

export default AddLogEntryScreen;
  