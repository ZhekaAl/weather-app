import React, { useContext } from 'react';
import { useQuery } from 'react-query';

import { СitiesContext } from '../store/cities/cities-provider';

import styles from './city-table.module.css';

import { fetchWeatherCityApi } from '../api/api';

import { getDate, getIcon } from '../utils/utils';

import removeIcon from '../icons/remove.svg';
import { ReactComponent as Loader } from '../ui-components/icons/loader-oval.svg';

const CityLine = ({
  cityId,
  closeDrawer,
}: {
  cityId: number;
  closeDrawer: () => void;
}): React.ReactElement | null => {
  const { setCurrentCity, removeCity } = useContext(СitiesContext);

  const queryWeatherCity = useQuery(
    ['weatherCity', cityId],
    () => fetchWeatherCityApi(cityId),
    { enabled: !!cityId },
  );

  const weather = queryWeatherCity.data;

  const isLoading = queryWeatherCity.isFetching || queryWeatherCity.isLoading;

  if (weather === undefined)
    return (
      <div className={styles.cityLine}>
        <Loader className={`${styles.loader} ${styles.loaderVisible}`} />
      </div>
    );

  const { icon, description } = weather.weather[0];
  const iconUrl = getIcon(icon);
  const dateString = getDate(weather.dt);

  const handleClick = () => {
    setCurrentCity(weather.id);
    closeDrawer();
  };

  const handleRemoveClick = (event: React.SyntheticEvent) => {
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();
    removeCity(weather.id);
  };

  return (
    <div className={styles.cityLine} onClick={handleClick}>
      <div className={styles.name}> {weather.name}</div>
      <div className={styles.temp}> {Math.round(weather.main.temp)}°</div>
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
  const { cities } = useContext(СitiesContext);

  return (
    <div className={styles.table}>
      {cities.map((id) => (
        <CityLine key={id} cityId={id} closeDrawer={closeDrawer} />
      ))}
    </div>
  );
};
