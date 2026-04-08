import Icon from '@ant-design/icons/lib/components/Icon'

import React, { ReactElement } from 'react'
import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon'

const defaultIcon = (): React.ReactElement => (
  <svg width="1em" height="1em" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g id="elements">
      <path
        id="Rectangle 2175"
        d="M17 8.5V7.3C16.992 4.49713 16.9051 3.0112 15.967 2.05442C14.9332 1 13.2694 1 9.94161 1L8.05921 1C4.73147 1 3.0676 1 2.0338 2.05442C1 3.10883 1 4.80589 1 8.2L1 12.8C1 16.1941 1 17.8912 2.0338 18.9456C2.95155 19.8816 4.36586 19.9867 7 19.9985"
        stroke="#777E90"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        id="Vector"
        d="M16.6753 18.6886L19 21M18 15.5C18 13.0147 15.9853 11 13.5 11C11.0147 11 9 13.0147 9 15.5C9 17.9853 11.0147 20 13.5 20C15.9853 20 18 17.9853 18 15.5Z"
        stroke="#777E90"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path id="Vector 4435" d="M5 6H13" stroke="#777E90" strokeWidth="1.5" strokeLinecap="round" />
      <path id="Vector 4436" d="M5 10H8" stroke="#777E90" strokeWidth="1.5" strokeLinecap="round" />
    </g>
  </svg>
)

export default function CheckingIcon(props: Partial<CustomIconComponentProps>): ReactElement {
  return <Icon component={defaultIcon} {...props} />
}
