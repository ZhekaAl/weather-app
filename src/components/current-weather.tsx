import React from 'react';
import styles from './city-weather.module.css';

import { useCurrentWeather } from '../hooks/use-current-weather';
import {
  getIcon,
  getHoursBetween,
  getPressure,
  getTime,
  getWindDirection,
} from '../utils/utils';

import { LoadingInfo } from './loading-info';

import { ReactComponent as Sunrise } from '../icons/sunrise.svg';
import { ReactComponent as Sunset } from '../icons/sunset.svg';
import { ReactComponent as DayLight } from '../icons/daylight.svg';
import { ReactComponent as UVI } from '../icons/ultraviolet.svg';
import { ReactComponent as Windsock } from '../icons/windsock.svg';
import { ReactComponent as Humidity } from '../icons/humidity.svg';
import { ReactComponent as Pressure } from '../icons/pressure.svg';
import { ReactComponent as FeelsLike } from '../icons/temperature-feels-like.svg';
import { ReactComponent as TempMax } from '../icons/thermometer-max.svg';
import { ReactComponent as TempMin } from '../icons/thermometer-min.svg';
import { ReactComponent as Loader } from '../ui-components/icons/loader-oval.svg';

export default function CurrentWeather(): React.ReactElement | null {
  const { queryWeatherCity, queryForecastCity } = useCurrentWeather();

  const { isFetching, isLoading, isIdle, data: weather } = queryWeatherCity;

  const { data: forecast } = queryForecastCity;

  const uvi = forecast?.hourly?.[0]?.uvi ?? '-';

  if (isIdle) return <LoadingInfo text="Ожидание загрузки данных погоды" />;
  if (isLoading) return <LoadingInfo text="Загружаются данные погоды" />;
  if (!weather) return null;

  const {
    dt,
    main: { feels_like, temp, temp_max, temp_min, humidity, pressure },
    sys: { sunrise, sunset },
    wind,
    weather: weatherArr,
  } = weather;

  const { icon, description } = weatherArr[0];

  const dateString = getTime(dt);

  const sunriseText = getTime(sunrise);
  const sunsetText = getTime(sunset);

  const dayLightHours = getHoursBetween(sunrise, sunset);

  const pressureText = getPressure(pressure);

  const windDirection = getWindDirection(wind.deg);
  const windText = `${Math.round(wind.speed)}м/с, ${windDirection}`;
  const iconUrl = getIcon(icon);
  return (
    <div className={styles.weatherInfo}>
      <div className={styles.left}>
        <div className={styles.headerRow}>
          <div className={styles.temp}>{`${Math.round(temp)}°`}</div>
          <div className={styles.image}>
            <img src={iconUrl} alt={description} />
          </div>
        </div>
        <div className={styles.description}>
          <div className={styles.row}>
            <div className={styles.rowInfo}>
              <FeelsLike className={styles.iconInfo} />
              <div className={styles.textInfo}>{Math.round(feels_like)}°</div>
            </div>
            <div className={styles.rowInfo}>
              <TempMax className={styles.iconInfo} />
              <div className={styles.textInfo}>{Math.round(temp_max)}°</div>
            </div>
            <div className={styles.rowInfo}>
              <TempMin className={styles.iconInfo} />
              <div className={styles.textInfo}>{Math.round(temp_min)}°</div>
            </div>
            <div className={styles.rowInfo}>
              <UVI className={styles.iconInfo} />
              <div className={styles.textInfo}>{uvi}</div>
            </div>

            <div className={styles.rowInfo}>
              <Humidity className={styles.iconInfo} />
              <div className={styles.textInfo}>{humidity}%, </div>
            </div>
            <div className={styles.rowInfo}>
              <Windsock className={styles.iconInfo} />
              <div className={styles.textInfo}>{windText}</div>
            </div>
            <div className={styles.rowInfo}>
              <Pressure className={styles.iconInfo} />
              <div className={styles.textInfo}>{pressureText}</div>
            </div>
            <div className={styles.rowInfo}>
              <Sunrise className={styles.iconInfo} />
              <div className={styles.textInfo}>{sunriseText}</div>
            </div>
            <div className={styles.rowInfo}>
              <Sunset className={styles.iconInfo} />
              <div className={styles.textInfo}>{sunsetText}</div>
            </div>
            <div className={styles.rowInfo}>
              <DayLight className={styles.iconInfo} />
              <div className={styles.textInfo}>{dayLightHours}</div>
            </div>
          </div>
        </div>
        <div className={styles.refreshRow}>
          <div className={styles.timeInfo}>Обновлено: {dateString}</div>
          {isFetching && <Loader className={styles.loader} />}
        </div>
      </div>
    </div>
  );
}
