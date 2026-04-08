import Icon, { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon'
import type { ReactElement } from 'react'

const doubleCheck = () => {
  return (
    <svg
      width="1em"
      height="100%"
      viewBox="0 0 14 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="elements">
        <path
          id="Vector 6663"
          d="M0.666016 6.2219L2.99935 8.66634L3.68203 7.95115M9.99935 1.33301L5.95737 5.56746"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          id="Vector 6664"
          d="M4 6.2219L6.33333 8.66634L13.3333 1.33301"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  )
}

export default function DoubleCheckIcon(props: Partial<CustomIconComponentProps>): ReactElement {
  return <Icon component={doubleCheck} {...props} />
}
