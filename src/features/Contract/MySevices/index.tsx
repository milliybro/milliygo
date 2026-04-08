import { Button, Flex, Table, Typography } from 'antd'
import { useTranslations } from 'next-intl'
import Link from 'next/link'

import ContractLayout from '@/components/Layouts/Account/ContractLoyout'

function ContractMyServices() {
  const t = useTranslations('')

  const columns = [
    {
      title: t('contract.type-service'),
      dataIndex: 'typeService',
      key: 'typeService',
    },
    {
      title: t('contract.region'),
      dataIndex: 'region',
      key: 'region',
    },
    {
      title: t('my-properties.city'),
      dataIndex: 'city',
      key: 'city',
    },
    {
      title: t('contract.name'),
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: t('contract.number-of-buildings'),
      dataIndex: 'numberOfBuildings',
      key: 'numberOfBuildings',
    },
    {
      title: t('others.room-count'),
      dataIndex: 'roomCount',
      key: 'roomCount',
    },
    {
      title: t('user.action'),
      dataIndex: 'action',
      key: 'action',
    },
  ]

  const data = [{}]

  return (
    <ContractLayout
      breadCrumbItems={[
        {
          title: t('preferences.main'),
          href: '/',
        },
        {
          title: t('contract.user-account'),
          href: '',
        },
        {
          title: t('contract.my-services'),
        },
      ]}
    >
      <Flex vertical gap={24}>
        <div className="flex justify-between items-center">
          <div>
            <Typography.Title level={3} className="m-0 !mb-2">
              {t('contract.my-services')}
            </Typography.Title>
            <Typography.Text className="text-sm">
              {t('contract.create-your-services')}
            </Typography.Text>
          </div>
          <div>
            <Link href="/contract/my-services/create/">
              <Button className="" type="primary">
                <span className="text-[32px] font-[300]">+</span> {t('contract.create-service')}
              </Button>
            </Link>
          </div>
        </div>
        <div className="">
          <Table columns={columns} dataSource={data} pagination={false} />
        </div>
      </Flex>
    </ContractLayout>
  )
}

export default ContractMyServices
