import CustomModal from '@/components/common/CModal'
import CalendarIcon from '@/components/icons/calendar'
import { IProperty } from '@/types'
import { Button, DatePicker, Radio, Typography } from 'antd'
import { useTranslations } from 'next-intl'
import { useState } from 'react'

function ActivateModal({
  isOpen,
  onClose,
  onConfirm,
}: {
  item: IProperty
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
}) {
  const [reason, setReason] = useState<number>(1)
  const t = useTranslations()

  return (
    <CustomModal open={isOpen} onCancel={onClose} className="min-w-[580px] max-w-full">
      <div className="flex h-full w-full flex-col gap-5">
        <Typography className="text-center text-2xl font-bold">
          {t('my-properties.activate-object')}
        </Typography>
        <Typography className="text-center text-[#777E90]">
          {t('my-properties.activate-text')}
        </Typography>
        <Radio.Group
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          className="flex select-none flex-col gap-4"
        >
          <Radio value={1}>{t('my-properties.activate-now')}</Radio>
          <Radio value={2}>{t('my-properties.activate-from')}</Radio>
        </Radio.Group>
        {reason === 2 && (
          <DatePicker
            size="large"
            suffixIcon={<CalendarIcon className="pointer-events-none text-[20px]" />}
          />
        )}
        <div className="mt-2 flex items-center justify-center gap-2">
          <Button type="text" size="large" className="bg-[#F8F8FA]" onClick={onClose}>
            {t('buttons.cancel')}
          </Button>
          <Button type="primary" size="large" onClick={onConfirm}>
            {t('buttons.save')}
          </Button>
        </div>
      </div>
    </CustomModal>
  )
}

export default ActivateModal
