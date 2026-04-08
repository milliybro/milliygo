import Icon, { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon'
import type { ReactElement } from 'react'

const arrowDownFilter = () => {
  return (
    <svg
      width="1em"
      height="100%"
      viewBox="0 0 14 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13 1L7.70711 6.29289C7.37377 6.62623 7.20711 6.79289 7 6.79289C6.79289 6.79289 6.62623 6.62623 6.29289 6.29289L1 1"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function ArrowDownFilter(props: Partial<CustomIconComponentProps>): ReactElement {
  return <Icon component={arrowDownFilter} {...props} />
}
