import { Button, Divider, Flex, Form, Popover, PopoverProps, Select, Typography } from 'antd'
import { useTranslations } from 'next-intl'
import { memo, useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'

import ArrowDown from '@/components/icons/arrow-down'
import ArrowDownSharpIcon from '@/components/icons/arrow-down-sharp'
import MultipleUsers from '@/components/icons/multiple-users'
import NumberOfGuestsItem from './components/NumberOfGuestsItem'

import type { ISearchHotelFields } from '@/types'
import type { Dispatch, FC, SetStateAction } from 'react'

interface IProps {
  className?: PopoverProps['rootClassName']
  setFields?: Dispatch<SetStateAction<ISearchHotelFields>>
  fields: {
    adults: number
    children: number
    rooms: number
  }
  showError?: boolean
  notRoom?: boolean
  maxRooms?: number | undefined
}

const NumberOfGuestsField: FC<IProps> = ({
  className,
  setFields,
  showError,
  notRoom,
  maxRooms,
  fields,
}) => {
  const t = useTranslations('inputs')
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (maxRooms == 0) {
      setFields?.((prev) => ({ ...prev, rooms: 0 }))
    } else {
      setFields?.((prev) => ({ ...prev, rooms: 1 }))
    }
  }, [maxRooms])

  return (
    <Popover
      open={isOpen}
      placement="bottomLeft"
      classNames={{ root: twMerge('max-w-[336px] p-0 w-full', className), body: 'px-6 py-4' }}
      arrow={false}
      trigger="contextMenu"
      onOpenChange={() => setIsOpen(false)}
      content={
        <Flex vertical>
          <NumberOfGuestsItem
            title={t('guests-adults-label')}
            info={t('guests-adults-info')}
            count={fields?.adults}
            removeDisable={fields?.adults < 2}
            addDisable={false}
            onRemoveClick={() => setFields?.((prev) => ({ ...prev, adults: prev.adults - 1 }))}
            onAddClick={() => setFields?.((prev) => ({ ...prev, adults: prev.adults + 1 }))}
          />
          <Divider className="my-4" />
          <NumberOfGuestsItem
            title={t('guests-children-label')}
            info={t('guests-children-info')}
            count={fields?.children}
            removeDisable={fields?.children < 1}
            addDisable={false}
            onRemoveClick={() => setFields?.((prev) => ({ ...prev, children: prev.children - 1 }))}
            onAddClick={() => setFields?.((prev) => ({ ...prev, children: prev.children + 1 }))}
          />
          {fields?.children ? (
            <div className="grid grid-cols-1 gap-4 py-3">
              {[...Array(fields?.children)].map((val, i) => (
                <Form.Item
                  id={'children-count-age-' + i}
                  name={`children_age_${i + 1}`}
                  key={'children-count-age-item-' + i}
                  className="m-0"
                  rules={[{ message: '' }]}
                >
                  <Select
                    size="large"
                    placeholder={t('guests-children-age-label')}
                    options={Array.from({ length: 12 }).map((_, i) => ({
                      value: `${i + 1}`,
                      label: t('ages', { count: i + 1 }),
                    }))}
                    suffixIcon={
                      <ArrowDown className={twMerge(val && 'rotate-180', 'text-[10px]')} />
                    }
                  />
                </Form.Item>
              ))}
            </div>
          ) : null}

          {!notRoom ? (
            <>
              <Divider className="my-4" />
              <NumberOfGuestsItem
                title={t('guests-rooms-label')}
                info={t('guests-rooms-info')}
                count={fields?.rooms}
                removeDisable={fields?.rooms < 2}
                addDisable={maxRooms !== undefined ? fields?.rooms > maxRooms - 1 : false}
                onRemoveClick={() => setFields?.((prev) => ({ ...prev, rooms: prev.rooms - 1 }))}
                onAddClick={() => setFields?.((prev) => ({ ...prev, rooms: prev.rooms + 1 }))}
              />
            </>
          ) : (
            ''
          )}
        </Flex>
      }
    >
      <Button
        aria-label="show people count"
        onClick={() => setIsOpen((prev) => !prev)}
        className={`flex h-[56px] w-full items-center justify-between gap-3 rounded-2xl bg-secondary-light px-4 text-secondary/50 ${
          showError ? 'border-2 border-red-500' : 'border-none'
        }`}
      >
        <Flex align="center" gap={12} className="overflow-hidden">
          <MultipleUsers className="pointer-events-none text-2xl text-secondary" />
          <Typography.Text>
            {fields?.adults ? (
              <span>
                <span>{fields?.adults}</span>{' '}
                {fields?.adults === 1
                  ? t('guests-adults-label-1').toLowerCase()
                  : t('guests-adults-label-more').toLowerCase()}
              </span>
            ) : (
              ''
            )}
            {''}
            {fields?.children ? (
              <span>
                ,<span> {fields?.children} </span>{' '}
                {fields?.children === 1
                  ? t('guests-children-label-1').toLowerCase()
                  : t('guests-children-label-more').toLowerCase()}
              </span>
            ) : (
              ''
            )}
            {''}
            {fields?.rooms && !notRoom ? (
              <span>
                ,<span> {fields?.rooms} </span> {t('guests-rooms-label').toLowerCase()}
              </span>
            ) : (
              ''
            )}
          </Typography.Text>
        </Flex>
        <ArrowDownSharpIcon className={twMerge('text-[24px]', isOpen && 'rotate-180')} />
      </Button>
    </Popover>
  )
}

export default memo(NumberOfGuestsField)
