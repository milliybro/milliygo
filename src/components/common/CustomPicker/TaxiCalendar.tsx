import dayjs, { Dayjs } from 'dayjs'
import 'dayjs/locale/ru'
import 'dayjs/locale/uz-latn'
import 'dayjs/locale/en'
import { useTranslations } from 'next-intl'
import { memo, useEffect, useState } from 'react'
import { Divider, Input, Popover, Select } from 'antd'

import CalendarGrid from './CalendarGrid'
import CalendarIcon from '@/components/icons/calendar'
import ArrowLeftIcon from '@/components/icons/arrow-left'
import ArrowRightIcon from '@/components/icons/arrow-right'
import CloseIcon from '@/components/icons/close'
import ArrowDown from '@/components/icons/arrow-down'
import useWindowSize from '@/hooks/useWindowsSize'

const TaxiCalendarPicker = ({
  value,
  onChange,
  placeholder,
  size = 'small',
  disabledPast = false,
}: any) => {
  const t = useTranslations()
  const [openPopover, setOpenPopover] = useState(false)
  const [baseMonth, setBaseMonth] = useState(dayjs())

  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null)
  const [hour, setHour] = useState<number | null>(null)
  const [minute, setMinute] = useState<number | null>(null)

  const { Option } = Select
  const width = useWindowSize()

  const currentLocale = dayjs.locale()
  const effectiveLocale = currentLocale === 'uz-latn' ? 'uz-latn' : currentLocale

  /** Sync props -> local state */
  useEffect(() => {
    if (!value || !dayjs.isDayjs(value)) {
      setSelectedDate(null)
      setHour(null)
      setMinute(null)
      return
    }

    setSelectedDate(value)
    setHour(value.hour())
    setMinute(value.minute())
  }, [value])

  const handleSelectDay = (date: Dayjs) => {
    setSelectedDate(date)

    if (hour != null && minute != null) {
      const fullDate = date.hour(hour).minute(minute)
      onChange?.(fullDate)
    } else {
      onChange?.(null)
    }
  }

  const handleTimeChange = (updated: Partial<{ hour: number; minute: number }>) => {
    const h = updated.hour ?? hour
    const m = updated.minute ?? minute

    setHour(h)
    setMinute(m)

    if (selectedDate && h != null && m != null) {
      onChange?.(selectedDate.hour(h).minute(m))
    }
  }

  const formatDisplay = (d?: Dayjs) =>
    dayjs.isDayjs(d) ? d.locale(effectiveLocale).format('D MMMM, YYYY HH:mm') : ''

  const content = (
    <div className="w-[320px] select-none">
      <div className="mb-2 grid grid-cols-1">
        <div className="flex items-center">
          <button
            onClick={() => setBaseMonth(baseMonth.subtract(1, 'month'))}
            className="text-[24px] text-[#777E90]"
          >
            <ArrowLeftIcon />
          </button>

          <div className="flex-1 text-center text-[18px] font-medium capitalize">
            {baseMonth.locale(effectiveLocale).format('MMMM YYYY')}
          </div>

          <button
            onClick={() => setBaseMonth(baseMonth.add(1, 'month'))}
            className="text-[24px] text-[#777E90]"
          >
            <ArrowRightIcon />
          </button>
        </div>
      </div>

      <CalendarGrid
        month={baseMonth.month()}
        year={baseMonth.year()}
        value={{ departure: selectedDate, returning: null }}
        onSelect={handleSelectDay}
        today={dayjs()}
        disablePast={disabledPast}
      />

      <Divider />

      <div className="mt-2 flex items-center justify-between">
        <div className="flex gap-3">
          <Select
            value={hour ?? undefined}
            className="!w-[70px]"
            suffixIcon={<ArrowDown />}
            onChange={(h) => handleTimeChange({ hour: h })}
          >
            {Array.from({ length: 24 }, (_, i) => (
              <Option key={i} value={i}>
                {i.toString().padStart(2, '0')}
              </Option>
            ))}
          </Select>

          <Select
            value={minute ?? undefined}
            className="!w-[70px]"
            suffixIcon={<ArrowDown />}
            onChange={(m) => handleTimeChange({ minute: m })}
          >
            {Array.from({ length: 60 }, (_, i) => (
              <Option key={i} value={i}>
                {i.toString().padStart(2, '0')}
              </Option>
            ))}
          </Select>
        </div>

        <div className="text-sm text-[#777E90]">
          {selectedDate ? selectedDate.format('DD/MM/YYYY') : '—'}
        </div>
      </div>
    </div>
  )

  return (
    <Popover
      content={content}
      trigger="click"
      placement={width < 400 ? 'bottom' : 'bottomLeft'}
      rootClassName="z-[1000]"
      open={openPopover}
      onOpenChange={setOpenPopover}
    >
      <div className="relative w-full">
        <Input
          size={size}
          readOnly
          prefix={<CalendarIcon />}
          placeholder={placeholder ?? t('transport.when')}
          value={formatDisplay(selectedDate ?? undefined)}
          onClick={() => setOpenPopover(true)}
        />

        {selectedDate && (
          <button
            type="button"
            className="absolute right-4 top-[50%] translate-y-[-50%] rounded-full bg-secondary/10 p-1.5 text-secondary"
            onClick={(e) => {
              e.stopPropagation()
              setSelectedDate(null)
              setHour(null)
              setMinute(null)
              onChange?.(null)
            }}
          >
            <CloseIcon />
          </button>
        )}
      </div>
    </Popover>
  )
}

export default memo(TaxiCalendarPicker)
