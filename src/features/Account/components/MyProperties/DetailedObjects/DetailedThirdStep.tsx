import { Button, Flex, Input, Typography } from 'antd'
import { useTranslations } from 'next-intl'
import { ReactElement } from 'react'

const { TextArea } = Input

export default function DetailedThirdStep({ form, setActiveTab, errors }: any): ReactElement {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }
  const t = useTranslations()

  return (
    <Flex vertical>
      <Flex vertical gap={12} className="mb-[24px]">
        <Typography.Text>{t('my-properties.name-property')}</Typography.Text>
        <Input
          value={form.watch('detailedObject.nameObject')}
          onChange={(e) => form.setValue('detailedObject.nameObject', e.target.value)}
          className={`!text-primary-dark w-full h-[53px] !bg-[#F8F8FA] rounded-2xl px-4 ${errors?.['detailedObject.nameObject'] ? 'border-[#FF4D4F]' : 'border-none'}`}
          placeholder={t('my-properties.name-property-placeholder')}
        />
      </Flex>

      <Flex vertical gap={12}>
        <Typography.Text>{t('my-properties.description-property')}</Typography.Text>

        <TextArea
          value={form.watch('detailedObject.description')}
          onChange={(e) => form.setValue('detailedObject.description', e.target.value)}
          className={`!text-primary-dark w-full h-[53px] !bg-[#F8F8FA] rounded-2xl px-4 ${errors?.['detailedObject.description'] ? 'border-[#FF4D4F]' : 'border-none'}`}
          placeholder={t('my-properties.description-property-placeholder')}
          autoSize={{ minRows: 5, maxRows: 5 }}
        />
      </Flex>

      <Flex className="mt-4">
        <div className="grid grid-cols-2 gap-8 w-full">
          {/* <Button className="h-[58px] rounded-2xl shadow-none font-medium bg-secondary-light/10 text-primary-dark" onClick={() => navigate(-1)}>
            {t('my-properties.prev')}
          </Button> */}
          <div />
          <Button
            aria-label={t('my-properties.next')}
            type="primary"
            className="h-[58px] bg-[#3276FF] w-full hover:!bg-[#3276FF]/70 rounded-2xl shadow-none"
            onClick={() => {
              scrollToTop()
              setActiveTab('address-object')
            }}
          >
            {t('my-properties.next')}
          </Button>
        </div>
      </Flex>
    </Flex>
  )
}
