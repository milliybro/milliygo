import Icon, { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon'
import type { ReactElement } from 'react'

const defaultIcon = () => {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M43 25.3726V22.6274C43 19.3574 43 17.7224 42.391 16.2522C41.782 14.7821 40.626 13.6259 38.3138 11.3137L36.6862 9.6863C34.374 7.37404 33.218 6.21792 31.7478 5.60896C30.2776 5 28.6426 5 25.3726 5H22.6274C19.3574 5 17.7224 5 16.2522 5.60896C14.7821 6.21792 13.6259 7.37404 11.3137 9.6863L9.6863 11.3137C7.37404 13.626 6.21792 14.7821 5.60896 16.2522C5 17.7224 5 19.3574 5 22.6274V25.3726C5 28.6426 5 30.2776 5.60896 31.7478C6.21792 33.218 7.37404 34.374 9.6863 36.6862L11.3137 38.3138C13.6259 40.626 14.7821 41.782 16.2522 42.391C17.7224 43 19.3574 43 22.6274 43H25.3726C28.6426 43 30.2776 43 31.7478 42.391C33.218 41.782 34.374 40.626 36.6862 38.3138L38.3138 36.6862C40.626 34.374 41.782 33.218 42.391 31.7478C43 30.2776 43 28.6426 43 25.3726Z"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M24 16V25"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M24 31.9766V31.9966"
        stroke="currentColor"
        strokeWidth="3.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function AlertDiamondIcon(props: Partial<CustomIconComponentProps>): ReactElement {
  return <Icon component={defaultIcon} {...props} />
}
