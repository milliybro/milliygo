const languages = [
  { title: 'O’zbekcha', name: 'uz' },
  { title: 'English (UK)', name: 'en' },
  { title: 'Русский', name: 'ru' },
  { title: '한국어', name: 'ko' },
  { title: 'Türkçe', name: 'tr' },
  { title: 'Deutsch', name: 'de' },
  { title: 'Français', name: 'fr' },
  { title: 'Italiano', name: 'it' },
  { title: 'Español', name: 'es' },
  { title: 'Português', name: 'pt' },
  { title: 'العربية', name: 'ar' },
  { title: '中文', name: 'zh-CN' },
  { title: '日本語', name: 'ja' },
  { title: 'हिन्दी', name: 'hi' },
  { title: 'اردو', name: 'ur' },
  { title: 'Tajik', name: 'tg' },
  { title: 'Қазақша', name: 'kk' },
  { title: 'Қирғизча', name: 'ky' },
  { title: 'Turkmen', name: 'tk' },
  { title: 'Azərbaycan', name: 'az' },
]

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  trailingSlash: true,
  webpack: (config) => {
    config.module.rules.push({
      test: /\.d\.ts$/,
      use: 'ignore-loader',
    })
    return config
  },

  env: {
    HELLO: 'configdev',
    GOOGLE_TRANSLATION_CONFIG: JSON.stringify({
      languages,
      // defaultLanguage: 'uz',
    }),
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'file.sayohat.uz',
        // pathname: '/buckets/**',
      },
      {
        protocol: 'https',
        hostname: 'zos.alipayobjects.com',
        // port: '',
        // pathname: '/account123/**',
      },
      {
        protocol: 'https',
        hostname: 'gw.alipayobjects.com',
      },
      {
        protocol: 'http',
        hostname: 'api.museums.uz',
      },
      {
        protocol: 'https',
        hostname: 'os.alipayobjects.com',
      },
      {
        protocol: 'https',
        hostname: 'api.emehmon.xdevs.uz',
      },
      {
        protocol: 'http',
        hostname: 'api.emehmon.xdevs.uz',
      },
      {
        protocol: 'https',
        hostname: 'static-maps.yandex.ru',
      },
      {
        protocol: 'http',
        hostname: 'support.emehmon.xdevs.uz',
      },
      {
        protocol: 'https',
        hostname: 'template.em.xdevs.uz',
      },
      {
        protocol: 'https',
        hostname: '***',
      },
      {
        protocol: 'http',
        hostname: '***',
      },
    ],
  },

  i18n: {
    locales: languages.map((val) => val.name),
    defaultLocale: 'uz',
    localeDetection: false,
  },

  transpilePackages: [
    'antd',
    '@ant-design',
    'rc-util',
    'rc-pagination',
    'rc-picker',
    'rc-notification',
    'rc-tooltip',
    'rc-tree',
    'rc-table',
    'rc-input',
    'antd-phone-input',
  ],
}

module.exports = nextConfig
