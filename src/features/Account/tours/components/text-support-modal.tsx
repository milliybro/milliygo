import CustomModal from '@/components/common/CModal'
import PhoneIcon2 from '@/components/icons/phone-icon-2'
import SupportOperatorIcon from '@/components/icons/support-operator'
import { Button, ModalProps } from 'antd'
import { parsePhoneNumberWithError } from 'libphonenumber-js'
import { useTranslations } from 'next-intl'

interface TextSupportModalProps extends ModalProps {}

const SUPPORT_PHONE_NUMBER = '+998712033983'

export default function TextSupportModal(props: TextSupportModalProps) {
  const t = useTranslations()
  return (
    <CustomModal
      {...props}
      modalTitle={t('tours.call-center')}
      modalDesc={t('tours.support-desc')}
      modalIcon={<SupportOperatorIcon className="text-5xl text-secondary" />}
    >
      <Button
        className="flex items-center gap-2 justify-center"
        type="primary"
        size="large"
        href={`tel:${SUPPORT_PHONE_NUMBER}`}
      >
        <PhoneIcon2 className="text-2xl" />
        {parsePhoneNumberWithError(SUPPORT_PHONE_NUMBER).format('INTERNATIONAL')}
      </Button>
    </CustomModal>
  )
}
