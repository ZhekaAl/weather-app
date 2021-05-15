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

export function getShortDate(timeInSecond: number): string {
  return new Date(timeInSecond * 1000).toLocaleTimeString('ru-RU', {
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function getDate(timeInSecond: number): string {
  const dateString = new Date(timeInSecond * 1000).toLocaleString('ru-RU', {});
  return dateString;
}

export const getHoursBetween = (timeStart: number, timeEnd: number): string => {
  const hours = (timeEnd - timeStart) / 60 / 60;
  const fullHours = Math.floor(hours);
  const minutes = Math.round((hours - fullHours) * 60);
  const minutesText = minutes > 0 ? `${minutes}мин` : '';
  return `${fullHours}ч ${minutesText}`;
};

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

export function getWindDirection(degree: number): string {
  if (degree < 11.25 || degree > 348.75) return 'С';
  else if (degree < 33.75) return 'CCВ';
  else if (degree < 56.25) return 'CВ';
  else if (degree < 78.25) return 'ВCВ';
  else if (degree < 101.25) return 'В';
  else if (degree < 123.75) return 'ВЮВ';
  else if (degree < 146.25) return 'ЮВ';
  else if (degree < 168.75) return 'ЮВЮ';
  else if (degree < 191.25) return 'Ю';
  else if (degree < 213.75) return 'ЮЮЗ';
  else if (degree < 236.25) return 'ЮЗ';
  else if (degree < 258.75) return 'ЗЮЗ';
  else if (degree < 281.25) return 'З';
  else if (degree < 303.75) return 'ЗСЗ';
  else if (degree < 326.25) return 'СЗ';
  else if (degree < 348.75) return 'ССЗ';
  else return '';
}

export function hasCyrillic(text: string): boolean {
  return /[а-я]/i.test(text);
}

export function minToMsec(minutes: number): number {
  return 60 * 1000 * minutes;
}
