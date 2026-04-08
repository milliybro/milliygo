import ArrowRightUpIcon from '@/components/icons/arrow-right-up'
import { getPlacementBooking } from '@/features/Account/api'
import { Button, Flex, Image, Typography } from 'antd'
import dayjs from 'dayjs'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'
import PageHeader from '../../PageHeader'
import PlacementBookingPopover from '../VerificationCompletion/PlacementBookingPopover'

export default function DashboardObjectBooking({ queryId }: { queryId: any }) {
  const { data: bookings = [] } = useQuery({
    queryKey: ['getBookingsByPlacement', queryId],
    queryFn: () => getPlacementBooking(queryId),
    refetchOnWindowFocus: false,
    select: (data) => data.results,
  })

  const t = useTranslations()
  const statuses = [
    {
      key: 'confirmed',
      id: 1,
      title: t('booking.status.confirmed'),
      color: '#4DD2821F',
      text: '#4DD282',
    },
    {
      key: 'unknown',
      id: 2,
      title: t('booking.status.unknown'),
      color: '#FFC1071F',
      text: '#000',
    },
    {
      key: 'cancelled',
      id: 3,
      title: t('booking.status.cancelled'),
      color: '#FF4E4E1F',
      text: '#FF4E4E',
    },
    {
      key: 'done',
      id: 4,
      title: t('booking.status.done'),
      color: '#f2f2f2',
      text: '#333',
    },
  ]

  const now = new Date()
  return (
    <Flex vertical gap={24}>
      <PageHeader title={t('booking.title')} description={t('booking.description')} />

      <Flex vertical gap={24}>
        {bookings?.map((item: any) => (
          <Flex key={item.id}>
            <Flex className="grid grid-cols-[1fr_4fr_3fr] gap-4">
              <Image
                alt="lorem"
                className="h-full w-full rounded-full object-cover"
                src={
                  item?.user?.avatar ||
                  'https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png'
                }
              />

              <Flex vertical className="justify-between">
                <Flex vertical>
                  <Flex className="flex items-center gap-2">
                    <Typography.Title level={5} className="m-0">
                      {item.first_name + ' ' + item.last_name}
                    </Typography.Title>

                    <Typography
                      className="rounded-xl px-[8px] py-[4px]"
                      style={{
                        backgroundColor:
                          item.end_date && new Date(item.end_date) < now
                            ? statuses.find((status) => status.id === 4)?.color
                            : statuses.find((status) => status.id)?.color || 'transparent',
                        color:
                          item.end_date && new Date(item.end_date) < now
                            ? statuses.find((status) => status.id === 4)?.text
                            : statuses.find((status) => status.id)?.text || '#000',
                      }}
                    >
                      <div className="w-max">
                        {item.end_date && new Date(item.end_date) < now
                          ? statuses.find((status) => status.id === 4)?.title
                          : statuses.find((status) => status.id)?.title}
                      </div>
                    </Typography>
                  </Flex>

                  <Typography className="h-[23px] overflow-hidden text-[#777E90]">
                    <Typography className="h-[23px] overflow-hidden text-[#777E90]">
                      {(() => {
                        const startDate = item.start_date ? new Date(item.start_date) : null
                        const endDate = item.end_date ? new Date(item.end_date) : null

                        if (
                          !startDate ||
                          !endDate ||
                          isNaN(startDate.getTime()) ||
                          isNaN(endDate.getTime())
                        ) {
                          return t('error.invalid-dates') // Noto'g'ri ma'lumot xabarini chiqarish
                        }

                        const nights = Math.ceil(
                          (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
                        )
                        const label = nights > 1 ? t('booking.night') : t('preferences.night')

                        return `${nights} ${label} • ${item.country?.name}`
                      })()}
                    </Typography>
                  </Typography>
                </Flex>
                <Link
                  href={`/account/properties/dashboard/booking/${item.id}?placementId=${queryId}`}
                  aria-label={`open ${item.id} route`}
                >
                  <Button
                    aria-label={t('my-properties.show-detailed')}
                    type="link"
                    className="m-0 flex w-max items-center p-0"
                  >
                    {t('my-properties.show-detailed')}
                    <ArrowRightUpIcon />
                  </Button>
                </Link>
              </Flex>

              <Flex className="h-max items-center justify-end gap-4">
                <Typography.Title level={5} className="m-0 h-max">
                  {dayjs(item.start_date).format('DD MMM YYYY') +
                    ' - ' +
                    dayjs(item.end_date).format('DD MMM YYYY')}
                </Typography.Title>

                <PlacementBookingPopover />
              </Flex>
            </Flex>
          </Flex>
        ))}
      </Flex>
    </Flex>
  )
}
