import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
//import * as L from 'leda';
import styles from './city-weather.module.css';
import { ACTION_TYPES, State, City, Weather } from './store/types';

import { getCity } from './store/selectors';

import { getTime } from './utils';

const getTime = (timeInSecond: number): string => {
  return new Date(timeInSecond * 1000).toLocaleTimeString('ru-RU', {
    hour: '2-digit',
    minute: '2-digit',
  });
};

export default function CityWeather(): React.ReactElement | null {
  const city: City = useSelector((state: State) => getCity(state));
  const weather: Weather = useSelector((state: State) => state.current.weather);

  if (weather === undefined) return null;

  const { icon, description } = weather.weather[0];
  const dateString = new Date(weather.dt * 1000).toLocaleString('ru-RU', {
    timeZone: 'UTC',
  });

  // const sunrise = new Date(weather.sys.sunrise * 1000).toLocaleTimeString(
  //   'ru-RU',
  //   {
  //     hour: '2-digit',
  //     minute: '2-digit',
  //   },
  // );

  const sunrise = getTime(weather.sys.sunrise);
  const sunset = getTime(weather.sys.sunset);

  const pressureString = `${Math.round(
    weather.main.pressure * 0.750064,
  )}мм.рт.ст`;

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

            {`${Math.round(weather.main.temp)}°`}
          </div>
          <div className={styles.description}>
            {weather.weather[0].description}
            <br />
            ощущается как: {Math.round(weather.main.feels_like)}°
            <br />
            {weather.main.humidity}%, {weather.wind.speed}м/с, {pressureString}
            <br />
            восход: {sunrise}, закат: {sunset}
          </div>
        </div>

        <div className={styles.right}>
          <div className={styles.image}>
            <img
              src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
              alt={description}
            />
          </div>
          <div className={styles.dayNight}>
            {`день: ${Math.round(weather.main.temp_max)}°/ ночь: ${Math.round(
              weather.main.temp_min,
            )}°`}
          </div>
          <div className={styles.timeInfo}>{dateString}</div>
        </div>
      </div>

      {/* {JSON.stringify(weather)} */}
    </div>
  );
}
