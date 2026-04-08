import dayjs from 'dayjs'

export function getLocaleWeekdays(format: string = 'dd', _locale: string = 'en') {
  const weekdays: string[] = []
  for (let i = 0; i < 7; i++) {
    const weekday = dayjs()
      .day((i + 1) % 7)
      .format(format)
    weekdays.push(weekday)
  }
  return weekdays
}
