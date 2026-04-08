import { Button } from 'antd'
import { useTranslations } from 'next-intl'

import CopyIcon from '../icons/copy'
import FaceBookIcon from '../icons/facebook'
import TelegramIcon from '../icons/telegram'

import type { FC } from 'react'

interface IProps {
  text?: string
  handleCopy: () => Promise<void>
}
const ShareArticlesButton: FC<IProps> = ({ text, handleCopy }) => {
  const t = useTranslations()

  const handleShare = (platform: 'telegram' | 'facebook' | 'instagram') => {
    const pageUrl = typeof window !== 'undefined' ? window.location.href : ''

    let shareUrl = ''

    switch (platform) {
      case 'telegram':
        shareUrl = `https://t.me/share/url?url=${encodeURIComponent(pageUrl)}&text=${encodeURIComponent(text || '')}`
        break
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`
        break
      case 'instagram':
        shareUrl = `https://www.instagram.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`
    }

    if (shareUrl) {
      window.open(shareUrl, '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <div className="flex items-center gap-3">
      <Button
        onClick={handleCopy}
        className="flex items-center gap-2 text-[14px] font-semibold"
        data-copy="false"
      >
        <CopyIcon className="text-[20px]" />
        {t('buttons.copy')}
      </Button>
      <Button
        onClick={() => handleShare('telegram')}
        className="text-[#98A2B3] [&_span]:flex"
        icon={<TelegramIcon className="text-[20px]" />}
      />

      <Button
        onClick={() => handleShare('facebook')}
        className="text-[#98A2B3] [&_span]:flex"
        icon={<FaceBookIcon className="text-[20px]" />}
      />

      {/* <Button
        onClick={() => handleShare('instagram')}
        className="[&_span]:flex text-[#98A2B3]"
        icon={<InstagramIcon className="text-[20px]" />}
      /> */}
    </div>
  )
}

export default ShareArticlesButton
