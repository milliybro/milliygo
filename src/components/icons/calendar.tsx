import Icon, { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon'
import type { ReactElement } from 'react'

const calendar = () => {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18.333 2V4M6.33301 2V4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.3285 13H12.3375M12.3285 17H12.3375M16.324 13H16.333M8.33301 13H8.34198M8.33301 17H8.34198"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.83301 8H20.833"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.83301 12.2432C2.83301 7.88594 2.83301 5.70728 4.08513 4.35364C5.33724 3 7.3525 3 11.383 3H13.283C17.3135 3 19.3288 3 20.5809 4.35364C21.833 5.70728 21.833 7.88594 21.833 12.2432V12.7568C21.833 17.1141 21.833 19.2927 20.5809 20.6464C19.3288 22 17.3135 22 13.283 22H11.383C7.3525 22 5.33724 22 4.08513 20.6464C2.83301 19.2927 2.83301 17.1141 2.83301 12.7568V12.2432Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.33301 8H21.333"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function CalendarIcon(props: Partial<CustomIconComponentProps>): ReactElement {
  return <Icon component={calendar} {...props} />
}
