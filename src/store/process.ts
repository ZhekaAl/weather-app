import { SagaIterator } from 'redux-saga';
import { takeEvery, all } from 'redux-saga/effects';
import { fetchCities } from './cities/sagas';
import { actions as actionsCities } from './cities/ducks';

import { fetchWeather } from './weather/sagas';
import { actions as actionsWeather } from './weather/ducks';

export function* sagas(): SagaIterator<void> {
  yield all([takeEvery(actionsCities.fetchCitiesStart, fetchCities)]);
  yield all([takeEvery(actionsWeather.fetchWeatherCityStart, fetchWeather)]);
}
