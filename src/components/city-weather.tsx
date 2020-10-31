import React from 'react';
import { useSelector } from 'react-redux';
import styles from './city-weather.module.css';
import { State, City, Weather } from '../store/types';

import { getCity } from '../store/selectors';

import { getTime, getDate, getPressure, getIcon } from '../utils';

export default function CityWeather(): React.ReactElement | null {
  const city: City = useSelector((state: State) => getCity(state));
  const weather: Weather | undefined = useSelector((state: State) =>
    state.weatherList.weatherList.find((el) => el.id === city?.id),
  );

  if (weather === undefined || weather.weatherInfo === undefined) return null;

  const { icon, description } = weather.weatherInfo.weather[0];
  // const dateString = new Date(weather.dt * 1000).toLocaleString('ru-RU', {
  //   timeZone: 'UTC',
  // });

  const dateString = getDate(weather.weatherInfo.dt);

  // const sunrise = new Date(weather.sys.sunrise * 1000).toLocaleTimeString(
  //   'ru-RU',
  //   {
  //     hour: '2-digit',
  //     minute: '2-digit',
  //   },
  // );

  const sunrise = getTime(weather.weatherInfo.sys.sunrise);
  const sunset = getTime(weather.weatherInfo.sys.sunset);

  // const pressureString = `${Math.round(
  //   weather.main.pressure * 0.750064,
  // )}мм.рт.ст`;
  const pressureString = getPressure(weather.weatherInfo.main.pressure);
  const iconUrl = getIcon(icon);

  return (
    <div className={styles.weather}>
      <div className={styles.city}>{city && city.rusName}</div>

      <div className={styles.weatherInfo}>
        <div className={styles.left}>
          <div className={styles.temp}>
            {/* {weather &&
              `сейчас: ${weather.main.temp}°
              ощущается: ${weather.main.feels_like}°
            днем: ${weather.main.temp_max}
           давление: ${weather.main.pressure}
           влажность: ${weather.main.humidity}%`} */}

            {`${Math.round(weather.weatherInfo.main.temp)}°`}
          </div>
          <div className={styles.description}>
            {weather.weatherInfo.weather[0].description}
            <br />
            ощущается как: {Math.round(weather.weatherInfo.main.feels_like)}°
            <br />
            {weather.weatherInfo.main.humidity}%,{' '}
            {weather.weatherInfo.wind.speed}м/с, {pressureString}
            <br />
            восход: {sunrise}, закат: {sunset}
          </div>
        </div>

        <div className={styles.right}>
          <div className={styles.image}>
            <img
              // src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
              src={iconUrl}
              alt={description}
            />
          </div>
          <div className={styles.dayNight}>
            {`день: ${Math.round(
              weather.weatherInfo.main.temp_max,
            )}°/ ночь: ${Math.round(weather.weatherInfo.main.temp_min)}°`}
          </div>
          <div className={styles.timeInfo}>{dateString}</div>
        </div>
      </div>

      {/* {JSON.stringify(weather)} */}
    </div>
  );
}
