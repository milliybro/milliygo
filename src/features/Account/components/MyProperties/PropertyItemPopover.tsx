import CustomModal from '@/components/common/CModal'
import DeleteIcon from '@/components/icons/delete'
import MoreRoundedIcon from '@/components/icons/moreRoundedIcon'
import { IProperty } from '@/types'
import { Button, Flex, Popover } from 'antd'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { deleteProperty } from '../../api'

export default function PropertyItemPopover({
  item,
  refetch,
  onDeactivate,
  onActivate,
}: {
  item: IProperty
  refetch: any
  onDeactivate: (_id: number) => void
  onActivate: (_id: number) => void
}) {
  const [openedPopover, setOpenedPopover] = useState(false)
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false)

  const router = useRouter()
  const t = useTranslations()

  const { mutate, isPending } = useMutation({
    mutationFn: deleteProperty,
    onSuccess: () => {
      setIsModalOpenDelete(false)
      refetch()
    },
  })

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
              onClick={() => router.push('/account/properties/' + item.id)}
              className="flex items-center gap-2 rounded-xl p-4 text-start text-sm font-medium hover:bg-secondary-light"
            >
              {t('my-properties.edit')}
            </button>
            {item.status ? (
              <button
                aria-label={t('my-properties.dont-get-guest')}
                type="button"
                onClick={() => {
                  setOpenedPopover(false)
                  onDeactivate(item.id)
                }}
                className="flex items-center gap-2 rounded-xl p-4 text-start text-sm font-medium hover:bg-secondary-light"
              >
                {t('my-properties.dont-get-guest')}
              </button>
            ) : (
              <button
                aria-label={t('my-properties.activate-object')}
                type="button"
                onClick={() => {
                  setOpenedPopover(false)
                  onActivate(item.id)
                }}
                className="flex items-center gap-2 rounded-xl p-4 text-start text-sm font-medium hover:bg-secondary-light"
              >
                {t('my-properties.activate-object')}
              </button>
            )}

            <button
              aria-label={t('my-properties.delete-object')}
              type="button"
              onClick={() => {
                setOpenedPopover(false)
              }}
              className="flex items-center gap-2 rounded-xl p-4 text-start text-sm font-medium text-red-400 hover:bg-secondary-light"
            >
              {t('my-properties.delete-object')}
            </button>
          </Flex>
        }
        trigger="click"
      >
        <Button type="link" className="m-0 flex h-max w-max items-center p-0">
          <MoreRoundedIcon className="text-xl" />
        </Button>
      </Popover>
      {/* <PlacementDeleteModal

        reportModalOpen={complainModal}
        setReportModalOpen={setComplainModal}
      /> */}
      <CustomModal
        modalTitle={t('my-properties.delete-object-text')}
        modalDesc={t('my-properties.delete-object-text-2')}
        modalIcon={<DeleteIcon className="text-[40px]" />}
        width={615}
        open={isModalOpenDelete}
        onCancel={() => setIsModalOpenDelete(false)}
        onOk={() => setIsModalOpenDelete(false)}
      >
        <div className="grid grid-cols-2 gap-8">
          <Button
            aria-label={t('buttons.cancel')}
            className="h-[58px] rounded-2xl bg-secondary-light/10 font-medium text-primary-dark shadow-none"
            onClick={() => setIsModalOpenDelete(false)}
          >
            {t('buttons.cancel')}
          </Button>
          <Button
            aria-label={t('buttons.delete')}
            type="primary"
            loading={isPending}
            className="h-[58px] rounded-2xl bg-[#FF4E4E] shadow-none hover:!bg-[#FF4E4E]/70"
            onClick={() => {
              mutate(item.id)
            }}
          >
            {t('buttons.delete')}
          </Button>
        </div>
      </CustomModal>
    </>
  )
}
