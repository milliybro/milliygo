import Icon, { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon'
import type { ReactElement } from 'react'

const defaultIcon = () => {
  return (
    <svg
      width="1em"
      height="100%"
      viewBox="0 0 21 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="21" height="15" rx="3" fill="#F93939" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.0011 8.65155L12.8391 9.26155L13.0611 7.96855L12.1211 7.05155L13.4211 6.86155L14.0011 5.68555L14.5811 6.86255L15.8811 7.05255L14.9411 7.96755L15.1631 9.26055"
        fill="white"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.5 11C11.433 11 13 9.433 13 7.5C13 5.567 11.433 4 9.5 4C7.567 4 6 5.567 6 7.5C6 9.433 7.567 11 9.5 11ZM10.5 10C11.88 10 13 8.88 13 7.5C13 6.12 11.88 5 10.5 5C9.12 5 8 6.12 8 7.5C8 8.88 9.12 10 10.5 10Z"
        fill="white"
      />
    </svg>
  )
}

export default function TurkFlagIcon(props: Partial<CustomIconComponentProps>): ReactElement {
  return <Icon component={defaultIcon} {...props} />
}
