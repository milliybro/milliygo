import Icon, { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon'
import type { ReactElement } from 'react'

const defaultIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
      <path
        d="M5.21586 13.3334C4.28934 13.8607 3.73438 14.5321 3.73438 15.2632C3.73438 16.9588 6.71914 18.3334 10.401 18.3334C14.0829 18.3334 17.0677 16.9588 17.0677 15.2632C17.0677 14.5321 16.5127 13.8607 15.5862 13.3334"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M11.2328 5.83337H9.56928C7.17768 5.83337 5.56522 8.39095 6.50732 10.6901C6.63855 11.0103 6.93965 11.218 7.27281 11.218H7.85863C8.05608 11.218 8.2282 11.3585 8.27609 11.5589L9.03025 14.714C9.18751 15.3719 9.75267 15.8334 10.401 15.8334C11.0494 15.8334 11.6146 15.3719 11.7718 14.714L12.526 11.5589C12.5739 11.3585 12.746 11.218 12.9435 11.218H13.5293C13.8624 11.218 14.1635 11.0103 14.2948 10.6901C15.2369 8.39095 13.6244 5.83337 11.2328 5.83337Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M12.4831 3.75002C12.4831 4.90061 11.5503 5.83335 10.3997 5.83335C9.24915 5.83335 8.31641 4.90061 8.31641 3.75002C8.31641 2.59943 9.24915 1.66669 10.3997 1.66669C11.5503 1.66669 12.4831 2.59943 12.4831 3.75002Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  )
}

export default function GuideIcon(props: Partial<CustomIconComponentProps>): ReactElement {
  return <Icon component={defaultIcon} {...props} />
}
