import CustomModal from '@/components/common/CModal'
import AddCircle2Icon from '@/components/icons/add-circle'
import DeleteIcon from '@/components/icons/delete'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Button, Flex, Image, Typography, notification } from 'antd'
import { setCookie } from 'cookies-next'
import { useTranslations } from 'next-intl'
import { ChangeEventHandler, useCallback, useRef, useState, type ReactElement } from 'react'
import { useMutation } from '@tanstack/react-query'
import { updateAccountMe } from '../../api'
import AddImageModal from './add-image-modal'
import CropperModal from './cropper-modal'

export default function ProfileImage({ userInfo, setUserInfo, loginAction }: any): ReactElement {
  const t = useTranslations()
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [openImageUpload, setOpenImageUpload] = useState(false)
  const [src, setSrc] = useState<string | null>(null)
  const [isEdit, setIsEdit] = useState(false)
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false)
  const inputRef = useRef<HTMLInputElement | null>(null)

  const handleInputClick = (e: any) => {
    if (inputRef.current) {
      e.preventDefault()
      inputRef.current.click()
    }
  }

  const handleImgChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const files = e?.target?.files

    if (!files || !files?.[0]) return

    if ((files?.[0]?.size || 1) > 10 * 1024 * 1024) {
      notification.error({ message: t('personal-information.limit-error') })
      e.target.value = ''
      return
    }

    const url = URL.createObjectURL(files?.[0])
    setSrc(url)
    setOpenImageUpload(true)

    e.target.value = ''
  }

  const { mutate: mutateUpdateAccount, isPending: isLoadingUpdateAccount } = useMutation({
    mutationFn: updateAccountMe,
    onSuccess: (res) => {
      setOpenImageUpload(false)
      loginAction(res)
      setCookie('userInfo', res)
      setUserInfo(res)
      setIsModalOpenDelete(false)
    },
  })

  const handleAddImage = useCallback(() => setIsAddOpen((prev) => !prev), [])

  const handleEditImage = useCallback(async () => {
    setIsEdit(true)

    if (!userInfo?.avatar) return

    try {
      const res = await fetch(userInfo.avatar)
      const blob = await res.blob()

      const localUrl = URL.createObjectURL(blob)

      setSrc(localUrl)
      setOpenImageUpload(true)
    } catch (err) {
      console.error('Failed to load avatar for editing:', err)
    }
  }, [userInfo?.avatar])

  return (
    <Flex gap={16} align="center" className="mb-6">
      <Image
        className="h-[64px] w-[64px] rounded-full object-cover"
        src={`${userInfo?.avatar}`}
        alt="User avatar"
        fallback="/default-users.jpg"
      />

      <input type="file" accept="image/*" hidden ref={inputRef} onChange={handleImgChange} />

      {userInfo?.avatar === 'users/default.png' ||
      userInfo?.avatar === '/media/users/default.png' ||
      userInfo?.avatar === 'https://auth.emehmon.xdevs.uz/media/users/default.png' ||
      !userInfo?.avatar ? (
        <Flex vertical>
          <Typography.Text className="mb-3 text-sm leading-[100%] tracking-[2%] text-secondary">
            {t('personal-information.add-photo-text')}
          </Typography.Text>
          <Button
            aria-label={t('buttons.add')}
            className="flex h-max w-fit items-center px-0 text-sm font-medium leading-[160%]"
            type="link"
            onClick={handleAddImage}
          >
            <AddCircle2Icon /> {t('buttons.add')}
          </Button>
        </Flex>
      ) : (
        <Flex>
          <Flex vertical>
            <Typography.Text className="mb-3 text-sm leading-[100%] tracking-[2%] text-secondary">
              {t('personal-information.add-photo-text')}
            </Typography.Text>
            <Flex className="gap-2">
              <Button
                aria-label={t('buttons.edit')}
                className="flex h-max w-fit items-center px-0 text-sm font-medium leading-[160%]"
                type="link"
                onClick={handleEditImage}
              >
                <EditOutlined />
                {t('buttons.edit')}
              </Button>
              <Button
                danger
                aria-label={t('buttons.delete')}
                className="flex h-max w-fit items-center px-0 text-sm font-medium leading-[160%]"
                type="link"
                loading={isLoadingUpdateAccount}
                onClick={() => {
                  setIsModalOpenDelete(true)
                }}
              >
                <DeleteOutlined />
                {t('buttons.delete')}
              </Button>
            </Flex>
          </Flex>
        </Flex>
      )}

      <CropperModal
        openImageUpload={openImageUpload}
        setOpenImageUpload={setOpenImageUpload}
        src={src}
        mutateUpdateAccount={mutateUpdateAccount}
        isLoadingUpdateAccount={isLoadingUpdateAccount}
        onRefresh={handleInputClick}
        setSrc={setSrc}
        isEdit={isEdit}
        setIsEdit={setIsEdit}
      />

      <CustomModal
        modalTitle={t('personal-information.delete-photo')}
        modalDesc={t('personal-information.delete-photo-text')}
        modalIcon={<DeleteIcon className="text-[40px]" />}
        width={615}
        open={isModalOpenDelete}
        onCancel={() => setIsModalOpenDelete(false)}
        onOk={() => {
          setIsModalOpenDelete(false)
        }}
      >
        <div className="grid grid-cols-2 gap-8">
          <Button
            aria-label={t('buttons.cancel')}
            className="h-[58px] rounded-2xl bg-secondary-light/10 font-medium text-primary-dark shadow-none"
            onClick={() => setIsModalOpenDelete(false)}
          >
            {t('buttons.cancel')}
          </Button>
          <Button
            aria-label={t('buttons.delete')}
            type="primary"
            className="h-[58px] rounded-2xl bg-[#FF4E4E] shadow-none hover:!bg-[#FF4E4E]/70"
            onClick={() => {
              const formData = new FormData()
              formData.append('avatar', '')

              mutateUpdateAccount(formData)
            }}
            loading={isLoadingUpdateAccount}
          >
            {t('buttons.delete')}
          </Button>
        </div>
      </CustomModal>

      <AddImageModal isOpen={isAddOpen} onChange={handleAddImage} onClick={handleInputClick} />
    </Flex>
  )
}
