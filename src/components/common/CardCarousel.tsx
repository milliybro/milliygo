import { Flex, Typography } from 'antd'
import { CarouselRef } from 'antd/es/carousel'
import { Carousel } from 'antd/lib'
import { JSX, useCallback, useEffect, useRef, useState } from 'react'

import ArrowLeftIcon2 from '@/components/icons/arrow-left-2'
import ArrowRightIcon2 from '@/components/icons/arrow-right-2'
import useWindowSize from '@/hooks/useWindowsSize'
import { twMerge } from 'tailwind-merge'

interface CardCarouselProps {
  title: string
  cards?: JSX.Element[]
}

function CardCarousel({ title, cards }: CardCarouselProps) {
  const sliderRef2 = useRef<CarouselRef>(null)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [canGoNext, setCanGoNext] = useState(true)
  const [canGoPrev, setCanGoPrev] = useState(false)
  let slidesToShow = 4
  const totalSlides = cards?.length || 0

  const updateButtonStates = (_: number, next: number) => {
    setCurrentSlide(next)
  }

  useEffect(() => {
    setCanGoNext(currentSlide < totalSlides - slidesToShow && totalSlides > slidesToShow)
    setCanGoPrev(currentSlide > 0)
  }, [currentSlide, totalSlides, slidesToShow])

  useEffect(() => {
    setCurrentSlide(0)
    sliderRef2.current?.goTo(0, true)
  }, [cards])

  const handlePrev = useCallback(() => {
    if (sliderRef2.current && canGoPrev) {
      sliderRef2.current.prev()
    }
  }, [canGoPrev])

  const handleNext = useCallback(() => {
    if (sliderRef2.current && canGoNext) {
      sliderRef2.current.next()
    }
  }, [canGoNext])

  const width = useWindowSize()

  if (width <= 360) slidesToShow = 1.4
  else if (width <= 460) slidesToShow = 1.7
  else if (width <= 600) slidesToShow = 2.1
  else if (width <= 700) slidesToShow = 2.8
  else if (width <= 850) slidesToShow = 3.4
  else if (width <= 950) slidesToShow = 2.9
  else if (width <= 1200) slidesToShow = 3.2
  else slidesToShow = 4

  const isFewSlides = totalSlides <= slidesToShow

  return (
    <div className="container flex flex-col gap-8 px-0">
      <Flex justify="space-between" className="mb-[-0px] items-center">
        <Typography.Title level={2} className="m-0 dsm:text-[24px]">
          {title}
        </Typography.Title>
        {cards ? (
          <div className="flex flex-row gap-4">
            <button
              aria-label="news previous"
              onClick={handlePrev}
              disabled={!canGoPrev}
              className={twMerge(
                'flex h-11 w-11 items-center justify-center rounded-full border border-transparent bg-[#33333315] text-secondary duration-300 hover:border-secondary/30',
                !canGoPrev && 'opacity-40'
              )}
            >
              <ArrowLeftIcon2
                className={`text-black ${!canGoPrev ? 'cursor-not-allowed text-[#cccccc]' : ''}`}
              />
            </button>
            <button
              disabled={!canGoNext}
              aria-label="news next"
              onClick={handleNext}
              className={twMerge(
                'flex h-11 w-11 items-center justify-center rounded-full border border-transparent bg-[#33333315] text-secondary duration-300 hover:border-secondary/30',
                !canGoNext && 'opacity-40'
              )}
            >
              <ArrowRightIcon2
                className={`text-black ${!canGoNext ? 'cursor-not-allowed text-[#cccccc]' : ''}`}
              />
            </button>
          </div>
        ) : null}
      </Flex>
      <Carousel
        ref={sliderRef2}
        draggable
        slidesToShow={slidesToShow}
        dots={false}
        infinite={false}
        initialSlide={0}
        className={`custom-carousel-class ${isFewSlides ? 'fix-left' : ''}`}
        beforeChange={updateButtonStates}
      >
        {cards ? cards : null}
      </Carousel>
    </div>
  )
}

export default CardCarousel
