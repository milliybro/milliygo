import BlurImage from '@/components/common/BlurImage'
import DoubleCheckIcon from '@/components/icons/double-check'
import OneCheckIcon from '@/components/icons/one-check-icon'
import { IMessage } from '@/types'
import dayjs from 'dayjs'

interface IProps {
  message: IMessage
  index: number
  isLastMessage: boolean
  userInfo: any
  selectedConversation: any
  historyDetailData: any
  showDate?: boolean
}

const Message = ({
  message,
  index,
  isLastMessage,
  userInfo,
  selectedConversation,
  historyDetailData,
  showDate,
}: IProps) => {
  const messageDate = dayjs(message.created_at).format('DD/MM/YYYY')

  return (
    <div className="max-w-[850px] mb-6 notranslate" key={index}>
      {showDate && (
        <div className="date">
          <p className="text-xs font-normal text-[#777E90] text-center mb-[16px]">{messageDate}</p>
        </div>
      )}
      {userInfo?.id !== message?.user?.id ? (
        <div className="message-from flex gap-4 ml-2 mr-10">
          <div className="avatar w-[32px] h-[32px] min-w-[32px] overflow-hidden rounded-full">
            <BlurImage
              src={
                userInfo?.type === 1 && selectedConversation?.type === 'complaint'
                  ? '/logo.svg'
                  : `https://api.emehmon.xdevs.uz/media/${selectedConversation?.users?.[0]?.avatar}`
              }
              className="w-full h-full object-cover"
              height={310}
              width={500}
              alt="avatar"
            />
          </div>
          <div className="message rounded-tl-none bg-[#F8F8FA] p-2 rounded-[6px] w-full">
            <p className="font-semibold text-sm text-[#232E40]">{message.user.username}</p>
            {message.file && (
              <div className="flex items-center gap-4 mt-2">
                <BlurImage
                  src={`https://api.emehmon.xdevs.uz/media/${message.file}`}
                  width={100}
                  height={100}
                  alt="file"
                />
              </div>
            )}
            <p className="text-[#232E40] font-normal text-sm">{message?.content}</p>
            <p className="text-xs font-normal text-[#777E90] text-right">
              {dayjs(message.created_at).format('HH:mm')}
            </p>
          </div>
        </div>
      ) : (
        <div className="message-to flex justify-end gap-4 ml-10 mr-2">
          <div className="max-w-[300px] message bg-[#3276FF] p-2 rounded-[6px] rounded-tr-none w-full">
            {message.file && (
              <div className="flex items-center gap-4 mt-2">
                <BlurImage
                  src={`https://api.emehmon.xdevs.uz/media/${message?.file}`}
                  width={100}
                  height={100}
                  alt="file"
                />
              </div>
            )}
            <p className="text-white font-normal text-sm">{message?.content}</p>
            <p className="text-xs font-normal text-white text-right flex gap-1 justify-end">
              {dayjs(message.created_at).format('HH:mm')}
              {isLastMessage ? (
                message.created_at < historyDetailData?.last_read ? (
                  <DoubleCheckIcon className="text-sm" />
                ) : (
                  <OneCheckIcon className="text-[10px]" />
                )
              ) : (
                <OneCheckIcon className="text-[10px]" />
              )}
              {/* {isLastMessage ? (
                                    dayjs(message.created_at).isBefore(
                                      dayjs(historyDetailData?.last_read)
                                    ) ? (
                                      <DoubleCheckIcon className='text-sm' />
                                    ) : (
                                      <OneCheckIcon />
                                    )
                                  ) : (
                                    <DoubleCheckIcon className='text-sm' />
                                  )} */}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default Message
