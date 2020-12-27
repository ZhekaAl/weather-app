import React from 'react';
import { useSelector } from 'react-redux';

import { getTime, getDate, getPressure, getIcon } from '../utils';
import { getCity } from '../store/selectors';
import { State, City, Weather } from '../store/types';

import styles from './city-weather.module.css';
import { HourlyForecast } from './hourly-forecast';

import { ReactComponent as Sunrise } from '../icons/sunrise.svg';
import { ReactComponent as Sunset } from '../icons/sunset.svg';
import { ReactComponent as Windsock } from '../icons/windsock.svg';
import { ReactComponent as Humidity } from '../icons/humidity.svg';
import { ReactComponent as Pressure } from '../icons/pressure.svg';
import { ReactComponent as FeelsLike } from '../icons/temperature-feels-like.svg';
import { ReactComponent as TempMax } from '../icons/thermometer-max.svg';
import { ReactComponent as TempMin } from '../icons/thermometer-min.svg';

export default function CityWeather(): React.ReactElement | null {
  const city: City = useSelector((state: State) => getCity(state));
  const weather: Weather | undefined = useSelector((state: State) =>
    state.weatherList.weatherList.find((el) => el.id === city?.id),
  );

  if (weather === undefined || weather.weatherInfo === undefined) return null;

  const { icon, description } = weather.weatherInfo.weather[0];

  const dateString = getDate(weather.weatherInfo.dt);

  const sunrise = getTime(weather.weatherInfo.sys.sunrise);
  const sunset = getTime(weather.weatherInfo.sys.sunset);

  const pressureString = getPressure(weather.weatherInfo.main.pressure);
  const iconUrl = getIcon(icon);

  return (
    <div className={styles.weather}>
      <div className={styles.city}>{city && city.rusName}</div>

      <div className={styles.weatherInfo}>
        <div className={styles.left}>
          <div className={styles.row}>
            <div className={styles.temp}>
              {`${Math.round(weather.weatherInfo.main.temp)}°`}
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
                  {Math.round(weather.weatherInfo.main.feels_like)}°
                </div>
              </div>
              <div className={styles.rowInfo}>
                <TempMax className={styles.iconInfo} />
                <div className={styles.textInfo}>
                  {Math.round(weather.weatherInfo.main.temp_max)}°
                </div>
              </div>
              <div className={styles.rowInfo}>
                <TempMin className={styles.iconInfo} />
                <div className={styles.textInfo}>
                  {Math.round(weather.weatherInfo.main.temp_min)}°
                </div>
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.rowInfo}>
                <Humidity className={styles.iconInfo} />
                <div className={styles.textInfo}>
                  {weather.weatherInfo.main.humidity}%,{' '}
                </div>
              </div>
              <div className={styles.rowInfo}>
                <Windsock className={styles.iconInfo} />
                <div className={styles.textInfo}>
                  {weather.weatherInfo.wind.speed}м/с
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
          <div className={styles.timeInfo}>{dateString}</div>
        </div>
      </div>

      <HourlyForecast hourlyForecast={weather?.forecast?.hourly || []} />
    </div>
  );
}
