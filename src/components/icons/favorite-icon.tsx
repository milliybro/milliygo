import Icon from '@ant-design/icons/lib/components/Icon'

import React, { ReactElement } from 'react'
import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon'

const defaultIcon = (): React.ReactElement => (
  <svg width="1em" height="1em" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#clip0_6353_6994)">
      <path
        d="M20 40C31.0457 40 40 31.0457 40 20C40 8.9543 31.0457 0 20 0C8.9543 0 0 8.9543 0 20C0 31.0457 8.9543 40 20 40Z"
        fill="url(#paint0_linear_6353_6994)"
      />
      <path
        d="M20 40C31.0457 40 40 31.0457 40 20C40 8.9543 31.0457 0 20 0C8.9543 0 0 8.9543 0 20C0 31.0457 8.9543 40 20 40Z"
        fill="url(#paint1_radial_6353_6994)"
      />
      <path
        d="M17.6738 5.01172C16.3011 5.04203 14.9283 5.09906 13.5557 5.18297C12.2633 5.26461 11.1816 6.40539 11.1472 7.69602C10.9405 15.8991 10.9405 24.1023 11.1472 32.3054C11.1816 33.596 12.2633 34.7369 13.5557 34.8184C15.3139 34.9259 17.0721 34.9894 18.8302 35.0089C18.4057 24.9991 17.9817 14.9959 17.6738 5.01172Z"
        fill="url(#paint2_linear_6353_6994)"
      />
      <path
        d="M26.4453 5.18133C25.8542 5.14523 25.2631 5.11406 24.672 5.08789C24.4423 15.0116 24.0183 24.9716 23.5156 34.9552C24.4922 34.9226 25.4688 34.8765 26.4453 34.8168C27.7377 34.7352 28.8194 33.5944 28.8538 32.3037C29.0605 24.1006 29.0605 15.8975 28.8538 7.69437C28.8194 6.40375 27.7377 5.26297 26.4453 5.18133Z"
        fill="url(#paint3_linear_6353_6994)"
      />
      <path
        d="M25.9033 32.4747C26.0476 23.7668 26.0408 15.0589 25.883 6.35099C25.8705 5.68693 25.3281 5.11724 24.6729 5.08786C22.3398 4.98451 20.0068 4.95857 17.6737 5.01005C17.0184 5.02474 16.4804 5.58607 16.4726 6.25521C16.3779 15.0242 16.3739 23.7932 16.4604 32.5622C16.4753 33.8819 17.5376 34.9922 18.8301 35.0072C20.3922 35.0246 21.9543 35.0072 23.5165 34.9551C24.8089 34.9106 25.8798 33.7843 25.9033 32.4747Z"
        fill="url(#paint4_linear_6353_6994)"
      />
      <path
        d="M21.1784 6.19348C20.3942 6.18551 19.6099 6.18551 18.8257 6.19348C18.501 6.19668 18.2362 6.46965 18.2344 6.80098C18.2326 7.13223 18.4955 7.39707 18.8217 7.39418C19.6087 7.38691 20.3956 7.38691 21.1827 7.39418C21.5088 7.39723 21.7717 7.1323 21.7699 6.80098C21.768 6.46965 21.5031 6.19668 21.1784 6.19348Z"
        fill="url(#paint5_linear_6353_6994)"
      />
      <path
        d="M22.8203 23.5957C23.873 26.1855 24.9129 28.7576 25.9192 31.2883C26.1166 31.28 26.314 31.2714 26.5113 31.2623C27.165 31.2316 27.7057 30.6741 27.7175 30.0237C27.7452 28.4515 27.7662 26.8792 27.7809 25.307C26.1312 24.7596 24.4771 24.1847 22.8203 23.5957Z"
        fill="url(#paint6_linear_6353_6994)"
      />
      <path
        d="M12.2188 25.3053C12.2334 26.8775 12.2545 28.4498 12.2821 30.022C12.2939 30.6723 12.8346 31.2298 13.4883 31.2605C14.4755 31.3059 15.4628 31.3409 16.4501 31.3657C17.2888 28.7949 18.1523 26.2015 19.0233 23.6016C16.751 24.1971 14.482 24.7735 12.2188 25.3053Z"
        fill="url(#paint7_linear_6353_6994)"
      />
      <path
        d="M16.4062 24.1874C16.4141 26.5804 16.4288 28.9734 16.4501 31.3663C19.6077 31.4455 22.7653 31.4191 25.923 31.2871C25.9586 28.9108 25.983 26.5345 25.9961 24.1582C22.7995 24.2068 19.6028 24.2166 16.4062 24.1874Z"
        fill="url(#paint8_linear_6353_6994)"
      />
      <path
        d="M26.4701 6.36827C26.4701 6.36773 25.8821 6.34679 25.8822 6.35257C24.9304 7.88171 23.9594 9.44054 22.9766 11.0162C24.5641 11.0423 26.1516 11.0892 27.7391 11.1569C27.7208 9.97765 27.6988 8.79859 27.6733 7.61937C27.6587 6.9689 27.1193 6.40523 26.4701 6.36827Z"
        fill="url(#paint9_linear_6353_6994)"
      />
      <path
        d="M16.461 6.98503C16.3329 6.85745 16.205 6.73011 16.0773 6.60316C15.859 6.38612 15.5616 6.27136 15.2495 6.28417C14.6753 6.30777 14.101 6.33566 13.5268 6.36784C12.8776 6.4048 12.3382 6.96847 12.3236 7.61886C12.298 8.79808 12.2761 9.97714 12.2578 11.1564C14.6391 11.0548 17.0203 11.0001 19.4016 10.9923C18.4113 9.64323 17.4294 8.30386 16.461 6.98503Z"
        fill="url(#paint10_linear_6353_6994)"
      />
      <path
        d="M25.8816 6.33629C25.5038 6.31707 25.1258 6.29965 24.7479 6.28418C24.4359 6.27129 24.1384 6.38621 23.9202 6.60317C23.4284 7.09192 22.9341 7.58559 22.4376 8.08332C22.1071 8.41449 21.6559 8.59793 21.1848 8.59395C20.3952 8.58731 19.6058 8.58731 18.8163 8.59395C18.3451 8.59785 17.8939 8.41442 17.5634 8.08332C17.1959 7.71496 16.8296 7.34871 16.4647 6.98512C16.4468 8.73106 16.4326 10.4772 16.4219 12.223C19.6035 12.1689 22.7851 12.1869 25.9667 12.2772C25.9738 12.2772 25.8894 6.33715 25.8816 6.33629Z"
        fill="url(#paint11_linear_6353_6994)"
      />
      <path
        d="M27.7391 11.1559C27.7287 10.5055 27.1875 9.95109 26.532 9.92359C26.334 9.91547 26.1361 9.90773 25.9381 9.90039C23.9933 12.4009 22.0007 14.9948 20 17.5973C22.0007 20.1999 24.0095 22.8111 25.9869 25.3464C26.5855 25.3347 27.1842 25.3212 27.783 25.3059C27.8268 20.5892 27.8122 15.8726 27.7391 11.1559Z"
        fill="url(#paint12_linear_6353_6994)"
      />
      <path
        d="M21.3534 17.5992C19.7014 14.9948 18.0531 12.3859 16.4412 9.83008C15.4511 9.85219 14.4611 9.88359 13.471 9.92414C12.8154 9.9518 12.2743 10.5059 12.2639 11.1564C12.1907 15.873 12.1761 20.5897 12.22 25.3064C13.6173 25.342 15.0146 25.368 16.4119 25.3844C18.047 22.8114 19.705 20.1971 21.3534 17.5992Z"
        fill="url(#paint13_linear_6353_6994)"
      />
      <path
        d="M25.9389 9.89973C22.7723 9.78169 19.6056 9.75809 16.4391 9.82887C16.3976 15.0136 16.3879 20.1984 16.4098 25.3832C19.6025 25.4207 22.7951 25.4082 25.9877 25.3457C26.0242 20.1971 26.008 15.0484 25.9389 9.89973Z"
        fill="url(#paint14_linear_6353_6994)"
      />
      <path
        d="M15.2214 27.1565C14.5615 27.1432 14.0316 27.6609 14.0391 28.3166C14.0466 28.9722 14.5859 29.5234 15.2423 29.5422C15.6388 29.5533 16.0352 29.5631 16.4315 29.5713C16.8248 29.1808 17.2195 28.7879 17.615 28.3931C17.2159 27.9885 16.8161 27.5835 16.4157 27.1784C16.0177 27.1721 15.6195 27.1649 15.2214 27.1565Z"
        fill="url(#paint15_linear_6353_6994)"
      />
      <path
        d="M24.7739 27.1565C21.9873 27.2149 19.2007 27.2221 16.4141 27.1784C16.4186 27.976 16.4238 28.7737 16.4298 29.5713C19.2042 29.6296 21.9785 29.6199 24.7529 29.5421C25.4093 29.5232 25.9486 28.9721 25.9561 28.3165C25.9637 27.6608 25.4338 27.1432 24.7739 27.1565Z"
        fill="url(#paint16_linear_6353_6994)"
      />
      <path
        d="M14 17.6239C13.9935 19.5657 14.9414 21.2929 16.402 22.3941C17.1993 20.8027 18.0015 19.2015 18.8028 17.5989C18.0036 15.9991 17.2073 14.4035 16.42 12.8203C14.9632 13.937 14.0062 15.6825 14 17.6239Z"
        fill="url(#paint17_linear_6353_6994)"
      />
      <path
        d="M20.0008 11.5918C18.6598 11.5914 17.4211 12.0536 16.4187 12.8202C16.4007 16.0114 16.3947 19.2027 16.4007 22.3939C17.4052 23.1498 18.6512 23.6038 20.0009 23.6035C23.3095 23.5956 26.0126 20.8898 26.003 17.6237C25.9879 14.3584 23.2849 11.5988 20.0008 11.5918Z"
        fill="url(#paint18_linear_6353_6994)"
      />
      <path
        d="M19.9982 15.6204C19.6266 15.1643 19.062 14.8739 18.4293 14.877C17.3118 14.883 16.4015 15.7999 16.3984 16.9156C16.3938 18.8031 18.3845 20.4388 19.4067 21.1578C19.7622 21.4075 20.2345 21.4071 20.5899 21.1576C21.2738 20.6774 22.3912 19.7839 23.0545 18.6823C22.0348 17.6632 21.015 16.6398 19.9982 15.6204Z"
        fill="url(#paint19_linear_6353_6994)"
      />
      <path
        d="M21.5689 14.877C20.9362 14.8738 20.3716 15.1643 20 15.6204C19.9995 17.3103 21.3666 18.678 23.0562 18.6823C23.3841 18.1372 23.6012 17.5413 23.5998 16.9156C23.5967 15.7999 22.6864 14.883 21.5689 14.877Z"
        fill="url(#paint20_linear_6353_6994)"
      />
    </g>
    <defs>
      <linearGradient
        id="paint0_linear_6353_6994"
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
        id="paint1_radial_6353_6994"
        cx="0"
        cy="0"
        r="1"
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(20.0001 20) scale(20)"
      >
        <stop stopColor="#8D00DB" stopOpacity="0.8" />
        <stop offset="1" stopColor="#FC54FF" stopOpacity="0" />
      </radialGradient>
      <linearGradient
        id="paint2_linear_6353_6994"
        x1="7.60902"
        y1="28.2429"
        x2="58.0656"
        y2="-22.2137"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#1805B0" />
        <stop offset="1" stopColor="#FC54FF" />
      </linearGradient>
      <linearGradient
        id="paint3_linear_6353_6994"
        x1="10.2909"
        y1="35.657"
        x2="44.5852"
        y2="1.36273"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#1805B0" />
        <stop offset="1" stopColor="#FC54FF" />
      </linearGradient>
      <linearGradient
        id="paint4_linear_6353_6994"
        x1="0.199823"
        y1="40.5967"
        x2="64.7695"
        y2="-23.9729"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#1805B0" />
        <stop offset="1" stopColor="#FC54FF" />
      </linearGradient>
      <linearGradient
        id="paint5_linear_6353_6994"
        x1="17.0659"
        y1="9.7366"
        x2="35.1141"
        y2="-8.31153"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#1805B0" />
        <stop offset="1" stopColor="#FC54FF" />
      </linearGradient>
      <linearGradient
        id="paint6_linear_6353_6994"
        x1="2.73266"
        y1="49.5908"
        x2="60.4294"
        y2="-8.10586"
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
        id="paint7_linear_6353_6994"
        x1="7.71844"
        y1="34.9515"
        x2="81.8881"
        y2="-39.2181"
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
        id="paint8_linear_6353_6994"
        x1="7.50469"
        y1="41.3972"
        x2="62.3168"
        y2="-13.415"
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
        id="paint9_linear_6353_6994"
        x1="-34.5922"
        y1="70.1575"
        x2="28.3949"
        y2="7.17039"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#1805B0" />
        <stop offset="1" stopColor="#FC54FF" />
      </linearGradient>
      <linearGradient
        id="paint10_linear_6353_6994"
        x1="-23.8512"
        y1="48.7732"
        x2="35.3646"
        y2="-10.4426"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#1805B0" />
        <stop offset="1" stopColor="#FC54FF" />
      </linearGradient>
      <linearGradient
        id="paint11_linear_6353_6994"
        x1="-44.1892"
        y1="75.0361"
        x2="34.1391"
        y2="-3.29232"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#1805B0" />
        <stop offset="1" stopColor="#FC54FF" />
      </linearGradient>
      <linearGradient
        id="paint12_linear_6353_6994"
        x1="-23.0884"
        y1="67.552"
        x2="28.1833"
        y2="16.2803"
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
        id="paint13_linear_6353_6994"
        x1="-22.3153"
        y1="54.6796"
        x2="41.884"
        y2="-9.51968"
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
        id="paint14_linear_6353_6994"
        x1="-33.1577"
        y1="71.9582"
        x2="41.5665"
        y2="-2.76599"
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
        id="paint15_linear_6353_6994"
        x1="4.66774"
        y1="39.2692"
        x2="39.4647"
        y2="4.47229"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#1805B0" />
        <stop offset="1" stopColor="#FC54FF" />
      </linearGradient>
      <linearGradient
        id="paint16_linear_6353_6994"
        x1="4.79219"
        y1="44.3871"
        x2="35.0851"
        y2="14.0942"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#1805B0" />
        <stop offset="1" stopColor="#FC54FF" />
      </linearGradient>
      <linearGradient
        id="paint17_linear_6353_6994"
        x1="-1.23176"
        y1="35.2116"
        x2="43.5592"
        y2="-9.5793"
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
        id="paint18_linear_6353_6994"
        x1="-3.13821"
        y1="40.7984"
        x2="41.5682"
        y2="-3.90796"
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
        id="paint19_linear_6353_6994"
        x1="17.0315"
        y1="20.2011"
        x2="37.7769"
        y2="-0.544268"
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
        id="paint20_linear_6353_6994"
        x1="17.5093"
        y1="21.1627"
        x2="34.7864"
        y2="3.88558"
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
      <clipPath id="clip0_6353_6994">
        <rect width="40" height="40" fill="white" />
      </clipPath>
    </defs>
  </svg>
)

export default function FavoriteIcon(props: Partial<CustomIconComponentProps>): ReactElement {
  return <Icon component={defaultIcon} {...props} />
}
