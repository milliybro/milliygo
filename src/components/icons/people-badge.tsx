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
      <g clipPath="url(#clip0_10717_49502)">
        <path
          d="M20 40C31.0457 40 40 31.0457 40 20C40 8.9543 31.0457 0 20 0C8.9543 0 0 8.9543 0 20C0 31.0457 8.9543 40 20 40Z"
          fill="url(#paint0_linear_10717_49502)"
        />
        <path
          d="M20 40C31.0457 40 40 31.0457 40 20C40 8.9543 31.0457 0 20 0C8.9543 0 0 8.9543 0 20C0 31.0457 8.9543 40 20 40Z"
          fill="url(#paint1_radial_10717_49502)"
        />
        <path
          d="M31.8399 10.2778C31.9002 11.9056 30.5951 13.2005 28.9467 13.1788C27.2978 13.1561 25.9471 11.805 25.9203 10.1522C25.8948 8.49952 27.1751 7.18319 28.7897 7.23023C30.4038 7.27757 31.7791 8.65038 31.8399 10.2778Z"
          fill="url(#paint2_linear_10717_49502)"
        />
        <path
          d="M29.5037 11.4058C27.8611 11.3747 26.5098 10.0201 26.4747 8.36865C26.1166 8.86107 25.9087 9.47904 25.9204 10.1524C25.9473 11.8054 27.2979 13.1562 28.9468 13.179C30.5953 13.2007 31.9003 11.9059 31.84 10.278C31.3256 10.9794 30.4752 11.4247 29.5037 11.4058Z"
          fill="url(#paint3_linear_10717_49502)"
        />
        <path
          d="M26.3594 25.8092C26.616 27.6372 26.8605 29.4628 27.0891 31.2854C27.1944 32.1478 27.9059 32.7952 28.7884 32.7699C29.6705 32.7447 30.4286 32.061 30.5862 31.2C30.9252 29.3778 31.2533 27.5592 31.5666 25.7446C29.8309 25.7724 28.0952 25.7939 26.3594 25.8092Z"
          fill="url(#paint4_linear_10717_49502)"
        />
        <path
          d="M31.9924 23.2275C32.5643 22.6656 33.1355 22.106 33.7051 21.5494C34.1584 21.1064 34.4142 20.51 34.4138 19.8884C34.4132 18.8578 34.4056 17.8273 34.391 16.7968C34.372 15.5043 33.2738 14.4337 31.9545 14.4107C29.9621 14.3785 27.9696 14.3545 25.9772 14.3385C24.6577 14.3271 23.5939 15.3967 23.5977 16.7218C23.6013 17.7764 23.6032 18.8312 23.6034 19.8859C23.6034 20.5221 23.8559 21.1322 24.3054 21.581C24.8703 22.145 25.4342 22.708 25.9962 23.2692C26.1198 24.1164 26.2412 24.963 26.3599 25.8091C26.5416 27.096 27.627 28.0342 28.9221 28.0108C30.2169 27.9873 31.3456 27.0198 31.5672 25.7445C31.7121 24.9045 31.854 24.0656 31.9924 23.2275Z"
          fill="url(#paint5_linear_10717_49502)"
        />
        <path
          d="M25.9197 10.1525C25.9509 11.8027 24.6307 13.1276 22.982 13.1208C21.3333 13.1129 19.9978 11.769 20 10.1105C20.0032 8.45232 21.3152 7.10576 22.9297 7.12123C24.544 7.13732 25.8877 8.50263 25.9197 10.1525Z"
          fill="url(#paint6_linear_10717_49502)"
        />
        <path
          d="M23.5636 11.3248C21.9212 11.3128 20.5893 9.96775 20.5885 8.30908C20.2202 8.81025 20 9.43432 20 10.1103C19.9978 11.7689 21.3333 13.1126 22.982 13.1206C24.6306 13.1275 25.9509 11.8024 25.9197 10.1523C25.3926 10.8707 24.5353 11.3317 23.5636 11.3248Z"
          fill="url(#paint7_linear_10717_49502)"
        />
        <path
          d="M20.3848 25.8371C20.6603 27.6761 20.9327 29.5149 21.198 31.3529C21.3208 32.2223 22.0478 32.8873 22.9302 32.8789C23.8125 32.8706 24.555 32.1933 24.6952 31.3246C24.9974 29.4866 25.2977 27.6501 25.5921 25.8154C23.8563 25.829 22.1205 25.8361 20.3848 25.8371Z"
          fill="url(#paint8_linear_10717_49502)"
        />
        <path
          d="M25.9962 23.2693C26.5648 22.7028 27.1336 22.1373 27.7016 21.5734C28.1537 21.1248 28.4084 20.5186 28.4081 19.8867C28.4078 18.8391 28.4034 17.7916 28.3948 16.7441C28.3834 15.4296 27.2966 14.3502 25.9773 14.3385C23.9849 14.3224 21.9924 14.3145 20 14.3145C18.6805 14.3145 17.6053 15.3935 17.6015 16.7191C17.5991 17.7746 17.5977 18.8302 17.5977 19.8859C17.5976 20.5225 17.8512 21.1332 18.3019 21.584C18.8684 22.1504 19.4346 22.717 19.9999 23.2832C20.1284 24.1345 20.2566 24.9858 20.3842 25.837C20.5792 27.1309 21.679 28.0871 22.9741 28.0793C24.269 28.0716 25.3832 27.1057 25.5915 25.8155C25.7277 24.9663 25.8628 24.1176 25.9962 23.2693Z"
          fill="url(#paint9_linear_10717_49502)"
        />
        <path
          d="M20.0003 10.1104C20.0025 11.769 18.667 13.1127 17.0183 13.1207C15.3697 13.1276 14.0494 11.8026 14.0806 10.1524C14.1127 8.50256 15.4563 7.13701 17.0706 7.12123C18.6851 7.1056 19.997 8.45224 20.0003 10.1104Z"
          fill="url(#paint10_linear_10717_49502)"
        />
        <path
          d="M17.6245 11.3173C15.9822 11.3243 14.6698 10.0003 14.7034 8.34863C14.3247 8.85434 14.0925 9.47902 14.0806 10.1521C14.0494 11.8024 15.3696 13.1273 17.0183 13.1204C18.667 13.1126 20.0024 11.7688 20.0003 10.1103C19.4605 10.8396 18.5962 11.3124 17.6245 11.3173Z"
          fill="url(#paint11_linear_10717_49502)"
        />
        <path
          d="M14.4082 25.8154C14.7027 27.65 15.0028 29.4865 15.3051 31.3243C15.4452 32.1933 16.1877 32.8704 17.0701 32.8789C17.9524 32.8873 18.6795 32.2222 18.8022 31.3531C19.0676 29.515 19.3399 27.6761 19.6155 25.837C17.8798 25.8361 16.144 25.8289 14.4082 25.8154Z"
          fill="url(#paint12_linear_10717_49502)"
        />
        <path
          d="M20 23.2832C20.5653 22.717 21.1316 22.1504 21.698 21.584C22.1487 21.1332 22.4023 20.5225 22.4023 19.8859C22.4022 18.8302 22.4009 17.7747 22.3984 16.7191C22.3945 15.3935 21.3193 14.3146 19.9999 14.3145C18.0075 14.3145 16.015 14.3225 14.0226 14.3385C12.7032 14.3502 11.6165 15.4296 11.6051 16.7441C11.5965 17.7916 11.5921 18.8391 11.5918 19.8867C11.5916 20.5184 11.8463 21.1248 12.2983 21.5734C12.8663 22.1373 13.435 22.7028 14.0037 23.2693C14.1371 24.1176 14.2722 24.9663 14.4085 25.8155C14.6168 27.1055 15.731 28.0715 17.0259 28.0793C18.3209 28.0871 19.4208 27.1311 19.6158 25.837C19.7433 24.9858 19.8715 24.1345 20 23.2832Z"
          fill="url(#paint13_linear_10717_49502)"
        />
        <path
          d="M14.0798 10.1522C14.0529 11.8052 12.7023 13.1559 11.0534 13.1788C9.4049 13.2005 8.0999 11.9055 8.16021 10.2778C8.22099 8.65039 9.59631 7.27757 11.2104 7.23023C12.8251 7.18312 14.1054 8.49968 14.0798 10.1522Z"
          fill="url(#paint14_linear_10717_49502)"
        />
        <path
          d="M11.6845 11.3836C10.0423 11.4096 8.74943 10.118 8.81732 8.4873C8.42825 8.99348 8.18388 9.61316 8.16021 10.2779C8.09997 11.9057 9.40497 13.2005 11.0534 13.1789C12.7023 13.1561 14.0529 11.8051 14.0798 10.1522C13.5275 10.8861 12.6563 11.3668 11.6845 11.3836Z"
          fill="url(#paint15_linear_10717_49502)"
        />
        <path
          d="M8.43164 25.7446C8.745 27.5592 9.07305 29.3777 9.41211 31.1998C9.56961 32.0607 10.3277 32.7448 11.21 32.7699C12.0923 32.7953 12.8039 32.1479 12.9093 31.2856C13.1379 29.4629 13.3823 27.6374 13.639 25.8092C11.9032 25.7939 10.1674 25.7724 8.43164 25.7446Z"
          fill="url(#paint16_linear_10717_49502)"
        />
        <path
          d="M14.0036 23.2692C14.5656 22.708 15.1295 22.145 15.6944 21.581C16.1438 21.1321 16.3963 20.5221 16.3964 19.8859C16.3966 18.8312 16.3984 17.7764 16.4021 16.7217C16.4058 15.3966 15.342 14.3271 14.0226 14.3385C12.0302 14.3545 10.0377 14.3785 8.04524 14.4107C6.72586 14.4338 5.62773 15.5046 5.60867 16.7968C5.59398 17.8274 5.58641 18.8579 5.58594 19.8885C5.58555 20.51 5.84133 21.1065 6.29461 21.5495C6.86422 22.1061 7.43539 22.6657 8.00727 23.2275C8.14563 24.0657 8.28758 24.9046 8.43258 25.7445C8.65422 27.02 9.78281 27.9875 11.0777 28.0108C12.3728 28.0341 13.4582 27.0962 13.6398 25.8091C13.7586 24.963 13.8799 24.1164 14.0036 23.2692Z"
          fill="url(#paint17_linear_10717_49502)"
        />
      </g>
      <defs>
        <linearGradient
          id="paint0_linear_10717_49502"
          x1="5.85789"
          y1="34.1421"
          x2="34.1422"
          y2="5.85781"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#230BE0" />
          <stop offset="1" stopColor="#FC54FF" />
        </linearGradient>
        <radialGradient
          id="paint1_radial_10717_49502"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(20.0001 20) scale(20)"
        >
          <stop stopColor="#8D00DB" stopOpacity="0.7" />
          <stop offset="0.3155" stopColor="#BB23EA" stopOpacity="0.479" />
          <stop offset="0.6076" stopColor="#DE3EF5" stopOpacity="0.275" />
          <stop offset="0.8457" stopColor="#F44EFC" stopOpacity="0.108" />
          <stop offset="1" stopColor="#FC54FF" stopOpacity="0" />
        </radialGradient>
        <linearGradient
          id="paint2_linear_10717_49502"
          x1="8.50061"
          y1="30.5866"
          x2="33.8923"
          y2="5.19492"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FC54FF" />
          <stop offset="0.1022" stopColor="#FD77FF" />
          <stop offset="0.2431" stopColor="#FDA0FF" />
          <stop offset="0.3875" stopColor="#FEC3FF" />
          <stop offset="0.5338" stopColor="#FEDDFF" />
          <stop offset="0.6827" stopColor="#FFF0FF" />
          <stop offset="0.8359" stopColor="#FFFBFF" />
          <stop offset="1" stopColor="white" />
        </linearGradient>
        <linearGradient
          id="paint3_linear_10717_49502"
          x1="19.2663"
          y1="19.846"
          x2="34.3649"
          y2="4.7474"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FC54FF" />
          <stop offset="0.1022" stopColor="#FD77FF" />
          <stop offset="0.2431" stopColor="#FDA0FF" />
          <stop offset="0.3875" stopColor="#FEC3FF" />
          <stop offset="0.5338" stopColor="#FEDDFF" />
          <stop offset="0.6827" stopColor="#FFF0FF" />
          <stop offset="0.8359" stopColor="#FFFBFF" />
          <stop offset="1" stopColor="white" />
        </linearGradient>
        <linearGradient
          id="paint4_linear_10717_49502"
          x1="16.0234"
          y1="41.1924"
          x2="42.9513"
          y2="14.2644"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FC54FF" />
          <stop offset="0.1022" stopColor="#FD77FF" />
          <stop offset="0.2431" stopColor="#FDA0FF" />
          <stop offset="0.3875" stopColor="#FEC3FF" />
          <stop offset="0.5338" stopColor="#FEDDFF" />
          <stop offset="0.6827" stopColor="#FFF0FF" />
          <stop offset="0.8359" stopColor="#FFFBFF" />
          <stop offset="1" stopColor="white" />
        </linearGradient>
        <linearGradient
          id="paint5_linear_10717_49502"
          x1="-9.64202"
          y1="58.3048"
          x2="44.2241"
          y2="4.4387"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FC54FF" />
          <stop offset="0.1022" stopColor="#FD77FF" />
          <stop offset="0.2431" stopColor="#FDA0FF" />
          <stop offset="0.3875" stopColor="#FEC3FF" />
          <stop offset="0.5338" stopColor="#FEDDFF" />
          <stop offset="0.6827" stopColor="#FFF0FF" />
          <stop offset="0.8359" stopColor="#FFFBFF" />
          <stop offset="1" stopColor="white" />
        </linearGradient>
        <linearGradient
          id="paint6_linear_10717_49502"
          x1="16.6309"
          y1="16.4629"
          x2="42.5479"
          y2="-9.45408"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FC54FF" />
          <stop offset="1" stopColor="white" />
        </linearGradient>
        <linearGradient
          id="paint7_linear_10717_49502"
          x1="20.3829"
          y1="12.7353"
          x2="35.7318"
          y2="-2.61365"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FC54FF" />
          <stop offset="1" stopColor="white" />
        </linearGradient>
        <linearGradient
          id="paint8_linear_10717_49502"
          x1="20.2441"
          y1="31.1268"
          x2="42.7458"
          y2="8.62504"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FC54FF" />
          <stop offset="1" stopColor="white" />
        </linearGradient>
        <linearGradient
          id="paint9_linear_10717_49502"
          x1="5.09977"
          y1="37.628"
          x2="59.2313"
          y2="-16.5035"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FC54FF" />
          <stop offset="1" stopColor="white" />
        </linearGradient>
        <linearGradient
          id="paint10_linear_10717_49502"
          x1="11.0267"
          y1="16.1579"
          x2="37.3576"
          y2="-10.1731"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#1805B0" />
          <stop offset="1" stopColor="#FC54FF" />
        </linearGradient>
        <linearGradient
          id="paint11_linear_10717_49502"
          x1="14.4868"
          y1="12.7206"
          x2="30.0473"
          y2="-2.83988"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#1805B0" />
          <stop offset="1" stopColor="#FC54FF" />
        </linearGradient>
        <linearGradient
          id="paint12_linear_10717_49502"
          x1="15.1884"
          y1="30.2586"
          x2="35.6042"
          y2="9.84269"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#1805B0" />
          <stop offset="1" stopColor="#FC54FF" />
        </linearGradient>
        <linearGradient
          id="paint13_linear_10717_49502"
          x1="1.97078"
          y1="34.8119"
          x2="56.0692"
          y2="-19.2866"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#1805B0" />
          <stop offset="1" stopColor="#FC54FF" />
        </linearGradient>
        <linearGradient
          id="paint14_linear_10717_49502"
          x1="-17.8162"
          y1="39.1741"
          x2="51.9366"
          y2="-30.5787"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FC54FF" />
          <stop offset="0.1022" stopColor="#FD77FF" />
          <stop offset="0.2431" stopColor="#FDA0FF" />
          <stop offset="0.3875" stopColor="#FEC3FF" />
          <stop offset="0.5338" stopColor="#FEDDFF" />
          <stop offset="0.6827" stopColor="#FFF0FF" />
          <stop offset="0.8359" stopColor="#FFFBFF" />
          <stop offset="1" stopColor="white" />
        </linearGradient>
        <linearGradient
          id="paint15_linear_10717_49502"
          x1="4.55091"
          y1="16.8273"
          x2="22.6421"
          y2="-1.26387"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FC54FF" />
          <stop offset="0.1022" stopColor="#FD77FF" />
          <stop offset="0.2431" stopColor="#FDA0FF" />
          <stop offset="0.3875" stopColor="#FEC3FF" />
          <stop offset="0.5338" stopColor="#FEDDFF" />
          <stop offset="0.6827" stopColor="#FFF0FF" />
          <stop offset="0.8359" stopColor="#FFFBFF" />
          <stop offset="1" stopColor="white" />
        </linearGradient>
        <linearGradient
          id="paint16_linear_10717_49502"
          x1="3.92266"
          y1="35.5235"
          x2="37.5334"
          y2="1.91283"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FC54FF" />
          <stop offset="0.1022" stopColor="#FD77FF" />
          <stop offset="0.2431" stopColor="#FDA0FF" />
          <stop offset="0.3875" stopColor="#FEC3FF" />
          <stop offset="0.5338" stopColor="#FEDDFF" />
          <stop offset="0.6827" stopColor="#FFF0FF" />
          <stop offset="0.8359" stopColor="#FFFBFF" />
          <stop offset="1" stopColor="white" />
        </linearGradient>
        <linearGradient
          id="paint17_linear_10717_49502"
          x1="-13.4118"
          y1="44.239"
          x2="54.6388"
          y2="-23.8116"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FC54FF" />
          <stop offset="0.1022" stopColor="#FD77FF" />
          <stop offset="0.2431" stopColor="#FDA0FF" />
          <stop offset="0.3875" stopColor="#FEC3FF" />
          <stop offset="0.5338" stopColor="#FEDDFF" />
          <stop offset="0.6827" stopColor="#FFF0FF" />
          <stop offset="0.8359" stopColor="#FFFBFF" />
          <stop offset="1" stopColor="white" />
        </linearGradient>
        <clipPath id="clip0_10717_49502">
          <rect width="40" height="40" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
}

export default function PeopleBadge(props: Partial<CustomIconComponentProps>): ReactElement {
  return <Icon component={defaultIcon} {...props} />
}
