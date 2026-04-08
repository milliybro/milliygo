import { useRouter } from 'next/router'
import { createTranslator } from 'next-intl'

import uz from '@/locales/uz.json'
import ru from '@/locales/ru.json'
import en from '@/locales/en.json'
import ar from '@/locales/ar.json'
import az from '@/locales/az.json'
import de from '@/locales/de.json'
import es from '@/locales/es.json'
import fr from '@/locales/fr.json'
import hi from '@/locales/hi.json'
import it from '@/locales/it.json'
import ja from '@/locales/ja.json'
import kk from '@/locales/kk.json'
import ko from '@/locales/ko.json'
import ky from '@/locales/ky.json'
import pt from '@/locales/pt.json'
import tg from '@/locales/tg.json'
import tk from '@/locales/tk.json'
import tr from '@/locales/tr.json'
import ur from '@/locales/ur.json'
import zhCN from '@/locales/zh-CN.json'

const localeMap: Record<string, any> = {
  uz,
  ru,
  en,
  ar,
  az,
  de,
  es,
  fr,
  hi,
  it,
  ja,
  kk,
  ko,
  ky,
  pt,
  tg,
  tk,
  tr,
  ur,
  'zh-CN': zhCN,
}

export function useFallbackMessage() {
  const { locale } = useRouter()

  const messages = Object.keys(localeMap).includes(locale || 'ru')
    ? localeMap?.[locale || 'ru']
    : ru

  const translator = createTranslator({ locale: locale || 'ru', messages })

  function getFallbackMessage(key: string): string {
    return translator(key)
  }

  return { getFallbackMessage }
}
