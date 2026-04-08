import Icon, { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon'
import type { ReactElement } from 'react'

const arrowUp = () => {
  return (
    <svg
      width="1em"
      height="100%"
      viewBox="0 0 14 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 7L6.29289 1.70711C6.62623 1.37377 6.79289 1.20711 7 1.20711C7.20711 1.20711 7.37377 1.37377 7.70711 1.70711L13 7"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function ArrowUp(props: Partial<CustomIconComponentProps>): ReactElement {
  return <Icon component={arrowUp} {...props} />
}
