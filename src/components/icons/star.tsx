import Icon, { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon'
import type { ReactElement } from 'react'

const starIcon = () => {
  return (
    <svg
      width="100%"
      height="1em"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      fill="currentColor"
    >
      <path
        d="M14.6285 6.00399L10.3246 5.3456L8.39557 1.23047C8.25148 0.923177 7.74807 0.923177 7.60399 1.23047L5.67549 5.3456L1.37167 6.00399C1.01817 6.05832 0.877004 6.48888 1.12492 6.74301L4.25158 9.95262L3.5125 14.4901C3.45358 14.8506 3.838 15.1211 4.15591 14.9441L8.00007 12.8164L11.8442 14.9446C12.1592 15.1199 12.5471 14.8547 12.4876 14.4907L11.7486 9.95321L14.8752 6.74359C15.1231 6.48888 14.9814 6.05832 14.6285 6.00399Z"
        fill="currentColor"
      />
    </svg>
  )
}

export default function StarIcon(props: Partial<CustomIconComponentProps>): ReactElement {
  return <Icon component={starIcon} {...props} />
}
