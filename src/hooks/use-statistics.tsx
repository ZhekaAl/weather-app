import { useQuery, UseQueryResult } from 'react-query';

import { Coord, Statistics } from '../store/types';

import { fetchStatisticsCityApi } from '../api/api';

import { minToMsec } from '../utils/utils';
import { useCurrentWeather } from './use-current-weather';

type StatisticsCache = {
  queryStatisticsCity: UseQueryResult<Statistics, unknown>;
};

export function useStatistics(): StatisticsCache {
  const { queryWeatherCity } = useCurrentWeather();

  const { coord } = queryWeatherCity.data ?? {};

  const queryStatisticsCity = useQuery(
    ['statisticsCity', coord],
    () => fetchStatisticsCityApi(coord as Coord),
    {
      enabled: !!coord,
      staleTime: minToMsec(60),
    },
  );

  return {
    queryStatisticsCity,
  };
}
