import { twMerge } from 'tailwind-merge'
import { useTranslations } from 'next-intl'
import { CloseOutlined } from '@ant-design/icons'
import { App, Button, Tooltip, Typography, Upload } from 'antd'
import { useImageCompression } from '@/hooks/useImageCompression'
import ImageUploadIcon from '../icons/image-upload-icon'
import Image from 'next/image'
import { IFileUploadResponse } from '@/features/Account/tour-booking-item/types'

const MAX_SIZE_MB = 5
const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024

interface IProps {
  images?: IFileUploadResponse[]
  removeImage?: (_index: number) => void
  onUpload?: (_params: { file: File; thumbnail: File }) => void
  resizeOptions?: { height: number; width: number }
}

function ImageUploadGallery({ onUpload, images, removeImage, resizeOptions }: IProps) {
  const t = useTranslations()
  const { message } = App.useApp()

  const { compress, isCompressing } = useImageCompression({
    logResults: true,
    convertToWebP: true,
    showLoadingMessage: true,
  })

  const handleUpload = async (file: File) => {
    if (file.size > MAX_SIZE_BYTES) {
      message.error(t('all_tours.image_size_error', { size: MAX_SIZE_MB }))
      return Upload.LIST_IGNORE
    }

    if (!file.type.startsWith('image/')) {
      message.error(t('all_tours.image_error'))
      return Upload.LIST_IGNORE
    }

    const compressed = await compress(file, {
      height: resizeOptions?.height ?? 288,
      width: resizeOptions?.width ?? 288,
    })

    if (compressed?.compressedFile && compressed?.resizedFile) {
      onUpload?.({
        file: compressed.compressedFile,
        thumbnail: compressed.resizedFile,
      })
    }

    return Upload.LIST_IGNORE
  }

  return (
    <div className="flex flex-col gap-1">
      <Upload.Dragger
        className={twMerge('[&_.ant-upload-btn]:py-8', isCompressing && 'opacity-50')}
        showUploadList={false}
        beforeUpload={handleUpload}
        accept="image/*"
        disabled={isCompressing}
      >
        <ImageUploadIcon className="text-[32px] text-secondary/30" />
        <Typography.Title className="mb-1 mt-3 text-sm font-medium tracking-[0.5%]">
          {t('tours.select_or_drag')}
        </Typography.Title>
        <Typography.Paragraph className="m-0 text-sm leading-[100%] text-secondary">
          {t('tours.images_limit')}
        </Typography.Paragraph>
      </Upload.Dragger>
      {!!images?.length && (
        <div className="max-w-full overflow-x-auto py-2">
          <div className="flex items-center gap-4">
            {images.map((image, i) => (
              <div
                key={i}
                className="group relative block h-[100px] w-[100px] shrink-0 rounded-2xl transition-all"
              >
                <Tooltip title={t('buttons.delete')} color="#1F2937">
                  <Button
                    icon={
                      <CloseOutlined className="flex items-center justify-center text-[8px] text-[#777E90]" />
                    }
                    onClick={() => removeImage?.(i)}
                    className="absolute -right-2 -top-2 z-10 flex h-6 w-6 rounded-full border-[1.25px] border-white bg-[#D6D8DD] transition-all duration-200 hover:scale-110 hover:bg-[#C0C2C6]"
                  />
                </Tooltip>

                <Image
                  width={100}
                  height={100}
                  src={image.file}
                  alt={`Hotel image #${i}`}
                  className="block h-full w-full rounded-2xl object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default ImageUploadGallery
