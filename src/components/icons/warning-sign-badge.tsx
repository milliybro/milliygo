import Icon, { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon'
import { ReactElement } from 'react'

const warningIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="41" height="40" viewBox="0 0 41 40" fill="none">
    <path
      d="M20.2002 40C31.2459 40 40.2002 31.0457 40.2002 20C40.2002 8.9543 31.2459 0 20.2002 0C9.1545 0 0.200195 8.9543 0.200195 20C0.200195 31.0457 9.1545 40 20.2002 40Z"
      fill="url(#paint0_linear_12005_124482)"
    />
    <path
      d="M20.2002 40C31.2459 40 40.2002 31.0457 40.2002 20C40.2002 8.9543 31.2459 0 20.2002 0C9.1545 0 0.200195 8.9543 0.200195 20C0.200195 31.0457 9.1545 40 20.2002 40Z"
      fill="url(#paint1_radial_12005_124482)"
    />
    <path
      d="M34.7825 22.3941C34.8924 22.4995 25.3406 6.27148 25.3261 6.21008C24.2735 4.40594 22.3671 3.17148 20.1999 3.17188C18.0328 3.17156 16.1263 4.40602 15.0757 6.21008C15.0593 6.27141 5.50754 22.4995 5.61629 22.3923C4.61348 24.1363 4.61434 26.3498 5.78872 28.2718C6.96403 30.1922 8.98129 31.3325 11.0028 31.3898C11.0033 31.3904 15.6016 31.5299 20.1997 31.518C24.7979 31.5303 29.396 31.3912 29.3959 31.3916C31.4184 31.3326 33.4357 30.1921 34.611 28.2717C35.7855 26.3498 35.7863 24.1363 34.7825 22.3941Z"
      fill="url(#paint2_linear_12005_124482)"
    />
    <path
      d="M10.9664 30.2016C9.28891 30.158 7.68946 29.1955 6.79235 27.718C5.8961 26.2396 5.83907 24.4429 6.66532 22.998C6.64087 22.9575 16.0845 6.85234 16.0943 6.80063C16.9577 5.31094 18.527 4.37461 20.2006 4.375C21.8737 4.37469 23.4439 5.31125 24.3095 6.80156C24.4041 6.99766 33.8401 23.0985 33.7353 23.0006C34.562 24.4437 34.5052 26.2392 33.6088 27.7181C32.7119 29.1951 31.1116 30.1584 29.4327 30.2034C23.2773 30.3601 17.1219 30.3595 10.9664 30.2016Z"
      fill="url(#paint3_linear_12005_124482)"
    />
    <path
      d="M10.9019 27.819C10.0554 27.8013 9.25428 27.3264 8.811 26.5857C8.36826 25.8456 8.34662 24.9369 8.75991 24.2077C11.7776 18.892 15.006 13.4345 18.1403 7.98352C18.5692 7.2382 19.3576 6.77328 20.2005 6.77344C21.0437 6.77344 21.8337 7.2393 22.2643 7.98641C22.3503 8.16344 31.7399 24.2942 31.6416 24.2123C32.0543 24.939 32.0323 25.8459 31.5898 26.5859C31.1472 27.3256 30.3444 27.8003 29.4952 27.8191C23.2974 27.9471 17.0997 27.9471 10.9019 27.819Z"
      fill="url(#paint4_linear_12005_124482)"
    />
    <path
      d="M13.917 17.6562C12.5234 20.0612 11.1439 22.453 9.80524 24.8185C9.6004 25.1814 9.60899 25.6507 9.82594 26.0155C10.0426 26.3796 10.4542 26.6226 10.8741 26.6303C14.9209 26.7043 18.9677 26.7301 23.0146 26.7077C20.0239 23.7077 16.961 20.6647 13.917 17.6562Z"
      fill="url(#paint5_linear_12005_124482)"
    />
    <path
      d="M30.5961 24.8242C30.691 24.8982 21.3188 8.75469 21.2369 8.5868C21.0237 8.21641 20.6172 7.97656 20.2002 7.97656C19.7841 7.97648 19.3791 8.21484 19.1677 8.58305C18.7067 9.38656 18.2436 10.1904 17.7793 10.9941C20.7705 16.2232 23.8596 21.4939 26.7739 26.6736C27.6896 26.6618 28.6052 26.6476 29.5209 26.6309C29.9439 26.6226 30.3573 26.3807 30.5742 26.016C30.7909 25.6516 30.7998 25.1844 30.5961 24.8242Z"
      fill="url(#paint6_linear_12005_124482)"
    />
    <path
      d="M13.917 17.6562C13.969 22.636 18.0674 26.7315 23.0146 26.7077C24.2676 26.7008 25.5207 26.6893 26.7738 26.6731C27.6877 26.6605 28.2789 25.6577 27.8314 24.868C25.2366 20.2867 22.5129 15.63 19.8494 10.99C19.3896 10.189 18.2425 10.1915 17.7791 10.9936C16.4937 13.2189 15.1994 15.4432 13.917 17.6562Z"
      fill="url(#paint7_linear_12005_124482)"
    />
    <path
      d="M18.5444 15.0622C18.6627 16.5459 18.7826 18.0298 18.9032 19.5139C18.9583 20.1901 19.5229 20.7116 20.2002 20.7116C20.8777 20.7116 21.4421 20.1901 21.4973 19.5139C21.618 18.0298 21.7378 16.5459 21.8561 15.0622C21.933 14.0951 21.1687 13.2657 20.2002 13.2656C19.2317 13.2656 18.4677 14.095 18.5444 15.0622Z"
      fill="url(#paint8_linear_12005_124482)"
    />
    <path
      d="M21.3966 23.1066C21.3979 22.4433 20.8621 21.9062 20.2002 21.9062C19.5384 21.9063 19.0027 22.4433 19.0039 23.1066C19.0053 23.7698 19.541 24.3085 20.2002 24.3086C20.8595 24.3086 21.3952 23.7698 21.3966 23.1066Z"
      fill="url(#paint9_linear_12005_124482)"
    />
    <defs>
      <linearGradient
        id="paint0_linear_12005_124482"
        x1="6.05801"
        y1="34.1421"
        x2="34.3423"
        y2="5.85781"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#FF4D5F" />
        <stop offset="1" stopColor="#FFFA78" />
      </linearGradient>
      <radialGradient
        id="paint1_radial_12005_124482"
        cx="0"
        cy="0"
        r="1"
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(20.2002 20) scale(20)"
      >
        <stop offset="0.0056" stopColor="#FF4D5F" stopOpacity="0.6" />
        <stop offset="0.2255" stopColor="#FF7E43" stopOpacity="0.467" />
        <stop offset="0.48" stopColor="#FFB026" stopOpacity="0.314" />
        <stop offset="0.7032" stopColor="#FFD411" stopOpacity="0.179" />
        <stop offset="0.8841" stopColor="#FFEA05" stopOpacity="0.07" />
        <stop offset="1" stopColor="#FFF200" stopOpacity="0" />
      </radialGradient>
      <linearGradient
        id="paint2_linear_12005_124482"
        x1="-10.9852"
        y1="53.0526"
        x2="42.2818"
        y2="-0.214369"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#FFFA78" />
        <stop offset="0.6266" stopColor="#FFFDCF" />
        <stop offset="1" stopColor="white" />
      </linearGradient>
      <linearGradient
        id="paint3_linear_12005_124482"
        x1="-3.82741"
        y1="45.9249"
        x2="41.9819"
        y2="0.11563"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#EB1337" />
        <stop offset="0.3" stopColor="#FF4747" />
        <stop offset="0.4123" stopColor="#FF5640" />
        <stop offset="0.6262" stopColor="#FF7C2B" />
        <stop offset="0.9172" stopColor="#FFB80A" />
        <stop offset="1" stopColor="#FFCB00" />
      </linearGradient>
      <linearGradient
        id="paint4_linear_12005_124482"
        x1="3.32678"
        y1="38.8171"
        x2="43.7896"
        y2="-1.6457"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#EB1337" />
        <stop offset="0.3" stopColor="#FF4747" />
        <stop offset="0.4123" stopColor="#FF5640" />
        <stop offset="0.6262" stopColor="#FF7C2B" />
        <stop offset="0.9172" stopColor="#FFB80A" />
        <stop offset="1" stopColor="#FFCB00" />
      </linearGradient>
      <linearGradient
        id="paint5_linear_12005_124482"
        x1="14.1736"
        y1="26.4743"
        x2="27.0442"
        y2="13.6037"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#FFCB00" />
        <stop offset="1" stopColor="#FFFA78" />
      </linearGradient>
      <linearGradient
        id="paint6_linear_12005_124482"
        x1="-2.29672"
        y1="44.4643"
        x2="25.9681"
        y2="16.1995"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#FFCB00" />
        <stop offset="1" stopColor="#FFFA78" />
      </linearGradient>
      <linearGradient
        id="paint7_linear_12005_124482"
        x1="-0.467617"
        y1="41.7905"
        x2="34.3958"
        y2="6.92711"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#FFCB00" />
        <stop offset="1" stopColor="#FFFA78" />
      </linearGradient>
      <linearGradient
        id="paint8_linear_12005_124482"
        x1="1.70452"
        y1="35.4102"
        x2="35.9765"
        y2="1.13826"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#EB1337" />
        <stop offset="0.3" stopColor="#FF4747" />
        <stop offset="0.4123" stopColor="#FF5640" />
        <stop offset="0.6262" stopColor="#FF7C2B" />
        <stop offset="0.9172" stopColor="#FFB80A" />
        <stop offset="1" stopColor="#FFCB00" />
      </linearGradient>
      <linearGradient
        id="paint9_linear_12005_124482"
        x1="9.82625"
        y1="33.4801"
        x2="33.6679"
        y2="9.63837"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#EB1337" />
        <stop offset="0.3" stopColor="#FF4747" />
        <stop offset="0.4123" stopColor="#FF5640" />
        <stop offset="0.6262" stopColor="#FF7C2B" />
        <stop offset="0.9172" stopColor="#FFB80A" />
        <stop offset="1" stopColor="#FFCB00" />
      </linearGradient>
    </defs>
  </svg>
)

export default function WarningSignBadge(props: Partial<CustomIconComponentProps>): ReactElement {
  return <Icon component={warningIcon} {...props} />
}
