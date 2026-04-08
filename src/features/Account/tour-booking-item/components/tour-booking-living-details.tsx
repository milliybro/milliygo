import { Table } from 'antd'
import { TableProps } from 'antd/lib'
import { useTranslations } from 'next-intl'
import FilesIcon from '@/components/icons/files-icon'
import SectionHeader from '@/features/Account/tour-booking-item/components/section-header'

const MOCK_DATA = [
  {
    id: 1,
    name: 'Гостевой дом',
    address: 'Тоshkent, Uzbekistan',
    type: 'Standard Double',
    checkIn: '26.10.2025',
    checkOut: '22.10.2025',
    nights: '1',
    meals: 'RO',
  },
]

const TourBookingLivingDetails = () => {
  const t = useTranslations()

  const columns: TableProps['columns'] = [
    {
      title: t('my-properties.name-property'),
      dataIndex: 'name',
    },
    {
      title: t('personal-information.address'),
      dataIndex: 'address',
    },
    {
      title: t('user.type-number'),
      dataIndex: 'type',
    },
    {
      title: t('booking.check-in'),
      dataIndex: 'checkIn',
    },
    {
      title: t('booking.check-out-leave'),
      dataIndex: 'checkOut',
    },
    {
      title: t('tours.night-duration'),
      dataIndex: 'nights',
    },
    {
      title: t('inputs.meals'),
      dataIndex: 'meals',
    },
  ]

  return (
    <div className="flex flex-col gap-3">
      <SectionHeader
        icon={<FilesIcon className="text-2xl text-[#2563EB]" />}
        title={t('tours.live-data')}
        desc={t('tours.section-desc')}
      />
      <Table
        columns={columns}
        rowKey="id"
        dataSource={MOCK_DATA}
        pagination={false}
        className="tour-detail-table"
      />
    </div>
  )
}

export default TourBookingLivingDetails
