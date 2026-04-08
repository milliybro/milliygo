import Icon, { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon'

const defaultIcon = () => (
  <svg width="1em" height="1em" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M9.16602 8.3335H14.9993"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9.16602 11.6665H13.3327"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9.16602 15H11.666"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9.16602 5H17.4993"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M5.83333 15.6771C5.50565 16.0458 4.63348 17.5 4.16667 17.5M4.16667 17.5C3.69985 17.5 2.82768 16.0458 2.5 15.6771M4.16667 17.5V12.5"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M2.5 4.32292C2.82768 3.95417 3.69985 2.5 4.16667 2.5M4.16667 2.5C4.63348 2.5 5.50565 3.95417 5.83333 4.32292M4.16667 2.5V7.5"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export default function SortIcon2(props: Partial<CustomIconComponentProps>) {
  return <Icon component={defaultIcon} {...props} />
}
