import MoreRoundedIcon from '@/components/icons/moreRoundedIcon'
import { Button, Flex, Popover } from 'antd'
import { useTranslations } from 'next-intl'
import { useState } from 'react'

export default function PlacementBookingPopover() {
  const [openedPopover, setOpenedPopover] = useState(false)

  const t = useTranslations()

  return (
    <>
      <Popover
        placement="bottomRight"
        onOpenChange={setOpenedPopover}
        open={openedPopover}
        classNames={{ body: 'p-1 overflow-hidden', root: 'max-w-[221px] p-0' }}
        content={
          <Flex vertical>
            <button
              aria-label={t('my-properties.edit')}
              type="button"
              className="flex items-center gap-2 rounded-xl p-4 text-start text-sm font-medium hover:bg-secondary-light"
            >
              {t('Связаться с гостем')}
            </button>

            {/* <button
              aria-label={t('my-properties.delete-object')}
              type="button"
              onClick={() => {



              }}
              className="text-red-400 flex items-center gap-2 p-4 text-sm hover:bg-secondary-light rounded-xl text-start font-medium"
            >
              {t('Отменить бронирование')}
            </button> */}
          </Flex>
        }
        trigger="click"
      >
        <Button type="link" className="m-0 flex h-max w-max items-center p-0">
          <MoreRoundedIcon className="text-xl" />
        </Button>
      </Popover>
    </>
  )
}
