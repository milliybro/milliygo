import Icon, { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon'
import { ReactElement } from 'react'

const downloadIcon = () => (
  <svg width="1em" height="1em" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M2.49951 14.167C2.49951 14.942 2.49951 15.3295 2.5847 15.6474C2.81587 16.5101 3.48974 17.184 4.35247 17.4152C4.67039 17.5003 5.05787 17.5003 5.83284 17.5003H14.1662C14.9412 17.5003 15.3287 17.5003 15.6466 17.4152C16.5093 17.184 17.1832 16.5101 17.4144 15.6474C17.4995 15.3295 17.4995 14.942 17.4995 14.167"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M13.75 9.58337C13.75 9.58337 10.9882 13.3334 9.99995 13.3334C9.01178 13.3334 6.25 9.58337 6.25 9.58337M9.99995 12.5V2.5"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export default function DownloadIcon(props: Partial<CustomIconComponentProps>): ReactElement {
  return <Icon component={downloadIcon} {...props} />
}
