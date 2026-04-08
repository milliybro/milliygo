import StatusPopup from '@/components/common/StatusPopup'
import LicenseDraftIcon from '@/components/icons/license-draft-icon'
import LoadingIcon from '@/components/icons/loading'
import PencilIcon2 from '@/components/icons/pencil-2'
import ReloadIcon from '@/components/icons/reload'
import PageHeader from '@/features/Account/components/PageHeader'
import { Avatar, Button, Flex, Form, Input, Modal, Select, Spin, Table, Typography } from 'antd'
import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { twMerge } from 'tailwind-merge'
import { getAccomodation, getOwnerAccomodation, reloadCadastr, updateCadastr } from '../api'

function MyCadastr() {
  const t = useTranslations()
  const [openModal, setOpenModal] = useState<number | null>(null)
  const [form] = Form.useForm()

  const {
    data = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['placementsOwner'],
    queryFn: () => getOwnerAccomodation(),
    refetchOnWindowFocus: false,
    select: (data) => data?.results,
  })

  const { data: placement = {} } = useQuery({
    queryKey: ['accommodation', openModal],
    queryFn: () => getAccomodation({ id: openModal }),
    refetchOnWindowFocus: false,
    enabled: !!openModal,
  })
  const { mutate: reload } = useMutation({ mutationFn: reloadCadastr })
  const [showLoading, setShowLoading] = useState(false)

  const handleReload = () => {
    setShowLoading(true)
    reload()
    setTimeout(() => {
      setShowLoading(false)
      refetch()
    }, 30000)
  }

  useEffect(() => {
    if (placement) {
      form.setFieldsValue({
        is_commercial_purpose: placement.is_commercial_purpose,
        cud_name: placement.cud_name,
      })
    }
  }, [placement, form])

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: t('my-properties.name-kadastr'),
      dataIndex: 'cud_name',
      key: 'cud_name',
    },
    {
      title: t('my-properties.number-kadastr'),
      dataIndex: 'cad_number',
      key: 'cad_number',
    },
    {
      title: t('my-properties.type-housing'),
      dataIndex: 'vidText',
      key: 'vidText',
    },
    {
      title: t('user.action'),
      dataIndex: 'id',
      key: 'action',
      render: (id: number) => {
        return (
          <Button
            className="border-none bg-[#F8F8FA] text-primary"
            onClick={() => setOpenModal(id)}
          >
            <PencilIcon2 className="text-[18px]" />
          </Button>
        )
      },
    },
  ]

  const { mutate: cadastrMutate, isPending: isLoadingUpdate } = useMutation({
    mutationFn: updateCadastr,
    onSuccess: () => {
      refetch()
      setOpenModal(null)
    },
  })

  return (
    <>
      <Spin spinning={isLoading}>
        <Flex className="items-center justify-between">
          <PageHeader
            title={t('my-properties.my-cadastres')}
            description={t('booking.no-booking')}
          />
          <Button
            type="primary"
            className="flex items-center"
            loading={showLoading}
            onClick={handleReload}
          >
            <ReloadIcon className="text-[14px]" />
            {t('my-properties.reload-date')}
          </Button>
        </Flex>
        <Table
          columns={columns}
          dataSource={data}
          pagination={false}
          rowKey="id"
          className="min-h-[400px]"
        />
      </Spin>
      {showLoading && (
        <div className="absolute inset-0 z-50 mt-24 flex items-center justify-center bg-white/70 pt-12 backdrop-blur-sm">
          <StatusPopup
            icon={<LoadingIcon className="animate-spin text-[44px]" />}
            title={t('others.loading')}
          />
        </div>
      )}
      <Modal width={555} open={!!openModal} onCancel={() => setOpenModal(null)} footer={null}>
        <div className="flex flex-col items-center justify-center text-center">
          <Avatar
            shape="circle"
            size={62}
            className={twMerge('mb-5 border-[7px] border-[#EFF6FF] bg-[#DBEAFE]')}
            icon={<LicenseDraftIcon className={twMerge('text-[26px] text-primary')} />}
          />
          <Typography.Text className="text-[24px] font-[700]">
            {t('my-properties.info-kadastr')}
          </Typography.Text>

          <Form
            form={form}
            layout="vertical"
            className="w-full"
            onFinish={(values) => {
              cadastrMutate({
                id: openModal,
                ...values,
              })
            }}
          >
            <Form.Item label={t('my-properties.cadastr-name')} name="cud_name" required>
              <Input size="large" />
            </Form.Item>
            <Form.Item label={t('my-properties.for-commercial')} name="is_commercial_purpose">
              <Select
                size="large"
                placeholder={t('my-properties.payment-types')}
                options={[
                  { value: true, label: t('my-properties.commercial-yes') },
                  { value: false, label: t('my-properties.commercial-no') },
                ]}
              />
            </Form.Item>

            <div className="flex flex-col gap-4 rounded-[8px] border border-[#E5E7EB] p-4">
              <div className="flex items-center justify-between text-[14px]">
                <Typography.Text className="font-[400]">
                  {t('my-properties.number-cadastr')}
                </Typography.Text>
                <Typography.Text className="w-[220px] text-end font-[500]">
                  {placement?.cad_number}
                </Typography.Text>
              </div>
              <div className="flex items-center justify-between text-[14px]">
                <Typography.Text className="font-[400]">
                  {t('personal-information.address')}
                </Typography.Text>
                <Typography.Text className="w-[220px] text-end font-[500]">
                  {placement?.address}
                </Typography.Text>
              </div>
              <div className="flex items-center justify-between text-[14px]">
                <Typography.Text className="font-[400]">
                  {t('my-properties.type-housing')}
                </Typography.Text>
                <Typography.Text className="w-[220px] text-end font-[500]">
                  {placement?.vidText}
                </Typography.Text>
              </div>
              <div className="flex items-center justify-between text-[14px]">
                <Typography.Text className="font-[400]">{t('contract.status')}</Typography.Text>
                <Typography.Text className="w-[220px] text-end font-[500]">-</Typography.Text>
              </div>
            </div>

            <div className="mt-5 flex w-full gap-8">
              <Button className="w-full" size="large" onClick={() => setOpenModal(null)}>
                {t('guide-account.cancel')}
              </Button>
              <Button
                className="w-full"
                type="primary"
                size="large"
                htmlType="submit"
                loading={isLoadingUpdate}
              >
                {t('buttons.save')}
              </Button>
            </div>
          </Form>
        </div>
      </Modal>
    </>
  )
}

export default MyCadastr
