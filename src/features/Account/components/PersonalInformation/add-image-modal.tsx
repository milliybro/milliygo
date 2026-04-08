import CustomModal from '@/components/common/CModal'
import GuideImage from '@/components/icons/gruide-image'
import { useTranslations } from 'next-intl'

type AddImageModalProps = {
  isOpen: boolean
  onChange: () => void
  onClick: (_e: any) => void
}

const AddImageModal = ({ isOpen, onChange, onClick }: AddImageModalProps) => {
  const t = useTranslations()

  return (
    <CustomModal width={566} open={isOpen} onCancel={onChange} showCloseIcon>
      <div className="flex flex-col items-center justify-center gap-8">
        <div
          className="flex h-[300px] w-[300px] cursor-pointer items-center justify-center rounded-2xl border-[1.5px] border-dashed border-blue bg-secondary-light"
          onClick={(e) => {
            onClick(e)
            onChange()
          }}
        >
          <GuideImage />
        </div>
        <div className="flex flex-col gap-4">
          <p className="text-center text-[24px] font-bold leading-[140%] tracking-[2%] text-primary-dark">
            {t('personal-information.photo-add')}
          </p>
          <p className="text-center text-[16px] leading-[140%] tracking-[2%] text-secondary">
            {t('personal-information.limits-photo')}
          </p>
        </div>
      </div>
    </CustomModal>
  )
}

export default AddImageModal
