import Icon, { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon'
import type { ReactElement } from 'react'

const arrowRight = () => {
  return (
    <svg width="1em" height="1em" viewBox="0 0 7 10" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g id="elements">
        <path
          id="Vector 6905"
          d="M1.66602 9L4.95891 5.70711C5.29224 5.37377 5.45891 5.20711 5.45891 5C5.45891 4.79289 5.29224 4.62623 4.95891 4.29289L1.66602 1"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  )
}

export default function ArrowRightIcon2(props: Partial<CustomIconComponentProps>): ReactElement {
  return <Icon component={arrowRight} {...props} />
}
