import Icon from '@ant-design/icons/lib/components/Icon'

import React, { ReactElement } from 'react'
import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon'

const defaultIcon = (): React.ReactElement => (
  <svg width="1em" height="1em" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#clip0_6353_52751)">
      <path
        d="M20 40C31.0457 40 40 31.0457 40 20C40 8.9543 31.0457 0 20 0C8.9543 0 0 8.9543 0 20C0 31.0457 8.9543 40 20 40Z"
        fill="url(#paint0_linear_6353_52751)"
      />
      <path
        d="M20 40C31.0457 40 40 31.0457 40 20C40 8.9543 31.0457 0 20 0C8.9543 0 0 8.9543 0 20C0 31.0457 8.9543 40 20 40Z"
        fill="url(#paint1_radial_6353_52751)"
      />
      <path
        d="M12.8516 28.7891C12.8721 30.3516 12.8979 31.9141 12.9288 33.4766C12.9488 34.4446 13.7538 35.3238 14.7234 35.4074C16.2859 35.5393 17.8484 35.6125 19.4109 35.6272C19.407 33.4254 19.4038 31.2237 19.4014 29.0219C17.2181 29.0099 15.0348 28.9323 12.8516 28.7891Z"
        fill="url(#paint2_linear_6353_52751)"
      />
      <path
        d="M17.6172 28.9975C17.6241 30.5948 17.6327 32.192 17.6429 33.7891C17.6502 34.7802 18.4433 35.618 19.413 35.6272C21.3661 35.6455 23.3192 35.5723 25.2723 35.4074C26.2422 35.3238 27.0469 34.4445 27.067 33.4766C27.098 31.9141 27.1236 30.3516 27.1442 28.7891C23.9686 28.9975 20.7929 29.067 17.6172 28.9975Z"
        fill="url(#paint3_linear_6353_52751)"
      />
      <path
        d="M14.6638 30.6695C15.6527 30.7274 16.6416 30.7693 17.6305 30.7951C18.3352 25.3473 19.0859 19.8631 19.8266 14.3809C18.2288 15.0454 16.6279 15.7276 15.0259 16.4058C13.6789 16.9795 12.7961 18.2741 12.7969 19.6927C12.798 22.7252 12.8186 25.7575 12.8585 28.7899C12.8721 29.758 13.6815 30.61 14.6638 30.6695Z"
        fill="url(#paint4_linear_6353_52751)"
      />
      <path
        d="M17.477 7.88953C16.6213 7.09109 15.7708 6.31023 14.9268 5.55469C13.6693 6.92641 12.8677 8.72141 12.8439 10.6252C12.8314 11.594 13.6265 12.3403 14.6174 12.3061C15.6084 12.2709 16.4148 11.4511 16.4202 10.4604C16.4262 9.4725 16.8328 8.56195 17.4801 7.89258C17.4791 7.89156 17.4781 7.89055 17.477 7.88953Z"
        fill="url(#paint5_linear_6353_52751)"
      />
      <path
        d="M17.4816 7.88856C16.7828 8.60153 15.6575 8.63934 14.9724 7.98692C14.6299 7.65911 14.4627 7.21762 14.4689 6.76473C14.4746 6.34364 14.6297 5.91075 14.9314 5.5538C16.2481 4.1227 18.059 3.17856 20.0544 3.19755C23.9148 3.24856 27.0952 6.88083 27.1552 10.7125C27.2288 16.7379 27.2259 22.7631 27.1466 28.7883C27.1331 29.7569 26.3238 30.6083 25.3413 30.6679C22.7702 30.8187 20.1991 30.8606 17.628 30.7936C17.6057 26.4334 17.5963 22.0732 17.5996 17.7131C17.6009 16.2613 18.4812 14.9397 19.824 14.3797C20.3497 14.161 20.8751 13.944 21.4001 13.7299C22.7331 13.1734 23.6484 11.856 23.5736 10.3066C23.4808 8.41005 21.8974 6.81044 20.0163 6.80106C19.0304 6.79669 18.1363 7.22036 17.4849 7.89169C17.4838 7.89067 17.4827 7.88966 17.4816 7.88856Z"
        fill="url(#paint6_linear_6353_52751)"
      />
      <path
        d="M15.2031 22.5376C15.2086 24.2189 16.4156 25.7817 17.6137 26.9219C18.0072 25.502 18.4045 24.0764 18.8034 22.6482C18.4027 21.7246 18.0017 20.8015 17.6011 19.8809C16.2495 20.0327 15.1991 21.1634 15.2031 22.5376Z"
        fill="url(#paint7_linear_6353_52751)"
      />
      <path
        d="M20.0038 20.8605C19.5075 20.2524 18.7522 19.8638 17.906 19.8633C17.803 19.8632 17.7015 19.8694 17.6016 19.8805C17.602 22.2275 17.6062 24.5745 17.6141 26.9215C18.2437 27.5195 18.8712 27.9977 19.325 28.3148C19.7345 28.6015 20.2733 28.6016 20.6827 28.3147C21.575 27.6927 23.1428 26.4376 24.068 24.8949C22.719 23.5751 21.3621 22.2197 20.0038 20.8605Z"
        fill="url(#paint8_linear_6353_52751)"
      />
      <path
        d="M22.0978 19.8633C21.2516 19.8641 20.4962 20.2523 20 20.8605C20.0013 23.1126 21.8195 24.9448 24.0641 24.8949C24.5039 24.1613 24.7977 23.3653 24.8002 22.5372C24.8048 21.062 23.5927 19.8647 22.0978 19.8633Z"
        fill="url(#paint9_linear_6353_52751)"
      />
    </g>
    <defs>
      <linearGradient
        id="paint0_linear_6353_52751"
        x1="5.85781"
        y1="34.142"
        x2="34.142"
        y2="5.85773"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#FF2F2B" />
        <stop offset="1" stopColor="#FF9CEB" />
      </linearGradient>
      <radialGradient
        id="paint1_radial_6353_52751"
        cx="0"
        cy="0"
        r="1"
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(20.1584 23.9612) scale(24.3434)"
      >
        <stop stopColor="#FF2F2B" />
        <stop offset="0.0729" stopColor="#FF424E" stopOpacity="0.927" />
        <stop offset="0.1759" stopColor="#FF5A77" stopOpacity="0.824" />
        <stop offset="0.2849" stopColor="#FF6E9B" stopOpacity="0.715" />
        <stop offset="0.399" stopColor="#FF7FB8" stopOpacity="0.601" />
        <stop offset="0.5199" stopColor="#FF8CCF" stopOpacity="0.48" />
        <stop offset="0.6506" stopColor="#FF95DF" stopOpacity="0.349" />
        <stop offset="0.7985" stopColor="#FF9AE8" stopOpacity="0.202" />
        <stop offset="1" stopColor="#FF9CEB" stopOpacity="0" />
      </radialGradient>
      <linearGradient
        id="paint2_linear_6353_52751"
        x1="13.9572"
        y1="34.3821"
        x2="50.5533"
        y2="-2.21391"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#FFA9D4" />
        <stop offset="0.2953" stopColor="#FFC6E3" />
        <stop offset="0.7601" stopColor="#FFEFF7" />
        <stop offset="1" stopColor="white" />
      </linearGradient>
      <linearGradient
        id="paint3_linear_6353_52751"
        x1="9.75258"
        y1="44.2057"
        x2="53.8487"
        y2="0.109679"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#FFA9D4" />
        <stop offset="0.2953" stopColor="#FFC6E3" />
        <stop offset="0.7601" stopColor="#FFEFF7" />
        <stop offset="1" stopColor="white" />
      </linearGradient>
      <linearGradient
        id="paint4_linear_6353_52751"
        x1="6.76695"
        y1="32.9693"
        x2="33.8569"
        y2="5.8793"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#FFA9D4" />
        <stop offset="0.2953" stopColor="#FFC6E3" />
        <stop offset="0.7601" stopColor="#FFEFF7" />
        <stop offset="1" stopColor="white" />
      </linearGradient>
      <linearGradient
        id="paint5_linear_6353_52751"
        x1="6.73514"
        y1="17.3207"
        x2="23.8526"
        y2="0.203203"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#FFA9D4" />
        <stop offset="0.2953" stopColor="#FFC6E3" />
        <stop offset="0.7601" stopColor="#FFEFF7" />
        <stop offset="1" stopColor="white" />
      </linearGradient>
      <linearGradient
        id="paint6_linear_6353_52751"
        x1="1.21899"
        y1="37.3572"
        x2="34.1266"
        y2="4.44965"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#FFA9D4" />
        <stop offset="0.2953" stopColor="#FFC6E3" />
        <stop offset="0.7601" stopColor="#FFEFF7" />
        <stop offset="1" stopColor="white" />
      </linearGradient>
      <linearGradient
        id="paint7_linear_6353_52751"
        x1="13.2275"
        y1="27.3605"
        x2="29.3456"
        y2="11.2424"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#FF2F2B" />
        <stop offset="1" stopColor="#FF9CEB" />
      </linearGradient>
      <linearGradient
        id="paint8_linear_6353_52751"
        x1="9.52399"
        y1="33.8774"
        x2="32.222"
        y2="11.1795"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#FF2F2B" />
        <stop offset="1" stopColor="#FF9CEB" />
      </linearGradient>
      <linearGradient
        id="paint9_linear_6353_52751"
        x1="6.74633"
        y1="38.1537"
        x2="31.0544"
        y2="13.8456"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#FF2F2B" />
        <stop offset="1" stopColor="#FF9CEB" />
      </linearGradient>
      <clipPath id="clip0_6353_52751">
        <rect width="40" height="40" fill="white" />
      </clipPath>
    </defs>
  </svg>
)

export default function BookingIcon(props: Partial<CustomIconComponentProps>): ReactElement {
  return <Icon component={defaultIcon} {...props} />
}
