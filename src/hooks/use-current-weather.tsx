import { useContext } from 'react';

import { useQuery, UseQueryResult } from 'react-query';

import { СitiesContext } from '../store/cities/cities-provider';

import { CityInner, Coord, Forecast, WeatherInner } from '../store/types';

import {
  fetchCitiesFunc,
  fetchForecastCityApi,
  fetchWeatherCityApi,
} from '../api/api';

import { minToMsec } from '../utils/utils';

type WeatherCache = {
  city?: CityInner;
  queryWeatherCity: UseQueryResult<WeatherInner, unknown>;
  queryForecastCity: UseQueryResult<Forecast, unknown>;
};

export function useCurrentWeather(): WeatherCache {
  const { currentCity } = useContext(СitiesContext);

  const queryCities = useQuery('cities', fetchCitiesFunc, {
    refetchOnWindowFocus: false,
    staleTime: minToMsec(1000),
  });
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
    {
      enabled: !!weatherId,
      staleTime: minToMsec(5),
    },
  );

  const { coord } = queryWeatherCity.data ?? {};

  const queryForecastCity = useQuery(
    ['forecastCity', coord],
    () => fetchForecastCityApi(coord as Coord),
    {
      enabled: !!coord,
      staleTime: minToMsec(5),
    },
  );

  return {
    city,
    queryWeatherCity,
    queryForecastCity,
  };
}
