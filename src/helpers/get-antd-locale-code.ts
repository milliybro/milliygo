type LocaleMap = {
  [_key in
    | 'uz'
    | 'ru'
    | 'en'
    | 'ko'
    | 'tr'
    | 'de'
    | 'fr'
    | 'it'
    | 'es'
    | 'pt'
    | 'ar'
    | 'zh-CN'
    | 'ja'
    | 'hi'
    | 'ur'
    | 'tk']: string
}

export function getAntdLocaleCode(lang: string): string {
  const antdLocaleMap: LocaleMap = {
    uz: 'uz_UZ',
    ru: 'ru_RU',
    en: 'en_US',
    ko: 'ko_KR',
    tr: 'tr_TR',
    de: 'de_DE',
    fr: 'fr_FR',
    it: 'it_IT',
    es: 'es_ES',
    pt: 'pt_PT',
    ar: 'ar_EG',
    'zh-CN': 'zh_CN',
    ja: 'ja_JP',
    hi: 'ml_IN',
    ur: 'ur_PK',
    tk: 'tk_TK',
  }

  return antdLocaleMap?.[lang as keyof LocaleMap] || 'uz_UZ'
}
