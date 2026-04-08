import CalendarIcon from '@/components/icons/calendar'
import { DatePicker, Divider, Form, Input, Select, Typography } from 'antd'
import { useTranslations } from 'next-intl'
import { Dispatch, memo, SetStateAction } from 'react'

const FirstContent = ({
  countries,
  setSearch,
  search,
  setFormData,
}: {
  countries?: any
  setPage: Dispatch<SetStateAction<number>>
  page: number
  setSearch: any
  search: any
  setFormData: Dispatch<SetStateAction<any>>
}) => {
  const t = useTranslations()

  let currentLang = localStorage.getItem('i18nextLng') || 'ru'

  if (currentLang === 'uz') {
    currentLang = 'uz-cyrillic'
  } else if (currentLang === 'oz') {
    currentLang = 'uz-latin'
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }))
  }
  return (
    <div className="flex h-full max-h-[635px] flex-col overflow-auto">
      <Typography.Text className="text-[18px] font-medium">
        {t('my-properties.search-guest')}
      </Typography.Text>
      <Divider />
      <div className="mb-6 grid grid-cols-1 gap-0">
        <Form.Item
          label={t('personal-information.citizenship')}
          name="citizenship"
          rules={[{ required: true }]}
        >
          <Select
            size="large"
            allowClear
            showSearch
            options={countries}
            placeholder={t('personal-information.citizenship-text')}
            onSearch={setSearch}
            searchValue={search}
            filterOption={false}
            {...{ autoComplete: 'none' }}
          />
        </Form.Item>
        <Form.Item
          rules={[{ required: true }]}
          label={t('personal-information.birth-date')}
          name="birth_date"
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
            onChange={(dateString) => {
              const formattedDate = Array.isArray(dateString) ? dateString[0] : dateString
              handleInputChange('birthday', formattedDate as any)
            }}
            suffixIcon={<CalendarIcon className="text-base" />}
          />
        </Form.Item>

        <Form.Item
          name="serialnumber_or_pinfl"
          label={t('transport.document_number.label')}
          rules={[{ required: true }]}
        >
          <Input
            placeholder="AC0000000"
            maxLength={9}
            size="large"
            onBlur={(e) => handleInputChange('passport', e.target.value)}
          />
        </Form.Item>
      </div>
    </div>
  )
}

export default memo(FirstContent)
