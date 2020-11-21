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

export function getPressure(pressureInKpa: number): string {
  const pressure = `${Math.round(pressureInKpa * 0.750064)} мм.`;
  return pressure;
}

export function getIcon(name: string): string {
  const url = `https://openweathermap.org/img/wn/${name}@2x.png`;
  return url;
}
