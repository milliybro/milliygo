import Image, { ImageProps } from 'next/image'
import { ReactNode, useEffect, useState } from 'react'

interface BlurImageProps extends ImageProps {
  clickHandler?: () => void
  fallbackSrc?: string
  fallbackEl?: ReactNode
}

function BlurImage({ clickHandler, fallbackSrc, fallbackEl, ...props }: BlurImageProps) {
  const [isLoading, setLoading] = useState(true)
  const [src, setSrc] = useState(props?.src)
  const [error, setError] = useState(false)

  useEffect(() => {
    setSrc(props?.src)
    setError(false)
    setLoading(true)
  }, [props?.src])

  if (error && fallbackEl) {
    return fallbackEl
  }

  return (
    <Image
      {...props}
      src={src || ''}
      alt={props.alt || 'Image'}
      className={`${props.className} cursor-pointer duration-300 ease-in-out ${
        isLoading ? 'blur-2xl opacity-0' : 'blur-0 opacity-100'
      }`}
      onLoad={() => {
        setLoading(false)
        setError(false)
      }}
      onError={() => {
        if (fallbackSrc && src !== fallbackSrc) {
          setSrc(fallbackSrc)
          setLoading(true)
        } else {
          setError(true)
        }
      }}
      onClick={clickHandler}
      unoptimized
    />
  )
}

export default BlurImage
