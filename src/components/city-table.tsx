import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './city-table.module.css';
import { State, Weather } from '../store/types';
import { actions as weatherActions } from '../store/weather/ducks';

import { getDate, getIcon } from '../utils/utils';

import removeIcon from '../icons/remove.svg';
import { ReactComponent as Loader } from '../ui-components/icons/loader-oval.svg';

const CityLine = ({
  weather,
  closeDrawer,
}: {
  weather: Weather;
  closeDrawer: () => void;
}): React.ReactElement | null => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (weather?.id)
      dispatch(weatherActions.fetchWeatherCityStart({ cityId: weather?.id }));
  }, [weather?.id]);

  if (weather === undefined || weather.weatherInfo === undefined) return null;

  const { icon, description } = weather.weatherInfo.weather[0];
  const iconUrl = getIcon(icon);
  const dateString = getDate(weather.weatherInfo.dt);
  const isLoading = weather.loadingState.isLoading;

  const handleClick = () => {
    dispatch(weatherActions.setCurrentCity({ cityId: weather.id }));
    closeDrawer();
  };

  const handleRemoveClick = (event: React.SyntheticEvent) => {
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();
    dispatch(weatherActions.removeCity({ cityId: weather.id }));
  };

  return (
    <div className={styles.cityLine} onClick={handleClick}>
      <div className={styles.name}> {weather.weatherInfo.name}</div>
      <div className={styles.temp}>
        {' '}
        {Math.round(weather.weatherInfo.main.temp)}°
      </div>
      <div className={styles.image}>
        <img src={iconUrl} alt={description} />
      </div>

      <div className={styles.date}>{dateString}</div>
      <Loader
        className={`${styles.loader} ${isLoading ? styles.loaderVisible : ''}`}
      />
      <div className={styles.imageRemove} onClick={handleRemoveClick}>
        <img src={removeIcon} alt={description} />
      </div>
    </div>
  );
};

export const CitiesTable = ({
  closeDrawer,
}: {
  closeDrawer: () => void;
}): React.ReactElement => {
  const weatherList: Weather[] = useSelector(
    (state: State) => state.weatherList.weatherList,
  );
  return (
    <div className={styles.table}>
      {weatherList.map((el) => (
        <CityLine key={el.id} weather={el} closeDrawer={closeDrawer} />
      ))}
    </div>
  );
};
