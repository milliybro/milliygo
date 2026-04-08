declare module 'react-lazy-load-image-component' {
  import * as React from 'react'

  export interface LazyLoadImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    alt?: string
    effect?: string
    placeholderSrc?: string
    threshold?: number
    visibleByDefault?: boolean
    wrapperClassName?: string
    afterLoad?: () => void
    beforeLoad?: () => void
    delayMethod?: 'debounce' | 'throttle'
    delayTime?: number
  }

  export class LazyLoadImage extends React.Component<LazyLoadImageProps> {}
}
