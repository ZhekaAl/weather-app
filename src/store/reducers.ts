import {
  Action,
  ACTION_TYPES,
  StateCities,
  StateWeatherList,
  getIsLoadingState,
  getSuccesLoadedState,
  getErrorLoadedState,
  Weather,
  WeatherInner,
  PayloadCityId,
  PayloadCities,
  PayloadError,
  isPayloadCityId,
  isPayloadError,
  isPayloadCities,
  isPayloadWeatherInner,
} from './types';

const initialStateCities: StateCities = {
  citiesRu: [],
  isLoading: false,
  errorMessage: '',
};

export function citiesReducer(
  state: StateCities = initialStateCities,
  { type, payload }: Action<PayloadCityId | PayloadCities | PayloadError>,
): StateCities {
  switch (type) {
    case ACTION_TYPES.FETCH_CITIES_START:
      return {
        ...state,
        errorMessage: '',
        isLoading: true,
      };
    case ACTION_TYPES.FETCH_CITIES_SUCCESS:
      if (payload === undefined) return state;
      // if ('cityId' in payload) return state;
      // if (isPayloadCityId(payload)) return state;
      //if (isPayloadError(payload)) return state;
      if (!isPayloadCities(payload)) return state;
      return {
        ...state,
        citiesRu: payload,
        errorMessage: '',
        isLoading: false,
      };
    case ACTION_TYPES.FETCH_CITIES_ERROR:
      return {
        ...state,
        citiesRu: [],
        errorMessage: typeof payload === 'string' ? payload : '',
        isLoading: false,
      };

    default:
      return state;
  }
}

const initialStateWeatherList: StateWeatherList = {
  weatherList: [],
  cityId: undefined,
};

export function weatherListReducer(
  state: StateWeatherList = initialStateWeatherList,
  { type, payload }: Action<PayloadCityId | WeatherInner | PayloadError>,
): StateWeatherList {
  switch (type) {
    case ACTION_TYPES.FETCH_WEATHER_CITY_START: {
      let newCity = true;
      // if (payload === undefined) {
      //   return state;
      // }
      // if (!('cityId' in payload)) return state;
      if (!isPayloadCityId(payload)) return state;
      const newEl: Weather = {
        loadingState: getIsLoadingState(),
        weatherInfo: undefined,
        id: payload.cityId,
      };
      const newState = {
        ...state,
        weatherList: state.weatherList.map((el) => {
          if (el.id === payload.cityId) {
            newCity = false;
            return newEl;
          }
          return el;
        }),
        cityId: state.cityId || payload.cityId,
      };

      if (newCity) {
        newState.weatherList.push(newEl);
      }
      return newState;
    }

    case ACTION_TYPES.FETCH_WEATHER_CITY_SUCCESS: {
      // if (payload === undefined) {
      //   return state;
      // }
      // if (!('id' in payload)) return state;

      if (!isPayloadWeatherInner(payload)) return state;

      const newEl = {
        loadingState: getSuccesLoadedState(),
        weatherInfo: payload,
        id: payload.id,
      };

      return {
        ...state,
        weatherList: state.weatherList.map((el) => {
          if (el.id === payload.id) {
            return newEl;
          }
          return el;
        }),
      };
    }
    case ACTION_TYPES.FETCH_WEATHER_CITY_ERROR: {
      // if (payload === undefined) {
      //   return state;
      // }
      // if (!('error' in payload)) return state;
      if (!isPayloadError(payload)) return state;
      const newEl = {
        loadingState: getErrorLoadedState(payload.error), //TO DO

        weatherInfo: undefined,
        id: payload.cityId,
      };

      return {
        ...state,
        weatherList: state.weatherList.map((el) => {
          if (el.id === payload.cityId) {
            return newEl;
          }
          return el;
        }),
      };
    }

    case ACTION_TYPES.SET_CURRENT_CITY: {
      // if (payload === undefined) return state;
      // if (!('cityId' in payload)) return state;
      if (!isPayloadCityId(payload)) return state;
      return {
        ...state,
        cityId: payload.cityId,
      };
    }

    case ACTION_TYPES.REMOVE_CITY: {
      // if (payload === undefined) return state;
      // if (!('cityId' in payload)) return state;
      if (!isPayloadCityId(payload)) return state;

      const newWeatherList = state.weatherList.filter(
        (el) => el.id !== payload.cityId,
      );
      let newCityId = state.cityId;
      if (newCityId === payload.cityId) {
        newCityId =
          newWeatherList.length > 0 ? newWeatherList[0].id : undefined;
      }
      return {
        ...state,
        weatherList: newWeatherList,
        cityId: newCityId,
      };
    }

    default:
      return state;
  }
}
