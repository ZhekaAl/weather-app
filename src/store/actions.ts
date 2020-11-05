//export const fetchCities
import { ACTION_TYPES, PayloadCityId } from './types';
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

const fetchCitiesFunc = () =>
  fetch('./cities-ru.json').then((response) => response.json());

export function* fetchCities(): Generator<unknown, void, unknown> {
  const data = yield call(
    //() => fetch('./cities-ru.json').then((response) => response.json()),
    fetchCitiesFunc,
  );
  yield put({ type: ACTION_TYPES.FETCH_CITIES_SUCCESS, payload: data });
}

export function* fetchWeather(action: {
  type: ACTION_TYPES.FETCH_WEATHER_CITY_START;
  payload: PayloadCityId;
}): Generator<unknown, void, unknown> {
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

export function* sagas(): Generator<unknown, void, unknown> {
  yield all([takeEvery(ACTION_TYPES.FETCH_CITIES_START, fetchCities)]);
  yield all([takeEvery(ACTION_TYPES.FETCH_WEATHER_CITY_START, fetchWeather)]);
}
