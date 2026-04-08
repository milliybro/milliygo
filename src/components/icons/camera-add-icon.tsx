import Icon, { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon'

const defaultIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path
      d="M16.5 6.75V11.25C16.5 13.3713 16.5 14.432 15.841 15.091C15.182 15.75 14.1213 15.75 12 15.75H6C3.87869 15.75 2.81802 15.75 2.15901 15.091C1.5 14.432 1.5 13.3713 1.5 11.25V8.29029C1.5 7.55522 1.5 7.18769 1.58507 6.88718C1.79787 6.13542 2.38542 5.54787 3.13717 5.33507C3.43769 5.25 3.80521 5.25 4.54027 5.25C4.81475 5.25 4.952 5.25 5.07983 5.22772C5.39659 5.1725 5.68721 5.01696 5.90887 4.78403C5.99832 4.69003 6.22275 4.35339 6.375 4.125C6.67229 3.67909 6.82092 3.45613 7.02412 3.30275C7.14821 3.20909 7.28611 3.1353 7.43287 3.084C7.67319 3 7.94117 3 8.47712 3H9.75002"
      stroke="#2563EB"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M12 10.125C12 11.7818 10.6568 13.125 9.00002 13.125C7.34314 13.125 6 11.7818 6 10.125C6 8.46812 7.34314 7.125 9.00002 7.125C10.6568 7.125 12 8.46812 12 10.125Z"
      stroke="#2563EB"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M12 4.125H15.75M13.875 6V2.25"
      stroke="#2563EB"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
)

export default function CameraAddIcon(props: Partial<CustomIconComponentProps>) {
  return <Icon component={defaultIcon} {...props} />
}
