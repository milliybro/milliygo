import Icon from '@ant-design/icons/lib/components/Icon'

import React, { ReactElement } from 'react'
import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon'

const defaultIcon = (): React.ReactElement => (
  <svg width="100%" height="1em" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 16" fill="none">
    <path
      d="M9.11046 0.666992L9.50911 1.41217C9.77862 1.91597 9.91337 2.16787 9.82427 2.27575C9.73516 2.38363 9.44169 2.2965 8.85476 2.12225C8.26796 1.94803 7.64493 1.85429 6.99935 1.85429C3.50155 1.85429 0.666016 4.60597 0.666016 8.00033C0.666016 9.11979 0.974431 10.1693 1.5133 11.0733M4.88824 15.3337L4.48959 14.5885C4.22007 14.0847 4.08531 13.8328 4.17442 13.7249C4.26353 13.617 4.55701 13.7042 5.14394 13.8784C5.73074 14.0526 6.35376 14.1464 6.99935 14.1464C10.4972 14.1464 13.3327 11.3947 13.3327 8.00033C13.3327 6.88087 13.0243 5.83131 12.4854 4.92731"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export default function ReloadIcon(props: Partial<CustomIconComponentProps>): ReactElement {
  return <Icon component={defaultIcon} {...props} />
}
