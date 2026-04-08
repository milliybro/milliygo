import ArrowRightUpIcon from '@/components/icons/arrow-right-up'
import { Button, Divider, Flex, Form, Spin, Switch, Typography } from 'antd'
import React, { useContext, useEffect, useState } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { getListCategoriesNotification, updateAccountMe } from '../../api'
import { AuthContext } from '../../auth/context/authContext'
import { useTranslations } from 'next-intl'
import { getCookie, setCookie } from 'cookies-next'

interface IProps {
  setRejectAll: React.Dispatch<React.SetStateAction<boolean>>
  userInfo: any
}

export default function SubscribeForm({ setRejectAll }: IProps): React.ReactElement {
  const t = useTranslations()
  const { data, isLoading } = useQuery({
    queryKey: ['notifications-categories'],
    queryFn: getListCategoriesNotification,
  })

  const [userInfo, setUserInfo] = useState<any>({})

  useEffect(() => {
    const dataUser = JSON.parse((getCookie('userInfo') as string) || '{}')
    setUserInfo(dataUser)
  }, [])

  const authContext = useContext(AuthContext)
  const authStore = authContext?.authStore as {
    login: (_user: object) => void
  }

  const { login: loginAction } = authStore

  const { mutate } = useMutation({
    mutationFn: updateAccountMe,
    onSuccess: (res) => {
      loginAction(res)
      setCookie('userInfo', res)
      setUserInfo(res)
    },
  })

  const onChange = (checked: boolean, id: number) => {
    const notificationList = userInfo?.notification || []

    const data = {
      notification: checked
        ? [...notificationList, id]
        : notificationList.filter((item: number) => item !== id),
    }

    mutate(data)
  }

  return (
    <Spin spinning={isLoading} size="large">
      <Form>
        {data?.results?.map((category: { name: string; id: number }) => (
          <div key={category.id}>
            <Flex className="grid grid-cols-[2fr_1fr]">
              <Flex className="flex-col">
                <Typography className="font-bold text-primary-dark">{category.name}</Typography>
              </Flex>

              <Flex className="flex items-center">
                <Form.Item className="m-0 p-0">
                  <Switch
                    checked={userInfo?.notification?.includes(category.id)}
                    onChange={(e) => onChange(e, category.id)}
                    style={{
                      backgroundColor: userInfo?.notification?.includes(category.id)
                        ? '#65C466'
                        : '#E9E9EA',
                    }}
                    checkedChildren="|"
                    unCheckedChildren="0"
                  />
                </Form.Item>
                <Typography className="ml-2 text-primary-dark">
                  {userInfo?.notification?.includes(category.id)
                    ? t('email-newsletter.subscribed')
                    : t('email-newsletter.unsubscribed')}
                </Typography>
              </Flex>
            </Flex>
            <Divider />
          </div>
        ))}

        <Button
          className="m-0 flex items-center p-0"
          type="link"
          danger
          onClick={() => setRejectAll((prev) => !prev)}
          aria-label={t('email-newsletter.unsubscribe-all')}
        >
          {t('email-newsletter.unsubscribe-all')}
          <ArrowRightUpIcon />
        </Button>
      </Form>
    </Spin>
  )
}
