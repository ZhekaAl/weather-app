import { getDate, getShortDate, getTime, hasCyrillic } from './utils';

it('getDate', () => {
  const date = new Date(2020, 10, 4, 12, 33);
  const seconds = date.getTime() / 1000;
  const resultDate = getDate(seconds);
  expect(resultDate).toEqual('04.11.2020, 12:33:00');
});

it('getShortDate', () => {
  const date = new Date(2020, 10, 4, 12, 33);
  const seconds = date.getTime() / 1000;
  const resultDate = getShortDate(seconds);
  expect(resultDate).toEqual('ср 12:33');
});

it('getTime', () => {
  const date = new Date(2020, 10, 4, 12, 33);
  const seconds = date.getTime() / 1000;
  const resultDate = getTime(seconds);
  expect(resultDate).toEqual('12:33');
});

it('hasCyrillic', () => {
  expect(hasCyrillic('Лавины')).toBe(true);
  expect(hasCyrillic('avalanches')).toBe(false);
  expect(hasCyrillic('avабвanches')).toBe(true);
  expect(hasCyrillic('')).toBe(false);
});
