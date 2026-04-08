import ArrowLeftIcon from '@/components/icons/arrow-left'
import ArrowRightIcon from '@/components/icons/arrow-right'
import { Button, Flex, Typography } from 'antd'
import PageHeader from '../../PageHeader'
import { useMemo, useState } from 'react'
import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'
import { useQuery } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'
import { getPlacementBooking } from '@/features/Account/api'
import { getLocaleWeekdays } from '@/helpers/get-locale-weekdays'
import { useRouter } from 'next/router'

dayjs.extend(isBetween)

export default function DashboardObjectCalendar({ queryId }: { queryId: any }) {
  const [showedYear, setShowedYear] = useState<number>(dayjs(new Date()).year())
  const [showedMonth, setShowedMonth] = useState<number>(dayjs(new Date()).month() + 1)
  const [blockedDays, setBlockedDays] = useState<Date[]>([])
  const t = useTranslations()
  const dayOfWeekend = getLocaleWeekdays().map((day) => ({ name: day }))
  const { pathname } = useRouter()

  function getDaysOfMonth(year: number, month: number): Date[] {
    const startDate = new Date(year, month - 1, 1)
    const endDate = new Date(year, month, 0)
    const days: Date[] = []

    for (let date = startDate; date <= endDate; date.setDate(date.getDate() + 1)) {
      days.push(new Date(date))
    }

    return days
  }

  const prevMonth = () => {
    if (showedMonth === 1) {
      setShowedMonth(12)
      setShowedYear(showedYear - 1)
    } else {
      setShowedMonth(showedMonth - 1)
    }
  }

  const nextMonth = () => {
    if (showedMonth === 12) {
      setShowedMonth(1)
      setShowedYear(showedYear + 1)
    } else {
      setShowedMonth(showedMonth + 1)
    }
  }

  const generatorDaysArray = useMemo(() => {
    let arrayOfDays = []
    const days = getDaysOfMonth(showedYear, showedMonth)

    if (days[0].getDay() === 1) {
      arrayOfDays = [...days]
    } else if (days[0].getDay() === 2) {
      arrayOfDays = [null, ...days]
    } else if (days[0].getDay() === 3) {
      arrayOfDays = [null, null, ...days]
    } else if (days[0].getDay() === 4) {
      arrayOfDays = [null, null, null, ...days]
    } else if (days[0].getDay() === 5) {
      arrayOfDays = [null, null, null, null, ...days]
    } else if (days[0].getDay() === 6) {
      arrayOfDays = [null, null, null, null, null, ...days]
    } else {
      arrayOfDays = days
    }
    return arrayOfDays
  }, [showedYear, showedMonth])

  var isBetween = require('dayjs/plugin/isBetween')
  dayjs.extend(isBetween)

  const { data: events = [] } = useQuery({
    queryKey: ['getBookingsByPlacement', queryId],
    queryFn: () => getPlacementBooking(queryId),
    refetchOnWindowFocus: false,
    select: (data) =>
      data.results.map((item: any) => {
        return {
          ...item,
          start_date: dayjs(item.start_date).format('MM/DD/YYYY'),
          end_date: dayjs(item.end_date).format('MM/DD/YYYY'),
        }
      }),
    enabled: !pathname.includes('guide'),
  })

  const toggleBlockedDay = (day: Date | null) => {
    if (day !== null) {
      setBlockedDays((prevBlockedDays) => {
        if (prevBlockedDays.some((d) => dayjs(d).isSame(day, 'day'))) {
          return prevBlockedDays.filter((d) => !dayjs(d).isSame(day, 'day'))
        } else {
          return [...prevBlockedDays, day]
        }
      })
    }
  }

  return (
    <Flex vertical gap={24}>
      <PageHeader title={t('calendar.title')} description={t('calendar.desc')} />

      <Flex vertical className="w-full rounded-[12px] border border-[#F8F8FA] pb-[20px]">
        <Flex className="w-full items-center justify-between">
          <Button
            aria-label="previous month"
            type="link"
            className="text-black"
            onClick={prevMonth}
          >
            <ArrowLeftIcon className="text-lg" />
          </Button>

          <Typography className="text-lg font-medium">
            {dayjs(new Date(showedYear, showedMonth - 1, 1)).format('MMMM')} {showedYear}
          </Typography>

          <Button aria-label="next month" type="link" className="text-black" onClick={nextMonth}>
            <ArrowRightIcon className="text-lg" />
          </Button>
        </Flex>

        <Flex className="grid grid-cols-7 px-[20px]">
          {dayOfWeekend.map((day, i) => (
            <Flex key={i} className="flex items-center justify-center pb-[16px] pt-[24px]">
              <Typography className="text-sm font-medium text-[#777E90]">{day.name}</Typography>
            </Flex>
          ))}
        </Flex>

        <Flex className="grid grid-cols-7 px-[20px]">
          {generatorDaysArray.map((day, index) => {
            const isBlocked = blockedDays.some((d) => dayjs(d).isSame(day, 'day'))
            const isFirstBlockedDay =
              isBlocked &&
              !blockedDays.some((d) => dayjs(d).isSame(dayjs(day).subtract(1, 'day'), 'day'))

            return (
              <Flex
                key={index}
                onClick={() => toggleBlockedDay(day)}
                vertical
                className={`${
                  dayjs(day).format('DD/MM/YYYY') === dayjs(new Date()).format('DD/MM/YYYY')
                    ? 'py-[16px]'
                    : 'py-[26px]'
                } relative flex cursor-pointer items-center justify-center border border-[#F8F8FA] text-[#d4406d] hover:bg-[#F8F8FA]`}
              >
                {events.map((event: any) => {
                  if (
                    dayjs(day).isBetween(
                      dayjs(new Date(event.start_date)),
                      dayjs(new Date(event.end_date)),
                      null,
                      '[]'
                    ) &&
                    day !== null
                  ) {
                    if (
                      dayjs(day).format('DD/MM/YYYY') ===
                      dayjs(event.start_date).format('DD/MM/YYYY')
                    ) {
                      return (
                        <Flex key={event.id} className="absolute h-full w-full bg-white">
                          <Flex
                            vertical
                            className="w-full justify-center border-l-4 border-[#4DD282] bg-[#4DD28233] pl-[4px]"
                          >
                            <Typography className="text-xs">
                              {event.first_name + ' ' + event.last_name}
                            </Typography>

                            <Typography className="w-max bg-[#FFC107] p-[4px] text-[8px] font-medium text-white">
                              {event.status.name}
                            </Typography>
                          </Flex>
                        </Flex>
                      )
                    } else {
                      return (
                        <div
                          key={event.id}
                          className="absolute flex h-full w-full flex-col items-center justify-center bg-[#4DD28233]"
                        >
                          <Typography className="text-sm font-medium text-[#232E40]">
                            {dayjs(day).format('D') === 'Invalid Date'
                              ? ''
                              : dayjs(day).format('D')}
                          </Typography>
                          {dayjs(day).format('DD/MM/YYYY') ===
                            dayjs(new Date()).format('DD/MM/YYYY') && (
                            <Typography className="text-[10px] font-medium text-[#777E90]">
                              {t('short-week-days.today')}
                            </Typography>
                          )}
                        </div>
                      )
                    }
                  }
                })}
                {/* {blockedDays.some((d) => dayjs(d).isSame(day, 'day')) && (
                <Typography className="absolute w-full h-full  border-l-[4px] border-[#232E40] bg-[#232E4033] px-1 rounded">
                  <span className="text-[11px] absolute bottom-1 font-medium text-white bg-[#232E40] p-1 rounded">Заблокировано</span>
                </Typography>
              )} */}
                {isBlocked && (
                  <Typography
                    className={`absolute h-full w-full ${
                      isFirstBlockedDay ? 'border-l-[4px] border-[#232E40]' : ''
                    } rounded bg-[#232E4033] px-1`}
                  >
                    {isFirstBlockedDay && (
                      <span className="absolute bottom-1 rounded bg-[#232E40] p-1 text-[11px] font-medium text-white">
                        Заблокировано
                      </span>
                    )}
                  </Typography>
                )}
                <Typography className="text-sm font-medium text-[#232E40]">
                  {dayjs(day).format('D') === 'Invalid Date' ? '' : dayjs(day).format('D')}
                </Typography>
                {dayjs(day).format('DD/MM/YYYY') === dayjs(new Date()).format('DD/MM/YYYY') && (
                  <Typography className="text-[10px] font-medium text-[#777E90]">
                    {t('short-week-days.today')}
                  </Typography>
                )}
              </Flex>
            )
          })}
        </Flex>
      </Flex>
    </Flex>
  )
}
