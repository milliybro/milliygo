import Icon from '@ant-design/icons/lib/components/Icon'

import React, { ReactElement } from 'react'
import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon'

const defaultIcon = (): React.ReactElement => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 17" fill="none">
    <g clipPath="url(#clip0_15957_79620)">
      <path
        d="M9.38312 3.51527C9.87991 2.97702 10.1283 2.7079 10.3923 2.55092C11.0291 2.17214 11.8134 2.16036 12.4609 2.51985C12.7292 2.66883 12.9853 2.93038 13.4973 3.45348C14.0094 3.97657 14.2654 4.23812 14.4113 4.51225C14.7632 5.17371 14.7517 5.97483 14.3809 6.62544C14.2272 6.89507 13.9638 7.14882 13.4369 7.65631L7.16774 13.6945C6.16923 14.6562 5.66998 15.1371 5.04602 15.3808C4.42207 15.6245 3.73612 15.6066 2.36423 15.5707L2.17757 15.5658C1.75992 15.5549 1.5511 15.5494 1.42971 15.4117C1.30832 15.2739 1.32489 15.0612 1.35804 14.6357L1.37604 14.4047C1.46932 13.2073 1.51597 12.6086 1.74979 12.0704C1.98361 11.5323 2.38694 11.0953 3.1936 10.2213L9.38312 3.51527Z"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinejoin="round"
      />
      <path
        d="M8.66602 3.59155L13.3327 8.25822"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_15957_79620">
        <rect width={16} height={16} fill="white" transform="translate(0 0.924927)" />
      </clipPath>
    </defs>
  </svg>
)

export default function PencilIcon2(props: Partial<CustomIconComponentProps>): ReactElement {
  return <Icon component={defaultIcon} {...props} />
}
