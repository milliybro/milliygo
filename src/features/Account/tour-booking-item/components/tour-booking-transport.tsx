import { Table } from 'antd'
import { TableProps } from 'antd/lib'
import { useTranslations } from 'next-intl'
import Bus3Icon from '@/components/icons/bus-3-icon'
import SectionHeader from '@/features/Account/tour-booking-item/components/section-header'
import { IOrderDetail } from '../types'

type IProps = {
  data?: IOrderDetail
}

const TourBookingTransport = ({ data }: IProps) => {
  const t = useTranslations()

  const columns: TableProps['columns'] = [
    {
      title: t('tours.transport-type'),
      dataIndex: 'transports',
      render: (value) => value?.map((item: { name: string }) => item.name).join(', ') || '—',
    },
    {
      title: t('tours.car-capacity'),
      dataIndex: 'transport_capacity',
    },
    {
      title: t('tours.take-place'),
      dataIndex: ['start_location', 'name'],
    },
    {
      title: t('tours.take-time'),
      dataIndex: 'takeTime',
      render: (_, record) => {
        if (!record?.start_date) return '—'

        const [year, month, day] = record.start_date.split('-')

        const formattedDate = `${day}.${month}.${year}`

        const formattedTime = record?.start_time ? record.start_time.slice(0, 5) : ''

        return `${formattedDate} • ${formattedTime}`
      },
    },
    {
      title: t('tours.route'),
      dataIndex: 'transfer_type',
    },
  ]

  return (
    <div className="flex flex-col gap-3">
      <SectionHeader
        icon={<Bus3Icon className="text-2xl text-[#2563EB]" />}
        title={t('tours.programme-and-logistics')}
        desc={t('tours.section-desc')}
      />
      <Table
        columns={columns}
        rowKey="id"
        dataSource={data?.tour ? [data.tour] : []}
        pagination={false}
        className="tour-detail-table"
      />
      <div className="flex flex-col gap-2 rounded-lg border border-[#E5E7EB] bg-[#F8FAFC] px-4 py-3">
        <p className="text-sm text-secondary">{t('tours.included-services')}</p>
        <div className="flex flex-col gap-1">
          {data?.tour?.tour_services?.map((service) => (
            <p key={service?.id} className="text-sm font-semibold text-primary-dark">
              {service?.service}
            </p>
          ))}
        </div>
      </div>
    </div>
  )
}

export default TourBookingTransport
