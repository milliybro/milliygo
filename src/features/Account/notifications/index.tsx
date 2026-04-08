import AccountMainLayout from '@/components/Layouts/Account/AcountMainLayout'
import AlertCircleIcon from '@/components/icons/alert-circle'
import ArrowRightUpIcon from '@/components/icons/arrow-right-up'
import NotificationIcon from '@/components/icons/notification'
import { changeReadStatus, getNotifications } from '@/features/Support/api'
import { Button, Flex, Spin, Typography } from 'antd'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { memo, useEffect, useState } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'
import PageHeader from '../components/PageHeader'

function Notifications() {
  const t = useTranslations()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = window.localStorage.getItem('access_token')

      const dataUser = JSON.parse(localStorage.getItem('authState') || '{}')

      const socket = new WebSocket(
        `wss://websocket.emehmon.xdevs.uz/ws/notifications/room_${dataUser?.userInfo?.id}/?token=${token}`
      )
      socket.addEventListener('message', (event) => {
        const message = event.data
        const parsedMessage = JSON.parse(message)

        if (parsedMessage.type === 'new_notification') {
          setNotifications((prev: any) => [parsedMessage, ...prev])
        }
      })
      return () => {
        socket.close()
      }
    }
  }, [])

  const [notifications, setNotifications] = useState<any>([])

  const { isLoading, refetch } = useQuery({
    queryKey: ['notificationss'],
    queryFn: async () => {
      const res: any = await getNotifications()

      if (res) {
        setNotifications(res)
      }
      return res
    },
  })

  const { mutate } = useMutation({
    mutationFn: changeReadStatus,
    onSuccess: () => {
      refetch()
    },
  })

  return (
    <AccountMainLayout
      breadCrumbItems={[
        {
          title: t('preferences.main'),
          href: '/',
        },
        {
          title: t('others.notifications'),
        },
      ]}
    >
      <Spin size="large" spinning={isLoading}>
        {isLoading ? (
          '...'
        ) : notifications?.content?.length > 0 ? (
          <Flex vertical gap={24}>
            <Flex className="items-center justify-between">
              <PageHeader
                title={t('others.notifications')}
                description={t('others.notifications-desc')}
              />
            </Flex>
            <div className="flex flex-col">
              {notifications?.content?.map((item: any) => (
                <Flex className="border-b py-[16px]" gap={8} key={item}>
                  <Flex className="h-[40px] w-[40px] items-center justify-center overflow-hidden rounded-[8px] bg-[#F8F8FA]">
                    <AlertCircleIcon
                      style={{
                        color: '#777E90',
                      }}
                    />
                  </Flex>

                  <Flex vertical gap={10} className="items-start">
                    <Typography.Text
                      className={`#777E90 text-[#232E40] ${
                        item?.is_read ? 'font-normal' : 'font-bold'
                      } text-sm`}
                    >
                      {item.message}
                    </Typography.Text>
                    <Link
                      href={`/${item.action_name}/${item.action_id}`}
                      aria-label={t('others.more')}
                    >
                      <Button
                        aria-label={t('others.more')}
                        type="link"
                        className="m-0 flex h-max items-center p-0 text-[#3276FF]"
                        onClick={() => {
                          mutate({ id: item.id })
                        }}
                      >
                        {t('others.more')}
                        <ArrowRightUpIcon />
                      </Button>
                    </Link>
                  </Flex>
                </Flex>
              ))}
            </div>
          </Flex>
        ) : (
          <div className="mt-[20%] flex h-full flex-col items-center justify-center">
            <div className="flex h-[56px] w-[56px] items-center justify-center rounded-2xl bg-[#F8F8FA]">
              <NotificationIcon className="text-2xl" />
            </div>
            <Typography className="mb-6 mt-6 max-w-[412px] text-center">
              <Typography.Title level={3}>{t('others.no-notifications')}</Typography.Title>
              <Typography.Text>{t('others.no-notifications-desc')}</Typography.Text>
            </Typography>
          </div>
        )}
      </Spin>
    </AccountMainLayout>
  )
}

export default memo(Notifications)
