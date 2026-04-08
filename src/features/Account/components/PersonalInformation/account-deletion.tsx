import { Button } from 'antd'
import { useEffect, useState } from 'react'

import type { ReactElement } from 'react'
import { useTranslations } from 'next-intl'
import UserIcon from '@/components/icons/user-icon'
import CustomModal from '@/components/common/CModal'
import SettingsField from '@/features/Account/components/SettingsField'
import UserRemoveIcon from '@/components/icons/user-remove'
import { useMutation } from '@tanstack/react-query'
import { deleteMyAccount } from '../../api'
import { getCookie } from 'cookies-next'

function AccountDeletion(): ReactElement {
  const t = useTranslations()
  const [userInfo, setUserInfo] = useState<any>({})
  const [openDeletionModal, setOpenDeletionModal] = useState(false)

  useEffect(() => {
    const dataUser = JSON.parse((getCookie('userInfo') as string) || '{}')
    setUserInfo(dataUser)
  }, [])

  const deletionHandler = (): void => {
    setOpenDeletionModal((prev) => !prev)
  }

  const { mutate: deleteMutation, isPending } = useMutation({
    mutationFn: () => deleteMyAccount(userInfo?.id),
    mutationKey: ['deleteMyAccount'],
  })

  return (
    <>
      <SettingsField
        isEditing={false}
        title={t('safety.account-deletion')}
        content={t('safety.account-deletion-text')}
        editContent="123"
        contentClassName="font-normal"
        btnText={t('buttons.delete-account')}
        btnIcon={<UserRemoveIcon />}
        btnClassName="!text-[#FF4E4E] flex items-center"
        onClick={deletionHandler}
      />
      <CustomModal
        modalTitle={t('safety.account-deletion-modal')}
        modalDesc={t('safety.account-deletion-modal-text')}
        modalIcon={<UserIcon className="text-5xl" />}
        width={615}
        open={openDeletionModal}
        onOk={() => {
          setOpenDeletionModal(false)
        }}
        onCancel={() => {
          setOpenDeletionModal(false)
        }}
      >
        <div className="grid grid-cols-2 gap-8">
          <Button
            aria-label={t('buttons.cancel')}
            className="h-[58px] rounded-2xl border-0 bg-[#F8F8FA] font-medium text-primary-dark shadow-none"
            onClick={() => {
              setOpenDeletionModal(false)
            }}
          >
            {t('buttons.cancel')}
          </Button>
          <Button
            aria-label={t('buttons.delete-account')}
            type="primary"
            className="h-[58px] rounded-2xl bg-[#FF4E4E] shadow-none hover:!bg-[#FF4E4E]/70"
            onClick={deleteMutation as () => void}
            loading={isPending}
          >
            {t('buttons.delete-account')}
          </Button>
        </div>
      </CustomModal>
    </>
  )
}

export default AccountDeletion
