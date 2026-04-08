import Icon, { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon'

const defaultIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" data-rtl-flip="true">
    <path d="M10.28 15.22a.75.75 0 0 1 0 1.06l-4.5 4.5a.8.8 0 0 1-.24.16.73.73 0 0 1-.58 0 .8.8 0 0 1-.24-.16l-4.5-4.5a.75.75 0 1 1 1.06-1.06l3.22 3.22V3.75a.75.75 0 0 1 1.5 0v14.69l3.22-3.22a.75.75 0 0 1 1.06 0m13.5-7.5-4.5-4.5a.8.8 0 0 0-.28-.16.73.73 0 0 0-.58 0 .8.8 0 0 0-.24.16l-4.5 4.5a.75.75 0 1 0 1.06 1.06L18 5.56v14.69a.75.75 0 0 0 1.5 0V5.56l3.22 3.22a.75.75 0 0 0 1.06 0 .75.75 0 0 0 0-1.06"></path>
  </svg>
)

export default function SortIcon(props: Partial<CustomIconComponentProps>) {
  return <Icon component={defaultIcon} {...props} />
}
