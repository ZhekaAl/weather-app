import { useContext } from 'react';

import { useQuery, UseQueryResult } from 'react-query';

import { СitiesContext } from '../store/cities/cities-provider';

import { CityInner, Coord, Forecast, WeatherInner } from '../store/types';

import {
  fetchCitiesFunc,
  fetchForecastCityApi,
  fetchWeatherCityApi,
} from '../api/api';

type WeatherCache = {
  city?: CityInner;
  queryWeatherCity: UseQueryResult<WeatherInner, unknown>;
  queryForecastCity: UseQueryResult<Forecast, unknown>;
};

export function useCurrentWeather(): WeatherCache {
  const { currentCity } = useContext(СitiesContext);

  const queryCities = useQuery('cities', fetchCitiesFunc);
  const citiesRu = queryCities.data || [];

  const city = citiesRu.find((city) => {
    if (city === undefined) return false;
    const { id: elId } = city;
    if (currentCity === elId) return true;
    return false;
  });

  const { id: weatherId } = city ?? {};

  const queryWeatherCity = useQuery(
    ['weatherCity', weatherId],
    () => fetchWeatherCityApi(weatherId as number),
    { enabled: !!weatherId },
  );

  const { coord } = queryWeatherCity.data ?? {};

  const queryForecastCity = useQuery(
    ['forecastCity', coord],
    () => fetchForecastCityApi(coord as Coord),
    { enabled: !!coord },
  );

  return {
    city,
    queryWeatherCity,
    queryForecastCity,
  };
}
