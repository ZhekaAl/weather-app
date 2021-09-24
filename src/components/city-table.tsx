import React, {useContext} from 'react';
import {UseQueryResult, useQueries} from 'react-query';
import {useHistory} from 'react-router-dom';

import {fetchWeatherCityApi} from '../api/api';
import {useLocalStorage} from '../hooks/use-localStorage';
import {СitiesContext} from '../store/cities/cities-provider';
import {WeatherInner} from '../store/types';
import removeIcon from '../icons/remove.inline.svg';
import sortingIcon from '../icons/sort-arrows.inline.svg';
import Loader from '../ui-components/icons/loader-oval.component.svg';
import {getDate, getIcon, minToMsec} from '../utils/utils';
import styles from './city-table.module.css';
import {LoadingInfo} from './loading-info';

type Sorting = {
    field: 'name' | 'temp';
    order: 'asc' | 'desc';
};

const TableHeader = ({
    sorting,
    setSorting,
}: {
    sorting: Sorting;
    setSorting: (v: Sorting) => void;
}) => {
    const handleFieldClick = (fieldName: Sorting['field']): void => {
        if (sorting.field !== fieldName) {
            setSorting({field: fieldName, order: 'asc'});
        } else {
            setSorting({
                ...sorting,
                order: sorting.order === 'asc' ? 'desc' : 'asc',
            });
        }
    };

    return (
        <div className={`${styles.cityLine} ${styles.header}`}>
            <div className={styles.name}>
                <img
                    src={sortingIcon}
                    onClick={() => handleFieldClick('name')}
                    className={
                        sorting.field === 'name' ? styles.visible : undefined
                    }
                />
            </div>
            <div className={styles.temp}>
                <img
                    src={sortingIcon}
                    onClick={() => handleFieldClick('temp')}
                    className={
                        sorting.field === 'temp' ? styles.visible : undefined
                    }
                />
            </div>
            <div className={styles.image}></div>

            <div className={styles.date}></div>

            <div className={styles.imageRemove}></div>
        </div>
    );
};

const CityLine = ({
    queryWeatherCity,
    closeDrawer,
}: {
    queryWeatherCity: UseQueryResult<WeatherInner, unknown>;
    closeDrawer: () => void;
}): React.ReactElement | null => {
    const {currentCity, removeCity, setCurrentCity} = useContext(СitiesContext);
    const history = useHistory();

    const {data: weather, isFetching, isIdle, isLoading} = queryWeatherCity;

    if (isIdle) return <LoadingInfo text="Ожидание загрузки данных погоды" />;
    if (isLoading) return <LoadingInfo text="Загрузки данных погоды" />;

    if (!weather) return null;
    const {
        dt,
        id,
        main: {temp},
        name,
        weather: weatherArr,
    } = weather;

    const {icon, description} = weatherArr[0];
    const iconUrl = getIcon(icon);
    const dateString = getDate(dt);

    const isCurrent = id === currentCity;

    const handleClick = () => {
        setCurrentCity(id);
        closeDrawer();
        history.push('');
    };

    const handleRemoveClick = (event: React.SyntheticEvent) => {
        event.stopPropagation();
        event.nativeEvent.stopImmediatePropagation();
        removeCity(id);
    };

    return (
        <div
            className={`${styles.cityLine} ${
                isCurrent ? styles.currentCityLine : ''
            }`}
            onClick={handleClick}
        >
            <div className={styles.name}> {name}</div>
            <div className={styles.temp}> {Math.round(temp)}°</div>
            <div className={styles.image}>
                <img src={iconUrl} alt={description} />
            </div>

            <div className={styles.date}>{dateString}</div>
            <Loader
                className={`${styles.loader} ${
                    isFetching ? styles.loaderVisible : ''
                }`}
            />
            <div className={styles.imageRemove} onClick={handleRemoveClick}>
                <img
                    src={removeIcon}
                    alt={description}
                />
            </div>
        </div>
    );
};

export const CitiesTable = ({
    closeDrawer,
}: {
    closeDrawer: () => void;
}): React.ReactElement => {
    const {cities} = useContext(СitiesContext);

    // useQueries does not has types..
    const queriesWeatherCity = (useQueries(
        cities.map((cityId) => ({
            queryKey: ['weatherCity', cityId],
            queryFn: () => fetchWeatherCityApi(cityId),
            enabled: !!cityId,
            staleTime: minToMsec(15),
        })),
    ) as unknown[]) as UseQueryResult<WeatherInner, unknown>[];

    const [sorting, setSorting] = useLocalStorage<Sorting>(
        'citiesTableSorting',
        {
            field: 'name',
            order: 'asc',
        },
    );

    const sortedCitiesQueries = queriesWeatherCity.sort((city1, city2) => {
        let result = 1;
        const data1 = city1.data;
        const data2 = city2.data;
        if (!data1 || !data2) {
            return result;
        }
        if (sorting.field === 'name') {
            result = data1.name > data2.name ? 1 : -1;
        }
        if (sorting.field === 'temp') {
            result = data1.main.temp > data2.main.temp ? 1 : -1;
        }
        return sorting.order === 'asc' ? result : -result;
    });

    return (
        <div className={styles.table}>
            {sortedCitiesQueries.length > 0 && (
                <TableHeader sorting={sorting} setSorting={setSorting} />
            )}
            {sortedCitiesQueries.map((cityQuery, id) => (
                <CityLine
                    key={id}
                    queryWeatherCity={cityQuery}
                    closeDrawer={closeDrawer}
                />
            ))}
        </div>
    );
};
