import Icon, { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon'
import type { ReactElement } from 'react'

const defaultIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="100%"
      viewBox="0 0 22 20"
      fill="none"
    >
      <path
        d="M21 15.5L1 15.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21 19L21 14C21 12.1144 21 11.1716 20.4142 10.5858C19.8284 10 18.8856 10 17 10L5 10C3.11438 10 2.17157 10 1.58579 10.5858C1 11.1716 1 12.1144 1 14L1 19"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15 10V8.61781C15 8.11029 14.9085 7.94054 14.4396 7.7405C13.4631 7.32389 12.2778 7 11 7C9.72215 7 8.53688 7.32389 7.5604 7.7405C7.09154 7.94054 7 8.11029 7 8.61781L7 10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M19 10V5.36057C19 4.66893 19 4.32311 18.8292 3.99653C18.6584 3.66995 18.4151 3.50091 17.9284 3.16283C15.9661 1.79978 13.5772 1 11 1C8.42282 1 6.03391 1.79978 4.07163 3.16283C3.58492 3.50091 3.34157 3.66995 3.17079 3.99653C3 4.32311 3 4.66893 3 5.36057L3 10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

export default function BedSingleIcon(props: Partial<CustomIconComponentProps>): ReactElement {
  return <Icon component={defaultIcon} {...props} />
}
