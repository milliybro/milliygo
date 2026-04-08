import { Radio, RadioChangeEvent } from 'antd'
import { useEffect, useState } from 'react'

import type { ReactElement } from 'react'

import PencilIcon from '@/components/icons/pencil'
import SettingsField from '@/features/Account/components/SettingsField'
import { setCookie } from 'cookies-next'
import { useTranslations } from 'next-intl'
import { useMutation } from '@tanstack/react-query'
import { updateAccountMe } from '../../api'

export default function PersonalSex({ userInfo, setUserInfo, loginAction }: any): ReactElement {
  const t = useTranslations()

  const [isEmpty, setIsEmpty] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [selectedGender, setSelectedGender] = useState(userInfo?.gender)
  const [contentText, setContentText] = useState('')

  const options = [
    { value: 'male', label: t('genders.man') },
    { value: 'female', label: t('genders.woman') },
  ]

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
        gender: selectedGender,
      })
    }
    setIsEditing((prev) => !prev)
  }

  const handleChange = (e: RadioChangeEvent) => {
    setSelectedGender(e.target.value)
  }

  useEffect(() => {
    if (userInfo?.gender) {
      setContentText(options.find((item) => item.value === userInfo?.gender)?.label || '')
      setIsEmpty(false)
      setSelectedGender(userInfo?.gender)
    } else {
      setContentText(t('personal-information.sex-text'))
      setIsEmpty(true)
    }
  }, [t, userInfo?.gender])

  return (
    <SettingsField
      isEmpty={isEmpty}
      isEditing={isEditing}
      title={t('personal-information.sex')}
      content={contentText}
      editContent={<Radio.Group onChange={handleChange} value={selectedGender} options={options} />}
      contentClassName="font-normal text-primary-dark"
      btnText={isEditing ? t('buttons.save') : t('buttons.edit')}
      btnIcon={isEditing ? null : <PencilIcon />}
      btnClassName={
        isEditing ? 'text-success hover:!text-success' : 'text-primary hover:!text-primary'
      }
      onClick={deletionHandler}
      onCancel={() => {
        setIsEditing(false)
        setSelectedGender(userInfo?.gender)
      }}
    />
  )
}
