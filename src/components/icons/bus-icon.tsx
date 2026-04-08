import Icon, { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon'
import type { ReactElement } from 'react'

const defaultIcon = () => {
  return (
    <svg
      width="1em"
      height="100%"
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17.2715 20.5V22"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.27148 20.5V22"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.27148 6.78186C4.27148 6.14251 4.27148 5.82283 4.44535 5.43355C4.61921 5.04428 4.79575 4.88606 5.14884 4.56964C6.30585 3.53277 8.63177 2 12.2715 2C15.9112 2 18.2371 3.53277 19.3941 4.56964C19.7472 4.88606 19.9238 5.04428 20.0976 5.43355C20.2715 5.82283 20.2715 6.14251 20.2715 6.78186V14C20.2715 16.8284 20.2715 18.2426 19.3928 19.1213C18.5141 20 17.0999 20 14.2715 20H10.2715C7.44305 20 6.02884 20 5.15016 19.1213C4.27148 18.2426 4.27148 16.8284 4.27148 14V6.78186Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M4.27148 14C4.27148 14 8.00481 15 12.2715 15C16.5382 15 20.2715 14 20.2715 14"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.77148 17.5H6.27148"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18.2715 17.5H19.7715"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.2715 17.5H13.2715"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M4.27148 6H20.2715" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path
        d="M2.27148 9V10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M22.2715 9V10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function BusIcon(props: Partial<CustomIconComponentProps>): ReactElement {
  return <Icon component={defaultIcon} {...props} />
}
