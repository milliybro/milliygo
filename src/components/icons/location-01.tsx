import type { ReactElement } from 'react'
import Icon, { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon'

const location01 = () => {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11.3481 17.8058C10.9867 18.1441 10.5037 18.3333 10.0009 18.3333C9.49817 18.3333 9.01517 18.1441 8.65375 17.8058C5.34418 14.6883 0.908967 11.2057 3.07189 6.14968C4.24136 3.41593 7.04862 1.66663 10.0009 1.66663C12.9532 1.66663 15.7605 3.41593 16.93 6.14968C19.0902 11.1994 14.6658 14.699 11.3481 17.8058Z"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <path
        d="M12.9163 9.16667C12.9163 10.7775 11.6105 12.0833 9.99967 12.0833C8.38884 12.0833 7.08301 10.7775 7.08301 9.16667C7.08301 7.55583 8.38884 6.25 9.99967 6.25C11.6105 6.25 12.9163 7.55583 12.9163 9.16667Z"
        stroke="currentColor"
        strokeWidth="1.2"
      />
    </svg>
  )
}

export default function Location01Icon(props: Partial<CustomIconComponentProps>): ReactElement {
  return <Icon component={location01} {...props} />
}
