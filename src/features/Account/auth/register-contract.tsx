import { useContext, useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useTranslations } from 'next-intl'
import { Button, Col, Form, Input, Modal, Row, Typography } from 'antd'

import CityIcon from '@/components/icons/city'
import AgreementIcon from '@/components/icons/argement-icon'

import { AuthContext } from './context/authContext'
import { IUserInfo } from './store/authStore'

import banner from '@/assets/uz-unesco.jpg'

function RegisterContractor() {
  const t = useTranslations()
  const { push } = useRouter()
  const router = useRouter()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const authContext = useContext(AuthContext)
  const authStore = authContext?.authStore
  const userInfo = authStore?.userInfo

  const [step, setStep] = useState(1)

  useEffect(() => {
    if (userInfo?.is_guide) {
      push('/guide-account/profile')
    }
  }, [userInfo])

  const handleOpen = () => setIsModalOpen(true)
  const handleClose = () => setIsModalOpen(false)

  const handleSubmit = () => {
    router.push('/contract/my-services')
  }

  return (
    <div className="overflow-hidden bg-[#f8f8fa]">
      <Row gutter={24}>
        <Col span={8}>
          <div className="bg-primary-dark h-screen relative">
            <Image
              fill
              alt="Backgroun"
              src={banner.src}
              className="w-full h-full object-cover object-[15%]"
              unoptimized
            />
            <Link href={'/'} aria-label="open main route">
              <Image
                className="absolute top-10 left-[calc(50%-150px)]"
                width={183.58}
                height={48}
                src="/logo-new.png"
                alt="logo"
                style={{ width: 'auto', height: 'auto' }}
                unoptimized
              />
            </Link>
          </div>
        </Col>

        <Col span={16} className="flex items-center justify-center text-center">
          <div className="max-w-[486px] h-full flex flex-col">
            <div className="flex flex-col h-full gap-8 justify-center items-center">
              <div className="space-y-4">
                <Typography.Title level={2} className="text-[32px] font-bold">
                  {t('main.three-steps-first-title')}
                </Typography.Title>
                <Typography.Text className="max-w-[40ch] text-lg text-secondary">
                  {step === 1 ? t('contract.ckeck-with-one-id') : t('contract.check-tax-office')}
                </Typography.Text>
                <div className="flex justify-center">
                  <span className="w-fit bg-[#4DD2821A] p-2 rounded-[12px] block text-[18px] text-[#4DD282] font-[400]">
                    <span className="font-semibold">
                      {t('contract.step')} {step}
                    </span>{' '}
                    {t('contract.from')} 2
                  </span>
                </div>
              </div>

              {step === 1 ? (
                <Form className="w-full">
                  <div className="flex flex-col gap-3">
                    <Form.Item className="m-0">
                      <Input
                        prefix={<AgreementIcon className="text-[24px] text-[#B7BFD5]" />}
                        placeholder={t('contract.enter-tin')}
                        className="bg-white"
                        size="large"
                      />
                    </Form.Item>
                    <Form.Item className="m-0">
                      <Input
                        prefix={<CityIcon className="text-[22px] text-[#B7BFD5]" />}
                        placeholder={t('contract.enter-name-organization')}
                        className="bg-white"
                        size="large"
                      />
                    </Form.Item>
                  </div>
                </Form>
              ) : (
                <Form className="w-full" layout="vertical">
                  <div className="grid grid-cols-2 gap-4">
                    <Form.Item className="m-0 col-span-2">
                      <Input
                        placeholder={t('contract.enter-tin')}
                        className="bg-white"
                        size="large"
                      />
                    </Form.Item>
                    <Form.Item className="m-0 col-span-2">
                      <Input
                        placeholder={t('contract.enter-name-organization')}
                        className="bg-white"
                        size="large"
                      />
                    </Form.Item>
                    <Form.Item className="m-0">
                      <Input
                        placeholder={t('contract.enter-city')}
                        className="bg-white"
                        size="large"
                      />
                    </Form.Item>
                    <Form.Item className="m-0">
                      <Input
                        placeholder={t('contract.enter-area')}
                        className="bg-white"
                        size="large"
                      />
                    </Form.Item>
                    <Form.Item className="m-0">
                      <Input
                        placeholder={t('contract.enter-address')}
                        className="bg-white"
                        size="large"
                      />
                    </Form.Item>
                    <Form.Item className="m-0">
                      <Input
                        placeholder={t('transport.phone.placeholder')}
                        className="bg-white"
                        size="large"
                      />
                    </Form.Item>
                    <Form.Item className="m-0">
                      <Input
                        placeholder={t('contract.enter-manager')}
                        className="bg-white"
                        size="large"
                      />
                    </Form.Item>
                    <Form.Item className="m-0">
                      <Input
                        placeholder={t('contract.enter-pinfl')}
                        className="bg-white"
                        size="large"
                      />
                    </Form.Item>
                    <Form.Item className="m-0 col-span-2">
                      <Input
                        placeholder={t('contract.enter-parent-organization')}
                        className="bg-white"
                        size="large"
                      />
                    </Form.Item>
                    <Form.Item className="m-0 col-span-2">
                      <Input
                        placeholder={t('contract.enter-oked')}
                        className="bg-white"
                        size="large"
                      />
                    </Form.Item>
                    <Form.Item className="m-0 col-span-2">
                      <Input
                        placeholder={t('contract.enter-activity')}
                        className="bg-white"
                        size="large"
                      />
                    </Form.Item>
                  </div>
                </Form>
              )}

              <div className="w-full flex gap-3">
                <Button
                  size="large"
                  type="primary"
                  className="w-full bg-[#3276FF33] text-[#3276FF]"
                  onClick={() => setStep(step - 1)}
                >
                  {t('buttons.back')}
                </Button>
                <Button
                  size="large"
                  type="primary"
                  className="w-full"
                  onClick={() => {
                    if (step < 2) {
                      setStep(step + 1)
                    } else {
                      handleOpen()
                    }
                  }}
                >
                  {step === 2 ? t('contract.next') : t('contract.next')}
                </Button>
              </div>
            </div>
          </div>
        </Col>
      </Row>
      <Modal width={867} open={isModalOpen} onCancel={handleClose} onOk={handleClose} footer={null}>
        <Typography.Text className="text-[24px] font-semibold">
          {t('contract.terms-of-use')}
        </Typography.Text>
        <div className="mt-8">
          <Typography.Text className="text-[24px] block">
            {t('contract.terms-of-use')}
          </Typography.Text>
          <Typography.Text className="text-[16px] block">
            Настоящий документ является официальным предложением (публичной офертой) для
            неограниченного круга лиц заключить договор на использование сервиса в соответствии с
            изложенными ниже условиями. <br /> 1. Общие положения <br /> 1.1. Использование
            сайта/приложения означает полное и безоговорочное согласие пользователя с настоящими
            условиями. <br /> 1.2. Администрация сервиса оставляет за собой право вносить изменения
            в условия использования в любое время без предварительного уведомления. <br /> 2.
            Предмет оферты <br /> 2.1. Сервис предоставляет пользователям возможность просматривать
            товары, оформлять заказы, накапливать кэшбэк и пользоваться другими функциями платформы.{' '}
            <br /> 2.2. Настоящая оферта признается принятой после регистрации пользователя или
            начала использования функционала сервиса. <br /> 3. Права и обязанности сторон
            Пользователь обязуется: <br /> — предоставлять достоверную информацию при регистрации и
            оформлении заказов;
            <br /> — не нарушать законодательства и правила пользования сервисом. Сервис обязуется:
            <br /> — предоставлять доступ к функционалу в соответствии с техническими возможностями;
            <br /> — обеспечивать сохранность персональных данных согласно Политике
          </Typography.Text>
        </div>
        <div className="flex justify-end gap-4 mt-8">
          <Button className="w-[200px]" size="middle">
            {t('buttons.back')}
          </Button>
          <Button onClick={handleSubmit} className="w-[200px]" type="primary" size="middle">
            {t('buttons.confirm')}
          </Button>
        </div>
      </Modal>
    </div>
  )
}

export default RegisterContractor
