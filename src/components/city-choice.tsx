import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { City, CityInner, State } from '../store/types';
import { actions as citiesActions } from '../store/cities/ducks';
import { actions as weatherActions } from '../store/weather/ducks';

import { Autocomplete, SuggestionElement } from '../ui-components/autocomplete';

import styles from './city-choice.module.css';

const FAST_CITIES_NAMES = [
  'Санкт-Петербург',
  'Москва',
  'Адлер',
  'Архангельск',
  'Ялта',
  'Зеленогорск',
];

const FastCityLink = ({
  name,
  onclick,
}: {
  name: string;
  onclick: () => void;
}): React.ReactElement => (
  <div onClick={onclick} className={styles.fastCityLink}>
    {name}
  </div>
);

export default function CityChoice({
  onClose,
}: {
  onClose: () => void;
}): React.ReactElement {
  const checkCityIsValid = (id: number): boolean =>
    cities.findIndex((city) => city?.id === id) >= 0;

  const cities: City[] = useSelector(
    (state: State) => state.cities.citiesRu || [],
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(citiesActions.fetchCitiesStart());
  }, [dispatch]);

  const chooseCity = (id: number) => {
    dispatch(
      weatherActions.fetchWeatherCityStart({
        cityId: id,
      }),
    );
    onClose();
  };

  const handleChooseCity = (suggestionElement: SuggestionElement): void => {
    const { id } = suggestionElement;
    const isValid = checkCityIsValid(id);
    if (isValid) {
      chooseCity(id);
    }
  };

  const fastCities = cities.filter(
    (city) => city && FAST_CITIES_NAMES.includes(city.rusName),
  ) as CityInner[];

  const suggestions: SuggestionElement[] = cities.map((city) => ({
    id: city?.id,
    name: city?.rusName,
  }));

  return (
    <>
      <Autocomplete suggestions={suggestions} onChoose={handleChooseCity} />
      <div className={styles.fastLinks}>
        {fastCities.map((city) => (
          <FastCityLink
            key={city.id}
            name={city.rusName}
            onclick={() => chooseCity(city.id)}
          />
        ))}
      </div>

      <button className="button-about" onClick={onClose}>
        Отмена
      </button>
    </>
  );
}
