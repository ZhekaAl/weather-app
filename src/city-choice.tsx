import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as L from 'leda';
import styles from './city-choice.module.css';
import { ACTION_TYPES, State } from './store/types';

// interface DataObject {
//   any: string | number;
// }

// interface ChangeEvent<T = any> extends React.ChangeEvent<T> {
//   component: {
//     value: string;
//     method: "clear" | "click" | "down" | "enter" | "trigger" | "type" | "up";
//     name?: string;
//     suggestion?: string | DataObject | null;
//   };
// }

export default function CityChoice(): React.ReactElement {
  const [city, setCity] = useState({ id: 0, rusName: '' });

  const cities: Array<any> = useSelector(
    (state: State) => state.cities.citiesRu || [],
  );

  // const setNames : Set<string> = new Set(cities.map(e=>e.name));
  // const names: Array<string> =  Array.from(setNames);
  //const names: Array<string> = [...setNames];

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: ACTION_TYPES.FETCH_CITIES_START });
    // dispatch(valuesActions.getCities());
  }, [dispatch]);

  const onChange = (ev: L.AutoCompleteTypes.DataObject) => {
    // if (ev.component.value.id && ev.component.value.id !== city.id) {
    //   dispatch({
    //     type: ACTION_TYPES.FETCH_WEATHER_CITY_START,
    //     cityId: ev.component.value.id,
    //   });
    // }
    //console.log(ev);
    //if()
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
        data={cities}
        onChange={onChange}
        // value={city ? city.rusName : ''}
        textField="rusName"
        placeholder="city"
        isRequired
      />
    </div>
  );
}
