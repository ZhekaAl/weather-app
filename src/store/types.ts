export interface Action<P = any> {
  type: string;
  payload?: P;
}

export interface CityInner {
  id: number;
  name: string;
  rusName: string;
  state: string;
  country: string;
  coord: {
    lon: number;
    lat: number;
  };
}
export type City = CityInner | undefined;

export interface WeatherInner {
  coord: {
    lon: number;
    lat: number;
  };
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;

  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
  };
  rain: {
    '1h': number;
  };
  snow: {
    '1h': number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

export type Weather = WeatherInner | undefined;

export enum ACTION_TYPES {
  FETCH_CITIES_START = 'FETCH_CITIES_START',
  FETCH_CITIES_SUCCESS = 'FETCH_CITIES_SUCCESS',
  FETCH_CITIES_ERROR = 'FETCH_CITIES_ERROR',

  SET_CURRENT_CITY = 'SET_CURRENT_CITY',

  FETCH_WEATHER_CITY_START = 'FETCH_WEATHER_CITY_START',
  FETCH_WEATHER_CITY_SUCCESS = 'FETCH_WEATHER_CITY_SUCCESS',
  FETCH_WEATHER_CITY_ERROR = 'FETCH_WEATHER_CITY_ERROR',
}

export interface StateCities {
  citiesRu: Array<City>;
  current: number | undefined;
  errorMessage: string;
  isLoading: boolean;
}

export interface StateCurrent {
  weather: Weather;
  cityId: number | undefined;
  errorMessage: string;
  isLoading: boolean;
}

export interface State {
  cities: StateCities;
  current: StateCurrent;
}
