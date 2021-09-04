/* eslint-disable @typescript-eslint/no-empty-function */
import React, { createContext } from 'react';

import { useLocalStorage } from '../../hooks/use-localStorage';

import { CitiesState } from '../types';

const citiesStateInitValue: CitiesState = {
  currentCity: -1,
  citiesList: [],
};

type Setter = (id: number) => void;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const emptySetter: Setter = (id) => {};

export type CitiesContextType = {
  cities: CitiesState['citiesList'];
  currentCity: CitiesState['currentCity'];
  addCity: Setter;
  removeCity: Setter;
  setCurrentCity: Setter;
};

const citiesContextInitValue: CitiesContextType = {
  cities: citiesStateInitValue.citiesList,
  currentCity: citiesStateInitValue.currentCity,
  addCity: emptySetter,
  removeCity: emptySetter,
  setCurrentCity: emptySetter,
};

export const СitiesContext = createContext<CitiesContextType>(
  citiesContextInitValue,
);

export const CitiesProvider = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  const [citiesState, setCitiesState] = useLocalStorage<CitiesState>(
    'citiesState',
    citiesStateInitValue,
  );

  const addCity = (id: number) => {
    if (citiesState.citiesList.includes(id)) {
      return;
    }
    setCitiesState(
      (state: CitiesState): CitiesState => ({
        ...state,
        citiesList: [...citiesState.citiesList, id],
      }),
    );
  };

  const removeCity = (id: number) => {
    setCitiesState(
      (state: CitiesState): CitiesState => ({
        citiesList: citiesState.citiesList.filter((cityId) => cityId !== id),
        currentCity:
          state.currentCity === id ? state.citiesList[0] : state.currentCity,
      }),
    );
  };

  const setCurrentCity = (id: number) => {
    setCitiesState(
      (state: CitiesState): CitiesState => ({
        ...state,
        currentCity: id,
      }),
    );
  };

  return (
    <СitiesContext.Provider
      value={{
        currentCity: citiesState.currentCity,
        cities: citiesState.citiesList,
        addCity,
        removeCity,
        setCurrentCity,
      }}
    >
      {children}
    </СitiesContext.Provider>
  );
};
