import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { Button, Flex, Typography } from 'antd'

import ArrowRightUpIcon from '@/components/icons/arrow-right-up'

import type { FC } from 'react'
import type { IFaq, IFaqFull } from '@/types'

const { Title } = Typography

const FaqItem: FC<{ data: IFaqFull; similarData: IFaq[] }> = ({ data, similarData }) => {
  const t = useTranslations()
  return (
    <Flex vertical>
      <Title level={2}>{data.title}</Title>
      <Flex vertical gap={32} className="mb-8">
        <div dangerouslySetInnerHTML={{ __html: data.question }}></div>
        <div dangerouslySetInnerHTML={{ __html: data.answer }}></div>
      </Flex>

      {similarData.length ? (
        <Flex vertical className="mb-8">
          <Typography.Text className="mb-4 text-[20px] font-semibold">
            {t('faq.similar')}
          </Typography.Text>
          <Flex wrap="wrap" gap={12}>
            {similarData.map((val) => (
              <Link
                key={'similar-faq-item-' + val.slug}
                aria-label={val.title}
                href={`/faq/${val.slug}`}
              >
                <Button
                  aria-label={val.title}
                  size="middle"
                  className="flex items-center border-secondary-light text-base text-secondary hover:border-primary hover:text-primary"
                >
                  {val.title}
                  <ArrowRightUpIcon />
                </Button>
              </Link>
            ))}
          </Flex>
        </Flex>
      ) : null}
    </Flex>
  )
}

export default FaqItem
