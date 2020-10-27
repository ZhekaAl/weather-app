export function getTime(timeInSecond: number): string {
  return new Date(timeInSecond * 1000).toLocaleTimeString('ru-RU', {
    hour: '2-digit',
    minute: '2-digit',
  });
}
