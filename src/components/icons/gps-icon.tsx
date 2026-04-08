import Icon, { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon'
import type { ReactElement } from 'react'

const send = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
      <path
        d="M27.3515 16.0001C27.3515 22.2593 22.2774 27.3334 16.0182 27.3334C9.75898 27.3334 4.68488 22.2593 4.68488 16.0001C4.68488 9.74085 9.75898 4.66675 16.0182 4.66675C22.2774 4.66675 27.3515 9.74085 27.3515 16.0001Z"
        stroke="#3276FF"
        strokeWidth="2"
      />
      <path
        d="M30 16H27.3333"
        stroke="#3276FF"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.66667 16H2"
        stroke="#3276FF"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16 2.00008L16 4.66675"
        stroke="#3276FF"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16 27.3333V30"
        stroke="#3276FF"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19.9999 16.0001C19.9999 18.2093 18.2091 20.0001 15.9999 20.0001C13.7908 20.0001 11.9999 18.2093 11.9999 16.0001C11.9999 13.791 13.7908 12.0001 15.9999 12.0001C18.2091 12.0001 19.9999 13.791 19.9999 16.0001Z"
        stroke="#3276FF"
        strokeWidth="2"
      />
    </svg>
  )
}

export default function GPSIcon(props: Partial<CustomIconComponentProps>): ReactElement {
  return <Icon component={send} {...props} />
}
