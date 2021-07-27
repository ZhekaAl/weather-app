export interface Action<P> {
  type: string;
  payload?: P;
}

export type CitiesState = {
  currentCity: number;
  citiesList: number[];
};

interface LoadingState {
  errorMessage: string;
  isLoading: boolean;
  isLoaded: boolean;
}
export const getInitialLoadingState: () => LoadingState = () => {
  const state = {
    errorMessage: '',
    isLoading: false,
    isLoaded: false,
  };
  return state;
};

export const getIsLoadingState: () => LoadingState = () => {
  const state = {
    errorMessage: '',
    isLoading: true,
    isLoaded: false,
  };
  return state;
};

export const getSuccesLoadedState: () => LoadingState = () => {
  const state = {
    errorMessage: '',
    isLoading: false,
    isLoaded: true,
  };
  return state;
};

export const getErrorLoadedState: (error: string) => LoadingState = (error) => {
  const state = {
    errorMessage: error,
    isLoading: false,
    isLoaded: true,
  };
  return state;
};

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
export type City = CityInner;

export interface Coord {
  lon: number;
  lat: number;
}

export interface WeatherDescription {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface WeatherInner {
  coord: Coord;
  weather: WeatherDescription[];

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

export interface Hourly {
  dt: number;
  temp: number;
  feels_like: number;
  pressure: number;
  humidity: number;
  dew_point: number;
  uvi: number;
  clouds: number;
  visibility: number;
  wind_speed: number;
  wind_deg: number;
  weather: WeatherDescription[];
  pop: number;
}

export interface Daily {
  dt: number;
  sunrise: number;
  sunset: number;
  temp: {
    day: number;
    min: number;
    max: number;
    night: number;
    eve: number;
    morn: number;
  };
  feels_like: {
    day: number;
    night: number;
    eve: number;
    morn: number;
  };
  pressure: number;
  humidity: number;
  dew_point: number;
  wind_speed: number;
  wind_deg: number;
  weather: WeatherDescription[];
  clouds: number;
  pop: number;
  uvi: number;
}

export interface Alert {
  sender_name: string;
  event: string;
  start: number;
  end: number;
  description: string;
}

export interface Forecast {
  lat: number;
  lon: number;
  timezone: string;
  timezone_offset: number;
  hourly: Hourly[];
  daily: Daily[];
  alerts: Alert[];
}

export interface StatisticsItem {
  _id: string; //date 2021-05-20
  daily: Daily[];
  dt: number; //time in second
}

export type Statistics = StatisticsItem[];

export interface Weather {
  loadingState: LoadingState;
  weatherInfo?: WeatherInner;
  forecast?: Forecast;
  id: number;
}

export interface StateCities {
  citiesRu: City[];
  errorMessage: string;
  isLoading: boolean;
}

export interface StateWeatherList {
  weatherList: Weather[];
  cityId?: number;
}

export interface State {
  cities: StateCities;
  weatherList: StateWeatherList;
}

export interface PayloadCityId {
  cityId: number;
}
export type PayloadCities = City[];

export type PayloadError = { cityId: number; error: string };

export interface PayloadForecast {
  cityId: number;
  forecast: Forecast;
}

// TO DO
export type AllPayloads =
  | PayloadCityId
  | PayloadCities
  | PayloadError
  | WeatherInner
  | undefined;
// export type CheckTypeFunction = (obj: AllPayloads) => boolean;

export const isPayloadCityId = (
  payload: AllPayloads,
): payload is PayloadCityId => {
  let res = false;
  if (payload !== undefined && 'cityId' in payload && !('error' in payload)) {
    res = true;
  }

  return res;
};

export const isPayloadError = (
  payload: AllPayloads,
): payload is PayloadError => {
  let res = false;
  if (payload !== undefined && 'cityId' in payload && 'error' in payload) {
    res = true;
  }

  return res;
};

export const isPayloadCities = (
  payload: AllPayloads,
): payload is PayloadCities => {
  let res = false;
  if (
    payload !== undefined &&
    Array.isArray(payload) &&
    (payload.length === 0 ||
      payload[0] === undefined ||
      'rusName' in payload[0])
  ) {
    res = true;
  }

  return res;
};

export const isPayloadWeatherInner = (
  payload: AllPayloads,
): payload is WeatherInner => {
  let res = false;
  if (payload !== undefined && 'id' in payload && 'weather' in payload) {
    res = true;
  }

  return res;
};
