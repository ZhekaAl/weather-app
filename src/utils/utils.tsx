const weekDays = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];

export function getWeekDay(timeInSecond: number): string {
  const date = new Date(timeInSecond * 1000);
  const day = date.getDay();
  return weekDays[day];
}

export function getTime(timeInSecond: number): string {
  return new Date(timeInSecond * 1000).toLocaleTimeString('ru-RU', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function getDate(timeInSecond: number): string {
  const dateString = new Date(timeInSecond * 1000).toLocaleString('ru-RU', {});
  return dateString;
}
export function getDayMonth(timeInSecond: number): string {
  const date = new Date(timeInSecond * 1000);
  const monthNumber = date.getMonth() + 1;
  const monthString =
    monthNumber > 9 ? monthNumber.toString() : `0${monthNumber}`;
  const res = `${date.getDate()}.${monthString}`;
  return res;
}

export function getPressure(pressureInKpa: number, useMm = true): string {
  const pressure = Math.round(pressureInKpa * 0.750064).toString();
  if (useMm) return `${pressure} мм.`;
  return pressure;
}

export function getAnimatedIcon(name: string): string {
  return `${process.env.PUBLIC_URL}/icons/${name}.svg`;
}

export function getSimpleIcon(name: string): string {
  return `https://openweathermap.org/img/wn/${name}@2x.png`;
}

export function getIcon(name: string): string {
  let url;
  if (name === '50d' || name === '50n') {
    url = getSimpleIcon(name);
  } else {
    url = getAnimatedIcon(name);
  }
  return url;
}

export function getTempString(temp: number): string {
  return `${Math.round(temp)}°`;
}
