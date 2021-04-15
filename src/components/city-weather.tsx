import React, { useContext } from 'react';

import { useQuery } from 'react-query';

import { СitiesContext } from '../store/cities/cities-provider';

import { Coord } from '../store/types';

import {
  fetchCitiesFunc,
  fetchForecastCityApi,
  fetchWeatherCityApi,
} from '../api/api';

import styles from './city-weather.module.css';
import { HourlyForecast } from './hourly-forecast';
import { DailyForecast } from './daily-forecast';
import CurrentWeather from './current-weather';
import { Alerts } from './alerts';

export default function CityWeather(): React.ReactElement | null {
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

  const weather = queryWeatherCity.data;

  const forecast = queryForecastCity.data;

  const isLoading =
    queryWeatherCity.isFetching ||
    queryWeatherCity.isLoading ||
    queryForecastCity.isLoading ||
    queryForecastCity.isFetching;

  if (weather === undefined) return null;

  return (
    <div className={styles.weather}>
      <div className={styles.city}>{city && city.rusName}</div>
      <CurrentWeather
        isLoading={isLoading}
        uvi={forecast?.hourly?.[0]?.uvi}
        weather={weather}
      />
      <Alerts alerts={forecast?.alerts ?? []} />
      <HourlyForecast hourlyForecast={forecast?.hourly || []} />
      <DailyForecast dailyForecast={forecast?.daily || []} />
    </div>
  );
}
