// import { fetchCities } from './process';
// import { call } from 'redux-saga/effects';
// import { ACTION_TYPES } from './types';

// it('sums numbers', () => {
//   expect(1 + 2).toEqual(3);
//   expect(2 + 2).toEqual(4);
// });

// it('fetch users', () => {
//   const gen = fetchCities();
//   const step1 = gen.next();
//   expect(step1.done).toEqual(false);
//   expect(JSON.stringify(step1.value)).toEqual(
//     JSON.stringify(
//       call(() => fetch('./cities-ru.json').then((response) => response.json())),
//     ),
//   );

//   const step2 = gen.next();
//   expect(step2.done).toEqual(false);
//   //   console.log(step2.value);
//   expect(step2.value).toMatchObject({
//     type: 'PUT',
//     payload: {
//       action: { type: ACTION_TYPES.FETCH_CITIES_SUCCESS },
//     },
//   });
// });
export {};
