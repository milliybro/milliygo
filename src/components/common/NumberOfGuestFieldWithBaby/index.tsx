import { memo, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { useTranslations } from 'next-intl'
import { Button, Divider, Flex, Form, Popover, PopoverProps, Select, Typography } from 'antd'

import ArrowDown from '@/components/icons/arrow-down'
import MultipleUsers from '@/components/icons/multiple-users'

import ArrowDownSharpIcon from '@/components/icons/arrow-down-sharp'
import NumberOfGuestsItem from '../NumberOfGuestsField/components/NumberOfGuestsItem'

import type { ITravelPackageFields } from '@/types'
import type { Dispatch, FC, SetStateAction } from 'react'

interface IProps {
  className?: PopoverProps['rootClassName']
  setFields?: Dispatch<SetStateAction<ITravelPackageFields>>
  fields: ITravelPackageFields
  showError?: boolean
  notRoom?: boolean
}

const NumberOfGuestsFieldWithBaby: FC<IProps> = ({
  className,
  setFields,
  showError,
  notRoom,
  fields,
}) => {
  const t = useTranslations('inputs')
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Popover
      open={isOpen}
      arrow={false}
      trigger="contextMenu"
      placement="bottomRight"
      classNames={{ root: twMerge('max-w-[336px] w-full', className), body: 'px-6 py-4 border' }}
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
          <Divider className=" my-4" />
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
            <div className="grid grid-cols-1 py-3 gap-4">
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
                      <ArrowDown className={twMerge(val && ' rotate-180', 'text-[10px]')} />
                    }
                  />
                </Form.Item>
              ))}
            </div>
          ) : null}

          <>
            <Divider className="my-4" />
            <NumberOfGuestsItem
              title={t('babies-count-label')}
              info={t('guests-baby-info')}
              count={fields?.infants}
              removeDisable={fields?.infants < 1}
              addDisable={false}
              onRemoveClick={() => setFields?.((prev) => ({ ...prev, infants: prev.infants - 1 }))}
              onAddClick={() => setFields?.((prev) => ({ ...prev, infants: prev.infants + 1 }))}
            />
          </>
        </Flex>
      }
    >
      <Button
        aria-label="show people count"
        onClick={() => setIsOpen((prev) => !prev)}
        className={`flex justify-between items-center w-full h-[56px] px-4 rounded-2xl gap-3 text-secondary/50 bg-secondary-light ${
          showError ? 'border-red-500 border-2' : 'border-none'
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
            {fields?.infants && !notRoom ? <span></span> : ''}
          </Typography.Text>
        </Flex>
        <ArrowDownSharpIcon
          className={twMerge('text-[24px] text-secondary', isOpen && 'rotate-180')}
        />
      </Button>
    </Popover>
  )
}

export default memo(NumberOfGuestsFieldWithBaby)
