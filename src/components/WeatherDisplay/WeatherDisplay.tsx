interface WeatherDisplayProps {
    locationName: string;
    temperature: number;
    description: string;
    iconId: string;
}

const WeatherDisplay : React.FC<WeatherDisplayProps> = (props) => {
    const { locationName, temperature, iconId, description } = props;

    return <div className="weatherDetails">
        <span id="locationName">{locationName}</span>
        <span id="temperature">{temperature}&deg;C</span>
        <img id="weatherIcon" data-iconid={iconId} src={`https://openweathermap.org/img/wn/${iconId}@2x.png`} alt={description} />
    </div>
}

export default WeatherDisplay;