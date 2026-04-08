import CustomModal from '@/components/common/CModal'
import { Button, Checkbox, Flex } from 'antd'
import Link from 'antd/es/typography/Link'
import { useTranslations } from 'next-intl'
import { useState, type ReactElement } from 'react'

export default function AgreementForData({ logout }: any): ReactElement {
  const t = useTranslations()
  const [openModal, setOpenModal] = useState(false)
  const [checked, _setChecked] = useState(true)

  return (
    <Flex>
      <Checkbox
        checked={checked}
        onChange={() => {
          setOpenModal(true)
        }}
      >
        {t('personal-information.agreement-with')}{' '}
        <Link
          href={'https://emehmon.xdevs.uz'}
          target="_blank"
          aria-label={t('personal-information.confidencial')}
        >
          {t('personal-information.confidencial')}
        </Link>
      </Checkbox>

      <CustomModal
        modalTitle={t('others.agreement-title')}
        modalDesc={t('others.agreement-desc')}
        modalIcon={''}
        width={750}
        open={openModal}
        onOk={() => {
          setOpenModal(false)
        }}
        onCancel={() => {
          setOpenModal(false)
        }}
      >
        <Flex className="gap-[12px]">
          <Button
            aria-label={t('buttons.cancel')}
            type="primary"
            className="h-[58px] w-full rounded-2xl bg-[#F8F8FA] text-[#232E40] shadow-none hover:!bg-[#F8F8FA]/70"
            onClick={() => {
              setOpenModal(false)
            }}
          >
            {t('buttons.cancel')}
          </Button>

          <Button
            aria-label={t('buttons.log-out')}
            type="primary"
            className="h-[58px] w-full rounded-2xl bg-[#FF4E4E] shadow-none hover:!bg-[#FF4E4E]/70"
            onClick={logout}
          >
            {t('buttons.log-out')}
          </Button>
        </Flex>
      </CustomModal>
    </Flex>
  )
}
