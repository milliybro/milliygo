import BlurImage from '@/components/common/BlurImage'
import ArrowLeftIcon from '@/components/icons/arrow-left'
import SendIcon from '@/components/icons/send-icon'
import {
  getMessageHistory,
  getMessageHistoryDetail,
  getOldConversations,
  sendMessage,
} from '@/features/Support/api'
import { Button, Divider, Empty, Flex, Image, Input, Spin, Typography } from 'antd'
import { getCookie } from 'cookies-next'
import dayjs from 'dayjs'
import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'
import PageHeader from '../../PageHeader'

export default function DashboardObjectChatting({ queryId }: { queryId: string }) {
  const [selectedChat, setSelectedChat] = useState<number | null>()
  const [messages, setMessages] = useState<any>([])
  const [conversations, setConversations] = useState<any>([])
  const t = useTranslations()
  const [userInfo, setUserInfo] = useState<any>({})
  const [inputText, setInputText] = useState('')

  useEffect(() => {
    const dataUser = JSON.parse((getCookie('userInfo') as string) || '{}')
    setUserInfo(dataUser)
  }, [])

  const { refetch, isLoading: conversationsLoader } = useQuery({
    queryKey: ['conversations'],
    queryFn: async () => {
      const res: any = await getOldConversations({
        object_id: queryId,
      })
      if (res) {
        setConversations(res.results)
      }
      return res
    },
  })

  const { refetch: historyDetail, data } = useQuery({
    queryKey: ['historyDetail'],
    queryFn: async () => {
      const res: any = await getMessageHistoryDetail({ id: selectedChat })
      return res
    },
    enabled: !!selectedChat,
  })

  const { refetch: history } = useQuery({
    queryKey: ['messages'],
    queryFn: async () => {
      const res: any = await getMessageHistory({ id: selectedChat!, order: '-created_at' })
      if (res) {
        historyDetail()
        setMessages(res.results)
      }
      return res
    },
    enabled: !!selectedChat,
  })

  const { mutate: sendMessageMutate, isPending: isSendingLoader } = useMutation({
    mutationFn: sendMessage,
    onSuccess: () => {
      refetch()
      history()
      setInputText('')
    },
  })

  useEffect(() => {
    if (data) {
      refetch()
    }
  }, [data, refetch])

  return (
    <Flex vertical gap={24}>
      {selectedChat ? (
        <Flex vertical gap={0}>
          <Flex className="grid grid-cols-3">
            <Flex>
              <Button
                aria-label="set selected chat"
                type="link"
                onClick={() => setSelectedChat(null)}
              >
                <ArrowLeftIcon />
              </Button>
            </Flex>

            {/* <Flex vertical gap={4} className="items-center">
              <Typography className="text-sm font-semibold">Aziza Matchanova</Typography>

              <Typography className="text-[#777E90] font-normal text-sm">
                {t('chatting.chatting-description')}
              </Typography>
            </Flex> */}

            <div />
          </Flex>

          <Divider className="mb-[24px] mt-4" />

          <Flex className="h-full w-full">
            <Flex vertical gap={24} className="h-full w-full">
              <Typography className="w-full text-center text-xs font-normal text-[#777E90]">
                {dayjs(messages?.[0]?.created_at).format('DD/MM/YYYY')}
              </Typography>

              {messages.map((message: any) =>
                userInfo?.id !== message.user.external_id ? (
                  <>
                    <Flex gap={4} className="w-full">
                      <Flex className="h-[32px] w-[32px]">
                        <BlurImage
                          src={`https://api.emehmon.xdevs.uz/media/${message.user.avatar}`}
                          className="h-full w-full object-cover"
                          height={310}
                          width={486}
                          alt="avatar"
                        />
                      </Flex>

                      <Flex
                        vertical
                        className="w-full gap-1 rounded-[6px] bg-[#F8F8FA] p-[4px_8px]"
                      >
                        <Typography className="text-sm font-semibold">
                          {message.user.username}
                        </Typography>

                        <Typography className="text-sm font-normal">{message.content}</Typography>

                        <Typography className="text-end text-xs text-[#777E90]">
                          {dayjs(message.create_at).format('HH:MM')}
                        </Typography>
                      </Flex>
                    </Flex>
                  </>
                ) : (
                  <>
                    <Flex className="w-full justify-end" gap={4}>
                      <Flex
                        vertical
                        className="w-full gap-1 rounded-[6px] bg-[#3276FF] p-[4px_8px]"
                      >
                        {/* <Typography className="font-semibold text-sm text-white">
                          Aziza Matchanova
                        </Typography> */}

                        <Typography className="text-sm font-normal text-white">
                          {message.content}
                        </Typography>

                        <Typography className="text-end text-xs text-white">
                          {dayjs(message.create_at).format('HH:MM')}
                        </Typography>
                      </Flex>

                      <Flex className="h-[32px] w-[32px]">
                        <BlurImage
                          src={`https://api.emehmon.xdevs.uz/media/${message.user.avatar}`}
                          className="h-full w-full object-cover"
                          height={310}
                          width={486}
                          alt="avatar"
                        />
                      </Flex>
                    </Flex>
                  </>
                )
              )}
            </Flex>
          </Flex>

          <Divider className="mb-[24px] mt-4" />

          <Flex>
            <Input
              placeholder={t('chatting.type')}
              className="rounded-0 border-0 bg-inherit"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              disabled={isSendingLoader}
            />

            <Button
              aria-label="set message mutate"
              type="link"
              loading={isSendingLoader}
              onClick={() => {
                sendMessageMutate({
                  content: inputText,
                  conversation: selectedChat,
                })
              }}
            >
              <SendIcon className="text-2xl" />
            </Button>
          </Flex>
        </Flex>
      ) : (
        <>
          <PageHeader
            title={t('chatting.chatting')}
            description={t('chatting.chatting-description-2')}
          />
          <Spin spinning={conversationsLoader}>
            {conversations.length > 0 ? (
              <Flex vertical>
                {conversations.map((conversation: any) => (
                  <>
                    <Flex
                      className="grid cursor-pointer grid-cols-[1fr_6fr_1fr] gap-4"
                      onClick={() => setSelectedChat(conversation.id)}
                    >
                      <Flex className="overflow-hidden rounded-full">
                        <Image
                          alt="avatar"
                          preview={false}
                          className="h-full w-full object-cover"
                          src={`https://api.emehmon.xdevs.uz/media/${conversation?.users?.[0]?.avatar}`}
                        />
                      </Flex>

                      <Flex vertical>
                        <Flex className="mb-[4px] items-center gap-[8px]">
                          <Typography className="text-base font-bold">
                            {conversation?.users?.[0]?.username}
                          </Typography>
                          {/* <Typography className="p-[4px_8px] text-[#B7BFD5] font-medium text-xs rounded bg-[#B7BFD51F]">
                                {t('chatting.new')}
                              </Typography> */}
                        </Flex>
                        <Typography className="text-sm font-normal text-[#777E90]">
                          {conversation.last_message.content}
                        </Typography>
                      </Flex>

                      <Flex vertical className="items-end gap-[14px]">
                        <Typography className="text-xs font-normal text-[#777E90]">
                          {dayjs(conversation.last_message.created_at).format('HH:MM')}
                        </Typography>

                        {conversation.unread_count > 0 && (
                          <span className="flex h-[20px] w-[20px] items-center justify-center rounded-full bg-[#3276FF] text-xs font-medium text-white">
                            {conversation.unread_count}
                          </span>
                        )}
                      </Flex>
                    </Flex>
                    <Divider className="my-4" />
                  </>
                ))}
              </Flex>
            ) : (
              <div>
                <div className="flex h-[200px] w-full items-center justify-center">
                  <Empty description={t('others.no-messages')} />
                </div>
              </div>
            )}
          </Spin>
        </>
      )}
    </Flex>
  )
}
