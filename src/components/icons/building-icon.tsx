import Icon, { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon'
import type { ReactElement } from 'react'

const defaultIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 14 14"
      fill="none"
    >
      <path
        d="M9.3335 5.8335L10.5873 6.20963C11.3883 6.44996 11.7889 6.57013 12.0195 6.88011C12.2502 7.1901 12.2502 7.60829 12.2502 8.44455V12.8335"
        stroke="#3276FF"
        strokeLinejoin="round"
      />
      <path
        d="M4.6665 5.25H6.4165M4.6665 7.58333H6.4165"
        stroke="#3276FF"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.00016 12.8332V11.0832C7.00016 10.5332 7.00016 10.2582 6.8293 10.0874C6.65845 9.9165 6.38346 9.9165 5.8335 9.9165H5.25016C4.70019 9.9165 4.42521 9.9165 4.25435 10.0874C4.0835 10.2582 4.0835 10.5332 4.0835 11.0832V12.8332"
        stroke="#3276FF"
        strokeLinejoin="round"
      />
      <path d="M1.1665 12.8335H12.8332" stroke="#3276FF" strokeLinecap="round" />
      <path
        d="M1.75 12.8332V3.91823C1.75 2.45362 1.75 1.72132 2.21152 1.35798C2.67305 0.994638 3.35266 1.19191 4.71189 1.58645L7.62854 2.43305C8.44877 2.67114 8.85891 2.79018 9.09609 3.11463C9.33333 3.4391 9.33333 3.88101 9.33333 4.76484V12.8332"
        stroke="#3276FF"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function BuildingIcon(props: Partial<CustomIconComponentProps>): ReactElement {
  return <Icon component={defaultIcon} {...props} />
}
