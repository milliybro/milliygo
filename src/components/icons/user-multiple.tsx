import Icon, { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon'
import type { ReactElement } from 'react'

const defaultIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path
        d="M4.37467 5.83341C4.37467 3.87741 5.96033 2.29175 7.91634 2.29175C9.87235 2.29175 11.458 3.87741 11.458 5.83341C11.458 7.78942 9.87235 9.37508 7.91634 9.37508C5.96033 9.37508 4.37467 7.78942 4.37467 5.83341Z"
        fill="#B7BFD5"
      />
      <path
        d="M1.45801 17.0834C1.45801 13.5166 4.3495 10.6251 7.91634 10.6251C11.4832 10.6251 14.3747 13.5166 14.3747 17.0834V17.7084H1.45801V17.0834Z"
        fill="#B7BFD5"
      />
      <path
        d="M15.6218 16.875H18.5412V16.25C18.5412 13.1434 16.0228 10.625 12.9162 10.625C12.6719 10.625 12.4313 10.6406 12.1952 10.6708C14.2091 12.0173 15.5531 14.2872 15.6218 16.875Z"
        fill="#B7BFD5"
      />
      <path
        d="M11.4863 9.02941C11.9148 9.25029 12.401 9.375 12.9162 9.375C14.6421 9.375 16.0412 7.97589 16.0412 6.25C16.0412 4.52411 14.6421 3.125 12.9162 3.125C12.5851 3.125 12.266 3.1765 11.9665 3.27192C12.4361 4.01279 12.7079 4.89132 12.7079 5.83333C12.7079 7.06135 12.2459 8.18148 11.4863 9.02941Z"
        fill="#B7BFD5"
      />
    </svg>
  )
}

export default function MultipleUserIcon(props: Partial<CustomIconComponentProps>): ReactElement {
  return <Icon component={defaultIcon} className="w-[22px] h-[22px]" {...props} />
}
