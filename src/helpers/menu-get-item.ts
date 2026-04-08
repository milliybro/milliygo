import type { MenuProps } from 'antd'
import type { Key, ReactNode } from 'react'

export type MenuItem = Required<MenuProps>['items'][number]

export function getItem(
  label: ReactNode,
  key?: Key | null,
  icon?: ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem
}
