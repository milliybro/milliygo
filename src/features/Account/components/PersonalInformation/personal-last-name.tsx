import CheckmarkCircleIcon from '@/components/icons/checkmark-circle'
import PencilIcon from '@/components/icons/pencil'
import { updateAccountMe } from '@/features/Account/api'
import SettingsField from '@/features/Account/components/SettingsField'
import { Flex, Input } from 'antd'
import { setCookie } from 'cookies-next'
import { useTranslations } from 'next-intl'
import type { ReactElement } from 'react'
import { memo, useEffect, useState } from 'react'
import { useMutation } from '@tanstack/react-query'

function PersonalLastName({ userInfo, setUserInfo, loginAction }: any): ReactElement {
  const t = useTranslations()
  const [isEditing, setIsEditing] = useState(false)
  const [name, setName] = useState({ name: userInfo?.first_name, lastName: userInfo?.last_name })
  const [contentText, setContentText] = useState('')

  const { mutate } = useMutation({
    mutationFn: updateAccountMe,
    onSuccess: (res) => {
      setUserInfo(res)
      setCookie('userInfo', res)
      loginAction(res)
    },
  })

  const deletionHandler = (): void => {
    if (isEditing) {
      mutate({
        last_name: name.lastName,
      })
    }
    setIsEditing((prev) => !prev)
  }

  useEffect(() => {
    if (userInfo?.last_name) {
      setContentText(`${userInfo?.last_name}`)
    } else {
      setContentText(t('personal-information.last-name-text'))
    }
  }, [isEditing, name, userInfo?.last_name, userInfo])

  return (
    <SettingsField
      isEditing={isEditing}
      title={t('personal-information.last_name')}
      content={contentText}
      editContent={
        <Flex gap={16}>
          <Input
            className="h-[53px] w-[200px] border-none !bg-[#F8F8FA] !text-primary-dark"
            defaultValue={userInfo?.last_name}
            onChange={(val) => {
              setName((prev: any) => ({
                ...prev,
                lastName: val.target.value,
              }))
            }}
          />
        </Flex>
      }
      contentClassName="font-normal text-primary-dark"
      btnText={isEditing ? t('buttons.save') : t('buttons.edit')}
      btnIcon={isEditing ? <CheckmarkCircleIcon className="text-[22px]" /> : <PencilIcon />}
      btnClassName={
        isEditing ? 'text-success hover:!text-success' : 'text-primary hover:!text-primary'
      }
      onClick={deletionHandler}
      onCancel={() => {
        setIsEditing(false)
        setName(userInfo.last_name)
      }}
    />
  )
}

export default memo(PersonalLastName)
