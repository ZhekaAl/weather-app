import { createSlice } from '@reduxjs/toolkit';

import {
  StateWeatherList,
  getIsLoadingState,
  getSuccesLoadedState,
  getErrorLoadedState,
  Weather,
  WeatherInner,
  PayloadCityId,
  PayloadError,
  PayloadForecast,
} from '../types';

const initialState: StateWeatherList = {
  weatherList: [],
  cityId: undefined,
};
interface WeatherReducer<T> {
  (state: StateWeatherList, { payload }: { payload: T }): StateWeatherList;
}

const fetchWeatherCityStart: WeatherReducer<PayloadCityId> = (
  state,
  { payload },
) => {
  let newCity = true;

  // if (!isPayloadCityId(payload)) return state;
  const newEl: Weather = {
    loadingState: getIsLoadingState(),
    weatherInfo: undefined,
    id: payload.cityId,
  };
  const newState = {
    ...state,
    weatherList: state.weatherList.map((el) => {
      if (el.id === payload.cityId) {
        newCity = false;
        return newEl;
      }
      return el;
    }),
    cityId: state.cityId || payload.cityId,
  };

  if (newCity) {
    newState.weatherList.push(newEl);
  }
  return newState;
};

const fetchWeatherCitySuccess: WeatherReducer<WeatherInner> = (
  state,
  { payload },
) => {
  const newEl = {
    loadingState: getSuccesLoadedState(),
    weatherInfo: payload,
    id: payload.id,
  };

  return {
    ...state,
    weatherList: state.weatherList.map((el) => {
      if (el.id === payload.id) {
        return newEl;
      }
      return el;
    }),
  };
};

const fetchWeatherCityError: WeatherReducer<PayloadError> = (
  state,
  { payload },
) => {
  const newEl = {
    loadingState: getErrorLoadedState(payload.error), //TO DO

    weatherInfo: undefined,
    id: payload.cityId,
  };

  return {
    ...state,
    weatherList: state.weatherList.map((el) => {
      if (el.id === payload.cityId) {
        return newEl;
      }
      return el;
    }),
  };
};

const fetchForecastCitySuccess: WeatherReducer<PayloadForecast> = (
  state,
  { payload },
) => ({
  ...state,
  weatherList: state.weatherList.map((el) => {
    if (el.id === payload.cityId) {
      return {
        ...el,
        forecast: payload.forecast,
      };
    }
    return el;
  }),
});

const setCurrentCity: WeatherReducer<PayloadCityId> = (state, { payload }) => ({
  ...state,
  cityId: payload.cityId,
});

const removeCity: WeatherReducer<PayloadCityId> = (state, { payload }) => {
  const newWeatherList = state.weatherList.filter(
    (el) => el.id !== payload.cityId,
  );
  let newCityId = state.cityId;
  if (newCityId === payload.cityId) {
    newCityId = newWeatherList.length > 0 ? newWeatherList[0].id : undefined;
  }
  return {
    ...state,
    weatherList: newWeatherList,
    cityId: newCityId,
  };
};

const citiesSlice = createSlice({
  name: 'weatherList',
  initialState,
  reducers: {
    fetchWeatherCityStart,
    fetchWeatherCitySuccess,
    fetchWeatherCityError,
    setCurrentCity,
    removeCity,
    fetchForecastCitySuccess,
  },
});

export const weatherReducer = citiesSlice.reducer;

export const actions = {
  ...citiesSlice.actions,
};
