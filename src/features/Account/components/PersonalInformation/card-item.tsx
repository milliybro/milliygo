import { DeleteOutlined } from '@ant-design/icons'
import { Button, Divider, Flex, Typography } from 'antd'
import { useTranslations } from 'next-intl'
import React from 'react'
import PencilIcon from '@/components/icons/pencil'
import Image from 'next/image'

interface IProps {
  id: number
  logo: string
  isNew: boolean
  cardNumber: string
  cardExpirationDate: string
  onClickFunction: (_isNew: boolean) => void
  setCardId: (_id: number) => void
}

export default function CardItem(props: IProps): React.ReactElement {
  const { id, logo, isNew, cardNumber, cardExpirationDate, onClickFunction, setCardId } = props
  const t = useTranslations()

  return (
    <Flex vertical>
      <div className="flex items-center justify-between gap-10">
        <Typography className="font-medium text-primary-dark">
          {t('payment-details.payment-card')}
        </Typography>

        <div className="flex items-center gap-1">
          <div className="flex h-6 w-6 items-center gap-2">
            {!isNew && logo && <Image width={24} height={24} src={logo} alt="" unoptimized />}
          </div>

          <Typography className="flex-1">{isNew ? '-' : `●●●● ${cardNumber.slice(-4)}`}</Typography>
        </div>

        <div>{cardExpirationDate}</div>
        {isNew ? (
          <Button
            aria-label={t('buttons.add-card')}
            onClick={() => {
              onClickFunction(isNew)
            }}
            type="text"
            size="small"
            className="flex w-fit items-center !text-sm font-medium text-primary hover:!text-primary"
          >
            <PencilIcon />
            {t('buttons.add-card')}
          </Button>
        ) : (
          <Button
            aria-label={t('buttons.delete')}
            onClick={() => {
              onClickFunction(isNew)
              setCardId(id)
            }}
            type="text"
            size="small"
            className="flex w-fit items-center !text-sm font-medium text-red-600 hover:!text-red-600"
          >
            <DeleteOutlined />
            {t('buttons.delete')}
          </Button>
        )}
      </div>
      <Divider className="border-[#F8F8FA]" />
    </Flex>
  )
}
