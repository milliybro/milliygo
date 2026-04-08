import AccountMainLayout from '@/components/Layouts/Account/AcountMainLayout'
import BlurImage from '@/components/common/BlurImage'
import FileIcon from '@/components/icons/file-icon'
import NotificationIcon from '@/components/icons/notification'
import SendIcon from '@/components/icons/send-icon'
import { getPlacementById } from '@/features/HotelsItem/api'
import {
  getMessageHistory,
  getMessageHistoryDetail,
  getOldConversations,
  sendMessage,
} from '@/features/Support/api'
import { useImageCompression } from '@/hooks/useImageCompression'
import useWebSocket from '@/hooks/useWebsocket'
import { IConversation, IMessage, ListResponse } from '@/types'
import { ArrowLeftOutlined, CloseOutlined } from '@ant-design/icons'
import { Button, Divider, Input, Spin, Typography } from 'antd'
import { getCookie } from 'cookies-next'
import dayjs from 'dayjs'
import { useTranslations } from 'next-intl'
import queryString from 'query-string'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query'
import PageHeader from '../components/PageHeader'
import Message from './components/Message'

const TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzUzMDA0MzY1LCJpYXQiOjE3MzE0MDQzNjUsImp0aSI6IjI0Yzk3NWVhMWMzYjRjMWNhZDZiZTk2OTI0YzBmYjYzIiwidXNlcl9pZCI6MX0.xjbItyKCCu_l6GqBKlxA5dCpWbJiDuGrPx3QXNcfQKo'

function ComplaintsItems() {
  const t = useTranslations()
  const [selectedChat, setSelectedChat] = useState<any>(null)
  const [conversations, setConversations] = useState<IConversation[]>([])
  const [selectedConversation, setSelectedConversation] = useState<any>(null)
  const [userInformation, setUserInfo] = useState<any | null>(null)
  const [inputText, setInputText] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [notifications, _setNotifications] = useState<any>([])
  const [messages, setMessages] = useState<IMessage[]>([])
  const [wsMessages, setWsMessages] = useState<IMessage[]>([])

  const chatBodyRef = useRef<HTMLDivElement | null>(null)
  const lastMessageRef = useRef<HTMLDivElement | null>(null)

  const observerRef = useRef<IntersectionObserver | null>(null)

  const { compress, isCompressing } = useImageCompression()

  useEffect(() => {
    const dataUser = JSON.parse((getCookie('userInfo') as string) || '{}')
    setUserInfo(dataUser)
  }, [])

  const getLocaleFromCookie = () => {
    const match = document.cookie.match(/locale=([^;]+)/)
    let locale = match ? match[1] : 'en'
    if (locale === 'uz') locale = 'uz-latn'
    return locale
  }

  const formatMessageDate = (createdAt: any) => {
    const locale = getLocaleFromCookie()
    const messageDate = dayjs(createdAt).locale(locale)

    if (messageDate.isToday()) {
      return messageDate.format('HH:mm')
    } else {
      return messageDate.format('DD MMMM')
    }
  }

  const [open, setOpen] = useState(false)

  useEffect(() => {
    setOpen(true)
  }, [])

  const { initializeWebSocket, closeWebSocket, webSocket } = useWebSocket()

  useEffect(() => {
    if (selectedChat && !webSocket) {
      initializeWebSocket('complaint', TOKEN, selectedChat)
    } else {
      setFile(null)
      setMessages([])
      setWsMessages([])
      closeWebSocket()
    }
  }, [selectedChat])

  useEffect(() => {
    if (webSocket !== null) {
      webSocket.onmessage = (event) => {
        const data = JSON.parse(event.data)
        if (data.type === 'new_complaint_message') {
          setWsMessages((prev) => [...prev, data.message])
        }
      }
    }

    return () => {
      webSocket?.close()
    }
  }, [webSocket])

  useEffect(() => {
    notifications.forEach((element: any) => {
      if (
        conversations.find((item: any) => item.id === JSON.parse(element.message).conversation.id)
      ) {
        setConversations((prev: any) => {
          return prev.map((item: any) => {
            if (item.id === JSON.parse(element.message).conversation.id) {
              return {
                ...item,
                last_message: JSON.parse(element.message).message.content,
              }
            } else {
              return item
            }
          })
        })
      } else {
        setConversations((prev: any) => {
          return [
            {
              ...JSON.parse(element.message).conversation,
              last_message: JSON.parse(element.message).message.content,
              unread_count: 1,
            },
            ...prev,
          ]
        })
      }
    })
  }, [notifications])

  const { isLoading: conversationsLoader, data: conversationsData } = useQuery({
    queryKey: ['conversations'],
    queryFn: async () => {
      const res = await getOldConversations({})
      if (res) {
        setConversations(res.results)
      }

      const mutatedResults = await Promise.all(
        res.results.map(async (item) => {
          const placement = await getPlacementById(item.object_id)
          return { ...item, placement }
        })
      )

      return { ...res, results: mutatedResults }
    },
    enabled: open,
  })

  const { data: historyDetailData, isLoading: isDetailsLoading } = useQuery({
    queryKey: ['historyDetail', selectedChat],
    queryFn: async () => {
      const res: any = await getMessageHistoryDetail({ id: selectedChat })
      return res
    },
    enabled: !!selectedChat,
  })

  const {
    fetchNextPage,
    isLoading: isMessageLoading,
    hasNextPage,
    data: messagesData,
  } = useInfiniteQuery<ListResponse<IMessage[]>>({
    queryKey: ['messages', selectedChat],
    queryFn: ({ pageParam }) => {
      return getMessageHistory({
        pageParam: pageParam as number,
        id: selectedChat,
        order: '-created_at',
      })
    },
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => {
      if (!lastPage.next) return undefined
      const params = queryString.parse(lastPage.next)
      return params.page
    },
    enabled: !!selectedChat,
  })

  useEffect(() => {
    if (messagesData) {
      setMessages(messagesData.pages.flatMap((page) => page.results))
    }
  }, [messagesData])

  const setLastMessageRef = useCallback((node: HTMLDivElement | null) => {
    if (lastMessageRef.current) {
      observerRef.current?.unobserve(lastMessageRef.current)
    }

    if (node) {
      observerRef.current?.observe(node)
    }

    lastMessageRef.current = node
  }, [])

  const { mutate: sendMessageMutate, isPending: isSendingLoader } = useMutation({
    mutationFn: ({ content, conversation }: { content: string; conversation: number }) => {
      const formData = new FormData()
      formData.append('content', content)
      formData.append('conversation', conversation.toString())
      if (file) {
        formData.append('file', file)
      }
      return sendMessage(formData)
    },
    onSuccess: () => {
      setInputText('')
      setFile(null)
    },
  })

  const onClickInput = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*'
    input.onchange = async (e) => {
      const uploadedFile = (e.target as HTMLInputElement).files?.[0]
      if (!uploadedFile) {
        return
      }
      const compressed = await compress(uploadedFile)

      if (!compressed) {
        return
      }

      setFile(compressed)
    }
    input.click()
  }

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        const [entry] = entries

        if (entry.isIntersecting) {
          fetchNextPage()
        }
      },
      {
        threshold: 1,
      }
    )
  }, [])

  useEffect(() => {
    const authStateString = localStorage.getItem('authState')
    const authState = authStateString ? JSON.parse(authStateString) : null
    setUserInfo(authState?.userInfo || null)
  }, [])

  useEffect(() => {
    const container = chatBodyRef.current
    if (container) {
      container.scrollTop = container.scrollHeight - container.clientHeight
    }
  }, [])

  const handleKeyDown = (event: any) => {
    if (event.key === 'Enter') {
      sendMessageMutate({
        content: inputText,
        conversation: selectedChat,
      })
    }
  }

  return (
    <div>
      <AccountMainLayout
        breadCrumbItems={[
          {
            title: t('preferences.main'),
            href: '/',
          },
          {
            title: t('others.saved'),
          },
        ]}
      >
        <div className="h-full">
          {selectedChat ? (
            <div className="flex h-full flex-col">
              <div className="bg-[#FFF]">
                <div className="relative top-0 w-full">
                  <Button
                    aria-label="complaints previous"
                    onClick={() => setSelectedChat(null)}
                    className="absolute left-[20px] top-[15px] text-[#232E40]"
                    type="link"
                  >
                    <ArrowLeftOutlined
                      style={{
                        fontSize: '18px',
                      }}
                    />
                  </Button>

                  <div className="title flex w-full flex-col items-center px-12 py-4">
                    <h4 className="mb-[4px] text-sm font-semibold text-[#232E40]">
                      {/* {selectedUser?.users[0]?.username
                        ? selectedUser?.users[0]?.username
                        : 'unknown user'} */}
                      {userInformation?.type !== 3 && selectedConversation?.type === 'support'
                        ? 'Milliy Turizm'
                        : userInformation?.type !== 2 && selectedConversation?.type === 'complaint'
                          ? t('buttons.complain')
                          : selectedConversation?.users?.[0]?.username}
                    </h4>
                    <p className="text-xs font-normal text-[#777E90]">
                      {selectedConversation?.type === 'complaint' ||
                      selectedConversation?.type === 'support' ? (
                        <span className="rounded-[4px] bg-[#B7BFD51F] px-2 py-1 text-xs font-medium text-[#B7BFD5]">
                          {t(`messeges-type.${selectedConversation?.type}`)}
                        </span>
                      ) : (
                        <span>
                          {t('chatting.chatting-description')}{' '}
                          {formatMessageDate(selectedConversation?.last_message?.created_at)}{' '}
                        </span>
                      )}
                    </p>
                  </div>
                </div>
                <Divider className="m-0" />
              </div>
              <Spin spinning={isDetailsLoading || isMessageLoading}>
                <div className="mt-[80px] flex h-[500px] max-h-[500px] flex-col">
                  <div className="flex h-full w-full flex-col-reverse overflow-y-auto">
                    {[...messages, ...wsMessages]
                      ?.sort((a, b) => dayjs(b.created_at).diff(dayjs(a.created_at)))
                      ?.map((message, index, m) => {
                        const currentDate = dayjs(message.created_at).format('DD/MM/YYYY')
                        const previousDate = dayjs(m[index - 1]?.created_at).format('DD/MM/YYYY')
                        const showDate = currentDate !== previousDate
                        if (index === messages.length - 1) {
                          return (
                            <div key={index} ref={setLastMessageRef}>
                              <Message
                                index={index}
                                isLastMessage={index === messages.length - 1}
                                message={message}
                                userInfo={userInformation}
                                selectedConversation={selectedConversation}
                                historyDetailData={historyDetailData}
                                showDate={showDate}
                              />
                            </div>
                          )
                        }
                        return (
                          <Message
                            index={index}
                            isLastMessage={index === messages.length - 1}
                            message={message}
                            userInfo={userInformation}
                            selectedConversation={selectedConversation}
                            historyDetailData={historyDetailData}
                            key={index}
                            showDate={showDate}
                          />
                        )
                      })}
                    {!hasNextPage && !isMessageLoading && (
                      <div className="text-center text-slate-500">-</div>
                    )}
                  </div>
                </div>
              </Spin>

              <div className="mt-auto w-full border-t bg-[#FFF] px-[24px] py-[22px]">
                {file && (
                  <div className="flex h-[50px] w-[150px] overflow-hidden rounded-md">
                    <Button type="link" aria-label="close complaints">
                      <CloseOutlined
                        onClick={() => {
                          setFile(null)
                        }}
                      />
                    </Button>
                    <BlurImage
                      src={URL.createObjectURL(file)}
                      width={150}
                      height={50}
                      className="h-full w-full object-cover"
                      alt="file"
                    />
                  </div>
                )}
                <div className={`typer flex w-full items-center ${file ? 'mt-[22px]' : ''}`}>
                  <Button
                    type="link"
                    className="px-2"
                    onClick={onClickInput}
                    aria-label="get complaints file"
                    loading={isCompressing}
                  >
                    <FileIcon className="text-2xl" />
                  </Button>
                  <Input
                    className="border-0 bg-[#FFF]"
                    placeholder={`${t('others.message')}...`}
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyDown={handleKeyDown}
                    disabled={isSendingLoader}
                  />
                  <Button
                    aria-label="send message"
                    type="link"
                    className="px-2"
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
                </div>
              </div>
            </div>
          ) : (
            <div className="chat-body flex flex-col gap-[24px]">
              <PageHeader
                title={t('account-complaints.title')}
                description={t('account-complaints.description')}
              />
              <div className="h-full overflow-y-auto">
                <Spin spinning={conversationsLoader}>
                  {conversations?.length > 0 ? (
                    <div className="chat-list">
                      {conversations
                        .filter((conversation) => conversation.type === 'complaint')
                        .map((conversation) => {
                          const matchedPlacement = conversationsData?.results?.find(
                            (con) => con.object_id === conversation.object_id
                          )?.placement

                          return (
                            <div
                              key={conversation.id}
                              className="cursor-pointer px-4"
                              onClick={() => {
                                setSelectedChat(conversation.id)
                                setSelectedConversation(conversation)
                              }}
                            >
                              <div className="chat-item flex items-center py-4">
                                <div className="chat-avatar flex h-[48px] w-[40px] min-w-[48px] items-center justify-center overflow-hidden rounded-[8px] bg-[#F1F2F6]">
                                  <BlurImage
                                    src={
                                      userInformation?.type !== 2 &&
                                      conversation?.type === 'complaint' &&
                                      conversation?.object_id !== null
                                        ? (matchedPlacement?.image ?? '/logo.svg')
                                        : userInformation?.type !== 3 &&
                                            conversation?.type === 'support'
                                          ? '/logo.svg'
                                          : `https://auth.emehmon.xdevs.uz/media/${
                                              conversation?.users?.[0]?.avatar ||
                                              'default-avatar.svg'
                                            }`
                                    }
                                    className="h-full w-full object-cover"
                                    height={48}
                                    width={48}
                                    alt="avatar"
                                  />
                                </div>
                                <div className="chat-content ml-4 flex w-full flex-col">
                                  <div className="mb-[4px] flex items-center gap-[10px]">
                                    <p className="text-sm font-semibold text-[#232E40]">
                                      {userInformation?.type !== 2 &&
                                      conversation?.type === 'complaint' &&
                                      conversation?.object_id !== null
                                        ? (matchedPlacement?.name ?? t('buttons.complain'))
                                        : userInformation?.type !== 3 &&
                                            conversation?.type === 'support'
                                          ? 'Milliy Turizm'
                                          : conversation?.users?.[0]?.username}
                                    </p>
                                    {/* <span className="text-[#B7BFD5] text-xs font-medium px-2 py-1 rounded-[4px] bg-[#B7BFD51F]">
                                    {t(`messeges-type.${conversation?.type}`)}
                                  </span> */}
                                  </div>
                                  <p className="text-xs font-normal text-[#777E90]">
                                    {conversation.last_message.content}
                                  </p>
                                </div>
                                <div className="flex h-[40px] w-[40px] flex-col items-end">
                                  <p className="mb-[14px] w-max text-xs font-normal text-[#777E90]">
                                    {formatMessageDate(conversation.last_message.created_at)}
                                  </p>
                                  {conversation.unread_count > 0 && (
                                    <span className="flex h-[20px] w-[20px] items-center justify-center rounded-full bg-[#3276FF] text-xs font-medium text-white">
                                      {conversation.unread_count}
                                    </span>
                                  )}
                                </div>
                              </div>
                              <Divider className="m-0" />
                            </div>
                          )
                        })}

                      <Divider className="m-0" />
                    </div>
                  ) : (
                    <div className="mt-[20%] flex h-full flex-col items-center justify-center">
                      <div className="flex h-[56px] w-[56px] items-center justify-center rounded-2xl bg-[#F8F8FA]">
                        <NotificationIcon className="text-2xl" />
                      </div>
                      <Typography className="mb-6 mt-6 max-w-[412px] text-center">
                        <Typography.Title level={3}>
                          {t('account-complaints.empty_title')}
                        </Typography.Title>
                        <Typography.Text>{t('account-complaints.empty-desc')}</Typography.Text>
                      </Typography>
                    </div>
                  )}
                </Spin>
              </div>
            </div>
          )}
        </div>
      </AccountMainLayout>
    </div>
  )
}

export default ComplaintsItems
