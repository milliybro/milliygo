const languages = [
  'uz',
  'en',
  'ru',
  'ko',
  'tr',
  'de',
  'fr',
  'it',
  'es',
  'pt',
  'ar',
  'zh-CN',
  'ja',
  'hi',
  'ur',
  'tg',
  'kk',
  'ky',
  'tk',
  'az',
]

function TranslateInit() {
  new window.google.translate.TranslateElement({
    includedLanguages: languages.join(','),
    autoDisplay: false,
  })
}