import Icon from '@ant-design/icons/lib/components/Icon'

import React, { ReactElement } from 'react'
import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon'

const defaultIcon = (): React.ReactElement => (
  <svg width="1em" height="1em" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g id="elements">
      <path
        id="Rectangle 2111"
        d="M5 16.9745C5.1287 18.2829 5.41956 19.1636 6.07691 19.8209C7.25596 21 9.15362 21 12.9489 21C16.7442 21 18.6419 21 19.8209 19.8209C21 18.6419 21 16.7442 21 12.9489C21 9.15362 21 7.25596 19.8209 6.07691C19.1636 5.41956 18.2829 5.1287 16.9745 5"
        stroke="#777E90"
        strokeWidth="1.5"
      />
      <path
        id="Rectangle 2109"
        d="M1 9C1 5.22876 1 3.34315 2.17157 2.17157C3.34315 1 5.22876 1 9 1C12.7712 1 14.6569 1 15.8284 2.17157C17 3.34315 17 5.22876 17 9C17 12.7712 17 14.6569 15.8284 15.8284C14.6569 17 12.7712 17 9 17C5.22876 17 3.34315 17 2.17157 15.8284C1 14.6569 1 12.7712 1 9Z"
        stroke="#777E90"
        strokeWidth="1.5"
      />
      <path
        id="Vector"
        d="M1 10.1185C1.61902 10.0398 2.24484 10.001 2.87171 10.0023C5.52365 9.9533 8.11064 10.6763 10.1711 12.0424C12.082 13.3094 13.4247 15.053 14 17"
        stroke="#777E90"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        id="Vector_2"
        d="M11.9998 6H12.0088"
        stroke="#777E90"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  </svg>
)

export default function GalleryIcon(props: Partial<CustomIconComponentProps>): ReactElement {
  return <Icon component={defaultIcon} {...props} />
}
