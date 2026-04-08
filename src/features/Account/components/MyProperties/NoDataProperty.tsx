import HotelIcon from '@/components/icons/hotel'
import { Button, Flex, Typography, Modal } from 'antd'
import { useTranslations } from 'next-intl'
import { useContext, useState } from 'react'
import { AuthContext } from '../../auth/context/authContext'
import LoginIcon from '@/components/icons/login'
import SecondPartyLogin from './second-party-login'
import ArrowUpRight from '@/components/icons/arrow-up-right'

interface AuthStore {
  logout: () => void
  userInfo: {
    id: number
    pinfl?: string
    last_login: string
    is_guide: boolean
    is_superuser: boolean
    username: string
    first_name: string
    middle_name: string
    last_name: string
    email: string
    avatar: string
    phone: string
    passport_sn: string
    passport_given_by: string
    passport_expire_date: string
    position: string
    address: string
    is_staff: boolean
    is_active: boolean
    date_joined: string
    region: string
    district: string
    type: string
    deleted: string
    deleted_by_cascade: boolean
    birth_date: string
    gender: string
    unsubscribe_reason: string
    created_at: string
    updated_at: string
    organization: string
    country: string
    passport_first_name: string
    passport_last_name: string
    groups: { id: number; name: string }[]
  }
}

export default function NoDataProperty({
  setIsCreating,
}: {
  setIsCreating: (_value: boolean) => void
}) {
  const t = useTranslations()
  const authContext = useContext(AuthContext)
  const { authStore } = authContext as { authStore: AuthStore }
  const { userInfo } = authStore
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleClick = () => {
    if (userInfo?.id) {
      setIsCreating(true)
    } else {
      setIsModalOpen(true)
    }
  }

  return (
    <Flex vertical gap={24}>
      <div className="mt-[20%] flex h-full flex-col items-center justify-center gap-6">
        <div className="flex h-[56px] w-[56px] items-center justify-center rounded-2xl bg-[#F8F8FA]">
          <HotelIcon className="text-2xl" />
        </div>
        <Typography className="mb-6 max-w-[412px] space-y-4 text-center">
          <Typography.Title level={3}>{t('my-properties.here-is-about')}</Typography.Title>
          <Typography.Text>{t('my-properties.add-for-get-guest')}</Typography.Text>
        </Typography>
        <Button
          aria-label={t('my-properties.add-object')}
          type="link"
          onClick={handleClick}
          size="large"
          className="!h-[58px] font-medium"
        >
          {t('my-properties.add-object')}
        </Button>
      </div>
      <Modal
        width={566}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={() => setIsModalOpen(false)}
        footer={null}
        centered
      >
        <div className="flex flex-col items-center justify-center gap-8">
          <div className="w-fit rounded-[24px] bg-[#F8F8FA] p-4">
            <LoginIcon className="text-[48px] text-secondary" />
          </div>
          <div className="flex flex-col items-center gap-4">
            <Typography.Text className="text-[24px] font-[700]">Авторизация</Typography.Text>
            <Typography.Text className="text-center text-[16px] font-[400] text-secondary">
              Чтобы получить информацию о ваших объектах, необходимо войти в аккаунт через следующие
              платформы
            </Typography.Text>
          </div>
          <SecondPartyLogin />
          <div>
            <p className="text-center text-[14px] text-secondary">
              Подробную информацию о правилах размещения объектов вы можете узнать в нашем разделе
              <span className="font-[500] text-primary"> Правила размещения</span>{' '}
              <ArrowUpRight className="text-primary" />
            </p>
          </div>
        </div>
      </Modal>
    </Flex>
  )
}
