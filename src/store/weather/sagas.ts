import { SagaIterator } from 'redux-saga';
import { call, put } from 'redux-saga/effects';

import { PayloadCityId, WeatherInner, Coord, Forecast } from '../types';
import { http } from '../../utils/http';

import { actions } from './ducks';

const fetchWeatherCityApi = (id: number): Promise<WeatherInner> =>
  http<WeatherInner>(
    `https://api.openweathermap.org/data/2.5/weather?id=${id}&lang=ru&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`,
  );

const fetchForecastCityApi = (coord: Coord): Promise<Forecast> =>
  http<Forecast>(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${coord.lat}&lon=${coord.lon}&exclude=minutely,current&lang=ru&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`,
  );

export function* fetchWeather({
  payload,
}: {
  payload: PayloadCityId;
}): SagaIterator<void> {
  try {
    const data = yield call(fetchWeatherCityApi, payload.cityId);
    yield put(actions.fetchWeatherCitySuccess(data));

    const { coord } = data as WeatherInner;

    const forecast = yield call(fetchForecastCityApi, coord);

    yield put(
      actions.fetchForecastCitySuccess({
        cityId: payload.cityId,
        forecast: forecast,
      }),
    );
  } catch (error) {
    console.error(error);
    yield put(
      actions.fetchWeatherCityError({
        cityId: payload.cityId,
        error: error.toString(),
      }),
    );
  }

  // yield put({ type: ACTION_TYPES.FETCH_WEATHER_CITY_SUCCESS, payload: data });
}
