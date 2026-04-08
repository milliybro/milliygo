import Icon, { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon'
import type { ReactElement } from 'react'

const arrowLeft = () => {
  return (
    <svg
      width="1em"
      height="100%"
      viewBox="0 0 18 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="elements">
        <path
          id="Vector"
          d="M1 6.5L17 6.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          id="Vector_2"
          d="M5.99996 11.5C5.99996 11.5 1.00001 7.81756 1 6.49996C0.999989 5.18237 6 1.5 6 1.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  )
}

export default function ArrowLeftIcon(props: Partial<CustomIconComponentProps>): ReactElement {
  return <Icon component={arrowLeft} {...props} />
}
