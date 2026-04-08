import Icon from '@ant-design/icons/lib/components/Icon'

import React, { ReactElement } from 'react'
import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon'

const defaultIcon = (): React.ReactElement => (
  <svg width="1em" height="1em" viewBox="0 0 48 49" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M4 24.5C4 17.425 4 13.8875 6.1056 11.5258C6.44238 11.1481 6.81356 10.7987 7.21491 10.4817C9.72427 8.5 13.4828 8.5 21 8.5H27C34.5172 8.5 38.2757 8.5 40.7851 10.4817C41.1864 10.7987 41.5576 11.1481 41.8944 11.5258C44 13.8875 44 17.425 44 24.5C44 31.575 44 35.1125 41.8944 37.4742C41.5576 37.8519 41.1864 38.2013 40.7851 38.5183C38.2757 40.5 34.5172 40.5 27 40.5H21C13.4828 40.5 9.72427 40.5 7.21491 38.5183C6.81356 38.2013 6.44238 37.8519 6.1056 37.4742C4 35.1125 4 31.575 4 24.5Z"
      stroke="#777E90"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M20 32.5H23"
      stroke="#777E90"
      strokeWidth="2.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M29 32.5L36 32.5"
      stroke="#777E90"
      strokeWidth="2.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M4 18.5H44" stroke="#777E90" strokeWidth="2.5" strokeLinejoin="round" />
  </svg>
)

export default function CardIcon(props: Partial<CustomIconComponentProps>): ReactElement {
  return <Icon component={defaultIcon} {...props} />
}
