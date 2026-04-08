import CustomModal from '@/components/common/CModal'
import RefreshIcon from '@/components/icons/refresh'
import { useImageCompression } from '@/hooks/useImageCompression'
import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons'
import { Button, Flex, Slider, Typography } from 'antd'
import { useTranslations } from 'next-intl'
import { useRef, useState } from 'react'
import AvatarEditor from 'react-avatar-editor'

const CropperModal = ({
  openImageUpload,
  setOpenImageUpload,
  setPreview,
  src,
  mutateUpdateAccount,
  isLoadingUpdateAccount,
  onRefresh,
  setSrc,
  isEdit,
  setIsEdit,
}: any) => {
  const cropRef = useRef<AvatarEditor | null>(null)
  const [slideValue, setSlideValue] = useState(10)
  const t = useTranslations()
  const [isLoading, _setIsLoading] = useState(false)
  const { compress, isCompressing } = useImageCompression()

  const handleSave = async () => {
    if (cropRef.current) {
      const dataUrl = cropRef.current.getImage()?.toDataURL()
      const result = await fetch(dataUrl)
      const blob = await result.blob()
      setPreview(URL.createObjectURL(blob))

      if (!blob) {
        return
      }

      const file = new File([blob], 'image.jpg', { type: 'image/jpeg' })

      const compressed = await compress(file, { height: 48, width: 48 })

      if (!compressed || !compressed?.resizedFile) {
        return
      }

      const formData = new FormData()
      formData.append('avatar', compressed.compressedFile)

      formData.append('resized_avatar', compressed.resizedFile)

      mutateUpdateAccount(formData)

      setSlideValue(10)
    }
  }

  return (
    <CustomModal
      width={566}
      open={openImageUpload}
      onOk={() => {
        setSrc(null)
        setIsEdit(false)
        setSlideValue(10)
        setOpenImageUpload(false)
      }}
      onCancel={() => {
        setSrc(null)
        setIsEdit(false)
        setSlideValue(10)
        setOpenImageUpload(false)
      }}
      showCloseIcon={true}
    >
      <Flex vertical className="w-full">
        <Flex className="flex-col items-center">
          <Flex className="w-fit items-center justify-center">
            <Flex className="border-1 h-[300px] w-[300px] overflow-hidden rounded-2xl border-solid border-black">
              <AvatarEditor
                ref={cropRef}
                image={src}
                crossOrigin="anonymous"
                style={{ width: '100%', height: '100%' }}
                border={0}
                borderRadius={150}
                color={[0, 0, 0, 0.72]}
                scale={slideValue / 10}
                rotate={0}
              />
            </Flex>
          </Flex>

          <Flex className="my-4 w-[300px] items-center gap-5">
            <Button
              aria-label="close cropper modal"
              className="svgButton"
              style={{
                width: 20,
                minWidth: 20,
                height: 20,
                padding: 0,
                color: '#232E40',
              }}
              type="link"
              onClick={() => {
                setSlideValue(slideValue - 20)
              }}
            >
              <MinusCircleOutlined width={20} height={20} className="h-5 w-5" />
            </Button>

            <Slider
              min={10}
              max={50}
              style={{
                margin: '0 auto',
                width: '80%',
                color: '#B7BFD5',
              }}
              defaultValue={slideValue}
              value={slideValue}
              onChange={(e) => setSlideValue(e)}
            />

            <Button
              aria-label="add cropper modal"
              className="svgButton"
              style={{
                width: 20,
                minWidth: 20,
                height: 20,
                padding: 0,
                color: '#232E40',
              }}
              type="link"
              onClick={() => {
                setSlideValue(slideValue + 20)
              }}
            >
              <PlusCircleOutlined width={20} height={20} className="h-5 w-5" />
            </Button>
          </Flex>

          {!isEdit && (
            <Button
              type="link"
              onClick={onRefresh}
              className="group flex h-max items-center gap-2 p-0 text-[14px] font-medium leading-[160%] text-blue transition-colors hover:opacity-80"
            >
              <RefreshIcon className="transition-transform group-hover:rotate-180" />
              <span>{t('guides.change-photo')}</span>
            </Button>
          )}
        </Flex>

        <div className="text-center">
          <Typography.Title className="m-0 mb-[16px] p-0 text-center text-2xl">
            {isEdit ? t('guides.update-photo') : t('personal-information.photo-add')}
          </Typography.Title>
          <Typography.Text className="text-medium whitespace-pre-line leading-[140%] text-[#777E90]">
            {t('personal-information.limits-photo')}
          </Typography.Text>
        </div>

        <div className="mt-7 grid grid-cols-2 gap-8">
          <Button
            aria-label={t('buttons.cancel')}
            className="h-[58px] rounded-2xl border-0 bg-[#F8F8FA] font-medium text-primary-dark shadow-none"
            onClick={() => {
              setSrc(null)
              setIsEdit(false)
              setSlideValue(10)
              setOpenImageUpload(false)
            }}
          >
            {t('buttons.cancel')}
          </Button>
          <Button
            aria-label={t('buttons.save')}
            type="primary"
            className="h-[58px] rounded-2xl shadow-none"
            onClick={() => {
              handleSave()
            }}
            loading={isLoadingUpdateAccount || isLoading || isCompressing}
          >
            {t('buttons.save')}
          </Button>
        </div>
      </Flex>
    </CustomModal>
  )
}

export default CropperModal
