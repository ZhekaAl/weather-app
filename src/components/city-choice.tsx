import React, { useContext } from 'react';
import { useQuery } from 'react-query';

import { fetchCitiesFunc } from '../api/api';
import { СitiesContext } from '../store/cities/cities-provider';
import { CityInner } from '../store/types';

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

  const queryCities = useQuery('cities', fetchCitiesFunc);

  const cities = queryCities.data || [];

  const { addCity, setCurrentCity } = useContext(СitiesContext);

  const chooseCity = (id: number) => {
    addCity(id);
    setCurrentCity(id);
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
