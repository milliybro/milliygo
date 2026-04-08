import { useCallback, useEffect, useState } from 'react'

import type { ReactElement } from 'react'

import PencilIcon from '@/components/icons/pencil'
import SettingsField from '@/features/Account/components/SettingsField'
import ProfileCitizenshipModal from '@/features/Account/components/PersonalInformation/ProfileCitizenshipModal'
import { capitalizeFirstLetters } from '@/helpers/capitalize-first-letters'
import { RadioChangeEvent } from 'antd/lib'
import { setCookie } from 'cookies-next'
import { useTranslations } from 'next-intl'
import { useMutation, useQuery } from '@tanstack/react-query'
import { getCountry, getListCountries, updatePatchAccountMe } from '../../api'

const INITIAL_COUNTRIES = [1, 2, 3, 4]

export default function PersonalCitizenship({
  userInfo,
  setUserInfo,
  loginAction,
}: any): ReactElement {
  const t = useTranslations()

  const [isEmpty, setIsEmpty] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [selectedCountry, setSelectedCountry] = useState(userInfo?.country)
  const [contentText, setContentText] = useState(t('personal-information.citizenship-text'))
  const [search, _setSearch] = useState('')

  const { mutate } = useMutation({
    mutationFn: updatePatchAccountMe,
    onSuccess: (res) => {
      loginAction(res)
      setUserInfo(res)
      setCookie('userInfo', res)
    },
  })

  const deletionHandler = (): void => {
    if (isEditing) {
      mutate({
        country: selectedCountry,
      })
    }
    setIsEditing((prev) => !prev)
  }

  const handleChange = (e: RadioChangeEvent) => {
    setSelectedCountry(e.target.value)
    const selected = countries?.find((item) => item.value === e.target.value)
    if (selected?.label) {
      setContentText(selected.label)
    }
  }

  const { data: initialCountry } = useQuery({
    queryKey: ['country', userInfo?.country],
    queryFn: () => getCountry(userInfo?.country),
    select: (data) => ({
      label: capitalizeFirstLetters(data.name),
      value: data.id,
    }),
    enabled: !!userInfo?.country,
  })

  const { data: countries, isLoading } = useQuery({
    queryKey: ['countries', search],
    queryFn: () => getListCountries({ search }),
    select: (data) => {
      const uniqueId: number[] = []
      return [
        ...data.results
          .map((country, i) => ({
            value: country.id,
            label: capitalizeFirstLetters(country.name),
            key: i,
          }))
          .filter((country) => {
            if (uniqueId.includes(country.value)) {
              return false
            } else {
              uniqueId.push(country.value)
              return true
            }
          })
          .sort((a, b) => a.label.localeCompare(b.label))
          .sort((a, b) => (INITIAL_COUNTRIES.includes(a.value) ? a.value - b.value : 1))
          .sort((a) => (a.value === userInfo?.country ? -1 : 1)),
      ]
    },
    enabled: isEditing,
  })

  useEffect(() => {
    if (initialCountry?.label) {
      setIsEmpty(false)
      setContentText(initialCountry.label)
      setSelectedCountry(initialCountry?.value)
    } else {
      setIsEmpty(true)
    }
  }, [initialCountry, userInfo?.country])

  const handleCancel = useCallback(() => {
    setIsEditing(false)
    if (initialCountry?.value) {
      setIsEmpty(false)
      setContentText(initialCountry.label)
      setSelectedCountry(initialCountry?.value)
    } else {
      setIsEmpty(true)
      setSelectedCountry(userInfo?.country)
      setContentText(t('personal-information.citizenship-text'))
    }
  }, [initialCountry?.label, initialCountry?.value, userInfo?.country, t])

  return (
    <SettingsField
      isEmpty={isEmpty}
      isEditing={isEditing}
      title={t('personal-information.citizenship')}
      content={contentText}
      editContent={
        <ProfileCitizenshipModal
          selectedCitizenship={selectedCountry}
          onCitizenshipChange={handleChange}
          contentText={contentText}
          onSave={deletionHandler}
          options={countries}
          isLoading={isLoading}
          handleCancel={handleCancel}
        />
      }
      contentClassName="font-normal text-primary-dark"
      btnText={isEditing ? t('buttons.save') : t('buttons.edit')}
      btnIcon={isEditing ? null : <PencilIcon />}
      btnClassName={
        isEditing ? 'text-success hover:!text-success' : 'text-primary hover:!text-primary'
      }
      onClick={deletionHandler}
      onCancel={handleCancel}
    />
  )
}
