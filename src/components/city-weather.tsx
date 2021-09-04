import React, { useContext, useEffect } from 'react';

import { СitiesContext } from '../store/cities/cities-provider';

import styles from './city-weather.module.css';
import { Forecast } from './forecast/forecast';
import CurrentWeather from './current-weather';
import { useCurrentWeather } from '../hooks/use-current-weather';

export default function CityWeather({
  showLeftMenu,
}: {
  showLeftMenu: () => void;
}): React.ReactElement | null {
  const { currentCity } = useContext(СitiesContext);

  useEffect(() => {
    if (currentCity === -1) {
      showLeftMenu();
    }
  }, [currentCity, showLeftMenu]);

  const { city } = useCurrentWeather();

  return (
    <div className={styles.weather}>
      {currentCity === -1 && (
        <div className={styles.chooseCity}> Выберите город </div>
      )}
      {currentCity > 0 && (
        <>
          <div className={styles.city}>{city?.rusName}</div>
          <CurrentWeather />
          <Forecast />
        </>
      )}
    </div>
  );
}
