import { getDate, getTime } from './utils';

it('getDate', () => {
  const date = new Date(2020, 10, 4, 12, 33);
  const seconds = date.getTime() / 1000;
  const resultDate = getDate(seconds);
  expect(resultDate).toEqual('04.11.2020, 12:33:00');
});

it('getTime', () => {
  const date = new Date(2020, 10, 4, 12, 33);
  const seconds = date.getTime() / 1000;
  const resultDate = getTime(seconds);
  expect(resultDate).toEqual('12:33');
});
