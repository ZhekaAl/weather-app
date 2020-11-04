//export const fetchCities
import { ACTION_TYPES } from './types';
import { takeEvery, all, call, put } from 'redux-saga/effects';

// export const valuesActions = {
//   getCities: () => ({ type: ACTION_TYPES.FETCH_CITIES_START }),
//   setCities: (payload: Array<City>) => ({
//     type: ACTION_TYPES.FETCH_CITIES_SUCCESS,
//     payload,
//   }),
//   setCitiesError: (payload: string) => ({
//     type: ACTION_TYPES.FETCH_CITIES_ERROR,
//     payload,
//   }),

//   setCurrentCity: (cityId: number) => ({
//     type: ACTION_TYPES.SET_CURRENT_CITY,
//     cityId,
//   }),

//   requestWeather: (cityId: number) => ({
//     type: ACTION_TYPES.FETCH_WEATHER_CITY_START,
//     cityId,
//   }),
// };

// interface State {
//   [FIELD: string]: any;
// }

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
        `https://api.openweathermap.org/data/2.5/weather?id=${id}&lang=ru&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`,
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
