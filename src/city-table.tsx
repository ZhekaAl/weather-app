import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
//import * as L from 'leda';
import styles from './city-table.module.css';
import { ACTION_TYPES, State, City, Weather } from './store/types';

import { getCity } from './store/selectors';

const CtyLine: React.FC<Weather> = (weatherProps: Weather) => {
  if (weatherProps === undefined) return null;
  return (
    <div className={styles.cityLine}>
      <div> {weatherProps.name}</div>
      <div> {Math.round(weatherProps.main.temp)}</div>
      <div className={styles.image}>
        <img
          src={weatherProps.weather[0].icon}
          alt={weatherProps.weather[0].description}
        />
      </div>
    </div>
  );
};
