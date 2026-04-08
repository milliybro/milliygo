import Icon, { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon'
import type { ReactElement } from 'react'

const favorite = () => {
  return (
    <>
      <svg
        width="1em"
        height="100%"
        viewBox="0 0 16 14"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="elements">
          <path
            id="Vector"
            d="M12.9757 1.66277C11.1879 0.566152 9.62757 1.00808 8.69022 1.71201L8.69021 1.71201C8.30588 2.00064 8.11371 2.14495 8.00065 2.14495C7.88759 2.14495 7.69542 2.00064 7.31108 1.71201C6.37373 1.00808 4.81337 0.566152 3.02561 1.66277C0.679363 3.10196 0.148465 7.8499 5.56034 11.8556C6.59113 12.6185 7.10653 13 8.00065 13C8.89478 13 9.41017 12.6185 10.441 11.8556C15.8528 7.8499 15.3219 3.10196 12.9757 1.66277Z"
          />
        </g>
      </svg>
    </>
  )
}

export default function FavoriteFilledIcon(props: Partial<CustomIconComponentProps>): ReactElement {
  return <Icon component={favorite} {...props} />
}
