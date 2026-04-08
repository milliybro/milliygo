import Icon, { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon'
import { ReactElement } from 'react'

const defaultIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16" fill="none">
    <path d="M6 1.33301H10" stroke="#777E90" strokeLinecap="round" strokeLinejoin="round" />
    <path
      d="M6.66602 1.33301V5.33301M9.33268 1.33301V5.33301"
      stroke="#777E90"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M5.66602 13.667V14.667H5.99935V13.667"
      stroke="#777E90"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M10.3333 13.667V14.667H10V13.667"
      stroke="#777E90"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8.66667 13.6663H7.33333C5.76199 13.6663 4.97631 13.6663 4.48815 13.1782C4 12.69 4 11.9043 4 10.333V8.66634C4 7.09501 4 6.30932 4.48815 5.82116C4.97631 5.33301 5.76199 5.33301 7.33333 5.33301H8.66667C10.238 5.33301 11.0237 5.33301 11.5119 5.82116C12 6.30932 12 7.09501 12 8.66634V10.333C12 11.9043 12 12.69 11.5119 13.1782C11.0237 13.6663 10.238 13.6663 8.66667 13.6663Z"
      stroke="#777E90"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M6.66602 7.33301V11.6663"
      stroke="#777E90"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9.33398 7.33301V11.6663"
      stroke="#777E90"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export default function LuggageIcon(props: Partial<CustomIconComponentProps>): ReactElement {
  return <Icon component={defaultIcon} {...props} />
}
