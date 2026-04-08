import dayjs from 'dayjs'

export default function getDaysDifference(startDateStr?: string, endDateStr?: string) {
  if (startDateStr && endDateStr) {
    const startDate = dayjs(startDateStr)
    const endDate = dayjs(endDateStr)
    return endDate.diff(startDate, 'day', false)
  }
  return ''
}
