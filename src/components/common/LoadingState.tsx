import { Flex } from 'antd'
import StatusPopup from './StatusPopup'
import LoadingIcon from '../icons/loading'
import { useTranslations } from 'next-intl'

function LoadingState() {
  const t = useTranslations()
  return (
    <Flex justify="center" className="mt-[150px]">
      <StatusPopup
        icon={<LoadingIcon className="text-[40px] animate-spin" />}
        title={t('others.loading')}
        description={t('others.loading-description')}
      />
    </Flex>
  )
}

export default LoadingState
