import { TSeoMetaTags } from '@/types'
import Head from 'next/head'
import React from 'react'

export default function SeoMetaTags({ meta }: { meta?: TSeoMetaTags | null }) {
  if (!meta) return null
  const { title, description, og_title, og_description, og_image, og_type, og_url, og_site_name } =
    meta

  return (
    <Head>
      {title && <title>{title}</title>}
      {description && <meta name="description" content={description} />}
      {og_title && <meta property="og:title" content={og_title} />}
      {og_description && <meta property="og:description" content={og_description} />}
      {og_image && <meta property="og:image" content={og_image} />}
      {og_type && <meta property="og:type" content={og_type} />}
      {og_url && <meta property="og:url" content={og_url} />}
      {og_site_name && <meta property="og:site_name" content={og_site_name} />}
    </Head>
  )
}
