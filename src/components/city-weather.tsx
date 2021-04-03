import React from 'react';
import { useSelector } from 'react-redux';

import { useQuery } from 'react-query';

import { getTime, getDate, getPressure, getIcon } from '../utils/utils';
import { getCityId } from '../store/selectors';
import { Coord } from '../store/types';

import {
  fetchCitiesFunc,
  fetchForecastCityApi,
  fetchWeatherCityApi,
} from '../api/api';

import styles from './city-weather.module.css';
import { HourlyForecast } from './hourly-forecast';
import { DailyForecast } from './daily-forecast';

import { ReactComponent as Sunrise } from '../icons/sunrise.svg';
import { ReactComponent as Sunset } from '../icons/sunset.svg';
import { ReactComponent as Windsock } from '../icons/windsock.svg';
import { ReactComponent as Humidity } from '../icons/humidity.svg';
import { ReactComponent as Pressure } from '../icons/pressure.svg';
import { ReactComponent as FeelsLike } from '../icons/temperature-feels-like.svg';
import { ReactComponent as TempMax } from '../icons/thermometer-max.svg';
import { ReactComponent as TempMin } from '../icons/thermometer-min.svg';

import { ReactComponent as Loader } from '../ui-components/icons/loader-oval.svg';

export default function CityWeather(): React.ReactElement | null {
  const cityId = useSelector(getCityId);

  const queryCities = useQuery('cities', fetchCitiesFunc);
  const citiesRu = queryCities.data || [];

  const city = citiesRu.find((city) => {
    if (city === undefined) return false;
    const { id: elId } = city;
    if (cityId === elId) return true;
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

  const { icon, description } = weather.weather[0];

  const dateString = getDate(weather.dt);

  // const isLoading = weather.loadingState.isLoading;

  const sunrise = getTime(weather.sys.sunrise);
  const sunset = getTime(weather.sys.sunset);

  const pressureString = getPressure(weather.main.pressure);
  const iconUrl = getIcon(icon);

  return (
    <div className={styles.weather}>
      <div className={styles.city}>{city && city.rusName}</div>
      {/*
       *в отдельный компонент
       */}
      <div className={styles.weatherInfo}>
        <div className={styles.left}>
          <div className={styles.row}>
            <div className={styles.temp}>
              {`${Math.round(weather.main.temp)}°`}
            </div>
            <div className={styles.image}>
              <img src={iconUrl} alt={description} />
            </div>
          </div>
          <div className={styles.description}>
            <div className={styles.row}>
              <div className={styles.rowInfo}>
                <FeelsLike className={styles.iconInfo} />
                <div className={styles.textInfo}>
                  {Math.round(weather.main.feels_like)}°
                </div>
              </div>
              <div className={styles.rowInfo}>
                <TempMax className={styles.iconInfo} />
                <div className={styles.textInfo}>
                  {Math.round(weather.main.temp_max)}°
                </div>
              </div>
              <div className={styles.rowInfo}>
                <TempMin className={styles.iconInfo} />
                <div className={styles.textInfo}>
                  {Math.round(weather.main.temp_min)}°
                </div>
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.rowInfo}>
                <Humidity className={styles.iconInfo} />
                <div className={styles.textInfo}>
                  {weather.main.humidity}%,{' '}
                </div>
              </div>
              <div className={styles.rowInfo}>
                <Windsock className={styles.iconInfo} />
                <div className={styles.textInfo}>
                  {Math.round(weather.wind.speed)}м/с
                </div>
              </div>
              <div className={styles.rowInfo}>
                <Pressure className={styles.iconInfo} />
                <div className={styles.textInfo}>{pressureString}</div>
              </div>
            </div>

            <div className={styles.row}>
              <div className={styles.rowInfo}>
                <Sunrise className={styles.iconInfo} />
                <div className={styles.textInfo}>{sunrise}</div>
              </div>
              <div className={styles.rowInfo}>
                <Sunset className={styles.iconInfo} />
                <div className={styles.textInfo}>{sunset}</div>
              </div>
            </div>
          </div>
          <div className={styles.refreshRow}>
            <div className={styles.timeInfo}>Обновлено: {dateString}</div>
            {isLoading && <Loader className={styles.loader} />}
          </div>
        </div>
      </div>

      <HourlyForecast hourlyForecast={forecast?.hourly || []} />
      <DailyForecast dailyForecast={forecast?.daily || []} />
    </div>
  );
}
