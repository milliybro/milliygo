import { Table } from 'antd'
import { TableProps } from 'antd/lib'
import { useTranslations } from 'next-intl'
import UserGroupIcon from '@/components/icons/user-group'
import SectionHeader from '@/features/Account/tour-booking-item/components/section-header'
import { IOrderDetail } from '../types'

type IProps = {
  data?: IOrderDetail
}

const TourBookingTouristInfo = ({ data }: IProps) => {
  const t = useTranslations()

  const columns: TableProps['columns'] = [
    {
      title: t('common.fullname'),
      dataIndex: 'fullname',
      render: (_, record) =>
        [record?.last_name, record?.first_name, record?.father_name].filter(Boolean)?.join(' '),
    },
    {
      title: t('evisa.passport-details'),
      dataIndex: 'document_number',
      render: (value) => value?.replace(/^([A-Za-z]{2})(\d+)$/, '$1 $2'),
    },
    {
      title: t('personal-information.birth-date'),
      dataIndex: 'birth_date',
      render: (value) => {
        const [year, month, day] = value.split('-')
        const formatted = `${day}.${month}.${year}`

        return formatted
      },
    },
    {
      title: t('personal-information.contact-phone'),
      dataIndex: 'phone',
    },
  ]

  return (
    <div className="flex flex-col gap-3">
      <SectionHeader
        icon={<UserGroupIcon className="text-2xl text-[#2563EB]" />}
        title={t('tours.tourist-data')}
        desc={t('tours.section-desc')}
      />
      <Table
        columns={columns}
        rowKey="id"
        dataSource={data?.participants}
        pagination={false}
        className="tour-detail-table"
      />
    </div>
  )
}

export default TourBookingTouristInfo
