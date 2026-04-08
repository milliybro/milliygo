import Icon from '@ant-design/icons/lib/components/Icon'

import React, { ReactElement } from 'react'
import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon'

const defaultIcon = (): React.ReactElement => (
  <svg width="1em" height="100%" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 22" fill="none">
    <path
      d="M6.5 17C8.31355 15.0463 11.667 14.9543 13.5 17M11.9406 11C11.9406 12.1046 11.0688 13 9.99341 13C8.918 13 8.0462 12.1046 8.0462 11C8.0462 9.89543 8.918 9 9.99341 9C11.0688 9 11.9406 9.89543 11.9406 11Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M7.5 3.00098C4.85561 3.01083 3.44101 3.1033 2.52513 3.97097C1.5 4.94215 1.5 6.50522 1.5 9.63138V14.3682C1.5 17.4944 1.5 19.0575 2.52513 20.0286C3.55025 20.9998 5.20017 20.9998 8.5 20.9998H11.5C14.7998 20.9998 16.4497 20.9998 17.4749 20.0286C18.5 19.0575 18.5 17.4944 18.5 14.3682V9.63138C18.5 6.50522 18.5 4.94215 17.4749 3.97097C16.559 3.1033 15.1444 3.01083 12.5 3.00098"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M7.77216 2.63163C7.8681 2.21682 7.91608 2.00942 8.00821 1.84004C8.22285 1.44546 8.61879 1.15548 9.09145 1.0467C9.29434 1 9.52956 1 10 1C10.4704 1 10.7057 1 10.9086 1.0467C11.3812 1.15548 11.7771 1.44545 11.9918 1.84004C12.0839 2.00942 12.1319 2.21682 12.2278 2.63163L12.3111 2.99176C12.4813 3.72744 12.5664 4.09528 12.438 4.37824C12.3549 4.5615 12.2132 4.71842 12.031 4.82911C11.7496 5 11.3324 5 10.4981 5H9.5019C8.66755 5 8.25038 5 7.96901 4.82911C7.78677 4.71842 7.6451 4.5615 7.56197 4.37824C7.43361 4.09528 7.51869 3.72744 7.68886 2.99176L7.77216 2.63163Z"
      stroke="currentColor"
      strokeWidth="1.5"
    />
  </svg>
)

export default function IdCardIcon(props: Partial<CustomIconComponentProps>): ReactElement {
  return <Icon component={defaultIcon} {...props} />
}
