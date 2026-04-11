import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { useRef, useState } from 'react'
import { Card, Col, Flex, Menu, Row, Typography } from 'antd'

import Download from '@/components/containers/Download'
import CoinsDollarIcon from '@/components/icons/coins-dollar'
import ArrowRightIcon2 from '@/components/icons/arrow-right-2'
import NeedReservationHelp from './components/NeedReservationHelp'
import { MenuItem, getItem } from '@/helpers/menu-get-item'
import { getFaqCategories, getFaqs } from './api'
import { useTranslations } from 'next-intl'

const Faq = () => {
  const router = useRouter()
  const menuRef = useRef(null)
  const t = useTranslations()
  const [activeMenu, setActiveMenu] = useState('')

  const { data: faqsCategories } = useQuery({
    queryKey: ['faqs-categories'],
    queryFn: () => getFaqCategories(),
  })

  const { data: faqsItems, isLoading } = useQuery({
    queryKey: ['faqs-items', activeMenu],
    queryFn: () =>
      getFaqs({
        service: activeMenu ? activeMenu + '' : undefined,
      }),

    staleTime: 1 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
  })

  const items: MenuItem[] = [
    getItem(t('booking.all-features'), ''),
    ...(faqsCategories?.results.map((val) => getItem(val.name, val.id)) || []),
  ]

  const clickHandler = (slug: string) => () => {
    router.push(`/faq/${slug}`)
  }
// dsd
  return (
    <Flex vertical>
      <Card variant="borderless" styles={{ body: { padding: 16 } }} className="mb-6 rounded-2xl">
        <Flex gap={12} align="flex-start">
          <CoinsDollarIcon className="text-xl text-secondary" />
          <Typography.Text className="text-sm text-secondary">{t('faq.need-help')}</Typography.Text>
        </Flex>
      </Card>
      <NeedReservationHelp />
      <Row gutter={[24, 24]} className="mb-[200px] min-h-[40vh]">
        <Col span={6} xs={24} sm={24} md={6}>
          <Menu
            ref={menuRef}
            className="flex flex-col rounded-2xl !border-none p-1 before:hidden after:hidden [&>li]:font-medium [&>li]:text-primary-dark"
            defaultSelectedKeys={[activeMenu + '']}
            mode="inline"
            onClick={(e) => setActiveMenu(e.key)}
            items={items}
          />
        </Col>
        <Col span={18} xs={24} sm={24} md={18}>
          <Card variant="borderless" styles={{ body: { padding: 0 } }} className="rounded-xl">
            <ul>
              {isLoading ? (
                <li className="p-4">
                  <div className="my-[5px] h-[14px] w-[50%] animate-pulse rounded-3xl bg-secondary/40" />
                </li>
              ) : (
                faqsItems?.results.map((val, i) => (
                  <li
                    key={'faq-item-' + val.slug + i}
                    className="group flex cursor-pointer items-center justify-between p-4 text-secondary duration-100 hover:text-primary"
                    onClick={clickHandler(val.slug)}
                  >
                    <Typography.Text className="text-base font-medium duration-100 group-hover:text-inherit">
                      {val.title}
                    </Typography.Text>
                    <ArrowRightIcon2 className="text-[7px]" />
                  </li>
                ))
              )}
            </ul>
          </Card>
        </Col>
      </Row>
      <Download />
    </Flex>
  )
}

export default Faq
