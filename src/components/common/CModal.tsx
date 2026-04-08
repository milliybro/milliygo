import { Button, Flex, Modal, Typography } from 'antd'

import type { ReactElement, ReactNode } from 'react'
import type { ModalProps } from 'antd'
import CloseIcon from '../icons/close'
import { twMerge } from 'tailwind-merge'

interface IProps extends ModalProps {
  modalIcon?: ReactNode
  modalIconClassName?: string
  modalTitle?: string
  modalDesc?: string
  modalClassName?: string
  showCloseIcon?: boolean
}

export default function CustomModal(props: IProps): ReactElement {
  const {
    children,
    modalTitle,
    modalDesc,
    modalIcon,
    modalClassName,
    modalIconClassName,
    showCloseIcon = false,
  } = props

  return (
    <Modal
      classNames={{ content: 'p-[40px]' }}
      {...props}
      footer={null}
      closeIcon={null}
      title={null}
      centered
    >
      {showCloseIcon ? (
        <Button
          shape="circle"
          className="absolute right-5 top-5 z-10 flex items-center justify-center rounded-2xl !border-[#B7BFD5]/20 text-[#777E90]"
          onClick={props.onCancel}
          aria-label="cancel"
        >
          <CloseIcon className="text-sm" />
        </Button>
      ) : null}

      <Flex vertical gap={32}>
        {modalIcon && (
          <div
            className={twMerge(
              'mx-auto flex h-[80px] w-[80px] items-center justify-center rounded-3xl bg-[#F8F8FA] leading-[80px] text-secondary',
              modalIconClassName || ''
            )}
          >
            {modalIcon}
          </div>
        )}

        {(modalTitle || modalDesc) && (
          <Flex vertical>
            {modalTitle && (
              <Typography.Title
                level={3}
                className={twMerge('mb-4 text-center dmd:text-[18px]', modalClassName || '')}
              >
                {modalTitle}
              </Typography.Title>
            )}

            {modalDesc && (
              <Typography.Text className="text-center text-[18px] text-secondary dmd:text-[14px]">
                {modalDesc}
              </Typography.Text>
            )}
          </Flex>
        )}
        {children}
      </Flex>
    </Modal>
  )
}
