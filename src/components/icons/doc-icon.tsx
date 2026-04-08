import Icon, { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon'
import type { ReactElement } from 'react'

const docIcon = () => {
  return (
    <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M3.5 10.5527C3.5 6.7815 3.5 4.89588 4.7448 3.72431C5.98959 2.55273 7.99306 2.55273 12 2.55273H12.7727C16.0339 2.55273 17.6645 2.55273 18.7969 3.35057C19.1214 3.57916 19.4094 3.85026 19.6523 4.15562C20.5 5.22141 20.5 6.75609 20.5 9.82546V12.3709C20.5 15.3341 20.5 16.8157 20.0311 17.999C19.2772 19.9013 17.6829 21.4018 15.6616 22.1114C14.4044 22.5527 12.8302 22.5527 9.68182 22.5527C7.88275 22.5527 6.98322 22.5527 6.26478 22.3005C5.10979 21.8951 4.19875 21.0376 3.76796 19.9506C3.5 19.2744 3.5 18.4278 3.5 16.7346V10.5527Z"
        stroke="#232E40"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
      <path
        d="M20.5 12.5527C20.5 14.3937 19.0076 15.8861 17.1667 15.8861C16.5009 15.8861 15.716 15.7694 15.0686 15.9429C14.4935 16.097 14.0442 16.5462 13.8901 17.1214C13.7167 17.7687 13.8333 18.5536 13.8333 19.2194C13.8333 21.0604 12.3409 22.5527 10.5 22.5527"
        stroke="#232E40"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 7.55273H15"
        stroke="#232E40"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 11.5527H11"
        stroke="#232E40"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function DocIcon(props: Partial<CustomIconComponentProps>): ReactElement {
  return <Icon component={docIcon} {...props} />
}
