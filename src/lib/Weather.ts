interface WeatherDataParams {
    name: string,
    main: {
        feels_like: number;
        humidity: number;
        pressure: number;
        temp: number;
        temp_max: number;
        temp_min: number;
    },
    weather : {
        description: string;
        icon: string;
        main: string;
    }
}

export class WeatherData {
    public name: string;
    public main: {
        feels_like: number;
        humidity: number;
        pressure: number;
        temp: number;
        temp_max: number;
        temp_min: number;
    };
    public weather : {
        description: string;
        icon: string;
        main: string;
    };
    constructor(config: WeatherDataParams) {
        this.name = config.name;
        this.main = config.main;
        this.weather = config.weather;
    }
}

export class WeatherError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'WeatherError';
    }
}

export default class Weather {
    public static fromLatLon(lat: number, lon: number) : Promise<WeatherError | WeatherData> {
        return new Promise((resolve, reject) => {
            const WEATHER_API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

            if(!WEATHER_API_KEY) {
                reject(new WeatherError("No weather API key provided"));
            }
            
            const WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`;
            
            fetch(WEATHER_API_URL)
            .then(res => res.json())
            .then(data => {
                const parsedData = {
                    name: data.name,
                    main: data.main,
                    weather: data.weather[0]
                } as WeatherDataParams;

                resolve(new WeatherData(parsedData));
            })
            .catch(err => reject(new WeatherError(err)));
        })
    }
}