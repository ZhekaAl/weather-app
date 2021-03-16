import React from 'react';
import styles from './hourly-forecast.module.css';
import { Hourly } from '../store/types';

import { getTime, getTempString, getSimpleIcon } from '../utils/utils';

const HourlyBlock = ({ hourly }: { hourly: Hourly }): React.ReactElement => {
  const { icon, description } = hourly.weather[0];
  const iconUrl = getSimpleIcon(icon);
  const time = getTime(hourly.dt);
  const tempString = getTempString(hourly.temp);
  return (
    <div className={styles.hourlyElem}>
      <div className={styles.time}>{time}</div>
      <div className={styles.image}>
        <img src={iconUrl} alt={description} />
      </div>
      <div className={styles.tempHourly}>{tempString}</div>
    </div>
  );
};

export function HourlyForecast({
  hourlyForecast,
}: {
  hourlyForecast: Hourly[];
}): React.ReactElement {
  return (
    <div className={styles.hourlyForecast}>
      {hourlyForecast.map((el, i) => {
        if (i > 0 && i % 3 === 0)
          return <HourlyBlock key={el.dt} hourly={el} />;
        else return null;
      })}
    </div>
  );
}
