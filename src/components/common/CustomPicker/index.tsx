import { Divider, Form, Input, Popover, Select } from 'antd'
import dayjs, { Dayjs } from 'dayjs'
import 'dayjs/locale/en'
import 'dayjs/locale/ru'
import 'dayjs/locale/uz-latn'
import { useTranslations } from 'next-intl'
import { memo, useEffect, useRef, useState } from 'react'

import ArrowDown from '@/components/icons/arrow-down'
import ArrowLeftIcon from '@/components/icons/arrow-left'
import ArrowRightIcon from '@/components/icons/arrow-right'
import CalendarIcon from '@/components/icons/calendar'
import CloseIcon from '@/components/icons/close'
import useWindowSize from '@/hooks/useWindowsSize'
import { CloseOutlined } from '@ant-design/icons'
import CalendarGrid from './CalendarGrid'
import { twMerge } from 'tailwind-merge'

interface RangePlaceholder {
  start?: string
  end?: string
}

interface FlightCalendarPickerProps {
  mode?: 'single' | 'range' | 'double' | 'datetime'
  value?: Dayjs[] | any
  onChange?: any
  placeholder?: string | RangePlaceholder
  size?: 'small' | 'middle' | 'large'
  disabledPast?: boolean
  open?: boolean
}

const CustomPicker = ({
  mode = 'single',
  value,
  onChange,
  placeholder,
  size = 'small',
  disabledPast = false,
  open,
}: FlightCalendarPickerProps) => {
  const t = useTranslations()
  const [openPopover, setOpenPopover] = useState(false)
  const [activeInput, setActiveInput] = useState<'start' | 'end'>('start')
  const [baseMonth, setBaseMonth] = useState(dayjs())
  const [dates, setDates] = useState<{
    start_date?: Dayjs
    end_date?: Dayjs
    hour?: number
    minute?: number
  }>({})

  const { Option } = Select

  const startInputRef = useRef<any>(null)
  const endInputRef = useRef<any>(null)

  const currentLocale = dayjs.locale()
  const effectiveLocale = currentLocale === 'uz-latn' ? 'uz-latn' : currentLocale

  useEffect(() => {
    if (!value) {
      setDates({})
      return
    }

    if (mode === 'datetime') {
      if (dayjs.isDayjs(value)) {
        setDates((prev) => ({
          ...prev,
          start_date: value,
          hour: value.hour() ?? prev.hour ?? 0,
          minute: value.minute() ?? prev.minute ?? 0,
        }))
      }
      return
    }

    if (mode === 'single' && dayjs.isDayjs(value)) {
      setDates({ start_date: value })
      return
    }

    if (Array.isArray(value) && value.length) {
      setDates({ start_date: value[0], end_date: value[1] })
    } else {
      setDates({})
    }
  }, [value, mode])

  const formatDisplay = (d?: Dayjs) => (d ? d.locale(effectiveLocale).format('D MMMM, YYYY') : '')

  useEffect(() => {
    if (!value || !mode) return

    if (mode === 'single' && dayjs.isDayjs(value)) {
      return
    }
  }, [mode])

  const handleSelect = (date: Dayjs) => {
    const { start_date, end_date } = dates

    if (mode === 'datetime') {
      const now = dayjs()
      let hour = dates.hour ?? 0
      let minute = dates.minute ?? 0

      if (date.isSame(now, 'day')) {
        const nextMinute = now.add(1, 'minute')
        hour = nextMinute.hour()
        minute = nextMinute.minute()
      }

      const newDates = { ...dates, start_date: date, hour, minute }

      setDates(newDates)

      onChange?.(date.hour(hour).minute(minute))

      return
    }

    if (mode === 'single') {
      setDates({ start_date: date })
      onChange?.(date)
      setOpenPopover(false)
      return
    }

    if (mode === 'double') {
      if (activeInput !== 'start') {
        setDates({ start_date: date, end_date })
        onChange?.([date, end_date as Dayjs])
        setActiveInput('end')
      } else {
        const newDates = {
          start_date: start_date,
          end_date: date.isBefore(start_date) ? start_date : date,
        }
        setDates(newDates)
        onChange?.([newDates.start_date as Dayjs, newDates.end_date as Dayjs])
        setOpenPopover(false)
      }
      return
    }

    if (!start_date || (start_date && end_date)) {
      const newDates = { start_date: date, end_date: undefined }
      setDates(newDates)
      onChange?.([date])
    } else if (date.isBefore(start_date, 'day')) {
      const newDates = { start_date: date, end_date: undefined }
      setDates(newDates)
      onChange?.([date])
    } else {
      const newDates = { start_date, end_date: date, is_round: true }
      setDates(newDates)
      onChange?.([start_date, date])
      setOpenPopover(false)
    }
  }

  useEffect(() => {
    if (
      mode === 'datetime' &&
      dates.start_date &&
      dates.hour !== undefined &&
      dates.minute !== undefined
    ) {
      const fullDate = dates.start_date.hour(dates.hour).minute(dates.minute)
      onChange?.(fullDate)
    }
  }, [dates.hour, dates.minute, dates.start_date, mode])

  const formattedValue = (() => {
    if (!value) return ''

    if (mode === 'datetime' && dates.start_date) {
      const date = dates.start_date
      const h = (dates.hour ?? 0).toString().padStart(2, '0')
      const m = (dates.minute ?? 0).toString().padStart(2, '0')
      return `${formatDisplay(date)} ${h}:${m}`
    }

    if (mode === 'single') {
      return formatDisplay(dayjs.isDayjs(value) ? value : value[0])
    }

    if (Array.isArray(value)) {
      if (value[0] && value[1]) return `${formatDisplay(value[0])} - ${formatDisplay(value[1])}`
      if (value[0]) return formatDisplay(value[0])
    }

    return ''
  })()
  const width = useWindowSize()

  const renderCalendars = () => {
    const today = dayjs()

    if (mode === 'datetime') {
      return (
        <CalendarGrid
          month={baseMonth.month()}
          year={baseMonth.year()}
          value={{ departure: dates.start_date || null, returning: null }}
          onSelect={handleSelect}
          today={today}
          disablePast={disabledPast}
        />
      )
    }

    if (mode === 'single') {
      return (
        <CalendarGrid
          month={baseMonth.month()}
          year={baseMonth.year()}
          value={{ departure: dates.start_date || null, returning: null }}
          onSelect={handleSelect}
          today={today}
          disablePast={disabledPast}
        />
      )
    }

    return (
      <>
        {width > 765 ? (
          <div className="flex gap-[48px] *:grow">
            <CalendarGrid
              month={baseMonth.month()}
              year={baseMonth.year()}
              value={{ departure: dates.start_date || null, returning: dates.end_date || null }}
              onSelect={handleSelect}
              today={today}
              disablePast={disabledPast}
            />
            <CalendarGrid
              month={baseMonth.add(1, 'month').month()}
              year={baseMonth.add(1, 'month').year()}
              value={{ departure: dates.start_date || null, returning: dates.end_date || null }}
              onSelect={handleSelect}
              today={today}
              disablePast={disabledPast}
            />
          </div>
        ) : (
          <CalendarGrid
            month={baseMonth.month()}
            year={baseMonth.year()}
            value={{ departure: dates.start_date || null, returning: dates.end_date || null }}
            onSelect={handleSelect}
            today={today}
            disablePast={disabledPast}
          />
        )}
      </>
    )
  }

  const sizeClass = {
    small: 'text-sm py-1.5 px-2.5',
    middle: 'text-base py-2 px-3',
    large: 'text-base py-[15px] px-3.5',
  }[size]

  const normalizedPlaceholder =
    mode === 'single' || mode === 'datetime'
      ? typeof placeholder === 'string'
        ? placeholder
        : t('transport.when')
      : typeof placeholder === 'object'
        ? `${placeholder.start || t('transport.when')} - ${placeholder.end || t('others.come-back')}`
        : `${t('transport.when')} - ${t('others.come-back')}`

  const content = (
    <div
      className={twMerge(
        'select-none',
        mode === 'single' || mode === 'datetime'
          ? 'w-[320px]'
          : width < 765
            ? 'w-[320px]'
            : `w-[685px]`,
        open ? 'w-[750px]' : ''
      )}
    >
      <div
        className={twMerge(
          'grid',
          mode === 'single' || mode === 'datetime'
            ? 'grid-cols-1'
            : width > 765
              ? 'grid-cols-2'
              : 'grid-cols-1',
          'mb-2 gap-[0px]'
        )}
      >
        <div className="flex items-center">
          <button
            onClick={() => setBaseMonth(baseMonth.subtract(1, 'month'))}
            className="text-[24px] capitalize text-[#777E90]"
          >
            <ArrowLeftIcon />
          </button>
          <div className="flex-1 text-center text-[18px] font-medium capitalize">
            {baseMonth.locale(effectiveLocale).format('MMMM YYYY')}
          </div>

          <div className="flex justify-end">
            {(mode === 'single' || mode === 'datetime' || width < 765) && (
              <button
                onClick={() => setBaseMonth(baseMonth.add(1, 'month'))}
                className="text-[24px] capitalize text-[#777E90]"
              >
                <ArrowRightIcon />
              </button>
            )}
          </div>
        </div>
        <div className={`${width > 765 ? '' : 'hidden'}`}>
          {mode !== 'single' && mode !== 'datetime' && (
            <>
              <div className="flex items-center">
                <div className="flex-1 text-center text-[18px] font-medium capitalize">
                  {baseMonth.add(1, 'month').locale(effectiveLocale).format('MMMM YYYY')}
                </div>
                <button
                  onClick={() => setBaseMonth(baseMonth.add(1, 'month'))}
                  className="text-[24px] text-[#777E90]"
                >
                  <ArrowRightIcon />
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {renderCalendars()}
      <Divider className="mb-0 mt-3 p-0" />
      <div className="h-30px] m-0 flex items-center justify-between p-0">
        {mode === 'datetime' && (
          <div className="mt-4 flex items-center justify-start gap-4">
            <div className="custom-select">
              <Select
                className="!w-[70px] rounded-[8px] border border-[#00103D1F] bg-white p-0"
                size="middle"
                suffixIcon={<ArrowDown className="text-gray-400" />}
                value={dates.hour ?? undefined}
                onChange={(hour) => setDates((prev) => ({ ...prev, hour }))}
              >
                {Array.from({ length: 24 }, (_, i) => {
                  const disabled = dates.start_date?.isSame(dayjs(), 'day') && i < dayjs().hour()
                  return (
                    <Option key={i} value={i} disabled={disabled}>
                      {i.toString().padStart(2, '0')}
                    </Option>
                  )
                })}
              </Select>
            </div>

            <div className="custom-select">
              <Select
                className="!w-[70px] rounded-[8px] border border-[#00103D1F]"
                size="middle"
                value={dates.minute ?? undefined}
                suffixIcon={<ArrowDown className="text-gray-400" />}
                onChange={(minute) => setDates((prev) => ({ ...prev, minute }))}
              >
                {Array.from({ length: 60 }, (_, i) => {
                  const disabled =
                    dates.start_date?.isSame(dayjs(), 'day') &&
                    dates.hour === dayjs().hour() &&
                    i < dayjs().minute()
                  return (
                    <Option key={i} value={i} disabled={disabled}>
                      {i.toString().padStart(2, '0')}
                    </Option>
                  )
                })}
              </Select>
            </div>
          </div>
        )}
        <div className="pt-4 text-end text-[14px] font-[400] text-[#777E90]">
          {dates.start_date
            ? dates.end_date
              ? `${dates.start_date.format('DD/MM/YYYY')} - ${dates.end_date.format('DD/MM/YYYY')}`
              : `${dates.start_date.format('DD/MM/YYYY')}`
            : '—'}
        </div>
      </div>
    </div>
  )

  if (mode === 'double') {
    return (
      <div className="flex items-center gap-3">
        <Popover
          content={content}
          trigger="click"
          open={open ?? (openPopover && activeInput === 'start')}
          onOpenChange={(val) => {
            if (open === undefined) setOpenPopover(val)
          }}
          placement="bottomLeft"
          rootClassName="[&_.ant-popover-inner]:p-[20px] [&_.ant-popover-arrow]:hidden"
        >
          <Form.Item name="start_date" className="m-0">
            <Input
              size="large"
              readOnly
              ref={startInputRef}
              prefix={<CalendarIcon className="text-[24px] text-secondary" />}
              placeholder={t('transport.when')}
              value={dates.start_date ? formatDisplay(dates.start_date) : ''}
              onClick={() => {
                setActiveInput('start')
                setOpenPopover(true)
              }}
            />
          </Form.Item>
        </Popover>

        <div className="relative">
          <Popover
            content={content}
            trigger="click"
            open={open ?? (openPopover && activeInput === 'end')}
            onOpenChange={(val) => {
              if (open === undefined) setOpenPopover(val)
            }}
            placement="bottomLeft"
            rootClassName="[&_.ant-popover-inner]:p-[20px] [&_.ant-popover-arrow]:hidden"
          >
            <Form.Item name="end_date" className="m-0">
              <Input
                size="large"
                readOnly
                ref={endInputRef}
                prefix={<CalendarIcon className="text-[24px] text-secondary" />}
                placeholder={t('others.come-back')}
                value={dates.end_date ? formatDisplay(dates.end_date) : ''}
                onClick={() => {
                  setActiveInput('end')
                  setOpenPopover(true)
                }}
              />
            </Form.Item>
          </Popover>

          {dates.end_date && (
            <button
              type="button"
              className="absolute right-4 top-[50%] flex shrink-0 translate-y-[-50%] rounded-full bg-secondary/10 p-1.5 text-[8px] text-secondary hover:bg-secondary/20"
              onClick={(e) => {
                e.stopPropagation()
                setDates((prev) => ({ ...prev, end_date: undefined }))
              }}
            >
              <CloseIcon />
            </button>
          )}
        </div>
      </div>
    )
  }

  return (
    <Popover
      {...(open
        ? {
            getPopupContainer: (triggerNode: HTMLElement) => {
              const modalWrap = triggerNode.closest('.ant-modal-wrap') as HTMLElement
              if (modalWrap) return modalWrap
              return triggerNode.parentNode as HTMLElement
            },
          }
        : {})}
      content={content}
      trigger="click"
      open={open ?? openPopover}
      onOpenChange={(val) => {
        if (open === undefined) setOpenPopover(val)
      }}
      placement={width < 400 ? 'bottom' : 'bottomLeft'}
      rootClassName="z-[100] [&_.ant-popover-inner]:p-[20px] [&_.ant-popover-arrow]:hidden"
    >
      <div className="relative w-full">
        <Input
          size={size}
          readOnly
          prefix={<CalendarIcon className="text-[24px] text-secondary" />}
          placeholder={normalizedPlaceholder}
          value={formattedValue}
          onClick={() => setOpenPopover(true)}
          className={`${open ? 'hidden' : sizeClass}`}
        />
        {!open && (dates.start_date || dates.end_date) && (
          <button
            type="button"
            className="absolute right-4 top-[50%] z-10 flex size-[12px] shrink-0 translate-y-[-50%] items-center justify-center rounded-full bg-secondary/50 text-white hover:bg-secondary/20"
            onClick={(e) => {
              e.stopPropagation()
              setDates({})
              onChange?.([])
            }}
          >
            <CloseOutlined className="text-[8px]" />
          </button>
        )}
      </div>
    </Popover>
  )
}

export default memo(CustomPicker)
