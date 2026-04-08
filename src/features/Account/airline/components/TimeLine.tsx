import { FC, useEffect, useState } from 'react'
import { Tooltip, Typography } from 'antd'
import AirplaneIcon from '@/components/icons/airplane-icon'
import AirplaneIcon2 from '@/components/icons/airplane-icon2'
import { useTranslations } from 'next-intl'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import { useRouter } from 'next/router'

interface Segment {
  departure_datetime: string
  arrival_datetime: string
  departure_airport: {
    location: string
    name: string
    region_name: string
  }
  arrival_airport: {
    location: string
    name: string
    region_name: string
  }
}

interface IProps {
  destination?: any[] // massiv bo‘ladi
}

type TimelinePart = {
  type: 'flight' | 'layover'
  from?: string
  to?: string
  durationMin: number
  location: string
  fromName: string
  toName: string
  fromRegion: string
  toRegion: string
  readableDuration: string
}

const TimelineOrder: FC<IProps> = ({ destination }) => {
  const t = useTranslations()
  const [timelineParts, setTimelineParts] = useState<TimelinePart[]>([])

  const { query } = useRouter()

  dayjs.extend(duration)

  useEffect(() => {
    if (!destination || destination.length === 0) return

    const segs: Segment[] = destination.map((d) => ({
      departure_datetime: `${d?.dep_date}T${d?.dep_time}`,
      arrival_datetime: `${d?.arr_date}T${d?.arr_time}`,
      departure_airport: {
        location: d?.dep_airport?.airport_code,
        name: d?.dep_airport?.airport_name || '',
        region_name: d?.dep_airport?.city || '',
      },
      arrival_airport: {
        location: d?.arr_airport?.airport_code,
        name: d?.arr_airport?.airport_name || '',
        region_name: d?.arr_airport?.city || '',
      },
    }))

    const parts: TimelinePart[] = []

    const formatTime = (d: any) => {
      const hours = d.hours()
      const minutes = d.minutes()
      if (hours && minutes) return `${hours} ${t('guide-account.hour')} ${minutes}m`
      if (hours) return `${hours} ${t('guide-account.hour')}`
      return `${minutes}m`
    }

    for (let i = 0; i < segs.length; i++) {
      const seg = segs[i]
      const dep = new Date(seg.departure_datetime)
      const arr = new Date(seg.arrival_datetime)
      const durationMin = Math.floor((arr.getTime() - dep.getTime()) / (1000 * 60))
      const readableDuration = formatTime(dayjs.duration(durationMin, 'minutes'))

      parts.push({
        type: 'flight',
        from: seg.departure_airport?.location,
        to: seg.arrival_airport?.location,
        durationMin,
        readableDuration,
        location: seg.arrival_airport?.location,
        fromName: seg.departure_airport?.name,
        toName: seg.arrival_airport?.name,
        fromRegion: seg.departure_airport?.region_name,
        toRegion: seg.arrival_airport?.region_name,
      })

      if (i < segs.length - 1) {
        const nextDep = new Date(segs[i + 1].departure_datetime)
        const layoverMin = Math.floor((nextDep.getTime() - arr.getTime()) / (1000 * 60))
        const readableLayover = formatTime(dayjs.duration(layoverMin, 'minutes'))

        parts.push({
          type: 'layover',
          durationMin: layoverMin,
          readableDuration: readableLayover,
          location: seg.arrival_airport?.location,
          fromName: seg.departure_airport?.name,
          toName: seg.arrival_airport?.name,
          fromRegion: seg.departure_airport?.region_name,
          toRegion: seg.arrival_airport?.region_name,
        })
      }
    }
    setTimelineParts(parts)
  }, [destination])

  const totalDuration = timelineParts.reduce((acc, p) => acc + p.durationMin, 0)

  return (
    <>
      {query?.is_round ? (
        <div className="flex w-full flex-col gap-3">
          <div className="flex items-center justify-between">
            <AirplaneIcon className="text-[24px] text-[#777E90]" />
            <Typography.Text className="text-[15px] font-[500] text-[#777E90]">
              {t('travel-package.on-road', {
                time: `${Math.floor(totalDuration / 60)} ${t('guide-account.hour')} ${totalDuration % 60}m`,
              })}
            </Typography.Text>
            <AirplaneIcon2 className="text-[24px] text-[#777E90]" />
          </div>

          <div className="relative flex w-full items-center gap-0">
            {timelineParts.map((part, index) => {
              const widthPercent = (part.durationMin / totalDuration) * 100
              const isFlight = part.type === 'flight'
              const isLayover = part.type === 'layover'
              const isFirstFlight =
                isFlight && timelineParts.findIndex((p) => p.type === 'flight') === index
              const isLastFlight =
                isFlight && timelineParts.findLastIndex((p) => p.type === 'flight') === index

              const tooltipTitle = isFlight ? (
                <div className="text-center">
                  {t('travel-package.on-road', {
                    time: part.readableDuration,
                  })}{' '}
                  {t('avia.view-all-tickets')}
                </div>
              ) : (
                <div className="text-center">
                  {t('avia.transfer-layover', {
                    time: part.readableDuration,
                  })}{' '}
                  {part.toRegion}
                </div>
              )

              return (
                <Tooltip title={tooltipTitle} key={index}>
                  <div className="relative flex items-center" style={{ width: `${widthPercent}%` }}>
                    {isFlight && isFirstFlight && (
                      <div className="absolute bottom-[-32px] left-0 flex -translate-x-1/2 flex-col items-center">
                        <div className="text-[13px] font-semibold text-primary">{part.from}</div>
                      </div>
                    )}

                    {isLayover && part?.location && (
                      <div className="absolute bottom-[-32px] left-1/2 flex -translate-x-1/2 flex-col items-center">
                        <div className="text-[13px] font-semibold text-primary">
                          {part?.location}
                        </div>
                      </div>
                    )}

                    <div
                      className={`w-full cursor-pointer ${
                        isFlight ? 'h-[6px] bg-[#B7BFD5]' : 'h-[2px] bg-[#CBD5E1]'
                      } rounded-full`}
                    />

                    {isLastFlight && (
                      <div className="absolute bottom-[-32px] right-0 flex translate-x-1/2 flex-col items-center">
                        <div className="text-[13px] font-semibold text-primary">{part.to}</div>
                      </div>
                    )}
                  </div>
                </Tooltip>
              )
            })}
          </div>
        </div>
      ) : (
        <div className="flex w-full flex-col gap-3">
          <div className="flex items-center justify-between">
            <AirplaneIcon className="text-[24px] text-[#777E90]" />
            <Typography.Text className="text-xs font-[500] text-[#777E90] sm:text-[15px]">
              {t('travel-package.on-road', {
                time: `${Math.floor(totalDuration / 60)} ${t('guide-account.hour')} ${totalDuration % 60}m`,
              })}
            </Typography.Text>
            <AirplaneIcon2 className="text-[24px] text-[#777E90]" />
          </div>

          <div className="relative flex w-full items-center gap-0">
            {timelineParts.map((part, index) => {
              const widthPercent = (part.durationMin / totalDuration) * 100
              const isFlight = part.type === 'flight'
              const isLayover = part.type === 'layover'
              const isFirstFlight =
                isFlight && timelineParts.findIndex((p) => p.type === 'flight') === index
              const isLastFlight =
                isFlight && timelineParts.findLastIndex((p) => p.type === 'flight') === index

              const tooltipTitle = isFlight ? (
                <div className="text-center">
                  {t('travel-package.on-road', {
                    time: part.readableDuration,
                  })}{' '}
                  {t('avia.view-all-tickets')}
                </div>
              ) : (
                <div className="text-center">
                  {t('avia.transfer-layover', {
                    time: part.readableDuration,
                  })}{' '}
                  {part.toRegion}
                </div>
              )

              return (
                <Tooltip title={tooltipTitle} key={index}>
                  <div className="relative flex items-center" style={{ width: `${widthPercent}%` }}>
                    {isFlight && isFirstFlight && (
                      <div className="-translate-x-2/2 absolute bottom-[-32px] left-0 flex flex-col items-center lg:-translate-x-1/2">
                        <div className="text-[13px] font-semibold text-primary">{part.from}</div>
                      </div>
                    )}

                    {isLayover && part?.location && (
                      <div className="absolute bottom-[-32px] left-1/2 flex -translate-x-1/2 flex-col items-center">
                        <div className="text-[13px] font-semibold text-primary">
                          {part?.location}
                        </div>
                      </div>
                    )}

                    <div
                      className={`w-full cursor-pointer ${
                        isFlight ? 'h-[6px] bg-[#B7BFD5]' : 'h-[2px] bg-[#CBD5E1]'
                      } rounded-full`}
                    />

                    {isLastFlight && (
                      <div className="translate-x-2/2 absolute bottom-[-32px] right-0 flex flex-col items-center lg:translate-x-1/2">
                        <div className="text-[13px] font-semibold text-primary">{part.to}</div>
                      </div>
                    )}
                  </div>
                </Tooltip>
              )
            })}
          </div>
        </div>
      )}
    </>
  )
}

export default TimelineOrder
