import React from 'react';
import styles from './city-weather.module.css';

import { ReactComponent as Sunrise } from '../icons/sunrise.svg';
import { ReactComponent as Sunset } from '../icons/sunset.svg';
import { ReactComponent as Windsock } from '../icons/windsock.svg';
import { ReactComponent as Humidity } from '../icons/humidity.svg';
import { ReactComponent as Pressure } from '../icons/pressure.svg';
import { ReactComponent as FeelsLike } from '../icons/temperature-feels-like.svg';
import { ReactComponent as TempMax } from '../icons/thermometer-max.svg';
import { ReactComponent as TempMin } from '../icons/thermometer-min.svg';

import { ReactComponent as Loader } from '../ui-components/icons/loader-oval.svg';
import { WeatherInner } from '../store/types';

import {
  getTime,
  getPressure,
  getIcon,
  getWindDirection,
} from '../utils/utils';

type Props = {
  weather: WeatherInner;
  isLoading: boolean;
};

export default function CurrentWeather({
  weather,
  isLoading,
}: Props): React.ReactElement | null {
  const { icon, description } = weather.weather[0];

  const dateString = getTime(weather.dt);

  const sunrise = getTime(weather.sys.sunrise);
  const sunset = getTime(weather.sys.sunset);

  const pressureText = getPressure(weather.main.pressure);

  const windDirection = getWindDirection(weather.wind.deg);
  const windText = `${Math.round(weather.wind.speed)}м/с, ${windDirection}`;
  const iconUrl = getIcon(icon);
  return (
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
              <div className={styles.textInfo}>{weather.main.humidity}%, </div>
            </div>
            <div className={styles.rowInfo}>
              <Windsock className={styles.iconInfo} />
              <div className={styles.textInfo}>{windText}</div>
            </div>
            <div className={styles.rowInfo}>
              <Pressure className={styles.iconInfo} />
              <div className={styles.textInfo}>{pressureText}</div>
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
  );
}
