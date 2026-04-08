import { Form, Select } from 'antd'
import { useTranslations } from 'next-intl'
import { FC, memo, useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'

import { getLocalRegions } from '@/api'
import LocationIcon from '../icons/location'

import type { Region } from '@/types'

const LocationInput: FC<{
  name: string
  label: string
  disabledOptions?: string[]
}> = ({ name, label }) => {
  const t = useTranslations('inputs')
  const [options, setOptions] = useState<any | null>(null)
  const [search, setSearch] = useState<string>('')

  const { data } = useQuery({
    queryKey: ['local-regions', search],
    queryFn: () => getLocalRegions({ params: { search } }),
    select: (values: Region[]) => {
      const filteredRegions = values?.map((val) => ({
        label: val.name,
        value: String(val.id),
      }))

      return filteredRegions
    },
    enabled: true,
  })

  useEffect(() => {
    if (data) {
      setOptions(data)
    }
  }, [data])

  return (
    <Form.Item name={name} label={label} className="m-0" rules={[{ required: true, message: '' }]}>
      <Select
        showSearch
        labelInValue
        defaultActiveFirstOption={false}
        filterOption={false}
        notFoundContent={null}
        size="large"
        suffixIcon={null}
        placeholder={t('place-placeholder')}
        className="custom-select"
        classNames={{ root: 'notranslate' }}
        searchValue={search}
        onSearch={setSearch}
        options={options}
        prefix={<LocationIcon className="pointer-events-none text-[24px] text-secondary" />}
      />
    </Form.Item>
  )
}

export default memo(LocationInput)
