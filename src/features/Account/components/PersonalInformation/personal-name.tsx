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

function PersonalName({ userInfo, setUserInfo, loginAction }: any): ReactElement {
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
        first_name: name.name,
      })
    }
    setIsEditing((prev) => !prev)
  }

  useEffect(() => {
    if (userInfo?.first_name) {
      setContentText(`${userInfo?.first_name} `)
    } else {
      setContentText(t('personal-information.name-text'))
    }
  }, [isEditing, name, userInfo?.first_name, userInfo])

  return (
    <SettingsField
      isEditing={isEditing}
      title={t('personal-information.name')}
      content={contentText}
      editContent={
        <Flex gap={16}>
          <Input
            className="h-[53px] w-[200px] rounded-2xl border-none !bg-[#F8F8FA] !text-primary-dark"
            defaultValue={userInfo?.first_name}
            onChange={(val) => {
              setName((prev: any) => ({
                ...prev,
                name: val.target.value,
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
        setName(userInfo.first_name)
      }}
    />
  )
}

export default memo(PersonalName)
