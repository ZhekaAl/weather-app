import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

import { sagas } from './process';

import { citiesReducer } from './cities/ducks';
import { weatherReducer } from './weather/ducks';
import { loadState, saveState } from './local-storage';
import { State } from './types';

const VERSION = '1.1.0';
// const composeEnhancers =
//   (typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
//   null;

//const composeEnhancers:any = window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] as typeof compose || compose;

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const composeEnhancers =
//   typeof window === 'object' &&
//   window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
//     window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
//       // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
//     }) : compose;

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

// export default createStore(
//   combineReducers({
//     cities: citiesReducer,
//     current: currentReducer,
//   }),
//   persistedState,
//   composeEnhancers
//     ? composeEnhancers(applyMiddleware(sagaMiddleware))
//     : applyMiddleware(sagaMiddleware),
// );

export default createStoreWithLocalStorage();

sagaMiddleware.run(sagas);
