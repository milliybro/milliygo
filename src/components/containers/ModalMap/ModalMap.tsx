import { ModalProps as AntModalProps, Button, Flex, Modal, Popover } from 'antd'
import { memo, useCallback, useEffect, useState } from 'react'

import CloseIcon from '@/components/icons/close'
import YandexMap from './components/YandexMap'

import StatusPopup from '@/components/common/StatusPopup'
import LoadingIcon from '@/components/icons/loading'
import ModalMapItemsCard from './components/ModalMapItemsCard'

import useHotelsStore from '@/store/hotels'

import ArrowDown from '@/components/icons/arrow-down'
import { ICulturalHeritageSite } from '@/features/Main/types'
import { useTranslations } from 'next-intl'
import type { FC } from 'react'
import { twMerge } from 'tailwind-merge'

interface ModalProps extends AntModalProps {
  initialId?: number
  siteDetails?: ICulturalHeritageSite
}

const ModalMap: FC<ModalProps> = ({ children, open, onCancel, initialId, siteDetails }) => {
  const [selectedPoint, setSelectedPoint] = useState<number | null>(initialId || null)
  const [_selectedValue, setSelectedValue] = useState<number | null>(null)
  const { hotels: hotelsNotSorted, removeHotels } = useHotelsStore((state) => ({
    hotels: state.hotels,
    removeHotels: state.removeAllHotels,
  }))
  const [hotelsList, setHotelsList] = useState(hotelsNotSorted)
  const t = useTranslations()
  const [openPop, setOpenPop] = useState(false)

  useEffect(() => {
    setHotelsList(hotelsNotSorted)
  }, [hotelsNotSorted])

  useEffect(() => {
    if (siteDetails) {
      removeHotels()
    } else if (hotelsList?.length === 1) {
      if (hotelsList && hotelsList.length > 0) {
        setSelectedPoint(hotelsList[0].id)
      }
    }
  }, [hotelsList, siteDetails])

  const clickHandler = useCallback(
    (val: number) => () => {
      setSelectedPoint(val)
      setSelectedValue(val)
    },

    []
  )

  function moveToStart(array: any, id: number | null): any[] {
    if (id === null) {
      return array
    }

    const index = array.findIndex((el: any) => el.id === id)

    if (index === -1) {
      return array
    }

    const result = [array[index]]

    for (let i = 0; i < array.length; i++) {
      if (i !== index) {
        result.push(array[i])
      }
    }
    return result
  }

  useEffect(() => {
    setHotelsList(moveToStart(hotelsList, selectedPoint))
  }, [selectedPoint])

  useEffect(() => {
    if (!open) {
      setOpenPop(false)
    }
  }, [open])

  return (
    <Modal
      className="relative box-border w-full max-w-[1200px]"
      classNames={{
        body: 'h-[95vh]',
        content: 'p-0 rounded-[40px] overflow-hidden',
      }}
      centered
      open={open}
      onCancel={(e) => {
        setOpenPop(false) // Popover yopiladi
        onCancel?.(e)
      }}
      footer={null}
      closeIcon={null}
      title={null}
    >
      <Button
        aria-label="close map"
        shape="circle"
        className="absolute right-5 top-5 z-10 flex items-center justify-center rounded-2xl !border-[#B7BFD5]/20"
        onClick={onCancel}
      >
        <CloseIcon className="text-sm" />
      </Button>
      <div className="pointer-events-none absolute left-0 top-0 z-10 flex h-[95vh] w-full flex-row">
        {/* <div className="max-w-[321px] rounded-3xl z-20 overflow-x-hidden hide-scrollbar overflow-y-auto h-full pointer-events-auto">
          {children}
        </div> */}

        <Popover
          placement="bottom"
          open={openPop}
          getPopupContainer={(triggerNode) => triggerNode.parentElement!}
          overlayStyle={{
            padding: 0,
            marginTop: 8,
          }}
          overlayInnerStyle={{
            backgroundColor: 'transparent',
            pointerEvents: 'auto',
          }}
          content={
            <div className="scrollbar-hide ms-3 flex max-h-[80vh] w-[260px] flex-col gap-4 overflow-y-auto bg-transparent duration-300 ease-in-out">
              {hotelsList?.map((val: any) => (
                <div
                  key={val.id}
                  onClick={() => clickHandler(val.id)()} // <-- MUHIM O‘ZGARISH
                  className="pointer-events-auto"
                >
                  <ModalMapItemsCard
                    hotelsList={hotelsList}
                    onCancel={onCancel}
                    selectedPoint={selectedPoint}
                    {...val}
                  />
                </div>
              ))}
            </div>
          }
        >
          <div
            onClick={() => setOpenPop((prev) => !prev)}
            className={twMerge(
              'pointer-events-auto absolute left-6 top-4 flex h-fit w-[230px] cursor-pointer select-none items-center justify-between rounded-[12px] bg-white p-3 text-[16px] font-[600] duration-500'
            )}
          >
            <div>{t('booking.list')}</div>
            <ArrowDown
              className={twMerge(
                'transition-transform duration-300 ease-in-out',
                openPop && 'rotate-180'
              )}
            />
          </div>
        </Popover>

        <Flex
          className={twMerge(
            'pointer-events-auto absolute top-[calc(50vh-146px)] h-fit duration-500',
            !hotelsList && !siteDetails
              ? 'visible mx-auto opacity-100'
              : 'collapse scale-125 opacity-0',
            children ? 'left-[calc(50%-58px)]' : 'left-[calc(50%-218px)]'
          )}
        >
          <StatusPopup
            icon={<LoadingIcon className="animate-spin text-[40px]" />}
            title={t('others.loading')}
            description={t('others.loading-description')}
          />
        </Flex>
      </div>
      <YandexMap
        hotels={hotelsList}
        setSelectedPoint={clickHandler}
        selectedPoint={selectedPoint}
        placements={[]}
        siteDetails={siteDetails}
      />
    </Modal>
  )
}

export default memo(ModalMap)
