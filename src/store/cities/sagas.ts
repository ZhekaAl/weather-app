import { SagaIterator } from 'redux-saga';
import { call, put } from 'redux-saga/effects';

import { PayloadCities } from '../types';
import { http } from '../../utils/http';

import { actions } from './ducks';

export const fetchCitiesFunc = (): Promise<PayloadCities> =>
  http<PayloadCities>('./cities-ru.json');

export function* fetchCities(): SagaIterator {
  const data = yield call(fetchCitiesFunc);
  yield put(actions.fetchCitiesSuccess(data));
}
