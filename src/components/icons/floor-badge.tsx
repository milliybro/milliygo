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
      <g clipPath="url(#clip0_10717_95377)">
        <path
          d="M20 40C31.0457 40 40 31.0457 40 20C40 8.9543 31.0457 0 20 0C8.9543 0 0 8.9543 0 20C0 31.0457 8.9543 40 20 40Z"
          fill="url(#paint0_linear_10717_95377)"
        />
        <path
          d="M20 40C31.0457 40 40 31.0457 40 20C40 8.9543 31.0457 0 20 0C8.9543 0 0 8.9543 0 20C0 31.0457 8.9543 40 20 40Z"
          fill="url(#paint1_radial_10717_95377)"
        />
        <path
          d="M10.625 6.9577C8.68881 7.03223 7.03217 8.68902 6.95756 10.6251C6.73029 16.8751 6.73029 23.1251 6.95756 29.3751C7.03225 31.3114 8.68881 32.9679 10.625 33.0425C12.9687 33.1278 15.3125 33.1811 17.6562 33.2023C17.5781 24.4008 17.5781 15.5993 17.6562 6.79785C15.3125 6.81918 12.9687 6.87246 10.625 6.9577Z"
          fill="url(#paint2_linear_10717_95377)"
        />
        <path
          d="M29.375 6.95742C28.2031 6.91477 27.0313 6.88016 25.8594 6.85352C26.0547 15.6177 26.0547 24.3819 25.8594 33.1461C27.0313 33.1195 28.2031 33.0848 29.375 33.0423C31.3112 32.9677 32.9677 31.311 33.0424 29.3748C33.2697 23.1248 33.2697 16.8748 33.0424 10.6248C32.9677 8.68875 31.3112 7.03203 29.375 6.95742Z"
          fill="url(#paint3_linear_10717_95377)"
        />
        <path
          d="M29.4854 29.4853C26.4062 26.4062 23.2031 23.2031 20 19.9999L29.4854 10.5145C29.4299 8.55416 27.7956 6.90048 25.8593 6.85369C23.125 6.79158 20.3906 6.77291 17.6562 6.79775C15.7198 6.81681 14.1079 8.46158 14.0716 10.439C13.9683 16.813 13.9683 23.1869 14.0716 29.5609C14.108 31.5383 15.7198 33.1831 17.6562 33.2022C20.3906 33.227 23.125 33.2085 25.8593 33.1463C27.7956 33.0993 29.4299 31.4456 29.4854 29.4853Z"
          fill="url(#paint4_linear_10717_95377)"
        />
        <path
          d="M10.5146 10.5145C10.3493 16.8381 10.3493 23.1617 10.5146 29.4854C11.7003 29.5163 12.8859 29.5415 14.0716 29.5609C15.9961 26.4062 17.998 23.203 20 19.9999C17.998 16.7968 15.9961 13.5937 14.0716 10.439C12.8859 10.4583 11.7002 10.4835 10.5146 10.5145Z"
          fill="url(#paint5_linear_10717_95377)"
        />
        <path
          d="M20 10.3906C18.0239 10.3906 16.0477 10.4068 14.0716 10.4391C13.9683 16.813 13.9683 23.187 14.0716 29.5609C19.2095 29.6448 24.3475 29.6197 29.4854 29.4854C29.568 26.3236 29.6093 23.1618 29.6093 20C26.4062 16.8382 23.1618 13.5938 20 10.3906Z"
          fill="url(#paint6_linear_10717_95377)"
        />
        <path
          d="M20 10.3906C19.998 13.0441 21.0691 15.4474 22.8116 17.1884C24.5526 18.931 26.9559 20.002 29.6094 20C29.6094 16.8382 29.568 13.6764 29.4854 10.5146C26.3236 10.432 23.1618 10.3906 20 10.3906Z"
          fill="url(#paint7_linear_10717_95377)"
        />
        <path
          d="M11.6748 11.6749C11.5641 17.225 11.5641 22.7751 11.6748 28.3252C12.4677 28.3411 13.2606 28.3546 14.0534 28.3659C14.4442 27.9732 14.8365 27.5791 15.2301 27.1839C15.1837 22.3947 15.1837 17.6054 15.2301 12.8163C14.8365 12.4211 14.4442 12.027 14.0534 11.6343C13.2606 11.6454 12.4677 11.659 11.6748 11.6749Z"
          fill="url(#paint8_linear_10717_95377)"
        />
        <path
          d="M16.432 11.6069C15.6391 11.6137 14.8462 11.6227 14.0534 11.634C13.9744 17.2112 13.9744 22.7885 14.0534 28.3658C14.8463 28.3771 15.6392 28.3861 16.432 28.3929C16.3845 22.7976 16.3845 17.2022 16.432 11.6069Z"
          fill="url(#paint9_linear_10717_95377)"
        />
        <path
          d="M23.6017 17.895C23.6091 21.3943 23.598 24.8935 23.5684 28.3928C25.1541 28.3792 26.7398 28.3566 28.3256 28.3249C28.3815 25.5253 28.4091 22.7256 28.4087 19.926C26.807 19.2543 25.2038 18.5752 23.6017 17.895Z"
          fill="url(#paint10_linear_10717_95377)"
        />
        <path
          d="M17.6214 11.5985C17.5897 17.1995 17.5897 22.8004 17.6214 28.4014C19.2072 28.4104 20.7929 28.4104 22.3787 28.4014C22.4006 24.517 22.4073 20.6326 22.3988 16.7481C21.6203 15.0299 20.8424 13.3099 20.0739 11.5918C19.2563 11.5916 18.4389 11.5938 17.6214 11.5985Z"
          fill="url(#paint11_linear_10717_95377)"
        />
        <path
          d="M28.3256 11.6747C26.7398 11.6431 25.1541 11.6205 23.5684 11.6069C23.5862 13.7029 23.5973 15.799 23.6017 17.8951C24.9538 18.9794 26.6037 19.7033 28.4087 19.9261C28.4082 17.1756 28.3805 14.4252 28.3256 11.6747Z"
          fill="url(#paint12_linear_10717_95377)"
        />
        <path
          d="M20.0742 11.5918C20.3164 13.5553 21.152 15.3356 22.3991 16.7481C22.3954 15.0316 22.3887 13.3151 22.379 11.5985C21.6108 11.5942 20.8425 11.592 20.0742 11.5918Z"
          fill="url(#paint13_linear_10717_95377)"
        />
      </g>
      <defs>
        <linearGradient
          id="paint0_linear_10717_95377"
          x1="5.85781"
          y1="34.1421"
          x2="34.1421"
          y2="5.85781"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.0056" stopColor="#560DFF" />
          <stop offset="1" stopColor="#73ECFF" />
        </linearGradient>
        <radialGradient
          id="paint1_radial_10717_95377"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(20 20) scale(20)"
        >
          <stop stopColor="#6B23EA" />
          <stop offset="1" stopColor="#25D2DB" stopOpacity="0" />
        </radialGradient>
        <linearGradient
          id="paint2_linear_10717_95377"
          x1="2.00053"
          y1="31.522"
          x2="76.3314"
          y2="-42.8089"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#230BE0" />
          <stop offset="1" stopColor="#63BCF5" />
        </linearGradient>
        <linearGradient
          id="paint3_linear_10717_95377"
          x1="-8.97375"
          y1="57.237"
          x2="62.7816"
          y2="-14.5184"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#230BE0" />
          <stop offset="1" stopColor="#63BCF5" />
        </linearGradient>
        <linearGradient
          id="paint4_linear_10717_95377"
          x1="-3.43926"
          y1="45.1624"
          x2="66.2235"
          y2="-24.5004"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#230BE0" />
          <stop offset="1" stopColor="#63BCF5" />
        </linearGradient>
        <linearGradient
          id="paint5_linear_10717_95377"
          x1="-1.34218"
          y1="33.673"
          x2="51.9335"
          y2="-19.6027"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#73ECFF" />
          <stop offset="1" stopColor="white" />
        </linearGradient>
        <linearGradient
          id="paint6_linear_10717_95377"
          x1="-9.1698"
          y1="50.9105"
          x2="44.3532"
          y2="-2.61258"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#73ECFF" />
          <stop offset="1" stopColor="white" />
        </linearGradient>
        <linearGradient
          id="paint7_linear_10717_95377"
          x1="-24.0675"
          y1="64.0675"
          x2="28.7673"
          y2="11.2327"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#73ECFF" />
          <stop offset="1" stopColor="white" />
        </linearGradient>
        <linearGradient
          id="paint8_linear_10717_95377"
          x1="9.53514"
          y1="23.3494"
          x2="39.5581"
          y2="-6.67354"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#3CA1FF" />
          <stop offset="0.1082" stopColor="#47AFFA" />
          <stop offset="0.5685" stopColor="#74E9E7" />
          <stop offset="0.79" stopColor="#85FFE0" />
          <stop offset="0.9167" stopColor="#A8FFE9" />
          <stop offset="1" stopColor="#C2FFF0" />
        </linearGradient>
        <linearGradient
          id="paint9_linear_10717_95377"
          x1="6.65578"
          y1="28.6004"
          x2="36.7855"
          y2="-1.52931"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#3CA1FF" />
          <stop offset="0.1082" stopColor="#47AFFA" />
          <stop offset="0.5685" stopColor="#74E9E7" />
          <stop offset="0.79" stopColor="#85FFE0" />
          <stop offset="0.9167" stopColor="#A8FFE9" />
          <stop offset="1" stopColor="#C2FFF0" />
        </linearGradient>
        <linearGradient
          id="paint10_linear_10717_95377"
          x1="19.4896"
          y1="29.5841"
          x2="49.792"
          y2="-0.718344"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#3CA1FF" />
          <stop offset="0.1082" stopColor="#47AFFA" />
          <stop offset="0.5685" stopColor="#74E9E7" />
          <stop offset="0.79" stopColor="#85FFE0" />
          <stop offset="0.9167" stopColor="#A8FFE9" />
          <stop offset="1" stopColor="#C2FFF0" />
        </linearGradient>
        <linearGradient
          id="paint11_linear_10717_95377"
          x1="11.9831"
          y1="28.0169"
          x2="42.1918"
          y2="-2.19185"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#3CA1FF" />
          <stop offset="0.1082" stopColor="#47AFFA" />
          <stop offset="0.5685" stopColor="#74E9E7" />
          <stop offset="0.79" stopColor="#85FFE0" />
          <stop offset="0.9167" stopColor="#A8FFE9" />
          <stop offset="1" stopColor="#C2FFF0" />
        </linearGradient>
        <linearGradient
          id="paint12_linear_10717_95377"
          x1="12.5934"
          y1="29.1616"
          x2="42.4151"
          y2="-0.660183"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#3CA1FF" />
          <stop offset="0.1082" stopColor="#47AFFA" />
          <stop offset="0.5685" stopColor="#74E9E7" />
          <stop offset="0.79" stopColor="#85FFE0" />
          <stop offset="0.9167" stopColor="#A8FFE9" />
          <stop offset="1" stopColor="#C2FFF0" />
        </linearGradient>
        <linearGradient
          id="paint13_linear_10717_95377"
          x1="6.91336"
          y1="28.4934"
          x2="37.0285"
          y2="-1.62178"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#3CA1FF" />
          <stop offset="0.1082" stopColor="#47AFFA" />
          <stop offset="0.5685" stopColor="#74E9E7" />
          <stop offset="0.79" stopColor="#85FFE0" />
          <stop offset="0.9167" stopColor="#A8FFE9" />
          <stop offset="1" stopColor="#C2FFF0" />
        </linearGradient>
        <clipPath id="clip0_10717_95377">
          <rect width="40" height="40" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
}

export default function FloorBadge(props: Partial<CustomIconComponentProps>): ReactElement {
  return <Icon component={defaultIcon} {...props} />
}
