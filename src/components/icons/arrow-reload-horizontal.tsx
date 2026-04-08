import Icon, { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon'
import type { ReactElement } from 'react'

const arrowReloadHorizontal = () => {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M41 11H19C11.5734 11 6 16.3701 6 24"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7 37H29C36.4266 37 42 31.63 42 24"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M37 6C37 6 42 9.68244 42 11C42 12.3176 37 16 37 16"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11 32C11 32 6.00002 35.6824 6 37C5.99998 38.3176 11 42 11 42"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function ArrowReloadHorizontalIcon(
  props: Partial<CustomIconComponentProps>
): ReactElement {
  return <Icon component={arrowReloadHorizontal} {...props} />
}
