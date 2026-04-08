import Icon, { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon'
import type { ReactElement } from 'react'

const arrowRight = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="100%"
      viewBox="0 0 14 13"
      fill="none"
    >
      <path
        d="M6.46 12.56L5.02 10.9L9.34 7.34H-4.47035e-07V5.22H9.34L5.02 1.68L6.46 7.15256e-07L13.54 6.28L6.46 12.56Z"
        fill="currentColor"
      />
    </svg>
  )
}

export default function ArrowRightSharpIcon2(
  props: Partial<CustomIconComponentProps>
): ReactElement {
  return <Icon component={arrowRight} {...props} />
}
