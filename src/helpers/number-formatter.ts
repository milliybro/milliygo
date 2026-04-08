export function formatNumber(number?: number) {
  if (number == null || isNaN(number)) return ''

  return new Intl.NumberFormat('ru-RU').format(number)
}
