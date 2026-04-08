import ContractLayout from '@/components/Layouts/Account/ContractLoyout'
import { Flex, Table, Typography } from 'antd'
import { useTranslations } from 'next-intl'

function ContractMyContract() {
  const t = useTranslations('')

  const columns = [
    {
      title: t('transport.document.label'),
      dataIndex: 'typeDocument',
      key: 'typeDocument',
    },
    {
      title: t('contract.date-contract'),
      dataIndex: 'dataContract',
      key: 'dataContract',
    },
    {
      title: t('contract.status'),
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <div className="bg-[#3276FF0D] p-[2px] rounded-full text-[#3276FF] text-center">
          {status}
        </div>
      ),
    },
    {
      title: t('contract.update-status'),
      dataIndex: 'updateDate',
      key: 'updateDate',
    },
  ]

  const data = [
    {
      typeDocument: 'Договор №',
      dataContract: '11.12.2024',
      status: 'Подписано',
      updateDate: '12.12.2024 12:44',
    },
  ]

  return (
    <ContractLayout
      breadCrumbItems={[
        {
          title: t('preferences.main'),
          href: '/',
        },
        {
          title: t('contract.account-user'),
          href: '',
        },
        {
          title: t('contract.my-contracts'),
        },
      ]}
    >
      <Flex vertical gap={24}>
        <div className="flex justify-between items-center">
          <div>
            <Typography.Title level={3} className="m-0 !mb-2">
              {t('contract.my-contracts')}
            </Typography.Title>
            <Typography.Text className="text-sm">
              {t('contract.create-and-customize')}
            </Typography.Text>
          </div>
        </div>
        <div className="">
          <Table columns={columns} dataSource={data} pagination={false} />
        </div>
      </Flex>
    </ContractLayout>
  )
}

export default ContractMyContract
