import Icon, { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon'

const defaultIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 20 20" fill="none">
    <path
      d="M1.66699 2.5H5.61082C7.78676 2.5 8.87474 2.5 9.89024 2.83433C10.9058 3.16866 11.781 3.81496 13.5314 5.10756L16.6077 7.37931C16.6413 7.40413 16.6582 7.41653 16.674 7.42847C17.7079 8.20731 18.3212 9.4225 18.3335 10.7169C18.3337 10.7367 18.3337 10.7576 18.3337 10.7994C18.3337 10.8309 18.3337 10.8467 18.3334 10.86C18.3191 11.7596 17.5932 12.4854 16.6937 12.4997C16.6803 12.5 16.6646 12.5 16.6331 12.5H1.66699"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
    />
    <path
      d="M1.66699 6.66797H3.24436C3.46931 6.66797 3.58178 6.66797 3.68833 6.6748C4.6005 6.73329 5.44864 7.1638 6.03429 7.86559C6.10269 7.94756 6.16908 8.03835 6.30187 8.21993C6.34518 8.27917 6.36684 8.30879 6.38675 8.33864C6.55593 8.59222 6.65233 8.88739 6.66545 9.19189C6.66699 9.22772 6.66699 9.26447 6.66699 9.3378V9.51439C6.66699 9.65747 6.66699 9.72897 6.64541 9.78597C6.61158 9.8753 6.54103 9.94589 6.45165 9.97972C6.39463 10.0013 6.32312 10.0013 6.18009 10.0013H1.66699"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
    />
    <path
      d="M17.5 9.16537H14.4444C11.9898 9.16537 10 7.29988 10 4.9987V3.33203"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M1.66699 15.832H18.3337"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M15 15.832V17.4987"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M10 15.832V17.4987"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M5 15.832V17.4987"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export default function TrainIcon(props: Partial<CustomIconComponentProps>) {
  return <Icon component={defaultIcon} {...props} />
}
