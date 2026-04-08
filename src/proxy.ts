import { NextRequest, NextResponse } from 'next/server'

const PUBLIC_FILE = /\.(.*)$/

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
] as const

export async function proxy(req: NextRequest) {
  if (req.nextUrl.pathname === '/sitemap.xml' && req.nextUrl.locale === 'uz') {
    const hostname = req.headers.get('host')

    const urlsXml = languages
      .map(
        (lang) => `
      <sitemap>
        <loc>https://${hostname}/${lang}/sitemaps/categories.xml</loc>
      </sitemap>
    `
      )
      .join('')

    const sitemap = `
        <?xml version="1.0" encoding="UTF-8"?>
        <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
          ${urlsXml}
        </sitemapindex>
      `

    return new NextResponse(sitemap.trim(), {
      status: 200,
      headers: {
        'Content-Type': 'text/xml',
        'Cache-Control': 'public, max-age=3600',
      },
    })
  }

  if (
    req.nextUrl.pathname.startsWith('/_next') ||
    req.nextUrl.pathname.includes('/api/') ||
    PUBLIC_FILE.test(req.nextUrl.pathname)
  ) {
    return
  }

  if (req.nextUrl.locale === 'default') {
    const locale = req.cookies.get('NEXT_LOCALE')?.value || 'uz'

    return NextResponse.redirect(
      new URL(`/${locale}${req.nextUrl.pathname}${req.nextUrl.search}`, req.url)
    )
  }
}
