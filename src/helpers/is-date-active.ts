import dayjs from 'dayjs'

export default function isDateActive(start_date?: string, end_date?: string) {
  if (start_date && end_date) {
    const currentDate = dayjs()
    const startDate = dayjs(start_date)
    const endDate = end_date ? dayjs(end_date) : null

    const isActive = endDate
      ? currentDate >= startDate && currentDate <= endDate
      : currentDate >= startDate

    return isActive
  } else if (start_date && !end_date) {
    const start = dayjs(start_date).isValid()
    return start
  } else {
    return false
  }
}
