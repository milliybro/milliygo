import { Image as AntImage, Button, Col, Row } from 'antd'
import { useTranslations } from 'next-intl'
import { cloneElement, FC, ReactElement, useEffect, useRef, useState } from 'react'
import EyeOpenIcon from '@/components/icons/eye-open'
import HotelIcon from '@/components/icons/hotel'
import Image from 'next/image'
import { twMerge } from 'tailwind-merge'

const ImageGallery: FC<{ imagesLink?: string[] }> = ({ imagesLink }) => {
  const t = useTranslations()

  const scrollContainerRef = useRef(null)
  const [activeImage, setActiveImage] = useState<number>(0)
  const [isPreviewVisible, setPreviewVisible] = useState<boolean>(false)

  useEffect(() => {
    if (scrollContainerRef.current) {
      const scrollContainer: any = scrollContainerRef.current
      const activeImageElement = scrollContainer.children[activeImage + 1] as HTMLElement

      const scrollContainerWidth = scrollContainer.offsetWidth
      const activeImageWidth = activeImageElement?.offsetWidth

      const scrollContainerScrollLeft = scrollContainer.scrollLeft
      const activeImageLeft = activeImageElement?.offsetLeft

      const scrollContainerScrollRight = scrollContainerScrollLeft + scrollContainerWidth
      const activeImageRight = activeImageLeft + activeImageWidth

      if (activeImageRight > scrollContainerScrollRight) {
        scrollContainer.scrollLeft = activeImageRight - scrollContainerWidth
      } else if (activeImageLeft < scrollContainerScrollLeft) {
        scrollContainer.scrollLeft = activeImageLeft
      }
    } else {
      return
    }
  }, [activeImage])

  return (
    <AntImage.PreviewGroup
      preview={{
        closeIcon: null,
        visible: isPreviewVisible,
        onChange(current) {
          setActiveImage(current)
        },
        onVisibleChange: (visible) => setPreviewVisible(visible),
        imageRender(originalNode) {
          return cloneElement(originalNode as ReactElement<any>, {
            className:
              'rounded-3xl overflow-hidden mb-[34px] max-w-[994px] object-contain h-fit max-h-[60vh]',
            src: imagesLink?.[activeImage],
          })
        },
        toolbarRender() {
          return (
            <div
              className="hide-scrollbar flex w-full max-w-[881px] gap-6 overflow-y-auto"
              ref={scrollContainerRef}
            >
              {imagesLink?.map((val: any, i: number) => (
                <Image
                  unoptimized
                  key={'gallery-item-' + i}
                  alt={'gallery item banner'}
                  width={143}
                  height={105}
                  onClick={() => {
                    setActiveImage(i)
                  }}
                  className={`h-[105px] w-[143px] rounded-lg border-2 object-cover ${
                    i === activeImage ? 'border-primary-light' : 'border-transparent'
                  }`}
                  src={val}
                />
              ))}
            </div>
          )
        },
      }}
      items={imagesLink as any}
    >
      <div className="overflow-hidden rounded-3xl">
        <Row justify="space-between" gutter={24} className="h-full max-h-[441px] overflow-hidden">
          <Col span={12} xs={24} sm={24} md={12} className="max-h-[441px] min-h-[441px]">
            <>
              {imagesLink ? (
                <AntImage
                  width="100%"
                  height="100%"
                  className="bg-secondary/50 object-cover"
                  src={imagesLink?.[0]}
                  alt="dsds"
                  preview={{
                    visible: false,
                    mask: (
                      <div className="flex items-center gap-1 rounded-2xl bg-black bg-opacity-50 p-2">
                        <EyeOpenIcon className="text-2xl" />
                        {t('my-properties.show-detailed')}
                      </div>
                    ),
                  }}
                />
              ) : (
                <div className="h-full w-full animate-pulse bg-secondary/50" />
              )}
              <Button
                size="large"
                className="absolute bottom-4 right-4 hidden items-center justify-center rounded-lg border-none bg-white dsm:flex dsm:text-[14px]"
                onClick={() => {
                  setPreviewVisible(!isPreviewVisible)
                  setActiveImage(0)
                }}
              >
                <EyeOpenIcon className="text-2xl dsm:text-xl" />
                {t('buttons.view-all')}
              </Button>
            </>
          </Col>
          <Col span={12} className="dxx:hidden">
            <div className="relative grid h-full max-h-[441px] grid-cols-2 grid-rows-2 items-stretch gap-[24px]">
              {imagesLink ? (
                <>
                  {[1, 2, 3, 4].map((_, i) => {
                    const img = imagesLink?.[i + 1]

                    return img ? (
                      <AntImage
                        key={'banner-image-' + i}
                        width="100%"
                        height="100%"
                        className={twMerge('bg-secondary/50 object-cover')}
                        src={img}
                        alt="hotels images"
                        rootClassName={twMerge(
                          [3, 1].includes(i) && 'rounded-r-3xl overflow-hidden'
                        )}
                        onClick={() => setActiveImage(i + 1)}
                        preview={{
                          visible: false,
                          mask: (
                            <div className="flex items-center gap-1 rounded-2xl bg-black bg-opacity-50 p-2">
                              <EyeOpenIcon className="text-2xl" />
                              {t('my-properties.show-detailed')}
                            </div>
                          ),
                        }}
                      />
                    ) : (
                      <div
                        key={i}
                        className="flex h-full w-full items-center justify-center bg-secondary/20"
                      >
                        <HotelIcon className="text-[48px] opacity-50" />
                      </div>
                    )
                  })}
                  <Button
                    size="large"
                    className="absolute bottom-4 right-4 flex items-center justify-center rounded-lg border-none bg-white"
                    onClick={() => {
                      setPreviewVisible(!isPreviewVisible)
                      setActiveImage(0)
                    }}
                  >
                    <EyeOpenIcon className="text-2xl" />
                    {t('buttons.view-all')}
                  </Button>
                </>
              ) : (
                <>
                  <div className="h-full w-full animate-pulse bg-secondary/50" />
                  <div className="h-full w-full animate-pulse bg-secondary/50" />
                  <div className="h-full w-full animate-pulse bg-secondary/50" />
                  <div className="h-full w-full animate-pulse bg-secondary/50" />
                </>
              )}
            </div>
          </Col>
        </Row>
      </div>
    </AntImage.PreviewGroup>
  )
}

export default ImageGallery
