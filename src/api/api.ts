import {
  Coord,
  Forecast,
  PayloadCities,
  Statistics,
  WeatherInner,
} from '../store/types';
import { http } from '../utils/http';

const API = 'https://next-mongo-zhekaal.vercel.app/api';
// const API_LOCAL = 'http://localhost:3000/api';
// https://api.openweathermap.org/data/2.5/weather?id=${id}&lang=ru&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`
// https://api.openweathermap.org/data/2.5/onecall?lat=${coord.lat}&lon=${coord.lon}&exclude=minutely,current&lang=ru&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`

export const fetchWeatherCityApi = (id: number): Promise<WeatherInner> =>
  http<WeatherInner>(`${API}/weather-city?id=${id}`);

export const fetchForecastCityApi = (coord: Coord): Promise<Forecast> =>
  http<Forecast>(`${API}/weather-forecast?lat=${coord.lat}&lon=${coord.lon}`);

export const fetchStatisticsCityApi = (coord: Coord): Promise<Statistics> =>
  http<Statistics>(
    `${API}/weather-statistics?lat=${coord.lat}&lon=${coord.lon}`,
  );

export const fetchCitiesFunc = (): Promise<PayloadCities> =>
  http<PayloadCities>('./cities-ru-public-trimmed.json');
