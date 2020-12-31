import React from 'react';
import styles from './daily-forecast.module.css';
import { Daily } from '../store/types';
import { ReactComponent as Sunrise } from '../icons/sunrise.svg';
import { ReactComponent as Sunset } from '../icons/sunset.svg';
import { ReactComponent as Windsock } from '../icons/windsock.svg';
import { ReactComponent as Humidity } from '../icons/humidity.svg';
import { ReactComponent as Pressure } from '../icons/pressure.svg';
import {
  getTime,
  getTempString,
  getIcon,
  getWeekDay,
  getPressure,
  getDayMonth,
} from '../utils';

const Header = (): React.ReactElement => (
  <div className={styles.header}>
    <div className={styles.space}></div>
    <Humidity className={styles.iconInfo} />
    <Windsock className={styles.iconInfo} />
    <Pressure className={styles.iconInfo} />
    <Sunrise className={styles.iconInfo} />
    <Sunset className={styles.iconInfo} />
  </div>
);

const DailyBlock = ({ daily }: { daily: Daily }): React.ReactElement => {
  const { icon, description } = daily.weather[0];
  const iconUrl = getIcon(icon);
  const day = getWeekDay(daily.dt);
  const dayMonth = getDayMonth(daily.dt);
  const tempDay = getTempString(daily.temp.day);
  const tempNight = getTempString(daily.temp.night);
  const sunrise = getTime(daily.sunrise);
  const sunset = getTime(daily.sunset);
  const pressure = getPressure(daily.pressure, false);
  return (
    <div className={styles.dailyElem}>
      <div className={styles.day}>
        <div> {day}</div>
        <div> {dayMonth}</div>
      </div>
      <div className={styles.image}>
        <img src={iconUrl} alt={description} />
      </div>
      <div className={styles.tempInfo}>
        {tempDay}/{tempNight}
      </div>

      <div className={styles.textInfo}>{daily.humidity}%</div>
      <div className={styles.textInfo}>{Math.round(daily.wind_speed)}м/c</div>
      <div className={styles.textInfo}>{pressure}</div>
      <div className={styles.textInfo}>{sunrise}</div>
      <div className={styles.textInfo}>{sunset}</div>
    </div>
  );
};

export function DailyForecast({
  dailyForecast,
}: {
  dailyForecast: Daily[];
}): React.ReactElement {
  const dailyForecastNext = dailyForecast.slice(1) || [];

  return (
    <div className={styles.dailyForecast}>
      <Header />
      {dailyForecastNext.map((el) => {
        return <DailyBlock key={el.dt} daily={el} />;
      })}
    </div>
  );
}
