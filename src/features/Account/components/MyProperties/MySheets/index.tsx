import ArrowDownSharpIcon from '@/components/icons/arrow-down-sharp'
import EyeIcon from '@/components/icons/eye-icon'
import SearchIcon from '@/components/icons/search'
import { getAccommodationGuests, getListCountries } from '@/features/Account/api'
import PageHeader from '@/features/Account/components/PageHeader'
import { capitalizeFirstLetters } from '@/helpers/capitalize-first-letters'
import { truthyObject } from '@/helpers/truthy-object'
import { PlusCircleOutlined } from '@ant-design/icons'
import { Button, Flex, Form, Input, Select, Spin, Table } from 'antd'
import dayjs from 'dayjs'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import GuestInfoModal from './GuestInfoModal'

function MySheets({ setIsCreateGuest, setRegisterDate }: any) {
  const t = useTranslations()
  const { Search } = Input
  const router = useRouter()
  const [countrySearch, setCountrySearch] = useState<string | undefined>(undefined)
  const [openModal, setOpenModal] = useState(false)
  const [_page, setPage] = useState(1)
  const [params, setParams] = useState<{ page?: number; birth_country?: number; search?: string }>({
    page: 1,
  })

  const { data, isLoading } = useQuery({
    queryKey: ['getAccommodationGuests', params],
    queryFn: () => getAccommodationGuests(truthyObject(params)),
  })

  const handleOpen = (id: number) => {
    setOpenModal(true)
    router.push(
      {
        pathname: router.pathname,
        query: { ...router.query, id },
      },
      undefined,
      { shallow: true }
    )
  }

  const handleClose = () => {
    setOpenModal(false)
    const { id: _id, ...rest } = router.query
    router.replace(
      {
        pathname: router.pathname,
        query: rest,
      },
      undefined,
      { shallow: true }
    )
  }

  const columns = [
    {
      title: '№',
      key: 'number',
      render: (_: any, __: any, index: number) =>
        ((data?.current_page ?? 1) - 1) * (data?.page_size ?? 10) + index + 1,
    },
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: t('my-properties.full-name-guest'),
      dataIndex: 'first_name',
      key: 'first_name',
      render: (name: string, data: any) => (
        <div>
          {data?.last_name} {data?.first_name} {data?.middle_name}
        </div>
      ),
    },
    {
      title: t('personal-information.citizenship'),
      dataIndex: 'last_name',
      key: 'last_name',
    },
    {
      title: t('personal-information.phone-number'),
      dataIndex: 'phone_number',
      key: 'phone_number',
    },
    {
      title: t('user.action'),
      dataIndex: 'id',
      key: 'id',
      render: (id: number) => {
        return (
          <Button className="border-none bg-[#F8F8FA] text-primary" onClick={() => handleOpen(id)}>
            <EyeIcon className="text-[18px]" />
          </Button>
        )
      },
    },
  ]

  const { data: countries } = useQuery({
    queryKey: ['countries', countrySearch],
    queryFn: () => getListCountries(truthyObject({ search: countrySearch })),
    refetchOnWindowFocus: false,
    select: (data) => {
      const uniqueId: number[] = []
      return [
        ...data.results
          .map((country, i) => ({
            value: country.id,
            label: capitalizeFirstLetters(country.name),
            key: i,
          }))
          .filter((country) => {
            if (uniqueId.includes(country.value)) {
              return false
            } else {
              uniqueId.push(country.value)
              return true
            }
          })
          .sort((a, b) => a.label.localeCompare(b.label)),
      ]
    },
    enabled: true,
  })

  return (
    <>
      <Spin spinning={isLoading}>
        <Flex className="items-center justify-between">
          <PageHeader title={t('my-properties.my-list')} description={t('booking.no-booking')} />
          <Button
            type="link"
            className="flex items-center"
            onClick={() => {
              setIsCreateGuest(true)
              setRegisterDate(dayjs().format('YYYY-MM-DD HH:mm'))
            }}
          >
            {t('buttons.add')}
            <PlusCircleOutlined className="text-xs" />
          </Button>
        </Flex>
        <div className="py-6">
          <Form layout="vertical" className="grid grid-cols-3 gap-4">
            <Form.Item name="birth_country" className="[&_.ant-form-item-label]:leading-[1]">
              <Select
                size="large"
                placeholder={t('personal-information.citizenship')}
                suffixIcon={
                  <ArrowDownSharpIcon className="pointer-events-none mr-2 text-sm text-secondary/80" />
                }
                showSearch
                searchValue={countrySearch}
                onSearch={(val) => setCountrySearch(val)}
                filterOption={false}
                {...{ autoComplete: 'none' }}
                options={countries}
                allowClear
                onChange={(val) => setParams((prev) => ({ ...prev, page: 1, birth_country: val }))}
              />
            </Form.Item>
            <Form.Item name="search" className="col-span-2">
              <Search
                size="large"
                placeholder={t('my-properties.search-text')}
                onSearch={(val) => setParams((prev) => ({ ...prev, page: 1, search: val }))}
                enterButton={<SearchIcon className="text-[20px]" />}
                prefix={<SearchIcon className="pe-3 ps-2 text-secondary" />}
                allowClear
              />
            </Form.Item>
          </Form>
        </div>
        <Table
          columns={columns}
          dataSource={data?.results}
          pagination={{
            current: data?.current_page,
            pageSize: data?.page_size,
            total: data?.count,
            onChange: (p) => setPage(p),
          }}
        />
      </Spin>
      <GuestInfoModal openModal={openModal} setOpenModal={handleClose} />
    </>
  )
}

export default MySheets
