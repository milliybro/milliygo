import Icon, { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon'
import { ReactElement } from 'react'

const defaultIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 20 20" fill="none">
    <g clipPath="url(#clip0_1348_44737)">
      <path
        d="M9.58333 4.16667H9.94533C12.4847 4.16667 13.7544 4.16667 14.2364 4.62274C14.653 5.01697 14.8376 5.59774 14.7251 6.16018C14.595 6.81085 13.5584 7.54405 11.4852 9.01044L8.0981 11.4062C6.02492 12.8726 4.98832 13.6058 4.85819 14.2565C4.74571 14.8189 4.93034 15.3997 5.34697 15.7939C5.82894 16.25 7.09863 16.25 9.638 16.25H10.4167M6.66666 4.16667C6.66666 5.54738 5.54738 6.66667 4.16666 6.66667C2.78595 6.66667 1.66666 5.54738 1.66666 4.16667C1.66666 2.78596 2.78595 1.66667 4.16666 1.66667C5.54738 1.66667 6.66666 2.78596 6.66666 4.16667ZM18.3333 15.8333C18.3333 17.214 17.214 18.3333 15.8333 18.3333C14.4526 18.3333 13.3333 17.214 13.3333 15.8333C13.3333 14.4526 14.4526 13.3333 15.8333 13.3333C17.214 13.3333 18.3333 14.4526 18.3333 15.8333Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_1348_44737">
        <rect width="20" height="20" fill="white" />
      </clipPath>
    </defs>
  </svg>
)

export default function RouteIcon(props: Partial<CustomIconComponentProps>): ReactElement {
  return <Icon component={defaultIcon} {...props} />
}
