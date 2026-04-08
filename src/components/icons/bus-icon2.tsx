import Icon, { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon'

const defaultIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 20 20" fill="none">
    <path
      d="M5.00293 8.33464V4.16797M9.16959 8.33464V4.16797M13.3363 8.33464V4.58464"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M4.18007 14.168C2.99678 14.168 2.40513 14.168 2.03752 13.8019C1.66992 13.4357 1.66992 12.8465 1.66992 11.668V6.66797C1.66992 5.48946 1.66992 4.9002 2.03752 4.53409C2.40513 4.16797 2.99678 4.16797 4.18007 4.16797H10.0837C12.9785 4.16797 14.4258 4.16797 15.5335 4.7565C16.3492 5.18991 17.0288 5.83922 17.4976 6.63285C18.1341 7.71056 18.1943 9.1508 18.3149 12.0313C18.3473 12.8078 18.3636 13.1961 18.2118 13.4898C18.1003 13.7058 17.9279 13.8847 17.7159 14.0047C17.4275 14.168 17.0374 14.168 16.2571 14.168H15.8366M7.50325 14.168H12.5032"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M5.83659 15.8333C6.75706 15.8333 7.50325 15.0872 7.50325 14.1667C7.50325 13.2462 6.75706 12.5 5.83659 12.5C4.91611 12.5 4.16992 13.2462 4.16992 14.1667C4.16992 15.0872 4.91611 15.8333 5.83659 15.8333Z"
      stroke="currentColor"
      strokeWidth="1.2"
    />
    <path
      d="M14.1696 15.8333C15.0901 15.8333 15.8363 15.0872 15.8363 14.1667C15.8363 13.2462 15.0901 12.5 14.1696 12.5C13.2491 12.5 12.5029 13.2462 12.5029 14.1667C12.5029 15.0872 13.2491 15.8333 14.1696 15.8333Z"
      stroke="currentColor"
      strokeWidth="1.2"
    />
    <path
      d="M1.66309 8.33203H12.8031C13.3256 8.33203 13.5031 8.63803 13.9031 9.11803C14.3631 9.56803 14.6741 9.88361 15.1031 9.94803C15.7031 10.038 17.9231 9.99303 17.9231 9.99303"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
    />
  </svg>
)

export default function BusIcon2(props: Partial<CustomIconComponentProps>) {
  return <Icon component={defaultIcon} {...props} />
}
