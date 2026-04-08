import CustomModal from '@/components/common/CModal'
import CheckmarkCircleIcon from '@/components/icons/checkmark-circle'
import { Button, Typography } from 'antd'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/router'

function ConfirmationModal({
  isOpen,
  onClose,
  isActivate,
  id,
}: {
  isOpen: boolean
  onClose: () => void
  isActivate: boolean
  id: number
}) {
  const t = useTranslations()
  const { push } = useRouter()
  const onCloseModal = () => {
    onClose()
    push(`/account/properties/dashboard/${id}?action=calendar`)
  }
  return (
    <CustomModal
      modalIcon={<CheckmarkCircleIcon className="text-[10px]" />}
      open={isOpen}
      onCancel={onClose}
    >
      <Typography className="text-center text-2xl font-bold">
        {isActivate ? t('my-properties.confirm-active') : t('my-properties.confirm-deactive')}
      </Typography>
      <Typography className="text-center text-[#777E90]">
        {isActivate
          ? t('my-properties.confirm-active-text')
          : t('my-properties.confirm-deactive-text')}
      </Typography>
      <Button type="primary" size="large" className="mt-8" onClick={onCloseModal}>
        {t('my-properties.go-calendar')}
      </Button>
    </CustomModal>
  )
}

export default ConfirmationModal
