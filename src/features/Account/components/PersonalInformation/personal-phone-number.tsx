import PencilIcon from '@/components/icons/pencil'
import SettingsField from '@/features/Account/components/SettingsField'
import { formatDisplayNumber } from '@/helpers/format-display-number'
import { parsePhoneNumberString } from '@/helpers/parse-phone-number-string'
import { message } from 'antd'
import { PhoneNumber } from 'antd-phone-input'
import { setCookie } from 'cookies-next'
import { useTranslations } from 'next-intl'
import dynamic from 'next/dynamic'
import type { ReactElement } from 'react'
import { memo, useEffect, useRef, useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { updatePatchAccountMe } from '../../api'

const PhoneInput = dynamic(() => import('antd-phone-input'), { ssr: false })

function PersonalPhoneNumber({ userInfo, setUserInfo, loginAction }: any): ReactElement {
  const t = useTranslations()

  const [isEditing, setIsEditing] = useState(false)
  const [phoneValue, setPhoneValue] = useState<PhoneNumber | undefined>()
  const [contentText, setContentText] = useState('')
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [isEmpty, setIsEmpty] = useState(false)

  const { mutate } = useMutation({
    mutationFn: updatePatchAccountMe,
    onSuccess: (res) => {
      setUserInfo(res)
      setCookie('userInfo', res)
      loginAction(res)
    },
  })

  const deletionHandler = (): void => {
    if (isEditing) {
      if (!phoneValue?.countryCode || !phoneValue?.areaCode || !phoneValue?.phoneNumber) {
        message.error(t('transport.phone.error-invalid'))
        return
      }

      const phoneString =
        '' +
        (phoneValue?.countryCode ?? '') +
        (phoneValue?.areaCode ?? '') +
        (phoneValue?.phoneNumber ?? '')

      if (phoneString !== userInfo?.phone) {
        mutate({
          phone:
            '' +
            (phoneValue?.countryCode ?? '') +
            (phoneValue?.areaCode ?? '') +
            (phoneValue?.phoneNumber ?? ''),
        })
      }
    }
    setIsEditing((prev) => !prev)
  }

  useEffect(() => {
    if (isEditing) {
      const input = wrapperRef.current?.querySelector('.ant-input') as any

      input?.focus()
    }
  }, [isEditing])

  useEffect(() => {
    if (userInfo?.phone) {
      setIsEmpty(false)
      setContentText(userInfo?.phone)
    } else {
      setIsEmpty(true)
      setContentText(t('personal-information.phone-number-text'))
    }
  }, [t, userInfo?.phone])

  useEffect(() => {
    setPhoneValue(parsePhoneNumberString(userInfo?.phone))
  }, [userInfo?.phone])

  return (
    <SettingsField
      isEditing={isEditing}
      isEmpty={isEmpty}
      title={t('transport.phone.label')}
      content={formatDisplayNumber(contentText)}
      editContent={
        <div ref={wrapperRef}>
          <PhoneInput
            size="large"
            enableSearch
            onChange={(value) => {
              setPhoneValue(value)
            }}
            value={phoneValue}
            preferredCountries={['uz']}
            searchPlaceholder={t('others.search-countries')}
            searchNotFound={t('others.search-countries-not-found')}
            className="!bg-white [&>span>input]:!border-none [&>span>input]:!bg-transparent [&>span>input]:p-0 [&>span>input]:!ring-0 [&>span>span>div]:!h-6 [&>span>span]:!border-none [&>span>span]:!bg-transparent"
          />
        </div>
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
        setPhoneValue(parsePhoneNumberString(userInfo?.phone))
      }}
    />
  )
}

export default memo(PersonalPhoneNumber)
