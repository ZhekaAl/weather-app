import React from 'react';

import {useCurrentWeather} from '../hooks/use-current-weather';
import DayLight from '../icons/daylight.component.svg';
import Humidity from '../icons/humidity.component.svg';
import Pressure from '../icons/pressure.component.svg';
import Sunrise from '../icons/sunrise.component.svg';
import Sunset from '../icons/sunset.component.svg';
import FeelsLike from '../icons/temperature-feels-like.component.svg';
import TempMax from '../icons/thermometer-max.component.svg';
import TempMin from '../icons/thermometer-min.component.svg';
import UVI from '../icons/ultraviolet.component.svg';
import Windsock from '../icons/windsock.component.svg';
import Loader from '../ui-components/icons/loader-oval.component.svg';
import {
    getHoursBetween,
    getIcon,
    getPressure,
    getTime,
    getWindDirection,
} from '../utils/utils';
import styles from './city-weather.module.css';
import {LoadingInfo} from './loading-info';

export default function CurrentWeather(): React.ReactElement | null {
    const {queryWeatherCity, queryForecastCity} = useCurrentWeather();

    const {isFetching, isLoading, isIdle, data: weather} = queryWeatherCity;

    const {data: forecast} = queryForecastCity;

    const uvi = forecast?.hourly?.[0]?.uvi ?? '-';

    if (isIdle) return <LoadingInfo text="Ожидание загрузки данных погоды" />;
    if (isLoading) return <LoadingInfo text="Загружаются данные погоды" />;
    if (!weather) return null;

    const {
        dt,
        main: {feels_like, temp, temp_max, temp_min, humidity, pressure},
        sys: {sunrise, sunset},
        wind,
        weather: weatherArr,
    } = weather;

    const {icon, description} = weatherArr[0];

    const dateString = getTime(dt);

    const sunriseText = getTime(sunrise);
    const sunsetText = getTime(sunset);

    const dayLightHours = getHoursBetween(sunrise, sunset);

    const pressureText = getPressure(pressure);

    const windDirection = getWindDirection(wind.deg);
    const windText = `${Math.round(wind.speed)}м/с, ${windDirection}`;
    const iconUrl = getIcon(icon);
    return (
        <div className={styles.weatherInfo}>
            <div className={styles.left}>
                <div className={styles.headerRow}>
                    <div className={styles.temp}>{`${Math.round(temp)}°`}</div>
                    <div className={styles.image}>
                        <img src={iconUrl} alt={description} />
                    </div>
                </div>
                <div className={styles.description}>
                    <div className={styles.row}>
                        <div className={styles.rowInfo}>
                            <FeelsLike className={styles.iconInfo} />
                            <div className={styles.textInfo}>
                                {Math.round(feels_like)}°
                            </div>
                        </div>
                        <div className={styles.rowInfo}>
                            <TempMax className={styles.iconInfo} />
                            <div className={styles.textInfo}>
                                {Math.round(temp_max)}°
                            </div>
                        </div>
                        <div className={styles.rowInfo}>
                            <TempMin className={styles.iconInfo} />
                            <div className={styles.textInfo}>
                                {Math.round(temp_min)}°
                            </div>
                        </div>
                        <div className={styles.rowInfo}>
                            <UVI className={styles.iconInfo} />
                            <div className={styles.textInfo}>{uvi}</div>
                        </div>

                        <div className={styles.rowInfo}>
                            <Humidity className={styles.iconInfo} />
                            <div className={styles.textInfo}>{humidity}%, </div>
                        </div>
                        <div className={styles.rowInfo}>
                            <Windsock className={styles.iconInfo} />
                            <div className={styles.textInfo}>{windText}</div>
                        </div>
                        <div className={styles.rowInfo}>
                            <Pressure className={styles.iconInfo} />
                            <div className={styles.textInfo}>
                                {pressureText}
                            </div>
                        </div>
                        <div className={styles.rowInfo}>
                            <Sunrise className={styles.iconInfo} />
                            <div className={styles.textInfo}>{sunriseText}</div>
                        </div>
                        <div className={styles.rowInfo}>
                            <Sunset className={styles.iconInfo} />
                            <div className={styles.textInfo}>{sunsetText}</div>
                        </div>
                        <div className={styles.rowInfo}>
                            <DayLight className={styles.iconInfo} />
                            <div className={styles.textInfo}>
                                {dayLightHours}
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.refreshRow}>
                    <div className={styles.timeInfo}>
                        Обновлено: {dateString}
                    </div>
                    {isFetching && <Loader className={styles.loader} />}
                </div>
            </div>
        </div>
    );
}
