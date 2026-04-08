import Icon, { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon'
import type { ReactElement } from 'react'

const questionIcon = () => {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="11" cy="11" r="10" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M9 8C9 6.89543 9.89543 6 11 6C12.1046 6 13 6.89543 13 8C13 8.39815 12.8837 8.76913 12.6831 9.08079C12.0854 10.0097 11 10.8954 11 12V12.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M10.992 16H11.001"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function QuestionIcon(props: Partial<CustomIconComponentProps>): ReactElement {
  return <Icon component={questionIcon} {...props} />
}
