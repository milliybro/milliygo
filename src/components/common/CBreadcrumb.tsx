import { memo, Fragment } from 'react'
import Link from 'next/link'
import { twMerge } from 'tailwind-merge'

import ArrowRightSharpIcon from '../icons/arrow-right-sharp'

import type { FC } from 'react'
import type { BreadcrumbProps } from 'antd'
import type { ItemType } from 'antd/es/breadcrumb/Breadcrumb'

interface CBreadrumbItem extends ItemType {
  translate?: boolean
}

interface Props extends Omit<BreadcrumbProps, 'items'> {
  items?: CBreadrumbItem[]
}

const CBreadcrumb: FC<Props> = ({ items = [], className }) => {
  return (
    <div className={twMerge('container py-[30px] font-medium dsm:py-[15px]', className)}>
      <ol className="flex flex-wrap items-center gap-3">
        {items.map((item, index) => {
          const isLast = index === items.length - 1

          return (
            <Fragment key={index}>
              <li className="flex items-center">
                {item.href && !isLast ? (
                  <Link
                    href={item.href}
                    className={twMerge(
                      'text-[15px] leading-[20.8px] text-primary-dark hover:text-secondary dsm:text-[12px]',
                      item.translate && 'translate'
                    )}
                    aria-label={`open ${item.href} route`}
                  >
                    {item.title}
                  </Link>
                ) : (
                  <span className="cursor-default font-medium text-secondary dsm:text-[12px]">
                    {item.title}
                  </span>
                )}
              </li>
              {!isLast && (
                <ArrowRightSharpIcon className="text-[15px] text-secondary/50 dsm:text-[12px]" />
              )}
            </Fragment>
          )
        })}
      </ol>
    </div>
  )
}

export default memo(CBreadcrumb)
