import Icon from '@ant-design/icons/lib/components/Icon'

import React, { ReactElement } from 'react'
import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon'

const defaultIcon = (): React.ReactElement => (
  <svg width="1em" height="1em" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g id="elements">
      <path
        id="Rectangle 1773"
        d="M1.5 11C1.5 6.52166 1.5 4.28249 2.89124 2.89124C4.28249 1.5 6.52166 1.5 11 1.5C15.4783 1.5 17.7175 1.5 19.1088 2.89124C20.5 4.28249 20.5 6.52166 20.5 11C20.5 15.4783 20.5 17.7175 19.1088 19.1088C17.7175 20.5 15.4783 20.5 11 20.5C6.52166 20.5 4.28249 20.5 2.89124 19.1088C1.5 17.7175 1.5 15.4783 1.5 11Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        id="Vector 2612"
        d="M11.2422 16V11C11.2422 10.5286 11.2422 10.2929 11.0957 10.1464C10.9493 10 10.7136 10 10.2422 10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        id="Vector"
        d="M10.992 7H11.001"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  </svg>
)

export default function InfoIcon(props: Partial<CustomIconComponentProps>): ReactElement {
  return <Icon component={defaultIcon} {...props} />
}
