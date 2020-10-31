import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as L from 'leda';
import styles from './city-choice.module.css';
import { ACTION_TYPES, City, CityInner, State } from '../store/types';

export default function CityChoice(): React.ReactElement {
  const [city, setCity] = useState({ id: 0, rusName: '' });

  const cities: City[] = useSelector(
    (state: State) => state.cities.citiesRu || [],
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: ACTION_TYPES.FETCH_CITIES_START });
  }, [dispatch]);

  const onChange = (ev: L.AutoCompleteTypes.DataObject) => {
    if (ev.component.suggestion) {
      if (city.id !== ev.component.suggestion.id)
        dispatch({
          type: ACTION_TYPES.FETCH_WEATHER_CITY_START,
          payload: { cityId: ev.component.suggestion.id },
        });
      setCity(ev.component.suggestion);
    }
  };

  return (
    <div className={styles.cityInput}>
      <L.AutoComplete
        data={cities as CityInner[]}
        onChange={onChange}
        textField="rusName"
        placeholder="Добавить город"
        isRequired
      />
    </div>
  );
}
