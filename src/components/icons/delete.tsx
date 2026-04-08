import Icon, { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon'
import type { ReactElement } from 'react'

const defaultIcon = () => {
  return (
    <svg
      width="1em"
      height="100%"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 40 44"
      fill="none"
    >
      <path
        d="M35 9L33.7605 29.0502C33.4439 34.1729 33.2855 36.7343 32.0015 38.5757C31.3667 39.4862 30.5493 40.2546 29.6014 40.832C27.6842 42 25.118 42 19.9855 42C14.8462 42 12.2766 42 10.3581 40.8299C9.4096 40.2513 8.59199 39.4816 7.95737 38.5697C6.67375 36.7252 6.51891 34.1602 6.20922 29.0303L5 9"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M2 9H38M28.1115 9L26.7461 6.18345C25.8391 4.31251 25.3857 3.37704 24.6034 2.79361C24.4299 2.6642 24.2462 2.54908 24.054 2.4494C23.1878 2 22.1482 2 20.0691 2C17.9377 2 16.872 2 15.9914 2.46824C15.7962 2.57202 15.61 2.69179 15.4346 2.82634C14.6433 3.4334 14.2013 4.40311 13.3172 6.34251L12.1058 9"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path d="M15 31L15 19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M25 31L25 19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  )
}

export default function DeleteIcon(props: Partial<CustomIconComponentProps>): ReactElement {
  return <Icon component={defaultIcon} {...props} />
}
