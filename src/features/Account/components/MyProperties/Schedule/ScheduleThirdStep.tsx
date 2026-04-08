/* eslint-disable no-unused-vars */
import React, { useMemo } from 'react'
import { Button, Divider, Flex, Radio, Typography } from 'antd'
import { useTranslations } from 'next-intl'
import ReactDatePicker from 'react-datepicker'

function ScheduleThirdStep({
  setCurrentStep,
  form,
  setActiveTab,
}: {
  setCurrentStep: (step: number) => void
  form: any
  setActiveTab: (tab: string) => void
}): React.ReactElement {
  const t = useTranslations()

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  const days = [
    t('short-week-days.monday'),
    t('short-week-days.tuesday'),
    t('short-week-days.wednesday'),
    t('short-week-days.thursday'),
    t('short-week-days.friday'),
    t('short-week-days.saturday'),
    t('short-week-days.sunday'),
  ]

  const months = [
    t('months.january'),
    t('months.february'),
    t('months.march'),
    t('months.april'),
    t('months.may'),
    t('months.june'),
    t('months.july'),
    t('months.august'),
    t('months.september'),
    t('months.october'),
    t('months.november'),
    t('months.december'),
  ]

  const locale: any = {
    localize: {
      day: (n: any) => days[n],
      month: (n: any) => months[n],
    },
    formatLong: {
      date: () => 'mm/dd/yyyy',
    },
  }

  return (
    <Flex vertical gap={24} className="mb-4">
      <Typography className="text-lg font-semibold text-[#232E40]">
        {t('my-properties.ready-to-guests')}
      </Typography>

      <Radio.Group
        onChange={(e) => form.setValue('schedule.readyToGuests', e.target.value)}
        value={form.watch('schedule.readyToGuests')}
      >
        <Radio value={1}>{t('my-properties.right-now')}</Radio>
        <Radio value={2}>{t('my-properties.later')}</Radio>
      </Radio.Group>

      {form.watch('schedule.readyToGuests') === 2 && (
        <Flex className="scheduleCalendar">
          <ReactDatePicker
            locale={locale}
            selected={form.watch('schedule.startDate')}
            minDate={new Date()}
            onChange={(date) => form.setValue('schedule.startDate', date)}
            inline
          />
        </Flex>
      )}

      <Divider className="m-0" />

      <Typography className="text-lg font-semibold text-[#232E40]">
        {t('my-properties.allow-long-term')}
      </Typography>

      <Typography className="text-[#777E90]">
        {t('my-properties.allow-long-term-description')}
      </Typography>

      <Radio.Group
        onChange={(e) => form.setValue('schedule.allowLongTerm', e.target.value)}
        value={form.watch('schedule.allowLongTerm')}
        defaultValue={false}
      >
        <Radio value={true}>{t('my-properties.yes')}</Radio>
        <Radio value={false}>{t('my-properties.no')}</Radio>
      </Radio.Group>

      <Flex vertical gap={24}>
        <Flex vertical>
          <Flex className="mt-4">
            <div className="grid w-full grid-cols-2 gap-8">
              <Button
                aria-label={t('my-properties.prev')}
                className="h-[58px] rounded-2xl bg-secondary-light/10 font-medium text-primary-dark shadow-none"
                onClick={() => {
                  scrollToTop()
                  setCurrentStep(2)
                }}
              >
                {t('my-properties.prev')}
              </Button>
              <Button
                aria-label={t('my-properties.next')}
                type="primary"
                className="h-[58px] rounded-2xl bg-[#3276FF] shadow-none hover:!bg-[#3276FF]/70"
                onClick={() => {
                  scrollToTop()
                  setActiveTab('verification-completion')
                }}
              >
                {t('my-properties.next')}
              </Button>
            </div>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default ScheduleThirdStep
