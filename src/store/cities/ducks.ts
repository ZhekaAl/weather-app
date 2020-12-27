import { createSlice } from '@reduxjs/toolkit';

import { StateCities, PayloadCities } from '../types';

export const initialState: StateCities = {
  citiesRu: [],
  isLoading: false,
  errorMessage: '',
};

const fetchCitiesStart = (state: StateCities): StateCities => ({
  ...state,
  isLoading: true,
  errorMessage: '',
});

const fetchCitiesSuccess = (
  state: StateCities,
  { payload }: { payload: PayloadCities },
): StateCities => ({
  citiesRu: payload,
  errorMessage: '',
  isLoading: false,
});

const fetchCitiesError = (
  state: StateCities,
  { payload }: { payload: string },
): StateCities => ({
  citiesRu: [],
  errorMessage: payload,
  isLoading: false,
});

const citiesSlice = createSlice({
  name: 'cities',
  initialState,
  reducers: {
    fetchCitiesStart,
    fetchCitiesSuccess,
    fetchCitiesError,
  },
});

export const citiesReducer = citiesSlice.reducer;

export const actions = {
  ...citiesSlice.actions,
};
