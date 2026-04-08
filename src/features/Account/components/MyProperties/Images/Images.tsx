import CustomModal from '@/components/common/CModal'
import CameraIcon from '@/components/icons/camera-icon'
import CloseIcon from '@/components/icons/close'
import DeleteIcon from '@/components/icons/delete'
import InfoIcon from '@/components/icons/info-icon'
import RemoveIcon from '@/components/icons/remove.icon'
import PageHeader from '@/features/Account/components/PageHeader'
import { useImageCompression } from '@/hooks/useImageCompression'
import { EyeOutlined } from '@ant-design/icons'
import { Button, Flex, Image, Progress, Typography } from 'antd'
import { useTranslations } from 'next-intl'
import { ChangeEventHandler, useState } from 'react'
import { uploadFile } from '../api'

function Images({ form, setActiveTab }: { form: any; queryId: string; setActiveTab: any }) {
  const [progressPercents, _setProgressPercents] = useState<number>(20)
  const [isModalOpenDelete, setIsModalOpenDelete] = useState<boolean>(false)
  const [selectedToRemove, setSelectedToRemove] = useState<number>(0)
  const t = useTranslations()
  const { compress, isCompressing } = useImageCompression()

  const [suggestions, setSuggestions] = useState([
    {
      visible: true,
      title: t('my-properties.suggest6-title'),
      description: [t('my-properties.suggest6-text1')],
    },
  ])

  const handleSetMain = (indexParent: number) => {
    const newData = form.getValues('images').map((val: any, index: number) => {
      if (index === indexParent) {
        return {
          ...val,
          isMain: true,
        }
      } else {
        return {
          ...val,
          isMain: false,
        }
      }
    })
    form.setValue('images', newData)
  }

  const closeDeleteModal = (): void => {
    setIsModalOpenDelete(false)
  }

  const openDeleteModal = (): void => {
    setIsModalOpenDelete(true)
  }

  const addImage: ChangeEventHandler<HTMLInputElement> = async (e) => {
    const file = e.target.files?.[0]

    if (!file) return

    const compressed = await compress(file)

    if (!compressed) return

    const data = new FormData()

    data.append('file', compressed)

    uploadFile(data)
      .then((res) => {
        onChange(res?.msg)
      })
      .finally(() => {
        e.target.value = ''
      })
  }

  const onChange = (url: string) => {
    form.setValue('images', [
      ...form.watch('images'),
      {
        isMain: false,
        image: url,
      },
    ])
  }

  const handleClose = (index: number) => {
    setSuggestions((prevSuggestions) => {
      const updatedSuggestions = [...prevSuggestions]
      updatedSuggestions[index].visible = false
      return updatedSuggestions
    })
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  const deleteImage = (index: number) => {
    const newData = form.getValues('images').filter((val: any, i: number) => i !== index)
    form.setValue('images', newData)
  }

  const urlGenerator = (url: string) => {
    const prefix = 'https://api.emehmon.xdevs.uz/media/'

    if (url.includes(prefix)) {
      return url
    }

    return prefix + url
  }

  return (
    <Flex className="grid grid-cols-[2fr_1fr]" gap={24}>
      <Flex vertical gap={24}>
        <Flex vertical>
          <PageHeader title={t('my-properties.how-looks')} description="" />

          <Typography className="inline text-sm text-[#777E90]">
            {t('my-properties.how-looks-desc')}
          </Typography>
        </Flex>

        <Progress
          percent={progressPercents}
          showInfo={false}
          strokeColor="#4DD282"
          strokeWidth={4}
        />

        <Flex vertical gap={24}>
          <Flex vertical>
            <Flex vertical gap={24}>
              <Flex className="grid grid-cols-3" gap={24}>
                <Flex
                  vertical
                  className="items-center justify-center rounded-2xl bg-[#F8F8FA] py-[40px] hover:cursor-pointer"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='16' ry='16' stroke='%23B7BFD5FF' strokeWidth='2' stroke-dasharray='13%2c 10%2c 8%2c 16' stroke-dashoffset='35' strokeLinecap='square'/%3e%3c/svg%3e")`,
                  }}
                >
                  <label
                    htmlFor="imageUpload"
                    className="flex h-full w-full flex-col items-center justify-center rounded-2xl bg-[#F8F8FA] hover:cursor-pointer"
                  >
                    <CameraIcon className="text-[22px]" />
                    <Typography.Text className="mt-1">
                      {t('my-properties.upload-photo')}
                    </Typography.Text>
                    <input
                      id="imageUpload"
                      type="file"
                      accept="image/*"
                      onChange={addImage}
                      hidden
                      disabled={isCompressing}
                    />
                  </label>
                </Flex>

                {form
                  .watch('images')
                  ?.map((val: { isMain: boolean; id: number; image: string }, index: number) =>
                    val.isMain ? (
                      <Flex
                        key={val.id}
                        className="custom-object-image relative h-[120px] items-center justify-center rounded-2xl border-[1.5px] border-solid border-[#FFC107]"
                      >
                        <Typography.Text className="absolute top-[-10px] z-10 m-0 rounded-xl bg-[#FFC107] p-0 px-[8px] text-white">
                          {t('my-properties.main')}
                        </Typography.Text>
                        <Flex className="property-photos h-full w-full overflow-hidden rounded-2xl">
                          <Image
                            src={urlGenerator(val.image)}
                            alt="main-image"
                            preview={{
                              mask: (
                                <Flex
                                  gap={5}
                                  className="h-full w-full items-center justify-center bg-[#00000066]"
                                  style={{ borderRadius: '16px' }}
                                >
                                  <EyeOutlined />
                                  <Typography.Text className="text-white">
                                    {t('others.preview')}
                                  </Typography.Text>
                                </Flex>
                              ),
                            }}
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
                            }}
                          />
                        </Flex>
                      </Flex>
                    ) : (
                      <Flex
                        key={val.id}
                        className="custom-image-card custom-object-image relative z-0 h-[120px] items-center justify-center rounded-2xl"
                      >
                        <Flex
                          onClick={() => {
                            setSelectedToRemove(index)
                            openDeleteModal()
                          }}
                          className="set-main absolute right-[-11.5px] top-[-11.5px] z-10 h-[22px] w-[22px] items-center justify-center rounded-full border-[1.25px] border-solid border-white hover:cursor-pointer"
                        >
                          <RemoveIcon className="text-[22px]" />
                        </Flex>
                        <Flex
                          onClick={() => {
                            handleSetMain(index)
                          }}
                          className="set-main absolute left-0 top-0 z-10 h-full w-full items-center justify-center overflow-hidden rounded-2xl bg-[#00000066] text-white hover:cursor-pointer"
                        >
                          {t('my-properties.set-main')}
                        </Flex>

                        <Flex className="property-photos h-full w-full overflow-hidden rounded-2xl">
                          <Image
                            src={urlGenerator(val.image)}
                            alt="image"
                            preview={false}
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
                            }}
                          />
                        </Flex>
                      </Flex>
                    )
                  )}
              </Flex>

              <Flex>
                <Typography.Text>{t('my-properties.upload-photo-desc')}</Typography.Text>
              </Flex>
            </Flex>

            <Flex className="mt-4">
              <div className="grid w-full grid-cols-2 gap-8">
                <Button
                  aria-label={t('my-properties.prev')}
                  className="h-[58px] rounded-2xl bg-secondary-light/10 font-medium text-primary-dark shadow-none"
                  onClick={() => {
                    scrollToTop()
                    setActiveTab('main-information')
                  }}
                >
                  {t('my-properties.prev')}
                </Button>
                <Button
                  aria-label={t('my-properties.next')}
                  onClick={() => {
                    scrollToTop()
                    setActiveTab('schedule')
                  }}
                  type="primary"
                  className="h-[58px] rounded-2xl bg-[#3276FF] shadow-none hover:!bg-[#3276FF]/70"
                >
                  {t('my-properties.next')}
                </Button>
              </div>
            </Flex>
          </Flex>
        </Flex>
      </Flex>

      <CustomModal
        modalTitle={t('personal-information.delete-photo')}
        modalDesc={t('personal-information.delete-photo-text')}
        modalIcon={<DeleteIcon className="text-[40px]" />}
        width={615}
        open={isModalOpenDelete}
        onCancel={closeDeleteModal}
        onOk={closeDeleteModal}
      >
        <div className="grid grid-cols-2 gap-8">
          <Button
            aria-label={t('buttons.cancel')}
            className="h-[58px] rounded-2xl bg-secondary-light/10 font-medium text-primary-dark shadow-none"
            onClick={closeDeleteModal}
          >
            {t('buttons.cancel')}
          </Button>
          <Button
            aria-label={t('buttons.delete')}
            type="primary"
            className="h-[58px] rounded-2xl bg-[#FF4E4E] shadow-none hover:!bg-[#FF4E4E]/70"
            onClick={() => {
              deleteImage(selectedToRemove)
              closeDeleteModal()
            }}
          >
            {t('buttons.delete')}
          </Button>
        </div>
      </CustomModal>

      <Flex vertical gap={24}>
        {suggestions.map(
          (val, index) =>
            val.visible && (
              <Flex key={val.title} className="rounded-2xl bg-[#F8F8FA] p-[16px]" vertical>
                <Flex className="justify-between">
                  <InfoIcon className="text-[22px]" />
                  <Button aria-label="close images" type="text" onClick={() => handleClose(index)}>
                    <CloseIcon className="text-sm" />
                  </Button>
                </Flex>

                <Flex vertical>
                  <Typography.Title level={5}>{val.title}</Typography.Title>

                  {val.description.map((desc) => (
                    <Typography.Text key={desc}>{desc}</Typography.Text>
                  ))}
                </Flex>
              </Flex>
            )
        )}
      </Flex>
    </Flex>
  )
}

export default Images
