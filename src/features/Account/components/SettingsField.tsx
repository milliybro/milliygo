import type { ButtonProps, FlexProps } from 'antd'
import { Button, Divider, Flex, Typography } from 'antd'
import { useTranslations } from 'next-intl'
import React, { ReactNode } from 'react'

interface IProps {
  isEmpty?: boolean
  isEditing: boolean
  title: string
  align?: FlexProps['align']
  content: ReactNode | undefined
  editContent: ReactNode
  contentClassName: string | undefined
  hideBtn?: boolean
  btnText: string
  btnIcon: ReactNode
  btnClassName: ButtonProps['className']
  onClick: () => void
  onCancel?: () => void
}

function SettingsField({
  isEmpty,
  title,
  content,
  align = 'center',
  isEditing,
  editContent,
  contentClassName = '',
  hideBtn = true,
  btnText,
  btnIcon,
  btnClassName = '',
  onClick,
  onCancel,
}: IProps): React.ReactElement {
  const t = useTranslations()

  return (
    <>
      <Flex gap={24} justify="space-between" align={align} className="dsm:flex-col dsm:items-start">
        <Typography.Text className="w-[180px] text-[16px] font-medium leading-[100%] text-primary-dark">
          {title}
        </Typography.Text>

        <div
          className={`flex-1 text-[16px] leading-[100%] dsm:hidden ${isEmpty ? 'text-secondary' : 'text-primary-dark'} ${contentClassName}`}
        >
          {isEditing ? editContent : content}
        </div>
        {hideBtn ? (
          <div className="flex items-center dsm:hidden">
            <Button
              aria-label="send settings field"
              type="text"
              size="small"
              className={`flex items-center !text-sm font-medium ${btnClassName} ${
                isEditing ? 'text-[#4DD282]' : 'text-primary'
              }`}
              onClick={onClick}
            >
              {btnIcon} <span className="dsm:hidden">{btnText}</span>
            </Button>
            {isEditing && (
              <Button
                danger
                type="text"
                size="small"
                onClick={onCancel}
                className={`text-sm font-medium ${btnClassName}`}
              >
                {t('guide-account.cancel')}
              </Button>
            )}
          </div>
        ) : null}

        <div className="hidden w-full items-center justify-between dsm:flex">
          <div
            className={`flex-1 text-[16px] leading-[100%] ${isEmpty ? 'text-secondary' : 'text-primary-dark'} ${contentClassName}`}
          >
            {isEditing ? editContent : content}
          </div>
          {hideBtn ? (
            <div className="flex items-center">
              <Button
                aria-label="send settings field"
                type="text"
                size="small"
                className={`flex items-center !text-sm font-medium ${btnClassName} ${
                  isEditing ? 'text-[#4DD282]' : 'text-primary'
                }`}
                onClick={onClick}
              >
                {btnIcon} <span className="dsm:hidden">{btnText}</span>
              </Button>
              {isEditing && (
                <Button
                  danger
                  type="text"
                  size="small"
                  onClick={onCancel}
                  className={`text-sm font-medium ${btnClassName}`}
                >
                  {t('guide-account.cancel')}
                </Button>
              )}
            </div>
          ) : null}
        </div>
      </Flex>
      <Divider className="border-[#F8F8FA]" />
    </>
  )
}

export default SettingsField
