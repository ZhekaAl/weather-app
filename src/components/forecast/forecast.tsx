import React from 'react';
import { useCurrentWeather } from '../../hooks/use-current-weather';

import { LoadingInfo } from '../loading-info';
import { HourlyForecast } from './hourly-forecast';
import { Alerts } from './alerts';
import { DailyForecast } from './daily-forecast';

export function Forecast(): React.ReactElement {
  const {
    queryForecastCity: { isFetching, isLoading, isIdle, data: forecast },
  } = useCurrentWeather();

  if (isIdle) return <LoadingInfo text="Ожидание загрузки дневного прогноза" />;
  if (isLoading) return <LoadingInfo text="Загружается дневной прогноз" />;

  const { daily = [], alerts = [], hourly = [] } = forecast ?? {};
  const dailyForecastNext = daily.slice(1) || [];

  return (
    <>
      <Alerts alerts={alerts} />
      <HourlyForecast hourlyForecast={hourly} />
      <DailyForecast dailyForecast={dailyForecastNext} />
      {isFetching && <LoadingInfo text="Обновляется дневной прогноз" />}
    </>
  );
}
