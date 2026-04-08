import React, { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Button, Flex, Form, Input, notification, Typography } from 'antd'
import PageHeader from '@/features/Account/components/PageHeader'
import CardItem from '@/features/Account/components/PersonalInformation/card-item'
import CustomModal from '@/components/common/CModal'
import AccountLayout from '@/components/Layouts/Account/AccountLayout'
import CardIcon from '@/components/icons/card-icon'
import VisaIcon from '@/components/icons/visa'
import { useMutation, useQuery } from '@tanstack/react-query'
import { deleteOneCard, getCardList, postCard } from '@/features/HotelsItem/api'
import getCardType, { CardType } from '../../components/PersonalInformation/card-type'
import Image from 'next/image'
import { ICreditCard } from '@/types'
import StyledMaskedInput from '@/components/common/StyledMaskedInput'

interface CardInfo {
  type: CardType
  icon: string
}

function PaymentDetailsPage() {
  const t = useTranslations()
  const [isModalOpenAdd, setIsModalOpenAdd] = useState(true)
  const [cardType, setCardType] = useState<CardInfo>({ type: 'unkown', icon: '' })
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false)
  const [cardId, setCardId] = useState<number | null>(null)
  const [form] = Form.useForm()
  const addNew = (): void => setIsModalOpenAdd(true)
  const closeAddModal = (): void => setIsModalOpenAdd(false)

  const deleteCard = (): void => setIsModalOpenDelete(true)
  const closeDeleteModal = (): void => setIsModalOpenDelete(false)

  const onClickFunction = (isNew: boolean): void => {
    if (isNew) {
      addNew()
    } else {
      deleteCard()
    }
  }

  const { data: AllCards, refetch }: any = useQuery({
    queryKey: ['card-list'],
    queryFn: getCardList,
  })

  const { mutate } = useMutation({
    mutationFn: async (values: any) => {
      const cardNumber = values?.card_number?.replace(/\s+/g, '')
      const convertedObject = {
        card_number: cardNumber,
        card_holder: values?.card_holder,
        expiration_date: values?.expiration_date,
        cvv: values?.cvv,
        card_type: cardType.type, // Pass the card type from state
      }
      return postCard(convertedObject)
    },
    onSuccess: () => {
      notification.success({
        message: t('error.card-added'),
      })
      refetch() // Refetch the card list after adding
      form.resetFields() // Reset form fields after success
      closeAddModal() // Close the modal after success
    },
  })

  const { mutate: deleteCardd } = useMutation({
    mutationFn: deleteOneCard,
    onSuccess: () => {
      notification.success({
        message: t('error.card-delete'),
      })
      setIsModalOpenDelete(false)
      refetch()
    },
  })

  const ondeleteFunction = () => {
    if (cardId) {
      deleteCardd(cardId) // Use the stored card ID in the mutation
    }
  }

  const handleCardNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    const cardInfo = getCardType({ cardNumber: value }) // Get card type based on input
    setCardType(cardInfo) // Update the card type state
  }

  return (
    <AccountLayout breadCrumbTitle={t('payment-details.title')} breadCrumbHref="payment-details">
      <Flex vertical gap={24}>
        <PageHeader
          title={t('payment-details.title')}
          description={t('payment-details.description')}
        />

        {AllCards?.results && AllCards?.results.length > 0 ? (
          AllCards.results.map((card: ICreditCard, index: number) => {
            const cardInfo = getCardType({ cardType: card.card_type.toLowerCase() as CardType })
            return (
              <CardItem
                id={card?.id}
                key={index}
                logo={cardInfo.icon || ''}
                isNew={false}
                cardNumber={card?.card_number}
                cardExpirationDate={card?.expiration_date}
                onClickFunction={onClickFunction}
                setCardId={setCardId}
              />
            )
          })
        ) : (
          <Typography.Text></Typography.Text>
        )}

        <CardItem
          id={0}
          logo=""
          isNew={true}
          cardNumber=""
          cardExpirationDate=""
          onClickFunction={onClickFunction}
          setCardId={setCardId}
        />
      </Flex>

      <CustomModal
        modalTitle={t('payment-details.adding-type')}
        modalDesc={t('payment-details.for-adding-card')}
        modalIcon={<CardIcon className="text-5xl" />}
        width={615}
        open={isModalOpenAdd}
        onCancel={closeAddModal}
        onOk={closeAddModal}
      >
        <Form form={form} onFinish={mutate} layout="vertical">
          {' '}
          <Flex className="flex-col">
            <Typography.Text className="mb-[12px] text-sm font-medium text-primary-dark">
              {t('payment-details.name-owner')}
            </Typography.Text>
            <Form.Item
              name="card_holder"
              className="item-center h-[53px] rounded-2xl border-none !bg-[#F8F8FA] !text-primary-dark"
              rules={[{ required: true, message: t('booking.type-first-name') }]}
            >
              <Input
                className="h-[53px] border-none !bg-[#F8F8FA] !text-primary-dark focus:shadow-none"
                placeholder={t('booking.type-first-name')}
              />
            </Form.Item>
          </Flex>
          <Flex className="flex-col">
            <Form.Item
              name="card_number"
              rules={[{ required: true, message: t('error.enter-card-details') }]}
              label={t('payment-details.number-card')}
            >
              <StyledMaskedInput
                mask="0000 0000 0000 0000"
                placeholderText="**** **** **** ****"
                formValidation={{ name: 'card_number', form }}
              />
            </Form.Item>
          </Flex>
          <Flex className="flex-col">
            <Form.Item
              name="expiration_date"
              rules={[{ required: true, message: t('error.enter-expiration-date') }]}
              label={t('payment-details.expire-date')}
            >
              <StyledMaskedInput
                mask="00/00"
                placeholderText="MM/YY"
                formValidation={{ name: 'expiration_date', form }}
              />
            </Form.Item>
          </Flex>
          {cardType.type === 'unkown' ||
            (cardType.type !== 'uzcard' &&
              cardType.type !== 'humo' && ( // Conditionally render CVV input
                <Flex className="flex-col">
                  <Typography.Text className="mb-[12px] text-sm font-medium text-primary-dark">
                    {t('CVV')}
                  </Typography.Text>
                  <Form.Item
                    name="cvv"
                    className="item-center h-[53px] overflow-hidden rounded-2xl border-none !bg-[#F8F8FA] pl-[16px] !text-primary-dark"
                    rules={[{ required: true, message: t('error.enter-cvv') }]}
                  >
                    {/* <ReactInputMask
                      style={{ fontSize: '15px' }}
                      placeholder="###"
                      className="h-[53px] w-full border-none !bg-[#F8F8FA] !text-primary-dark focus:shadow-none focus:outline-none"
                      mask="999"
                    /> */}
                  </Form.Item>
                </Flex>
              ))}
          <div className="grid grid-cols-2 gap-8">
            <Button
              aria-label={t('buttons.cancel')}
              className="h-[58px] rounded-2xl bg-secondary-light/10 font-medium text-primary-dark shadow-none"
              onClick={closeAddModal}
            >
              {t('buttons.cancel')}
            </Button>
            <Button
              aria-label={t('buttons.confirm')}
              htmlType="submit"
              type="primary"
              className="hover:!bg-info/70 h-[58px] rounded-2xl bg-primary shadow-none"
            >
              {t('buttons.confirm')}
            </Button>
          </div>
        </Form>
      </CustomModal>

      <CustomModal
        modalTitle={t('payment-details.delete-card')}
        modalDesc={t('payment-details.confirm-delete-card')}
        modalIcon={<VisaIcon className="text-5xl" />}
        width={615}
        open={isModalOpenDelete}
        onCancel={closeDeleteModal}
        onOk={ondeleteFunction}
      >
        <div className="grid grid-cols-2 gap-8">
          <Button
            aria-label={t('buttons.cancel')}
            className="h-[58px] rounded-2xl bg-secondary-light/10 font-medium text-primary-dark shadow-none"
            onClick={closeDeleteModal}
          >
            {t('buttons.cancel')}
          </Button>
          <Button
            aria-label={t('buttons.confirm')}
            type="primary"
            className="h-[58px] rounded-2xl bg-[#FF4E4E] shadow-none hover:!bg-[#FF0000]"
            onClick={ondeleteFunction}
          >
            {t('buttons.confirm')}
          </Button>
        </div>
      </CustomModal>
    </AccountLayout>
  )
}

export default PaymentDetailsPage
