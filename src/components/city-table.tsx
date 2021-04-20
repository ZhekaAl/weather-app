import React, { useContext } from 'react';
import { useQuery } from 'react-query';

import { СitiesContext } from '../store/cities/cities-provider';

import styles from './city-table.module.css';

import { fetchWeatherCityApi } from '../api/api';

import { getDate, getIcon } from '../utils/utils';

import removeIcon from '../icons/remove.svg';
import { ReactComponent as Loader } from '../ui-components/icons/loader-oval.svg';
import { LoadingInfo } from './loading-info';

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
    { enabled: !!cityId, refetchOnMount: false },
  );

  const weather = queryWeatherCity.data;

  const { isFetching, isIdle, isLoading } = queryWeatherCity;

  if (isIdle) return <LoadingInfo text="Ожидание загрузки данных погоды" />;
  if (isLoading) return <LoadingInfo text="Загрузки данных погоды" />;

  if (!weather) return null;
  const {
    dt,
    id,
    main: { temp },
    name,
    weather: weatherArr,
  } = weather;

  const { icon, description } = weatherArr[0];
  const iconUrl = getIcon(icon);
  const dateString = getDate(dt);

  const handleClick = () => {
    setCurrentCity(id);
    closeDrawer();
  };

  const handleRemoveClick = (event: React.SyntheticEvent) => {
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();
    removeCity(id);
  };

  return (
    <div className={styles.cityLine} onClick={handleClick}>
      <div className={styles.name}> {name}</div>
      <div className={styles.temp}> {Math.round(temp)}°</div>
      <div className={styles.image}>
        <img src={iconUrl} alt={description} />
      </div>

      <div className={styles.date}>{dateString}</div>
      <Loader
        className={`${styles.loader} ${isFetching ? styles.loaderVisible : ''}`}
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
