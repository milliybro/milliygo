import CalendarIcon from '@/components/icons/calendar'
import { DatePicker, Divider, Form, Input, Select, Typography } from 'antd'
import { useTranslations } from 'next-intl'
import { Dispatch, memo, SetStateAction } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getOwnerAccomodation } from '../api'

const SecondContent = ({
  countries,
  setPage,
  setSearch,
  passportInfo,
}: {
  countries?: any
  setPage: Dispatch<SetStateAction<number>>
  page: number
  setSearch: Dispatch<SetStateAction<string>>
  passportInfo: any
}) => {
  const t = useTranslations()

  const handleSearch = (_value: string) => {}

  let currentLang = localStorage.getItem('i18nextLng') || 'ru'

  if (currentLang === 'uz') {
    currentLang = 'uz-cyrillic'
  } else if (currentLang === 'oz') {
    currentLang = 'uz-latin'
  }

  const { data: placementsOwner = [] } = useQuery({
    queryKey: ['placementsOwner'],
    queryFn: () => getOwnerAccomodation(),
    refetchOnWindowFocus: false,
    select: (data) =>
      data?.results?.map((item: any) => ({
        label: item.cad_number,
        value: item.id,
      })),
  })

  return (
    <div className="flex h-full max-h-[635px] flex-col overflow-auto">
      <Typography.Text className="text-[18px] font-medium">
        {t('my-properties.info')}
      </Typography.Text>
      <Divider />
      <div className="mb-6 grid grid-cols-1">
        <Form.Item
          label={t('my-properties.number-kadastr')}
          name="cadastr"
          rules={[
            {
              required: true,
              message: t('my-properties.select'),
            },
          ]}
        >
          <Select
            disabled={passportInfo?.gender}
            size="large"
            allowClear
            showSearch={false}
            options={placementsOwner}
            placeholder={t('my-properties.select')}
            optionRender={(props: any) => {
              return <div className="flex items-center gap-4">{props.label}</div>
            }}
            tagRender={(props: any) => {
              return <div className="flex items-center gap-4">{props.label}</div>
            }}
          />
        </Form.Item>

        <Form.Item
          rules={[{ required: true }]}
          label={t('my-properties.issued-date')}
          name="document_given_date"
          className=""
        >
          <DatePicker
            disabled={passportInfo?.datebegin}
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
          rules={[{ required: true, message: t('my-properties.select-number') }]}
          name="document_given_by"
          label={t('my-properties.issued-by')}
        >
          <Input
            disabled={passportInfo?.docgiveplace}
            placeholder={t('my-properties.select-number')}
            size="large"
          />
        </Form.Item>

        <div className="grid grid-cols-3 gap-4">
          <Form.Item
            rules={[{ required: true }]}
            name="first_name"
            label={t('personal-information.name')}
          >
            <Input
              disabled={passportInfo?.first_name}
              type="text"
              placeholder={t('my-properties.select')}
              size="large"
            />
          </Form.Item>
          <Form.Item
            rules={[{ required: true }]}
            name="last_name"
            label={t('personal-information.last_name')}
          >
            <Input
              disabled={passportInfo?.last_name}
              type="text"
              placeholder={t('my-properties.select')}
              size="large"
            />
          </Form.Item>

          <Form.Item
            rules={[{ required: true }]}
            name="middle_name"
            label={t('personal-information.display-name')}
          >
            <Input
              disabled={passportInfo?.middle_name}
              type="text"
              placeholder={t('my-properties.select')}
              size="large"
            />
          </Form.Item>
        </div>

        <Form.Item
          rules={[{ required: true }]}
          label={t('my-properties.come-from')}
          name="country_of_came"
        >
          <Select
            size="large"
            allowClear
            showSearch
            options={countries}
            placeholder={t('my-properties.select')}
            onSearch={handleSearch}
            disabled={passportInfo?.country}
            onChange={(value) => {
              if (!value) {
                setSearch('')
                setPage(1)
              }
            }}
            optionRender={(props: any) => {
              return <div className="flex items-center gap-4">{props.label}</div>
            }}
            tagRender={(props: any) => {
              return <div className="flex items-center gap-4">{props.label}</div>
            }}
          />
        </Form.Item>
        <Form.Item rules={[{ required: true }]} label={t('personal-information.sex')} name="gender">
          <Select
            disabled={passportInfo?.gender}
            size="large"
            allowClear
            showSearch={false}
            options={[
              {
                index: 1,
                value: 'male',
                label: t('genders.man'),
              },
              {
                index: 2,
                value: 'female',
                label: t('genders.woman'),
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
        <Form.Item
          rules={[{ required: true, message: t('tariff-plans-page.name.rule') }]}
          label={t('my-properties.register-date')}
          name="register_date"
          className=""
        >
          <DatePicker
            format="DD.MM.YYYY HH:mm:ss"
            placeholder={t('tours.date')}
            size="large"
            className="h-[47px] w-full px-4"
            showTime={{ format: 'HH:mm:ss' }}
            suffixIcon={<CalendarIcon className="text-base" />}
          />
        </Form.Item>

        <Form.Item
          rules={[{ required: true }]}
          label={t('my-properties.arrived-on')}
          name="stay_days"
        >
          <Input placeholder={t('my-properties.select')} size="large" />
        </Form.Item>
      </div>
    </div>
  )
}

export default memo(SecondContent)
