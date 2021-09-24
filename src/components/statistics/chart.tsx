import React, {ReactElement} from 'react';
import {CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis} from 'recharts';

import {useStatistics} from '../../hooks/use-statistics';
import {getDayMonth} from '../../utils/utils';
import {LoadingInfo} from '../loading-info';
import styles from './statistics.module.css';

export const Chart = (): ReactElement => {
    const {queryStatisticsCity} = useStatistics();

    const {isLoading, isFetching, isIdle, data} = queryStatisticsCity;

    if (isIdle) return <LoadingInfo text="Ожидание загрузки статистики" />;
    if (isLoading) return <LoadingInfo text="Загружается статистика" />;

    // const tooltipFormatter = (value, name, props) => ( return ["formatted value", "formatted name"， ] ))

    const dailyForecast = data?.map((el) => el.daily[0]);

    const dataChart = dailyForecast?.map((el, i) => ({
        ...el,
        dateString: i % 2 === 0 ? getDayMonth(el.dt) : '',
    }));

    const width = (dataChart?.length ?? 0) * 20;
    return (
        <div className={styles.chartsWrapper}>
            <div className={styles.filters}></div>
            <LineChart
                width={width}
                height={300}
                data={dataChart}
                margin={{top: 20, right: 20, bottom: 5, left: 0}}
            >
                <Line type="monotone" dataKey="temp.day" stroke="#8884d8" />
                <Line type="monotone" dataKey="temp.night" stroke="#82ca9d" />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <XAxis dataKey="dateString" />
                <YAxis />
                <Tooltip />
            </LineChart>
            {isFetching && <LoadingInfo text="Обновляется статистика" />}
        </div>
    );
};
