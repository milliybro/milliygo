import Icon, { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon'
import type { ReactElement } from 'react'

const arrowLeft = () => {
  return (
    <svg width="1em" height="1em" viewBox="0 0 7 10" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g id="elements">
        <path
          id="Vector 6904"
          d="M5.33398 1L2.04109 4.29289C1.70776 4.62623 1.54109 4.79289 1.54109 5C1.54109 5.20711 1.70776 5.37377 2.04109 5.70711L5.33398 9"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  )
}

export default function ArrowLeftIcon2(props: Partial<CustomIconComponentProps>): ReactElement {
  return <Icon component={arrowLeft} {...props} />
}
