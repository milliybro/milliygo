import { useTranslations } from 'next-intl'
import { Button, Flex, Popover } from 'antd'

import MoreRoundedIcon from '@/components/icons/moreRoundedIcon'
import React, { useState } from 'react'
import TextSupportModal from './text-support-modal'

export default function TourOrderPopover() {
  const t = useTranslations()
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)
  const [isSupportOpen, setIsSupportOpen] = useState(false)

  return (
    <>
      <Popover
        placement="bottomLeft"
        classNames={{ body: 'p-1 overflow-hidden', root: 'max-w-[221px] p-0' }}
        open={isPopoverOpen}
        onOpenChange={setIsPopoverOpen}
        content={
          <Flex vertical>
            <button
              aria-label={t('booking.message-support')}
              type="button"
              className="flex items-center gap-2 rounded-xl p-4 text-start text-sm font-medium hover:bg-secondary-light"
              onClick={() => {
                setIsPopoverOpen(false)
                setIsSupportOpen(true)
              }}
            >
              {t('booking.message-support')}
            </button>
            <button
              aria-label={t('booking.reject-booking')}
              type="button"
              className="flex items-center gap-2 rounded-xl p-4 text-start text-sm font-medium text-red-400 hover:bg-secondary-light"
            >
              {t('booking.reject-booking')}
            </button>
          </Flex>
        }
        trigger="click"
      >
        <Button aria-label="see more" type="link" className="m-0 flex h-max w-max items-center p-0">
          <MoreRoundedIcon className="text-xl text-secondary" />
        </Button>
      </Popover>
      <TextSupportModal open={isSupportOpen} onCancel={() => setIsSupportOpen(false)} />
    </>
  )
}
