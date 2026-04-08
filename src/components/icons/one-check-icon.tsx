import Icon, { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon'
import type { ReactElement } from 'react'

const oneCheck = () => {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 11 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 6.22239L3.33333 8.66683L10.3333 1.3335"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function OneCheckIcon(props: Partial<CustomIconComponentProps>): ReactElement {
  return <Icon component={oneCheck} {...props} />
}
