import CalendarIcon from '@/components/icons/calendar'
import { DatePicker, Divider, Form, Input, Select, Typography } from 'antd'
import { memo } from 'react'

import dayjs from 'dayjs'
import { useTranslations } from 'next-intl'

const ThirdContent = ({ form }: { form: any }) => {
  const t = useTranslations()

  const startDate = Form.useWatch('start_date', form)?.format('YYYY-MM-DD')

  const visaTypes = [
    { label: 'D-1', value: 'D-1' },
    { label: 'D-2', value: 'D-2' },
    { label: 'DT', value: 'DT' },
    { label: 'S-1', value: 'S-1' },
    { label: 'S-2', value: 'S-2' },
    { label: 'S-3', value: 'S-3' },
    { label: 'O', value: 'O' },
    { label: 'B-1', value: 'B-1' },
    { label: 'B-2', value: 'B-2' },
    { label: 'T', value: 'T' },
    { label: 'TG', value: 'TG' },
    { label: 'E', value: 'E' },
    { label: 'J-1', value: 'J-1' },
    { label: 'J-2', value: 'J-2' },
    { label: 'PV-1', value: 'PV-1' },
    { label: 'PV-2', value: 'PV-2' },
    { label: 'A-1', value: 'A-1' },
    { label: 'A-2', value: 'A-2' },
    { label: 'C-1', value: 'C-1' },
    { label: 'C-2', value: 'C-2' },
    { label: 'TRANZ', value: 'TRANZ' },
    { label: 'EXIT', value: 'EXIT' },
    { label: 'MED', value: 'MED' },
    { label: 'INV', value: 'INV' },
    { label: 'VTD', value: 'VTD' },
    { label: 'A-3', value: 'A-3' },
    { label: 'PLG', value: 'PLG' },
    { label: 'EV', value: 'EV' },
    { label: 'STD', value: 'STD' },
    { label: 'PZ', value: 'PZ' },
    { label: 'IT', value: 'IT' },
  ]

  const options = [
    { value: 'work', label: t('visit-type.work') },
    { value: 'education', label: t('visit-type.education') },
    { value: 'tourist', label: t('visit-type.tourist') },
    { value: 'private', label: t('visit-type.private') },
    { value: 'other', label: t('visit-type.other') },
    {
      value: 'visiting_friends_relatives',
      label: t('visit-type.visiting_friends_relatives'),
    },
    {
      value: 'health_and_wellness_procedures',
      label: t('visit-type.health_and_wellness_procedures'),
    },
    {
      value: 'religion_pilgrimage',
      label: t('visit-type.religion_pilgrimage'),
    },
    { value: 'visiting_shops', label: t('visit-type.visiting_shops') },
    { value: 'transit', label: t('visit-type.transit') },
    { value: 'sports_and_culture', label: t('visit-type.sports_and_culture') },
    { value: 'for_leisure', label: t('visit-type.for_leisure') },
    { value: 'guest', label: t('visit-type.guest') },
    { value: 'official', label: t('visit-type.official') },
    { value: 'as_a_compatriot', label: t('visit-type.as_a_compatriot') },
    {
      value: 'as_an_honorary_citizen',
      label: t('visit-type.as_an_honorary_citizen'),
    },
    { value: 'as_an_investor', label: t('visit-type.as_an_investor') },
  ]

  return (
    <div className="flex h-full max-h-[635px] flex-col overflow-auto">
      <Typography.Text className="text-[18px] font-medium">
        {t('my-properties.add-info')}
      </Typography.Text>
      <Divider />
      <div className="mb-6 grid grid-cols-1 gap-4">
        <div className="grid grid-cols-2 gap-4">
          <Form.Item
            rules={[{ required: true, message: t('my-properties.select-visa') }]}
            label={t('my-properties.visa')}
            name="visa_type"
          >
            <Select
              size="large"
              allowClear
              showSearch={false}
              options={visaTypes}
              placeholder={t('my-properties.select-visa')}
              optionRender={(props: any) => (
                <div className="flex items-center gap-4">{props.label}</div>
              )}
              tagRender={(props: any) => (
                <div className="flex items-center gap-4">{props.label}</div>
              )}
            />
          </Form.Item>
          <Form.Item label={t('my-properties.number-visa')} name="visa_number">
            <Input type="number" placeholder={t('my-properties.select')} size="large" />
          </Form.Item>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Form.Item
            rules={[
              { required: true, message: t('personal-information.select-birth-date-warning') },
            ]}
            label={t('my-properties.visa-date-from')}
            name="start_date"
            className=""
          >
            <DatePicker
              format={{
                format: 'DD.MM.YYYY',
                type: 'mask',
              }}
              placeholder={t('tours.date')}
              size="large"
              className="h-[47px] w-full px-4"
              showNow={false}
              superPrevIcon={null}
              superNextIcon={null}
              suffixIcon={<CalendarIcon className="text-base" />}
            />
          </Form.Item>

          <Form.Item
            rules={[
              { required: true, message: t('personal-information.select-birth-date-warning') },
            ]}
            label={t('my-properties.visa-date-to')}
            name="expiry_date"
            className=""
          >
            <DatePicker
              format={{
                format: 'DD.MM.YYYY',
                type: 'mask',
              }}
              placeholder={t('tours.date')}
              size="large"
              className="h-[47px] w-full px-4"
              showNow={false}
              superPrevIcon={null}
              superNextIcon={null}
              suffixIcon={<CalendarIcon className="text-base" />}
              disabledDate={(current) => current && current < dayjs(startDate)}
            />
          </Form.Item>
        </div>

        <Form.Item label={t('my-properties.checkpoint-number')} name="kpp_nomer">
          <Input placeholder={t('my-properties.select-number')} size="large" />
        </Form.Item>
        <Form.Item
          rules={[{ required: true, message: t('personal-information.select-birth-date-warning') }]}
          label={t('my-properties.checkpoint-date')}
          name="kpp_date"
          className=""
        >
          <DatePicker
            format={{
              format: 'DD.MM.YYYY',
              type: 'mask',
            }}
            placeholder={t('tours.date')}
            size="large"
            className="h-[47px] w-full px-4"
            showNow={false}
            superPrevIcon={null}
            superNextIcon={null}
            suffixIcon={<CalendarIcon className="text-base" />}
          />
        </Form.Item>
        <Form.Item
          rules={[{ required: true }]}
          label={t('my-properties.type-visit')}
          name="type_visit"
        >
          <Select
            size="large"
            allowClear
            showSearch={false}
            options={options}
            placeholder={t('my-properties.select')}
            optionRender={(props: any) => (
              <div className="flex items-center gap-4">{props.label}</div>
            )}
            tagRender={(props: any) => <div className="flex items-center gap-4">{props.label}</div>}
          />
        </Form.Item>

        <Form.Item
          rules={[{ required: true, message: t('tariff-plans-page.name.rule') }]}
          label={t('my-properties.type-guest')}
          name="guest_type"
        >
          <Select
            size="large"
            allowClear
            showSearch={false}
            options={[
              {
                value: 'pensioner',
                label: t('guest-type.pensioner'),
              },
              {
                value: 'student',
                label: t('guest-type.student'),
              },
              {
                value: 'dependent',
                label: t('guest-type.dependent'),
              },
              {
                value: 'other',
                label: t('guest-type.other'),
              },
            ]}
            placeholder={t('my-properties.select')}
            optionRender={(props: any) => {
              return <div className="flex items-center gap-4">{props.label}</div>
            }}
            tagRender={(props: any) => {
              return <div className="flex items-center gap-4">{props.label}</div>
            }}
          />
        </Form.Item>
      </div>
    </div>
  )
}

export default memo(ThirdContent)
