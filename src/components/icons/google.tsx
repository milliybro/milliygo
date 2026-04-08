import Icon from '@ant-design/icons/lib/components/Icon'

import React, { ReactElement } from 'react'
import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon'

const defaultIcon = (): React.ReactElement => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 25" fill="none">
    <g clipPath="url(#clip0_3883_7233)">
      <path
        d="M5.31891 15.0036L4.4835 18.1223L1.43011 18.1869C0.517594 16.4944 0 14.5579 0 12.5001C0 10.5102 0.483938 8.63374 1.34175 6.98145H1.34241L4.06078 7.47982L5.25159 10.1819C5.00236 10.9085 4.86652 11.6885 4.86652 12.5001C4.86661 13.381 5.02617 14.225 5.31891 15.0036Z"
        fill="#FBBB00"
      />
      <path
        d="M23.7902 10.2583C23.928 10.9842 23.9999 11.7339 23.9999 12.5001C23.9999 13.3592 23.9095 14.1972 23.7375 15.0056C23.1533 17.7563 21.6269 20.1583 19.5124 21.8581L19.5118 21.8574L16.0878 21.6827L15.6032 18.6576C17.0063 17.8348 18.1028 16.5471 18.6804 15.0056H12.2637V10.2583H18.774H23.7902Z"
        fill="#518EF8"
      />
      <path
        d="M19.5114 21.8572L19.5121 21.8579C17.4556 23.5109 14.8433 24.4999 11.9996 24.4999C7.42969 24.4999 3.45652 21.9456 1.42969 18.1867L5.31848 15.0034C6.33187 17.708 8.94089 19.6333 11.9996 19.6333C13.3143 19.6333 14.546 19.2779 15.6029 18.6575L19.5114 21.8572Z"
        fill="#28B446"
      />
      <path
        d="M19.6596 3.26262L15.7721 6.44525C14.6783 5.76153 13.3853 5.36656 12 5.36656C8.87213 5.36656 6.21431 7.38017 5.25169 10.1818L1.34245 6.98131H1.3418C3.33895 3.13077 7.36223 0.5 12 0.5C14.9117 0.5 17.5814 1.53716 19.6596 3.26262Z"
        fill="#F14336"
      />
    </g>
    <defs>
      <clipPath id="clip0_3883_7233">
        <rect width="24" height="24" fill="white" transform="translate(0 0.5)" />
      </clipPath>
    </defs>
  </svg>
)

export default function GoogleIcon(props: Partial<CustomIconComponentProps>): ReactElement {
  return <Icon component={defaultIcon} {...props} />
}
