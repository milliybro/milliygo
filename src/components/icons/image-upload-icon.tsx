import type { ReactElement } from 'react'
import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon'
import Icon from '@ant-design/icons/lib/components/Icon'

const icon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 48 48" fill="none">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M21.1408 4.5C19.3018 4.5 17.5845 5.41906 16.5645 6.94914L14.1972 10.5H8C4.96244 10.5 2.5 12.9624 2.5 16V38C2.5 41.0376 4.96244 43.5 8 43.5H40C43.0376 43.5 45.5 41.0376 45.5 38V16C45.5 12.9624 43.0376 10.5 40 10.5H33.8028L31.4356 6.94914C30.4154 5.41906 28.6982 4.5 26.8592 4.5H21.1408ZM26 18C26 16.8954 25.1046 16 24 16C22.8954 16 22 16.8954 22 18V24H16C14.8954 24 14 24.8954 14 26C14 27.1046 14.8954 28 16 28H22V34C22 35.1046 22.8954 36 24 36C25.1046 36 26 35.1046 26 34V28H32C33.1046 28 34 27.1046 34 26C34 24.8954 33.1046 24 32 24H26V18Z"
      fill="currentColor"
    />
  </svg>
)

export default function ImageUploadIcon(props: Partial<CustomIconComponentProps>): ReactElement {
  return <Icon component={icon} {...props} />
}
