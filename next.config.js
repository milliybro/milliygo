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

const nextConfig = {
  reactStrictMode: false,
  trailingSlash: true,
  output: 'export',
  typescript: {
    ignoreBuildErrors: true,
  },


  webpack: (config, { isServer }) => {
    config.module.rules.push({
      test: /\.d\.ts$/,
      use: 'ignore-loader',
    })

    if (isServer) {
      config.externals = [...(config.externals || []), '@twa-dev/sdk']
    }
    return config
  },

  env: {
    HELLO: 'configdev',
    GOOGLE_TRANSLATION_CONFIG: JSON.stringify({
      languages,
    }),
  },

  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'file.sayohat.uz' },
      { protocol: 'https', hostname: 'zos.alipayobjects.com' },
      { protocol: 'https', hostname: 'gw.alipayobjects.com' },
      { protocol: 'http', hostname: 'api.museums.uz' },
      { protocol: 'https', hostname: 'os.alipayobjects.com' },
      { protocol: 'https', hostname: 'api.emehmon.xdevs.uz' },
      { protocol: 'http', hostname: 'api.emehmon.xdevs.uz' },
      { protocol: 'https', hostname: 'static-maps.yandex.ru' },
      { protocol: 'http', hostname: 'support.emehmon.xdevs.uz' },
      { protocol: 'https', hostname: 'template.em.xdevs.uz' },
    ],
    unoptimized: true,
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