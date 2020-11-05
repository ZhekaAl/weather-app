export interface Action<P> {
  type: string;
  payload?: P;
}

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

export interface Weather {
  loadingState: LoadingState;
  weatherInfo: WeatherInner | undefined;
  id: number;
}

export enum ACTION_TYPES {
  FETCH_CITIES_START = 'FETCH_CITIES_START',
  FETCH_CITIES_SUCCESS = 'FETCH_CITIES_SUCCESS',
  FETCH_CITIES_ERROR = 'FETCH_CITIES_ERROR',

  SET_CURRENT_CITY = 'SET_CURRENT_CITY',

  FETCH_WEATHER_CITY_START = 'FETCH_WEATHER_CITY_START',
  FETCH_WEATHER_CITY_SUCCESS = 'FETCH_WEATHER_CITY_SUCCESS',
  FETCH_WEATHER_CITY_ERROR = 'FETCH_WEATHER_CITY_ERROR',

  REMOVE_CITY = 'REMOVE_CITY',
}

export interface StateCities {
  citiesRu: City[];
  errorMessage: string;
  isLoading: boolean;
}

export interface StateWeatherList {
  weatherList: Weather[];
  cityId: number | undefined;
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
