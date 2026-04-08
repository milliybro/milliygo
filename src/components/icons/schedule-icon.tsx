import Icon from '@ant-design/icons/lib/components/Icon'

import React, { ReactElement } from 'react'
import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon'

const defaultIcon = (): React.ReactElement => (
  <svg width="1em" height="1em" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g id="elements">
      <ellipse
        id="Ellipse 1581"
        cx="14.5"
        cy="10"
        rx="6.5"
        ry="2"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        id="Ellipse 1582"
        d="M21 14.5C21 15.6046 18.0899 16.5 14.5 16.5C10.9101 16.5 8 15.6046 8 14.5"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        id="Ellipse 1583"
        d="M21 10V18.8C21 20.015 18.0899 21 14.5 21C10.9101 21 8 20.015 8 18.8V10"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <ellipse
        id="Ellipse 1584"
        cx="7.5"
        cy="3"
        rx="6.5"
        ry="2"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        id="Vector"
        d="M5 10C3.10819 9.76978 1.36991 9.17454 1 8M5 15C3.10819 14.7698 1.36991 14.1745 1 13"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        id="Vector_2"
        d="M5 20C3.10819 19.7698 1.36991 19.1745 1 18L1 3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        id="Ellipse 1590"
        d="M14 5V3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </g>
  </svg>
)

export default function ScheduleIcon(props: Partial<CustomIconComponentProps>): ReactElement {
  return <Icon component={defaultIcon} {...props} />
}
