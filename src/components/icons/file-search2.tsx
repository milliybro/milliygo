import Icon, { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon'
import { ReactElement } from 'react'

const defaultIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 17 20" fill="none">
    <path
      d="M15.7497 18.3337L13.9605 16.5444M13.9605 16.5444C14.0559 16.449 14.1446 16.3468 14.2259 16.2387C14.5847 15.7611 14.7973 15.1675 14.7973 14.5241C14.7973 12.9462 13.5181 11.667 11.9402 11.667C10.3622 11.667 9.08301 12.9462 9.08301 14.5241C9.08301 16.1021 10.3622 17.3813 11.9402 17.3813C12.7291 17.3813 13.4434 17.0615 13.9605 16.5444Z"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
    />
    <path
      d="M7.41699 18.334H7.18972C4.47205 18.334 3.11321 18.334 2.16955 17.6691C1.89918 17.4786 1.65914 17.2527 1.45674 16.9982C0.750326 16.1101 0.750326 14.8312 0.750326 12.2734V10.1522C0.750326 7.68286 0.750326 6.4482 1.14111 5.46211C1.76934 3.87684 3.09794 2.62639 4.78229 2.03511C5.83002 1.66732 7.14184 1.66732 9.76548 1.66732C11.2647 1.66732 12.0143 1.66732 12.613 1.87748C13.5755 2.21536 14.3347 2.9299 14.6937 3.83577C14.917 4.39925 14.917 5.10477 14.917 6.5158V10.0007"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M0.749675 10C0.749675 8.46588 1.99333 7.22222 3.52745 7.22222C4.08227 7.22222 4.73637 7.31944 5.27581 7.1749C5.75511 7.04647 6.12948 6.6721 6.2579 6.1928C6.40245 5.65336 6.30523 4.99926 6.30523 4.44444C6.30523 2.91032 7.54888 1.66667 9.08301 1.66667"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export default function FileSearchIcon2(props: Partial<CustomIconComponentProps>): ReactElement {
  return <Icon component={defaultIcon} {...props} />
}
