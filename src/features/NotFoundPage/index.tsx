import { Button, Result } from 'antd'
import { useTranslations } from 'next-intl'
import Link from 'next/link'

const NotFoundPage404 = () => {
  const t = useTranslations()
  return (
    <Result
      status="404"
      title="404"
      subTitle={t('preferences.not-found')}
      extra={
        <Link href="/" aria-label={t('preferences.main')}>
          <Button type="primary" aria-label={t('preferences.main')}>
            {t('preferences.main')}
          </Button>
        </Link>
      }
    />
  )
}

export default NotFoundPage404
