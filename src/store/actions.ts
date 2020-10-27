//export const fetchCities
import { Action, ACTION_TYPES, StateCities, StateCurrent, City } from './types';
import { takeEvery, all, call, put } from 'redux-saga/effects';
// export interface Action<P = any> {
//   type: string;
//   payload?: P;
// }
// export interface City {
//   id: number;
//   name: string;
//   state: string;
//   country: string;
//   coord: {
//     lon: number;
//     lat: number;
//   };
// }

// export enum ACTION_TYPES {
//   FETCH_CITIES_START = "FETCH_CITIES_START",
//   FETCH_CITIES_SUCCESS = "FETCH_CITIES_SUCCESS",
//   FETCH_CITIES_ERROR = "FETCH_CITIES_ERROR",
// }

export const valuesActions = {
  getCities: () => ({ type: ACTION_TYPES.FETCH_CITIES_START }),
  setCities: (payload: Array<City>) => ({
    type: ACTION_TYPES.FETCH_CITIES_SUCCESS,
    payload,
  }),
  setCitiesError: (payload: string) => ({
    type: ACTION_TYPES.FETCH_CITIES_ERROR,
    payload,
  }),

  setCurrentCity: (cityId: number) => ({
    type: ACTION_TYPES.SET_CURRENT_CITY,
    cityId,
  }),

  requestWeather: (cityId: number) => ({
    type: ACTION_TYPES.FETCH_WEATHER_CITY_START,
    cityId,
  }),
};

// interface State {
//   [FIELD: string]: any;
// }

const initialStateCities: StateCities = {
  citiesRu: [],
  current: undefined,
  isLoading: false,
  errorMessage: '',
};

const initialStateCurrent: StateCurrent = {
  weather: undefined,
  cityId: undefined,
  isLoading: false,
  errorMessage: '',
};

export function citiesReducer(
  state: StateCities = initialStateCities,
  { type, payload }: Action,
) {
  switch (type) {
    case ACTION_TYPES.FETCH_CITIES_START:
      return {
        ...state,
        errorMessage: '',
        isLoading: true,
      };
    case ACTION_TYPES.FETCH_CITIES_SUCCESS:
      return {
        ...state,
        citiesRu: payload,
        errorMessage: '',
        isLoading: false,
      };
    case ACTION_TYPES.FETCH_CITIES_ERROR:
      return {
        ...state,
        citiesRu: [],
        errorMessage: payload,
        isLoading: false,
      };
    case ACTION_TYPES.SET_CURRENT_CITY:
      return {
        ...state,
        current: payload,
      };

    default:
      return state;
  }
}

export function currentReducer(
  state: StateCurrent = initialStateCurrent,
  { type, payload }: Action,
) {
  switch (type) {
    case ACTION_TYPES.FETCH_WEATHER_CITY_START:
      return {
        ...state,
        weather: undefined,
        cityId: payload.cityId,
        errorMessage: '',
        isLoading: true,
      };
    case ACTION_TYPES.FETCH_WEATHER_CITY_SUCCESS:
      return {
        ...state,
        weather: payload,
        errorMessage: '',
        isLoading: false,
      };
    case ACTION_TYPES.FETCH_WEATHER_CITY_ERROR:
      return {
        ...state,
        weather: undefined,
        errorMessage: payload,
        isLoading: false,
      };

    default:
      return state;
  }
}

export function* fetchCities() {
  const data = yield call(
    () => fetch('./cities-ru.json').then((response) => response.json()),
    // .then((myJson) => myJson)
  );
  yield put({ type: ACTION_TYPES.FETCH_CITIES_SUCCESS, payload: data });
}

export function* fetchWeather(action: {
  type: ACTION_TYPES.FETCH_WEATHER_CITY_START;
  payload: { cityId: number };
}) {
  console.log({ action });
  const data = yield call(
    (id: number) =>
      fetch(
        `http://api.openweathermap.org/data/2.5/weather?id=${id}&lang=ru&appid=c43f3e82c4f5066edcb6b2e2a4e6dbd3&units=metric`,
      ).then((response) => response.json()),
    action.payload.cityId,
    // .then((myJson) => myJson)
  );
  yield put({ type: ACTION_TYPES.FETCH_WEATHER_CITY_SUCCESS, payload: data });
}

export function* sagas() {
  yield all([takeEvery(ACTION_TYPES.FETCH_CITIES_START, fetchCities)]);
  yield all([takeEvery(ACTION_TYPES.FETCH_WEATHER_CITY_START, fetchWeather)]);
}
