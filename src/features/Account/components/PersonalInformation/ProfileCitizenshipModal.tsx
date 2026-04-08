import CustomModal from '@/components/common/CModal'
import { Button, Flex, Radio, Spin } from 'antd'
import { RadioChangeEvent } from 'antd/lib'
import { useTranslations } from 'next-intl'
import React, { FC, useCallback, useState } from 'react'

const style: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 24,
}

type ProfileCitizenshipModalProps = {
  selectedCitizenship: number
  onCitizenshipChange: (_e: RadioChangeEvent) => void
  onSave: () => void
  contentText: any
  options: any
  isLoading: boolean
  handleCancel: () => void
}

const ProfileCitizenshipModal: FC<ProfileCitizenshipModalProps> = ({
  onCitizenshipChange,
  onSave,
  selectedCitizenship,
  options,
  isLoading,
  handleCancel,
}) => {
  const t = useTranslations()
  const [isOpen, setIsOpen] = useState(true)

  const closeModal = useCallback(() => {
    handleCancel()
    setIsOpen(false)
  }, [handleCancel])

  return (
    <CustomModal
      width={566}
      modalTitle={t('personal-information.citizenship')}
      modalDesc={t('personal-information.citizenship-text')}
      open={isOpen}
      showCloseIcon
      onCancel={closeModal}
      onOk={closeModal}
    >
      <Flex vertical gap={32}>
        {isLoading ? (
          <div className="flex h-[312px] items-center justify-center">
            <Spin />
          </div>
        ) : (
          <div className="max-h-[312px] overflow-y-auto">
            <Radio.Group
              style={style}
              onChange={onCitizenshipChange}
              value={selectedCitizenship}
              options={options}
            />
          </div>
        )}

        <div className="grid grid-cols-2 gap-8">
          <Button aria-label={t('buttons.cancel')} onClick={closeModal}>
            {t('buttons.cancel')}
          </Button>
          <Button type="primary" onClick={onSave}>
            Saqlash
          </Button>
        </div>
      </Flex>
    </CustomModal>
  )
}

export default ProfileCitizenshipModal
