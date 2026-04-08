import Icon, { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon'
import type { ReactElement } from 'react'

const defaultIcon = () => {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_10717_76325)">
        <path
          d="M20 40C31.0457 40 40 31.0457 40 20C40 8.9543 31.0457 0 20 0C8.9543 0 0 8.9543 0 20C0 31.0457 8.9543 40 20 40Z"
          fill="url(#paint0_linear_10717_76325)"
        />
        <path
          d="M20 40C31.0457 40 40 31.0457 40 20C40 8.9543 31.0457 0 20 0C8.9543 0 0 8.9543 0 20C0 31.0457 8.9543 40 20 40Z"
          fill="url(#paint1_radial_10717_76325)"
        />
        <path
          d="M28.2031 35.4021C27.8125 35.43 27.4219 35.456 27.0313 35.4799C24.7234 34.0439 22.3742 32.4921 20 30.8905C17.6259 32.4921 15.2767 34.0439 12.9688 35.4799C12.5781 35.456 12.1875 35.43 11.7969 35.4021C11.1503 35.3553 10.6092 34.7869 10.5905 34.1406C10.324 24.7135 10.324 15.2864 10.5905 5.85934C10.6092 5.21301 11.1502 4.64465 11.7969 4.59777C17.2656 4.20699 22.7344 4.20699 28.2031 4.59777C28.8499 4.64465 29.3907 5.21309 29.4095 5.85934C29.676 15.2864 29.676 24.7135 29.4095 34.1406C29.3908 34.7869 28.8498 35.3554 28.2031 35.4021Z"
          fill="url(#paint2_linear_10717_76325)"
        />
        <path
          d="M12.9191 6.88938C12.7358 16.4195 12.7523 25.9498 12.9688 35.4799C17.6563 35.767 22.3438 35.767 27.0313 35.4799C27.2477 25.9498 27.2642 16.4195 27.0809 6.88938C22.3603 6.64625 17.6397 6.64625 12.9191 6.88938Z"
          fill="url(#paint3_linear_10717_76325)"
        />
        <path
          d="M15.2355 10.7783C15.2118 13.4543 15.1984 16.1303 15.1953 18.8062C18.398 18.7964 21.6006 18.7964 24.8033 18.8062C21.5976 16.1205 18.3877 13.3789 15.2355 10.7783Z"
          fill="url(#paint4_linear_10717_76325)"
        />
        <path
          d="M15.2518 9.17577C15.2462 9.70991 15.2411 10.2441 15.2363 10.7782C17.0872 14.6447 20.5948 17.6041 24.8041 18.8061C24.8004 15.5959 24.7818 12.3858 24.7484 9.17569C21.5828 9.08726 18.4173 9.08726 15.2518 9.17577Z"
          fill="url(#paint5_linear_10717_76325)"
        />
        <path
          d="M15.209 25.1841C15.2223 27.86 15.246 30.536 15.2801 33.212C18.4272 33.32 21.5742 33.32 24.7213 33.212C21.6083 30.6441 18.4168 27.9024 15.209 25.1841Z"
          fill="url(#paint6_linear_10717_76325)"
        />
        <path
          d="M15.2012 23.5816C15.203 24.1158 15.2052 24.6499 15.208 25.184C17.1305 29.1212 20.6066 32.167 24.7203 33.2119C24.7612 30.0018 24.7871 26.7917 24.7982 23.5815C21.5992 23.6109 18.4002 23.6109 15.2012 23.5816Z"
          fill="url(#paint7_linear_10717_76325)"
        />
        <path
          d="M21.2009 21.2007C21.2005 21.8637 20.6628 22.4023 19.9998 22.4023C19.3369 22.4023 18.7991 21.8637 18.7988 21.2007C18.7987 20.5377 19.3364 20.0001 19.9998 20C20.6631 20.0001 21.201 20.5377 21.2009 21.2007Z"
          fill="url(#paint8_radial_10717_76325)"
        />
      </g>
      <defs>
        <linearGradient
          id="paint0_linear_10717_76325"
          x1="5.85789"
          y1="34.1421"
          x2="34.1422"
          y2="5.85781"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FF4031" />
          <stop offset="1" stopColor="#FF9CEB" />
        </linearGradient>
        <radialGradient
          id="paint1_radial_10717_76325"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(20.0001 20) scale(20)"
        >
          <stop stopColor="#FF4031" />
          <stop offset="0.1093" stopColor="#FF453C" stopOpacity="0.891" />
          <stop offset="0.2991" stopColor="#FF5358" stopOpacity="0.701" />
          <stop offset="0.5467" stopColor="#FF6A86" stopOpacity="0.453" />
          <stop offset="0.8392" stopColor="#FF89C5" stopOpacity="0.161" />
          <stop offset="1" stopColor="#FF9CEB" stopOpacity="0" />
        </radialGradient>
        <linearGradient
          id="paint2_linear_10717_76325"
          x1="2.76799"
          y1="37.2319"
          x2="36.1024"
          y2="3.89762"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFCEEC" />
          <stop offset="0.3227" stopColor="#FFDAF1" />
          <stop offset="0.9011" stopColor="#FFF9FD" />
          <stop offset="1" stopColor="white" />
        </linearGradient>
        <linearGradient
          id="paint3_linear_10717_76325"
          x1="2.31281"
          y1="38.847"
          x2="35.0051"
          y2="6.15477"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FF79A2" />
          <stop offset="0.3028" stopColor="#FF95B9" />
          <stop offset="0.7584" stopColor="#FFBAD7" />
          <stop offset="1" stopColor="#FFC8E3" />
        </linearGradient>
        <linearGradient
          id="paint4_linear_10717_76325"
          x1="14.9439"
          y1="19.8679"
          x2="23.5209"
          y2="11.2909"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FF6E70" />
          <stop offset="0.1451" stopColor="#FF7077" />
          <stop offset="0.3498" stopColor="#FF7789" />
          <stop offset="0.5898" stopColor="#FF83A7" />
          <stop offset="0.8547" stopColor="#FF92D1" />
          <stop offset="1" stopColor="#FF9CEB" />
        </linearGradient>
        <linearGradient
          id="paint5_linear_10717_76325"
          x1="12.3584"
          y1="21.6605"
          x2="26.6518"
          y2="7.3671"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FF6E70" />
          <stop offset="1" stopColor="#FF9CEB" />
        </linearGradient>
        <linearGradient
          id="paint6_linear_10717_76325"
          x1="14.9705"
          y1="34.1927"
          x2="23.3987"
          y2="25.7646"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FF6E70" />
          <stop offset="0.1451" stopColor="#FF7077" />
          <stop offset="0.3498" stopColor="#FF7789" />
          <stop offset="0.5898" stopColor="#FF83A7" />
          <stop offset="0.8547" stopColor="#FF92D1" />
          <stop offset="1" stopColor="#FF9CEB" />
        </linearGradient>
        <linearGradient
          id="paint7_linear_10717_76325"
          x1="12.2334"
          y1="36.1241"
          x2="26.6605"
          y2="21.697"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FF6E70" />
          <stop offset="1" stopColor="#FF9CEB" />
        </linearGradient>
        <radialGradient
          id="paint8_radial_10717_76325"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(19.9998 21.2012) scale(3.42492)"
        >
          <stop stopColor="white" />
          <stop offset="0.0989" stopColor="#FFF9FD" />
          <stop offset="0.6773" stopColor="#FFDAF1" />
          <stop offset="1" stopColor="#FFCEEC" />
        </radialGradient>
        <clipPath id="clip0_10717_76325">
          <rect width="40" height="40" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
}

export default function DoorBadge(props: Partial<CustomIconComponentProps>): ReactElement {
  return <Icon component={defaultIcon} {...props} />
}
