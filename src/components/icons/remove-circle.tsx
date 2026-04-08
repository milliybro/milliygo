import Icon, { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon'
import type { ReactElement } from 'react'

const removeCircle = () => {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="elements">
        <path
          id="Vector"
          d="M13.8284 8.1712L8.17157 13.8281M13.8284 13.8281L8.17157 8.1712"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          id="Ellipse 1334"
          d="M21 11C21 5.47715 16.5228 1 11 1C5.47715 1 1 5.47715 1 11C1 16.5228 5.47715 21 11 21C16.5228 21 21 16.5228 21 11Z"
          stroke="currentColor"
          strokeWidth="1.5"
        />
      </g>
    </svg>
  )
}

export default function RemoveCircleIcon(props: Partial<CustomIconComponentProps>): ReactElement {
  return <Icon component={removeCircle} {...props} />
}
