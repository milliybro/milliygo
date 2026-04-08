import CustomModal from '@/components/common/CModal'
import ArrowLeftIcon from '@/components/icons/arrow-left'
import ArrowRightIcon from '@/components/icons/arrow-right'
import CalendarIcon from '@/components/icons/calendar'
import { IProperty } from '@/types'
import { Button, DatePicker, Input, Radio, Tabs, Typography } from 'antd'
import { useTranslations } from 'next-intl'
import { useState } from 'react'

function DeactivateModal({
  isOpen,
  onClose,
  onConfirm,
}: {
  isOpen: boolean
  onClose: () => void
  item: IProperty
  onConfirm: () => void
}) {
  const [tab, setTab] = useState<string>('1')
  const [reason, setReason] = useState<number>(0)

  const t = useTranslations()

  const items = [
    {
      key: '1',
      label: t('my-properties.forever'),
    },
    {
      key: '2',
      label: t('my-properties.for-period'),
      children: (
        <div className="flex flex-col gap-2">
          <Typography className="text-center">{t('my-properties.pick-date')}</Typography>
          <DatePicker.RangePicker
            placeholder={[t('inputs.date-placeholder-from'), t('inputs.date-placeholder-to')]}
            size="large"
            nextIcon={<ArrowRightIcon />}
            prevIcon={<ArrowLeftIcon />}
            className="w-full"
            suffixIcon={<CalendarIcon className="pointer-events-none text-[20px]" />}
          />
        </div>
      ),
    },
  ]

  return (
    <CustomModal open={isOpen} onCancel={onClose} className="min-w-[800px] max-w-full">
      <div className="flex h-full w-full flex-col gap-2">
        <Typography className="text-center text-2xl font-bold">
          {t('my-properties.dont-get-guest')}
        </Typography>
        <Typography className="text-center text-[#777E90]">
          {t('my-properties.choose-option')}
        </Typography>
        <Tabs
          className="mt-12"
          rootClassName="custom-tabs-panel"
          activeKey={tab}
          onChange={(key) => setTab(key)}
          items={items}
        />
        <Typography className="my-6 text-center text-black">
          {t('my-properties.choose-reason')}
        </Typography>
        <Radio.Group
          buttonStyle="solid"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          className="flex select-none flex-col gap-2"
        >
          <Radio value={1}>{t('my-properties.cancel-reason-1')}</Radio>
          <Radio value={2}>{t('my-properties.cancel-reason-2')}</Radio>
          <Radio value={3}>{t('my-properties.cancel-reason-3')}</Radio>
          <Radio value={4}>{t('my-properties.cancel-reason-4')}</Radio>
          <Radio value={5}>{t('my-properties.cancel-reason-5')}</Radio>
        </Radio.Group>
        {reason === 5 && (
          <Input.TextArea
            placeholder="Пример: в объявлении указано, что сдается все жилье целиком, но в реальности это отдельная комната."
            rows={3.5}
            size="large"
          />
        )}
        <div className="mt-8 flex items-center justify-center gap-2">
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

export default DeactivateModal
