import Icon, { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon'
import type { ReactElement } from 'react'

const defaultIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="100%"
      viewBox="0 0 22 18"
      fill="none"
    >
      <path
        d="M1 9C1 5.46252 1 3.69377 2.0528 2.5129C2.22119 2.32403 2.40678 2.14935 2.60746 1.99087C3.86213 1 5.74142 1 9.5 1H12.5C16.2586 1 18.1379 1 19.3925 1.99087C19.5932 2.14935 19.7788 2.32403 19.9472 2.5129C21 3.69377 21 5.46252 21 9C21 12.5375 21 14.3062 19.9472 15.4871C19.7788 15.676 19.5932 15.8506 19.3925 16.0091C18.1379 17 16.2586 17 12.5 17H9.5C5.74142 17 3.86213 17 2.60746 16.0091C2.40678 15.8506 2.22119 15.676 2.0528 15.4871C1 14.3062 1 12.5375 1 9Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 13H10.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.5 13L17 13"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M1 6H21" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  )
}

export default function CreditCardIcon(props: Partial<CustomIconComponentProps>): ReactElement {
  return <Icon component={defaultIcon} {...props} />
}
