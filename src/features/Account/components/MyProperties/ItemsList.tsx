import React, { useState } from 'react'
import { Button, Flex, Image, Typography } from 'antd'
import ArrowRightUpIcon from '@/components/icons/arrow-right-up'
import PropertyItemPopover from './PropertyItemPopover'
import { formatNumber } from '@/helpers/number-formatter'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import useCurrencyStore from '@/store/currency'
import { IProperty } from '@/types'
import DeactivateModal from './Deactivate/DeactivateModal'
import ActivateModal from './Deactivate/ActivateModal'
import ConfirmationModal from './Deactivate/ConfirmationModal'

interface ItemsListProps {
  item: IProperty
  refetch: any
}

function ItemsList({ item, refetch }: ItemsListProps) {
  const t = useTranslations()
  const { currency }: any = useCurrencyStore((state) => state)
  const [isDeactivateOpen, setIsDeactivateOpen] = useState<boolean>(false)
  const [isActivateOpen, setIsActivateOpen] = useState<boolean>(false)
  const [confirmActiveOpen, setConfirmActiveOpen] = useState<boolean>(false)
  const [confirmDeactiveOpen, setConfirmDeactiveOpen] = useState<boolean>(false)

  function deactivateHandler() {
    setIsDeactivateOpen(true)
  }

  function activateHandler() {
    setIsActivateOpen(true)
  }

  function confirmActivate() {
    setIsActivateOpen(false)
    setConfirmActiveOpen(true)
  }

  function confirmDeactivate() {
    setIsDeactivateOpen(false)
    setConfirmDeactiveOpen(true)
  }

  return (
    <Flex className="grid grid-cols-[1fr_4fr_2fr] gap-4">
      <Image
        alt="lorem"
        className="h-full w-full rounded-2xl object-cover"
        src={item.image}
        width={108}
        height={108}
      />

      <Flex vertical className="justify-between">
        <Flex className="flex items-center gap-2">
          <Typography.Title level={5} className="m-0">
            {item.name}
          </Typography.Title>

          {item.status ? (
            <Typography className="rounded-xl bg-[#4DD2821F] px-[8px] py-[4px] text-[#4DD282]">
              {t('my-properties.active')}
            </Typography>
          ) : (
            <Typography className="rounded-xl bg-[#d24d4d1f] px-[8px] py-[4px] text-[#d24d4d]">
              {t('my-properties.inactive')}
            </Typography>
          )}
        </Flex>

        <Typography className="h-[23px] overflow-hidden">{item.address}</Typography>

        <Link
          href={`/account/properties/dashboard/${item.id}`}
          aria-label={`open ${item.id} route`}
        >
          <Button
            type="link"
            className="m-0 flex w-max items-center p-0"
            aria-label={t('my-properties.show-detailed')}
          >
            {t('my-properties.show-detailed')}
            <ArrowRightUpIcon />
          </Button>
        </Link>
      </Flex>

      <Flex className="h-max items-center justify-end gap-4">
        <Typography.Title level={5} className="m-0 h-max">
          <span className="notranslate">
            {formatNumber(item.min_price / currency?.rate)} {currency.short_name} /{' '}
          </span>
          {t('preferences.night')}
        </Typography.Title>

        <PropertyItemPopover
          onActivate={activateHandler}
          onDeactivate={deactivateHandler}
          item={item}
          refetch={refetch}
        />
      </Flex>
      <DeactivateModal
        onConfirm={confirmDeactivate}
        item={item}
        isOpen={isDeactivateOpen}
        onClose={() => setIsDeactivateOpen(false)}
      />
      <ActivateModal
        onConfirm={confirmActivate}
        item={item}
        isOpen={isActivateOpen}
        onClose={() => setIsActivateOpen(false)}
      />
      <ConfirmationModal
        isOpen={confirmDeactiveOpen}
        onClose={() => setConfirmDeactiveOpen(false)}
        id={item.id}
        isActivate={false}
      />
      <ConfirmationModal
        isOpen={confirmActiveOpen}
        onClose={() => setConfirmActiveOpen(false)}
        id={item.id}
        isActivate={true}
      />
    </Flex>
  )
}

export default ItemsList
