import Icon, { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon'
import type { ReactElement } from 'react'

const defaultIcon = () => {
  return (
    <svg
      width="1em"
      height="100%"
      viewBox="0 0 44 38"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 12L17.884 15.4789C21.3144 17.507 22.6856 17.507 26.116 15.4789L32 12"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.03153 21.9512C2.16228 28.0823 2.22766 31.1478 4.48991 33.4187C6.75217 35.6896 9.90067 35.7687 16.1977 35.9269C20.0786 36.0244 23.9214 36.0244 27.8024 35.9269C34.0993 35.7687 37.2478 35.6896 39.5101 33.4187C41.7724 31.1478 41.8377 28.0823 41.9685 21.9512C42.0105 19.9799 42.0105 18.0202 41.9685 16.0488C41.8377 9.91772 41.7724 6.85219 39.5101 4.58132C37.2478 2.31046 34.0994 2.23135 27.8024 2.07314C23.9214 1.97563 20.0786 1.97562 16.1976 2.07312C9.90066 2.23133 6.75217 2.31043 4.48991 4.58129C2.22765 6.85216 2.16227 9.91769 2.03153 16.0488C1.98949 18.0201 1.98949 19.9799 2.03153 21.9512Z"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function MessengeIcon(props: Partial<CustomIconComponentProps>): ReactElement {
  return <Icon component={defaultIcon} {...props} />
}
