import { Button, Flex } from 'antd'
import { deleteCookie, setCookie } from 'cookies-next'
import { useRouter } from 'next/router'
import queryString from 'query-string'
import { cloneElement, memo, useEffect, useState } from 'react'

import type { FC } from 'react'

import CustomModal from '@/components/common/CModal'

import ArabicFlagIcon from '@/components/icons/arabic-flag'
import ArrowDown from '@/components/icons/arrow-down'
import AzerFlagIcon from '@/components/icons/azerbaijan-flag'
import ChinaFlagIcon from '@/components/icons/china-icon'
import EngFlagIcon from '@/components/icons/eng-flag'
import FranceFlagIcon from '@/components/icons/france-flag'
import GermanyFlagIcon from '@/components/icons/germany-flag'
import IndiaFlagIcon from '@/components/icons/india-flag'
import ItalyFlagIcon from '@/components/icons/italy-flag'
import JapanFlagIcon from '@/components/icons/japan-icon'
import KazakFlagIcon from '@/components/icons/kazak-flag'
import KorFlagIcon from '@/components/icons/kor-flag'
import KyrgzFlagIcon from '@/components/icons/kyrgz-flag'
import PortugalFlagIcon from '@/components/icons/portugal-flag'
import RusFlagIcon from '@/components/icons/rus-flag'
import SpainFlagIcon from '@/components/icons/spain-flag'
import TajikFlagIcon from '@/components/icons/tajik-icon'
import TurkFlagIcon from '@/components/icons/turk-flag'
import TurkmenFlagIcon from '@/components/icons/turkmen-flag'
import UrFlagIcon from '@/components/icons/ur-flag'
import UzbFlagIcon from '@/components/icons/uzb-flag'
import { useTranslations } from 'next-intl'

const languages = [
  { label: 'O‘zbekcha', value: 'uz', icon: <UzbFlagIcon /> },
  { label: 'English (UK)', value: 'en', icon: <EngFlagIcon /> },
  { label: 'Русский', value: 'ru', icon: <RusFlagIcon /> },
  { label: '한국어', value: 'ko', icon: <KorFlagIcon /> },
  { label: 'Türkçe', value: 'tr', icon: <TurkFlagIcon /> },
  { label: 'Deutsch', value: 'de', icon: <GermanyFlagIcon /> },
  { label: 'Français', value: 'fr', icon: <FranceFlagIcon /> },
  { label: 'Italiano', value: 'it', icon: <ItalyFlagIcon /> },
  { label: 'Español', value: 'es', icon: <SpainFlagIcon /> },
  { label: 'Português', value: 'pt', icon: <PortugalFlagIcon /> },
  { label: 'العربية', value: 'ar', icon: <ArabicFlagIcon /> },
  { label: '中文', value: 'zh-CN', icon: <ChinaFlagIcon /> },
  { label: '日本語', value: 'ja', icon: <JapanFlagIcon /> },
  { label: 'हिन्दी', value: 'hi', icon: <IndiaFlagIcon /> },
  { label: 'اردو', value: 'ur', icon: <UrFlagIcon /> },
  { label: 'Tajik', value: 'tg', icon: <TajikFlagIcon /> },
  { label: 'Қазақша', value: 'kk', icon: <KazakFlagIcon /> },
  { label: 'Қирғизча', value: 'ky', icon: <KyrgzFlagIcon /> },
  { label: 'Turkmen', value: 'tk', icon: <TurkmenFlagIcon /> },
  { label: 'Azərbaycan', value: 'az', icon: <AzerFlagIcon /> },
]

const LanguageModal: FC<{ light?: boolean }> = ({ light }) => {
  const [watchLanguageModal, setWatchLanguageModal] = useState(false)
  const { push, locale, pathname, query, locales, reload, events } = useRouter()

  const clearAllGoogtrans = () => {
    const domains = [
      window.location.hostname,
      '.' + window.location.hostname,
      '.xdevs.uz',
      'emehmon.xdevs.uz',
      '.sayohat.uz',
    ]
    for (const d of domains) {
      deleteCookie('googtrans', { path: '/', domain: d })
    }
    deleteCookie('googtrans', { path: '/' })
  }

  const clickHandler = (lang: string) => () => {
    push({ pathname, query: queryString.stringify(query) }, undefined, {
      locale: lang,
    })

    setCookie('locale', lang)
    setWatchLanguageModal(false)

    events.on('routeChangeComplete', () => {
      clearAllGoogtrans()
      setCookie('googtrans', `/auto/${lang}`, { path: '/' })
      reload()
    })
  }

  const activeLang = languages.find((val) => val.value === locale)
  const t = useTranslations()

  useEffect(() => {
    setCookie('googtrans', '/auto/' + locale, { path: '/' })
    setCookie('locale', locale, { path: '/' })
  }, [locale])

  return (
    <>
      <Button
        type="text"
        size="middle"
        className={`notranslate flex h-[42px] items-center justify-center gap-2 rounded-[12px] p-0 text-[14px] font-medium uppercase dmd:px-0 dmd:py-0 ${
          light ? 'text-primary-dark' : 'text-white dmd:text-[#0c0c0c]'
        }`}
        onClick={() => setWatchLanguageModal(true)}
        aria-label="watch language"
      >
        <div className="flex hidden h-[32px] w-[32px] items-center justify-center overflow-hidden rounded-full bg-[#0c0c0c50] text-[42px] dmd:flex">
          {activeLang?.icon}
        </div>
        {activeLang?.value}
        <ArrowDown />
      </Button>
      <CustomModal
        width={1073}
        modalTitle={t('others.select-language')}
        modalDesc={t('others.select-language-desc')}
        open={watchLanguageModal}
        onOk={() => setWatchLanguageModal(false)}
        onCancel={() => setWatchLanguageModal(false)}
        closable={watchLanguageModal}
      >
        <Flex vertical>
          <div className="notranslate mb-6 grid grid-cols-5 gap-6 dmd:grid-cols-3 dmd:gap-2 dxs:grid-cols-2">
            {languages.map((val, i) => (
              <Button
                key={'languages-' + val.label + i}
                size="large"
                className={`flex items-center justify-center leading-3 hover:border-primary disabled:border-transparent ${
                  val.value === locale ? '' : 'border-transparent'
                }`}
                onClick={clickHandler(val.value)}
                disabled={!locales?.find((langVal) => langVal === val.value)}
                aria-label="recommend"
              >
                {cloneElement(val.icon, { className: 'text-[21px]' })}{' '}
                <span className="dmd:text-[14px]">{val.label}</span>
              </Button>
            ))}
          </div>
        </Flex>
      </CustomModal>
    </>
  )
}

export default memo(LanguageModal)
