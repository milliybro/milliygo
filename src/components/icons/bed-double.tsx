import Icon, { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon'
import type { ReactElement } from 'react'

const bedDouble = () => {
  return (
    <svg
      width="100%"
      height="1em"
      viewBox="0 0 20 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="elements">
        <path
          id="Vector 6176"
          d="M18.3327 13.583H1.66602"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          id="Vector 6177"
          d="M18.3327 16.5V12.3333C18.3327 10.762 18.3327 9.97631 17.8445 9.48816C17.3564 9 16.5707 9 14.9993 9H4.99935C3.428 9 2.64233 9 2.15417 9.48816C1.66602 9.97631 1.66602 10.762 1.66602 12.3333V16.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          id="Ellipse 1759"
          d="M9.16667 9V7.51113C9.16667 7.19393 9.11899 7.08784 8.87479 6.96281C8.36621 6.70243 7.74888 6.5 7.08333 6.5C6.41779 6.5 5.80046 6.70243 5.29188 6.96281C5.04768 7.08784 5 7.19393 5 7.51113L5 9"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          id="Ellipse 1760"
          d="M14.9987 9V7.51113C14.9987 7.19393 14.951 7.08784 14.7068 6.96281C14.1982 6.70243 13.5809 6.5 12.9154 6.5C12.2498 6.5 11.6325 6.70243 11.1239 6.96281C10.8797 7.08784 10.832 7.19393 10.832 7.51113L10.832 9"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          id="Ellipse 1758"
          d="M17.5 9V5.13381C17.5 4.55744 17.5 4.26925 17.3399 3.99711C17.1798 3.72496 16.9516 3.58409 16.4953 3.30236C14.6557 2.16648 12.4161 1.5 10 1.5C7.58389 1.5 5.34429 2.16648 3.50465 3.30236C3.04837 3.58409 2.82022 3.72496 2.66011 3.99711C2.5 4.26925 2.5 4.55744 2.5 5.13381V9"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </g>
    </svg>
  )
}

export default function BedDoubleIcon(props: Partial<CustomIconComponentProps>): ReactElement {
  return <Icon component={bedDouble} {...props} />
}
