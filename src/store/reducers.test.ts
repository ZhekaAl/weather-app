import { ACTION_TYPES, StateCities, PayloadCities } from './types';

import { initialStateCities, citiesReducer } from './reducers';
describe('cities reducer', () => {
  it('start loading cities', () => {
    const action = {
      type: ACTION_TYPES.FETCH_CITIES_START,
    };

    const expectedState: StateCities = {
      ...initialStateCities,
      isLoading: true,
    };

    const state = citiesReducer(undefined, action);

    expect(state).toEqual(expectedState);
  });

  it('fetch empty', () => {
    const action = {
      type: ACTION_TYPES.FETCH_CITIES_SUCCESS,
    };

    const expectedState: StateCities = {
      ...initialStateCities,
    };

    const state = citiesReducer(undefined, action);

    expect(state).toEqual(expectedState);
  });

  it('fetch cities', () => {
    const payload: PayloadCities = [
      {
        id: 1,
        name: 'name',
        rusName: 'rusName',
        state: 'state',
        country: 'country',
        coord: { lon: 1, lat: 1 },
      },
    ];
    const action = {
      type: ACTION_TYPES.FETCH_CITIES_SUCCESS,
      payload,
    };

    const expectedState: StateCities = {
      ...initialStateCities,
      citiesRu: payload,
    };

    const state = citiesReducer(undefined, action);

    expect(state).toEqual(expectedState);
  });
});
