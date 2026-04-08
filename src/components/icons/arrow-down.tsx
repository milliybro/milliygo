import Icon, { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon'
import type { ReactElement } from 'react'

const arrowDown = () => {
  return (
    <svg
      width="1em"
      height="100%"
      viewBox="0 0 10 6"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="elements">
        <path
          id="Vector 6902"
          d="M1 1L4.29289 4.29289C4.62623 4.62623 4.79289 4.79289 5 4.79289C5.20711 4.79289 5.37377 4.62623 5.70711 4.29289L9 1"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  )
}

export default function ArrowDown(props: Partial<CustomIconComponentProps>): ReactElement {
  return <Icon component={arrowDown} {...props} />
}
