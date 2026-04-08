import GPSIcon from '@/components/icons/gps-icon'
import ContractLayout from '@/components/Layouts/Account/ContractLoyout'
import { Button, Flex, Form, Input, Modal, Select, Typography } from 'antd'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import ContractYandexMap from '../components/MapService'

function ContractServiceCreate() {
  const t = useTranslations('')
  const [form] = Form.useForm()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const handleOpen = () => setIsModalOpen(true)
  const handleClose = () => setIsModalOpen(false)

  return (
    <ContractLayout
      breadCrumbItems={[
        {
          title: t('preferences.main'),
          href: '/',
        },
        {
          title: t('contract.employee-account'),
          href: '',
        },
        {
          title: t('contract.my-services'),
        },
      ]}
    >
      <Flex vertical gap={24}>
        <div className="flex items-center justify-between">
          <div>
            <Typography.Title level={3} className="m-0 !mb-2">
              {t('contract.create-service')}
            </Typography.Title>
            <Typography.Text className="text-sm">
              {t('contract.create-and-customize')}
            </Typography.Text>
          </div>
        </div>
        <div className="">
          <Form>
            <div className="grid grid-cols-2 gap-4">
              <Form.Item className="col-span-2 m-0">
                <Input size="large" placeholder={t('contract.enter-service-name')} />
              </Form.Item>
              <Form.Item className="m-0">
                <Select size="large" placeholder={t('transport.select-region')} />
              </Form.Item>
              <Form.Item className="m-0">
                <Select size="large" placeholder={t('error.addressdistrict')} />
              </Form.Item>
              <Form.Item className="m-0">
                <Input size="large" placeholder={t('contract.enter-street-name')} />
              </Form.Item>
              <Form.Item className="m-0">
                <Input size="large" placeholder={t('contract.enter-home-number')} />
              </Form.Item>
              <div
                onClick={handleOpen}
                className="col-span-2 flex cursor-pointer items-center gap-5 rounded-[12px] border border-dashed bg-[#3276FF0D] p-4"
              >
                <GPSIcon />
                <div>
                  <Typography.Text className="block text-[16px] font-[500]">
                    {t('contract.select-location')}
                  </Typography.Text>
                  <Typography.Text className="text-[14px] font-[500] text-[#777E90]">
                    {t('contract.open-map')}
                  </Typography.Text>
                </div>
              </div>
              <Form.Item className="col-span-2 m-0">
                <Select size="large" placeholder={t('contract.enter-placement-type')} />
              </Form.Item>
              <Form.Item className="m-0">
                <Input size="large" placeholder={t('contract.number-of-buildings')} />
              </Form.Item>
              <Form.Item className="m-0">
                <Input size="large" placeholder={t('others.room-count')} />
              </Form.Item>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <Button size="large">{t('guide-account.cancel')}</Button>
              <Button type="primary" size="large">
                {t('contract.complate')}
              </Button>
            </div>
          </Form>
        </div>
      </Flex>
      <Modal width={867} open={isModalOpen} onCancel={handleClose} onOk={handleClose} footer={null}>
        <Typography.Text className="text-[24px] font-semibold">
          {t('contract.enter-hotel-address')}
        </Typography.Text>
        <div style={{ height: '400px', marginTop: '16px' }}>
          <ContractYandexMap form={form} />
        </div>

        <div className="mt-8 flex justify-end gap-4">
          <Button className="w-[200px]" size="middle">
            {t('my-properties.cancel')}
          </Button>
          <Button className="w-[200px]" type="primary" size="middle">
            {t('buttons.confirm')}
          </Button>
        </div>
      </Modal>
    </ContractLayout>
  )
}

export default ContractServiceCreate
