import React, {ReactElement} from 'react';

import {useStatistics} from '../../hooks/use-statistics';
import Humidity from '../../icons/humidity.component.svg';
import Pressure from '../../icons/pressure.component.svg';
import Sunrise from '../../icons/sunrise.component.svg';
import Sunset from '../../icons/sunset.component.svg';
import Windsock from '../../icons/windsock.component.svg';
import {Daily} from '../../store/types';
import {
    getDayMonth,
    getPressure,
    getSimpleIcon,
    getTempString,
    getTime,
} from '../../utils/utils';
import {LoadingInfo} from '../loading-info';
import styles from './statistics.module.css';

const Header = (): React.ReactElement => (
    <div className={styles.header}>
        <div className={styles.space}></div>
        <Humidity className={styles.iconInfo} />
        <Windsock className={styles.iconInfo} />
        <Pressure className={styles.iconInfo} />
        <Sunrise className={styles.iconInfo} />
        <Sunset className={styles.iconInfo} />
    </div>
);

const DailyBlock = ({daily}: {daily: Daily}): React.ReactElement => {
    const {icon, description} = daily.weather[0];
    const iconUrl = getSimpleIcon(icon);
    const dayMonth = getDayMonth(daily.dt);
    const tempDay = getTempString(daily.temp.day);
    const tempNight = getTempString(daily.temp.night);
    const sunrise = getTime(daily.sunrise);
    const sunset = getTime(daily.sunset);
    const pressure = getPressure(daily.pressure, false);
    return (
        <div className={styles.dailyElem}>
            <div className={styles.day}>
                <div> {dayMonth}</div>
            </div>
            <div className={styles.image}>
                <img src={iconUrl} alt={description} />
            </div>
            <div className={styles.tempInfo}>
                {tempDay}/{tempNight}
            </div>

            <div className={styles.textInfo}>{daily.humidity}%</div>
            <div className={styles.textInfo}>
                {Math.round(daily.wind_speed)}м/c
            </div>
            <div className={styles.textInfo}>{pressure}</div>
            <div className={styles.textInfo}>{sunrise}</div>
            <div className={styles.textInfo}>{sunset}</div>
        </div>
    );
};

export const Statistics = (): ReactElement => {
    const {queryStatisticsCity} = useStatistics();

    const {isLoading, isFetching, isIdle, data} = queryStatisticsCity;

    if (isIdle) return <LoadingInfo text="Ожидание загрузки статистики" />;
    if (isLoading) return <LoadingInfo text="Загружается статистика" />;

    const dailyForecast = data?.map((el) => el.daily[0]);
    return (
        <div className={styles.dailyForecast}>
            <Header />
            {dailyForecast?.map((el) => {
                return <DailyBlock key={el.dt} daily={el} />;
            })}
            {isFetching && <LoadingInfo text="Обновляется дневной прогноз" />}
        </div>
    );
};
