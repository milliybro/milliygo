import Icon, { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon'
import type { ReactElement } from 'react'

const arrowRight = () => {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.66602 12L9.95891 8.70711C10.2922 8.37377 10.4589 8.20711 10.4589 8C10.4589 7.79289 10.2922 7.62623 9.95891 7.29289L6.66602 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function ArrowRightSharpIcon(
  props: Partial<CustomIconComponentProps>
): ReactElement {
  return <Icon component={arrowRight} {...props} />
}
