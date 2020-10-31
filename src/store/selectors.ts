import { State, City } from './types';

export function getCity(state: State): City {
  if (state.weatherList.cityId === undefined) return undefined;
  const id: number | undefined = state.weatherList.cityId;
  const { citiesRu, errorMessage, isLoading } = state.cities;
  if (!id || errorMessage || isLoading) return undefined;

  const city = citiesRu.find((city) => {
    if (city === undefined) return false;
    const { id: elId } = city;
    console.log(elId);
    // if (elId === 34) return true;
    if (id === elId) return true;
    return false;
  });

  if (!city) return undefined;
  return city;
}

//export function getWeather(state: State)
