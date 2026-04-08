import CheckmarkCircleIcon from '@/components/icons/checkmark-circle'
import PencilIcon from '@/components/icons/pencil'
import SettingsField from '@/features/Account/components/SettingsField'
import { Input } from 'antd'
import { setCookie } from 'cookies-next'
import { useTranslations } from 'next-intl'
import type { ReactElement } from 'react'
import { memo, useEffect, useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { updateAccountMe } from '../../api'

function PersonalDisplayName({ userInfo, setUserInfo, loginAction }: any): ReactElement {
  const t = useTranslations()
  const [isEditing, setIsEditing] = useState(false)
  const [name, setName] = useState(userInfo?.middle_name)

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
        middle_name: name,
      })
    }
    setIsEditing((prev) => !prev)
  }

  useEffect(() => {
    if (userInfo?.middle_name) {
      setContentText(userInfo?.middle_name)
    } else {
      setContentText(t('personal-information.display-name-text'))
    }
  }, [isEditing, name, userInfo?.middle_name, userInfo])

  return (
    <SettingsField
      isEditing={isEditing}
      title={t('personal-information.display-name')}
      content={contentText}
      editContent={
        <Input
          className="h-[53px] w-[200px] rounded-2xl border-none !bg-[#F8F8FA] !text-primary-dark"
          defaultValue={userInfo?.middle_name}
          value={name}
          onChange={(val) => {
            setName(val.target.value)
          }}
        />
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
        setName(userInfo.middle_name)
      }}
    />
  )
}

export default memo(PersonalDisplayName)
