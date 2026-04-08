import Icon, { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon'
import type { ReactElement } from 'react'

const defaultIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path
        d="M2.08203 10.8334L3.7487 11.6667"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17.916 11.25L16.2493 11.6667"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.66602 15.4167L6.87074 14.9049C7.17519 14.1438 7.32742 13.7632 7.64485 13.5483C7.96229 13.3334 8.37217 13.3334 9.19193 13.3334H10.8068C11.6265 13.3334 12.0364 13.3334 12.3538 13.5483C12.6713 13.7632 12.8235 14.1438 13.128 14.9049L13.3327 15.4167"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M1.66602 15V17.4016C1.66602 17.7173 1.86664 18.0058 2.18425 18.147C2.39033 18.2386 2.58717 18.3333 2.82483 18.3333H4.2572C4.49486 18.3333 4.6917 18.2386 4.89778 18.147C5.21539 18.0058 5.41602 17.7173 5.41602 17.4016V15.8333"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.582 15.8333V17.4016C14.582 17.7173 14.7827 18.0058 15.1003 18.147C15.3063 18.2386 15.5032 18.3333 15.7408 18.3333H17.1732C17.4109 18.3333 17.6077 18.2386 17.8138 18.147C18.1314 18.0058 18.332 17.7173 18.332 17.4016V15"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.666 7.91667L17.4993 7.5"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.33203 7.91667L2.4987 7.5"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.75 8.75L4.65692 6.02924C5.0236 4.92921 5.20694 4.37919 5.64341 4.0646C6.07989 3.75 6.65966 3.75 7.8192 3.75H12.1808C13.3403 3.75 13.9201 3.75 14.3566 4.0646C14.7931 4.37919 14.9764 4.92921 15.3431 6.02924L16.25 8.75"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <path
        d="M12.9154 3.75008C12.7152 2.7446 12.6151 2.24186 12.3769 1.9543C12.1386 1.66675 11.8221 1.66675 11.1891 1.66675H8.80825C8.17528 1.66675 7.8588 1.66675 7.62054 1.9543C7.38227 2.24186 7.28219 2.7446 7.08203 3.75008"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <path
        d="M3.74935 8.75H16.2493C17.047 9.54768 18.3327 10.6585 18.3327 11.8978V14.6293C18.3327 15.0783 18.0164 15.4562 17.5967 15.5087L14.9993 15.8333H4.99935L2.40198 15.5087C1.9823 15.4562 1.66602 15.0783 1.66602 14.6293V11.8978C1.66602 10.6585 2.95167 9.54768 3.74935 8.75Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function TaxiIcon(props: Partial<CustomIconComponentProps>): ReactElement {
  return <Icon component={defaultIcon} {...props} />
}
