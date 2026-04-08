import CustomModal from '@/components/common/CModal'
import CheckmarkCircleIcon from '@/components/icons/checkmark-circle'
import { Button } from 'antd'
import { Dispatch, SetStateAction } from 'react'

function CommentedModal({
  commentedModalOpen,
  setCommentedModalOpen,
}: {
  commentedModalOpen: boolean
  setCommentedModalOpen: Dispatch<SetStateAction<boolean>>
}) {
  return (
    <CustomModal
      width={496}
      modalIcon={<CheckmarkCircleIcon className="text-[10px]" />}
      modalTitle="Спасибо за отзыв"
      modalDesc="Ваше отзыв успешно опубликован"
      open={commentedModalOpen}
      onOk={() => {
        setCommentedModalOpen(false)
      }}
      onCancel={() => {
        setCommentedModalOpen(false)
      }}
    >
      <Button
        aria-label="Закрыть"
        size="large"
        type="primary"
        className="w-full"
        onClick={() => {
          setCommentedModalOpen(false)
        }}
      >
        Закрыть
      </Button>
    </CustomModal>
  )
}

export default CommentedModal
