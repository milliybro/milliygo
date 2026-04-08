import ArrowRightUpIcon from '@/components/icons/arrow-right-up'
import AccountMainLayout from '@/components/Layouts/Account/AcountMainLayout'
import ItemsList from '@/features/Account/components/MyProperties/ItemsList'
import PageHeader from '@/features/Account/components/PageHeader'
import { Button, Flex, Spin, Tabs } from 'antd'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getMyProperties } from '../api'
import CreateProperty from '../components/MyProperties/CreateProperty'
import NoDataProperty from '../components/MyProperties/NoDataProperty'
import { TabsProps } from 'antd/lib'
import MySheets from '../components/MyProperties/MySheets'
import AddGuest from '../components/MyProperties/MySheets/AddGuest'
import MyCadastr from '../components/MyProperties/MyCadastr'

function Properties() {
  const t = useTranslations()
  const [isCreating, setIsCreating] = useState(false)
  const [isCreateGuest, setIsCreateGuest] = useState(false)
  const [registerDate, setRegisterDate] = useState(null)

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['getMyProperties'],
    queryFn: getMyProperties,
  })

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: t('my-properties.title'),
      children: (
        <div className="pt-6">
          {' '}
          <Spin spinning={isLoading}>
            {(data && data?.results.length > 0) || isCreating ? (
              isCreating ? (
                <>
                  <CreateProperty setIsCreating={setIsCreating} />
                </>
              ) : (
                <Flex vertical gap={24}>
                  <Flex className="items-center justify-between">
                    <PageHeader
                      title={t('my-properties.title')}
                      description={t('my-properties.desc')}
                    />

                    <Button
                      type="link"
                      className="flex items-center"
                      onClick={() => setIsCreating(true)}
                    >
                      {t('my-properties.create-property')}
                      <ArrowRightUpIcon />
                    </Button>
                  </Flex>
                  <div className="flex flex-col gap-[16px]">
                    {data?.results.map((val) => (
                      <ItemsList key={val.id} item={val} refetch={refetch} />
                    ))}
                  </div>
                </Flex>
              )
            ) : (
              <NoDataProperty setIsCreating={setIsCreating} />
            )}
          </Spin>
        </div>
      ),
    },
    {
      key: '2',
      label: t('my-properties.my-list'),
      children: (
        <div className="pt-6">
          {' '}
          {isCreateGuest ? (
            <>
              <AddGuest setIsCreateGuest={setIsCreateGuest} registerDate={registerDate} />
            </>
          ) : (
            <MySheets setIsCreateGuest={setIsCreateGuest} setRegisterDate={setRegisterDate} />
          )}
        </div>
      ),
    },
    {
      key: '3',
      label: t('my-properties.my-cadastres'),
      children: (
        <div className="pt-6">
          <MyCadastr />
        </div>
      ),
    },
  ]
  return (
    <AccountMainLayout
      breadCrumbItems={[
        {
          title: t('preferences.main'),
          href: '/',
        },
        {
          title: t('my-properties.title'),
        },
      ]}
    >
      <Tabs defaultActiveKey="1" items={items} className="custom-tabs" />
    </AccountMainLayout>
  )
}

export default Properties
