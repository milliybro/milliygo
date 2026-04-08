import { BreadcrumbProps, Card, Col, Divider, Menu, MenuProps, Row } from 'antd'
import { useTranslations } from 'next-intl'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/router'
import type { ReactElement, ReactNode } from 'react'
import { useRef } from 'react'

import CBreadcrumb from '@/components/common/CBreadcrumb'
import DepositIcon from '@/components/icons/deposit-icon'
import FileIcon2 from '@/components/icons/file-icon2'
import FileSearchIcon2 from '@/components/icons/file-search2'
import UserCircleIcon from '@/components/icons/user-circle'
import { getItem } from '@/helpers/menu-get-item'

interface IProps {
  breadCrumbItems?: BreadcrumbProps['items']
  menuItems?: MenuProps['items']
  menuType?: 'default' | 'booking' | 'guide'
  children: ReactNode
}

export default function ContractLayout({ breadCrumbItems, children }: IProps): ReactElement {
  const menuRef = useRef(null)
  const router = useRouter()
  const pathname = usePathname()
  const activeTab = pathname.slice(0, -1)
  const t = useTranslations()

  let defaultItems: MenuProps['items'] = [
    getItem(t('guides.my-profile'), '/', <UserCircleIcon className="text-2xl text-secondary" />),
    getItem(
      t('contract.my-services'),
      '/contract/my-services',
      <DepositIcon className="text-[28px] text-secondary" />
    ),
    getItem(
      t('contract.my-contracts'),
      '/contract/my-contract',
      <FileIcon2 className="text-2xl text-secondary" />
    ),
    getItem(
      t('contract.invoice-control'),
      '/contract/invoice-control/',
      <FileSearchIcon2 className="text-2xl text-secondary" />
    ),
  ]

  const onClick: MenuProps['onClick'] = (e) => {
    router.push(`${e.key}`)
  }

  return (
    <div className="container mb-20">
      <CBreadcrumb items={breadCrumbItems} />
      <Card
        variant="borderless"
        className="h-full min-h-[700px] overflow-hidden !rounded-[24px] !shadow-none"
        style={{ padding: 0 }}
      >
        <Row className="h-full min-h-[700px]">
          <Col span={6}>
            <div className="flex h-full flex-col p-6 pr-0">
              <Menu
                ref={menuRef}
                className="flex h-full select-none flex-col gap-4 !border-none before:hidden after:hidden [&>li]:font-medium [&>li]:text-primary-dark"
                onClick={onClick}
                defaultSelectedKeys={[activeTab]}
                mode="inline"
                items={defaultItems}
                rootClassName="custom-menu"
              />
            </div>
          </Col>
          <Col span={1} className="flex justify-center">
            <Divider type="vertical" className="m-0 h-full !border-[#F8F8FA]" />
          </Col>
          <Col span={17}>
            <div className="h-full p-6 pl-0">{children}</div>
          </Col>
        </Row>
      </Card>
    </div>
  )
}
