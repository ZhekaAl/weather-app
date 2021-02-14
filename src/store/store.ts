import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

import { sagas } from './process';

import { citiesReducer } from './cities/ducks';
import { weatherReducer } from './weather/ducks';
import { loadState, saveState } from './local-storage';
import { State } from './types';

const VERSION = '1.1.0';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const sagaMiddleware = createSagaMiddleware();

const persistedState: State | undefined = loadState(VERSION);

const createStoreWithLocalStorage = () => {
  const store = createStore(
    combineReducers({
      cities: citiesReducer,
      weatherList: weatherReducer,
    }),
    persistedState,
    composeEnhancers
      ? composeEnhancers(applyMiddleware(sagaMiddleware))
      : applyMiddleware(sagaMiddleware),
  );

  store.subscribe(() => {
    saveState(store.getState(), VERSION);
  });

  return store;
};

export default createStoreWithLocalStorage();

sagaMiddleware.run(sagas);
