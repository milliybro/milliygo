import { memo } from 'react'
import { twMerge } from 'tailwind-merge'
import dayjs, { Dayjs } from 'dayjs'
import type { FC } from 'react'
import localeData from 'dayjs/plugin/localeData'
import 'dayjs/locale/uz-latn'
import 'dayjs/locale/ru'
import 'dayjs/locale/en'

dayjs.extend(localeData)

interface IProps {
  month: number
  year: number
  value: { departure: Dayjs | null; returning: Dayjs | null }
  onSelect: (_date: Dayjs) => void
  today?: Dayjs
  disablePast?: boolean
}

const CalendarGrid: FC<IProps> = ({ month, year, value, onSelect, today, disablePast = true }) => {
  const startOfMonth = dayjs(new Date(year, month, 1))
  const daysInMonth = startOfMonth.daysInMonth()

  const firstDayOfWeek = (startOfMonth.day() + 6) % 7
  const prevMonth = startOfMonth.subtract(1, 'month')
  const prevMonthDays = prevMonth.daysInMonth()

  const prevDays = Array.from({ length: firstDayOfWeek }, (_, i) =>
    prevMonth.date(prevMonthDays - firstDayOfWeek + i + 1)
  )

  const currentDays = Array.from({ length: daysInMonth }, (_, i) => startOfMonth.date(i + 1))

  const totalSoFar = prevDays.length + currentDays.length
  const nextMonth = startOfMonth.add(1, 'month')
  const nextDaysCount = 42 - totalSoFar
  const nextDays = Array.from({ length: nextDaysCount }, (_, i) => nextMonth.date(i + 1))

  const allDays = [...prevDays, ...currentDays, ...nextDays]

  const currentLocale = dayjs.locale()
  const normalizedLocale = currentLocale === 'uz-latn' ? 'uz-latn' : currentLocale

  const weekDays = dayjs().locale(normalizedLocale).localeData().weekdaysMin()
  const shiftedWeekDays = [...weekDays.slice(1), weekDays[0]]

  return (
    <div>
      <div className="grid grid-cols-7 pb-4 pt-6 text-center text-xs text-gray-500">
        {shiftedWeekDays.map((d) => (
          <div key={d} className="text-[14px] font-[500] capitalize text-[#777E90]">
            {d}
          </div>
        ))}
      </div>

      <div className="relative grid grid-cols-7 gap-y-[3px]">
        {allDays.map((day) => {
          const key = day.format('YYYY-MM-DD')
          const isCurrentMonth = day.month() === month
          const isPast = disablePast && day.isBefore(dayjs(), 'day')
          const isToday = today?.isSame(day, 'day')

          const isFisrtDayOfWeek = day.day() === 1
          const isLastDayOfWeek = day.day() === 0

          const isDeparture = value.departure?.isSame(day, 'day') && isCurrentMonth
          const isReturning = value.returning?.isSame(day, 'day') && isCurrentMonth

          const inRange =
            value.departure &&
            value.returning &&
            day.isAfter(value.departure, 'day') &&
            day.isBefore(value.returning, 'day') &&
            isCurrentMonth

          const isClickable = !isPast

          return (
            <div
              key={key}
              onClick={() => {
                if (isClickable) onSelect(day)
              }}
              className={twMerge(
                'relative flex size-[46px] items-center justify-center rounded-full text-[14px] font-medium transition-colors',
                isClickable ? 'cursor-pointer hover:bg-primary-light' : 'cursor-default',
                (!isCurrentMonth || isPast) && 'text-[#B7BFD5]'
              )}
            >
              {inRange && (
                <div
                  className={twMerge(
                    'absolute inset-0 z-0 bg-[#F8F8FA]',
                    isFisrtDayOfWeek && '-right-2 rounded-l-full',
                    isLastDayOfWeek && '-left-2 rounded-r-full',
                    !isFisrtDayOfWeek && !isLastDayOfWeek && '-left-2 -right-2'
                  )}
                />
              )}
              {isDeparture && (
                <div className="absolute inset-0 z-20 rounded-full bg-primary after:absolute after:right-0 after:top-0 after:h-full after:bg-[#F8F8FA] after:content-['']" />
              )}
              {isReturning && (
                <div className="absolute inset-0 z-20 rounded-full bg-primary after:absolute after:left-0 after:top-0 after:h-full after:bg-[#F8F8FA] after:content-['']" />
              )}
              {(isDeparture || isReturning) && (
                <div
                  className={twMerge(
                    'absolute inset-0 z-10',
                    isDeparture ? '-right-2 rounded-l-full' : '-left-2 rounded-r-full',
                    value?.departure && value?.returning && 'bg-[#F8F8FA]'
                  )}
                />
              )}

              {isToday && !isDeparture && !isReturning && (
                <div className="absolute inset-0 rounded-full border border-primary" />
              )}

              <span
                className={twMerge('relative z-20', (isDeparture || isReturning) && 'text-white')}
              >
                {day.date()}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default memo(CalendarGrid)
