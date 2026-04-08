import Icon, { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon'
import type { ReactElement } from 'react'

const infoSquare = () => {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="elements">
        <path
          id="Rectangle 1773"
          d="M0.666016 7.00033C0.666016 4.01476 0.666016 2.52198 1.59351 1.59449C2.52101 0.666992 4.01379 0.666992 6.99935 0.666992C9.98491 0.666992 11.4777 0.666992 12.4052 1.59449C13.3327 2.52198 13.3327 4.01476 13.3327 7.00033C13.3327 9.98589 13.3327 11.4787 12.4052 12.4062C11.4777 13.3337 9.98491 13.3337 6.99935 13.3337C4.01379 13.3337 2.52101 13.3337 1.59351 12.4062C0.666016 11.4787 0.666016 9.98589 0.666016 7.00033Z"
          stroke="currentColor"
        />
        <path
          id="Vector 2612"
          d="M7.16081 10.334V7.00065C7.16081 6.68638 7.16081 6.52925 7.06318 6.43162C6.96555 6.33398 6.80841 6.33398 6.49414 6.33398"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          id="Vector"
          d="M6.99401 4.33398H7"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  )
}

export default function InfoSquareIcon(props: Partial<CustomIconComponentProps>): ReactElement {
  return <Icon component={infoSquare} {...props} />
}
