import Icon from '@ant-design/icons/lib/components/Icon'

import React, { ReactElement } from 'react'
import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon'

const defaultIcon = (): React.ReactElement => (
  <svg width="1em" height="1em" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M2.27148 3H7.00407C9.6152 3 10.9208 3 12.1394 3.40119C13.3581 3.80239 14.4083 4.57795 16.5088 6.12907L20.2004 8.85517C20.2407 8.88495 20.2609 8.89984 20.2799 8.91416C21.5206 9.84877 22.2565 11.307 22.2713 12.8603C22.2715 12.8841 22.2715 12.9091 22.2715 12.9593C22.2715 12.9971 22.2715 13.016 22.2712 13.032C22.254 14.1115 21.383 14.9825 20.3035 14.9997C20.2875 15 20.2686 15 20.2308 15H2.27148"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M2.27148 11H6.36648C8.96033 11 10.2573 11 11.4572 11.451C12.6571 11.9019 13.6698 12.77 15.6953 14.5061L16.2715 15"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path d="M10.2715 7H17.2715" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M2.27148 19H22.2715" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path
      d="M18.2715 19V21"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12.2715 19V21"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M6.27148 19V21"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export default function SpeedTrainIcon(props: Partial<CustomIconComponentProps>): ReactElement {
  return <Icon component={defaultIcon} {...props} />
}
