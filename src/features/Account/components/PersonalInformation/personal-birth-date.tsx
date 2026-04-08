import { DatePicker, message } from 'antd'
import type { ReactElement } from 'react'
import { useEffect, useRef, useState } from 'react'

import PencilIcon from '@/components/icons/pencil'
import SettingsField from '@/features/Account/components/SettingsField'
import { setCookie } from 'cookies-next'
import dayjs, { Dayjs } from 'dayjs'
import { useTranslations } from 'next-intl'
import { useMutation } from '@tanstack/react-query'
import { updateAccountMe } from '../../api'

export default function PersonalBirthDate({
  userInfo,
  setUserInfo,
  loginAction,
}: any): ReactElement {
  const t = useTranslations()

  const inputRef = useRef<any>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [date, setDate] = useState<Dayjs | null>(
    userInfo?.birth_date ? dayjs(userInfo.birth_date) : null
  )
  const [isEmpty, setIsEmpty] = useState(false)
  const [contentText, setContentText] = useState('')

  const { mutate } = useMutation({
    mutationFn: updateAccountMe,
    onSuccess: (res) => {
      setCookie('userInfo', res)
      setUserInfo(res)
      loginAction(res)
    },
  })

  const deletionHandler = (): void => {
    if (isEditing) {
      if (!date) {
        message.warning(t('personal-information.select-birth-date-warning'))
        return
      }

      mutate({
        birth_date: dayjs(date).format('YYYY-MM-DD'),
      })
    }
    setIsEditing((prev) => !prev)
  }

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus()
    }
  }, [isEditing])

  useEffect(() => {
    if (userInfo?.birth_date) {
      setIsEmpty(false)
      setContentText(dayjs(userInfo?.birth_date || undefined).format('DD.MM.YYYY'))
    } else {
      setIsEmpty(true)
      setContentText(t('personal-information.birth-date-text'))
    }
  }, [t, userInfo?.birth_date])

  return (
    <SettingsField
      isEmpty={isEmpty}
      isEditing={isEditing}
      title={t('personal-information.birth-date')}
      content={<div>{contentText}</div>}
      editContent={
        <DatePicker
          ref={inputRef}
          allowClear={false}
          suffixIcon={null}
          className="border-none bg-transparent p-0 ring-0"
          format={{
            format: 'DD.MM.YYYY',
            type: 'mask',
          }}
          value={date}
          onChange={(value) => {
            setDate(value)
          }}
          placeholder="DD.MM.YYYY"
          disabledDate={(current) =>
            current && (current > dayjs().endOf('day') || current < dayjs('1900-01-01'))
          }
        />
      }
      contentClassName="font-normal text-primary-dark"
      btnText={isEditing ? t('buttons.save') : t('buttons.edit')}
      btnIcon={isEditing ? null : <PencilIcon />}
      btnClassName={
        isEditing ? 'text-success hover:!text-success' : 'text-primary hover:!text-primary'
      }
      onClick={deletionHandler}
      onCancel={() => {
        setIsEditing(false)
        setDate(userInfo?.birth_date ? dayjs(userInfo.birth_date) : null)
      }}
    />
  )
}
