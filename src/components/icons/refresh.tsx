import Icon, { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon'
import type { ReactElement } from 'react'

const defaultIcon = () => {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_21210_8161)">
        <path
          d="M10.1109 0.666504L10.5096 1.41169C10.7791 1.91548 10.9139 2.16738 10.8248 2.27526C10.7356 2.38314 10.4422 2.29601 9.85525 2.12176C9.26845 1.94754 8.64542 1.85381 7.99984 1.85381C4.50203 1.85381 1.6665 4.60548 1.6665 7.99984C1.6665 9.1193 1.97492 10.1689 2.51379 11.0729M5.88873 15.3332L5.49008 14.588C5.22056 14.0842 5.0858 13.8323 5.17491 13.7244C5.26401 13.6165 5.5575 13.7037 6.14443 13.8779C6.73123 14.0521 7.35425 14.1459 7.99984 14.1459C11.4976 14.1459 14.3332 11.3942 14.3332 7.99984C14.3332 6.88038 14.0248 5.83082 13.4859 4.92682"
          stroke="#3276FF"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_21210_8161">
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
}

export default function RefreshIcon(props: Partial<CustomIconComponentProps>): ReactElement {
  return <Icon component={defaultIcon} {...props} />
}
