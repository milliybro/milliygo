import Icon, { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon'
import type { ReactElement } from 'react'

const icon = () => {
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M6.6665 32C6.6665 20.0577 6.6665 14.0866 10.3765 10.3766C14.0865 6.66663 20.0576 6.66663 31.9998 6.66663C43.942 6.66663 49.9132 6.66663 53.6233 10.3766C57.3332 14.0866 57.3332 20.0577 57.3332 32C57.3332 43.9421 57.3332 49.9133 53.6233 53.6234C49.9132 57.3333 43.942 57.3333 31.9998 57.3333C20.0576 57.3333 14.0865 57.3333 10.3765 53.6234C6.6665 49.9133 6.6665 43.9421 6.6665 32Z"
        stroke="#B7BFD5"
        strokeWidth="4"
      />
      <path
        d="M44 24C46.2091 24 48 22.2091 48 20C48 17.7909 46.2091 16 44 16C41.7909 16 40 17.7909 40 20C40 22.2091 41.7909 24 44 24Z"
        stroke="#B7BFD5"
        strokeWidth="4"
      />
      <path
        d="M42.6667 58.6667C41.0147 52.7331 37.1587 47.4189 31.6707 43.5579C25.7536 39.3944 18.3243 37.1909 10.7085 37.3405C9.80421 37.3384 8.90069 37.3672 8 37.4269"
        stroke="#B7BFD5"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <path
        d="M34.6665 47.9999C39.2038 44.462 44.0918 42.6473 49.0297 42.6668C51.8297 42.6638 54.6164 43.2574 57.3332 44.431"
        stroke="#B7BFD5"
        strokeWidth="4"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function GuideImage(props: Partial<CustomIconComponentProps>): ReactElement {
  return <Icon component={icon} {...props} />
}
