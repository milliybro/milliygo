import CBreadcrumb from '@/components/common/CBreadcrumb'
import ArrowLeftIcon from '@/components/icons/arrow-left'
import dayjs from 'dayjs'

import BankTaxesIcon from '@/components/icons/bank-taxes'
import CoinsDollarIcon from '@/components/icons/coins-dollar'
import GuestIcon from '@/components/icons/guest-icon'
import { formatNumber } from '@/helpers/number-formatter'
import useCurrencyStore from '@/store/currency'
import usePreferencesStore from '@/store/preferences'
import { Button, Card, Flex, Image, Typography } from 'antd'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useQuery } from '@tanstack/react-query'
import { getByidPlacement, getPlacementBookings } from '../components/MyProperties/api'

export default function PropertiesDashboardBooking({ queryId }: { queryId: string }) {
  const router = useRouter()
  const { query } = router
  const { placementId }: any = query

  const t = useTranslations()
  const { locale } = useRouter()

  const { currency } = useCurrencyStore((state) => state)
  const { preferences } = usePreferencesStore((store) => store)

  const { data: placement = {} } = useQuery({
    queryKey: ['getByIdPlacement', placementId],
    queryFn: () => getByidPlacement(placementId),
    refetchOnWindowFocus: false,
  })

  const { data: booking } = useQuery({
    queryKey: ['booking', queryId, placementId],
    queryFn: () => getPlacementBookings(queryId, placementId),
    refetchOnWindowFocus: false,
  })

  const today = new Date()
  const tomorrow = new Date(today)
  tomorrow.setDate(today.getDate() + 1)

  const startDate = booking?.start_date || today // Use booking.start_date or today's date
  const endDate = booking?.end_date || tomorrow // Use booking.end_date or tomorrow's date
  const difference = booking?.difference ?? (dayjs(endDate).diff(dayjs(startDate), 'day') || 1)

  const price = booking?.items?.reduce((total: any, item: any) => total + item.price, 0)
  const priceByDays = ((price || 0) / (currency?.rate || 1)) * (difference || 1)
  const AllPrice = ((placement?.min_price ?? 1) / (currency?.rate ?? 1)) * (difference ?? 1)

  const findNds = preferences?.find((val) => val.key === 'nds')
  const nds = findNds?.description ? Number(findNds?.description) : 1

  return (
    <div className="container">
      <CBreadcrumb
        items={[
          {
            title: t('preferences.main'),
            href: '/',
          },
          {
            title: t('my-properties.title'),
            href: '/account/properties',
          },
          {
            title: placement.name,
            href: `/account/properties/dashboard/${placement.id}/`,
          },
          {
            title: booking?.first_name + ' ' + booking?.last_name,
          },
        ]}
      />

      <Card
        variant="borderless"
        className="h-full min-h-[700px] overflow-hidden !rounded-[24px] !shadow-none"
        style={{ padding: 0 }}
      >
        <div className="grid grid-cols-3">
          <div className="col-span-2 flex flex-col gap-6">
            <Link
              href={`/account/properties/dashboard/${placement.id}/`}
              aria-label={`open ${placement.id} route`}
              className="flex items-center gap-3 text-[#232E40]"
            >
              <ArrowLeftIcon className="text-2xl" />
              <Button
                aria-label={t('my-properties.show-detailed')}
                type="link"
                className="m-0 flex w-max items-center p-0 text-[16px] font-[500] text-[#232E40]"
              >
                {t('booking.title')}
              </Button>
            </Link>
            <Typography.Title className="m-0 text-[18px] font-[600]">
              {t('booking.client-placement')}:
            </Typography.Title>
            <div className="flex gap-4">
              <Image
                alt="lorem"
                className="h-[64px] w-[64px] rounded-full object-cover"
                src={
                  booking?.user?.avatar ||
                  'https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png'
                }
              />
              <div className="flex flex-col gap-1">
                <Typography.Title className="m-0 text-[18px] font-[700]">
                  {booking?.first_name + ' ' + booking?.last_name}
                </Typography.Title>
                <Typography.Title className="m-0 text-[14px] font-[400] text-[#777E90]">
                  {booking?.country?.name}
                </Typography.Title>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <GuestIcon className="text-[22px]" />
              <div className="flex gap-1">
                <Typography.Title className="m-0 text-[16px] font-[500]">
                  {t('booking.qty-guest')}
                </Typography.Title>
                <Typography.Title className="m-0 text-[16px] font-[500] text-[#777E90]"></Typography.Title>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="col-span-2 flex flex-col gap-1">
                <Typography.Text className="text-sm font-medium text-secondary">
                  {t('booking.name-surname-placement')}:
                </Typography.Text>
                <Typography.Text className="text-base font-semibold text-primary-dark">
                  {booking?.first_name + ' ' + booking?.last_name}
                </Typography.Text>
              </div>
              <div className="flex flex-col gap-1">
                <Typography.Text className="text-sm font-medium text-secondary">
                  {t('booking.preferred-language')}:
                </Typography.Text>
                <Typography.Text className="text-base font-semibold text-primary-dark"></Typography.Text>
              </div>
              <div className="flex flex-col gap-1">
                <Typography.Text className="text-sm font-medium text-secondary">
                  {t('booking.booking-number')}:
                </Typography.Text>
                <Typography.Text className="text-base font-semibold text-primary-dark">
                  {booking?.id}
                </Typography.Text>
              </div>
              <div className="col-span-2 flex flex-col gap-1">
                <Typography.Text className="text-sm font-medium text-secondary">
                  {t('booking.comment-guest-placement')}:
                </Typography.Text>
                <Typography.Text className="text-base font-semibold text-primary-dark">
                  {booking?.message}
                </Typography.Text>
              </div>
            </div>
          </div>
          <div>
            <Typography.Title className="m-0 mb-2 font-semibold" level={4}>
              {t('booking.detail-your-booking')}
            </Typography.Title>
            <Flex vertical gap={16}>
              <div className="grid grid-cols-2">
                <Flex vertical className="pr-6">
                  <Typography.Text className="mb-1 text-sm">{t('user.check-in')}</Typography.Text>
                  <Typography.Text className="mb-1 text-base font-semibold">
                    {dayjs(startDate)
                      .locale(locale === 'uz' ? 'uz-latn' : locale || '')
                      .format('ddd, D MMM YYYY')}
                  </Typography.Text>
                  <Typography.Text className="text-sm text-secondary">
                    {t('user.dan', { time: booking?.checkin_start })}
                  </Typography.Text>
                </Flex>
                <Flex vertical className="border-l pl-6">
                  <Typography.Text className="mb-1 text-sm">{t('user.check-out')}</Typography.Text>
                  <Typography.Text className="mb-1 text-base font-semibold">
                    {dayjs(endDate)
                      .locale(locale === 'uz' ? 'uz-latn' : locale || '')
                      .format('ddd, D MMM YYYY')}
                  </Typography.Text>
                  <Typography.Text className="text-sm text-secondary">
                    {t('user.gacha', { time: booking?.checkout_end })}
                  </Typography.Text>
                </Flex>
              </div>
              <div className="flex flex-col gap-1">
                <Typography.Text className="text-sm font-medium text-secondary">
                  {t('user.difference')}
                </Typography.Text>
                <Typography.Text className="text-base font-semibold text-primary-dark">
                  {difference} {difference > 1 ? t('booking.night') : t('preferences.night')}
                </Typography.Text>
              </div>
            </Flex>
            <div className="mt-6">
              <Flex vertical>
                <Typography.Title className="m-0 mb-6 font-semibold leading-normal" level={4}>
                  {t('hotels.cost-of-living')}
                </Typography.Title>
                <Typography.Title className="notranslate m-0 mb-2 leading-[150%]" level={3}>
                  {formatNumber(placement?.type?.key === 'apartment' ? AllPrice : priceByDays)}{' '}
                  {currency?.short_name}
                </Typography.Title>
                {placement?.additional_price ? (
                  <>
                    <Typography.Text>{t('hotels.additional-fees')}</Typography.Text>
                    <Typography.Text className="notranslate mb-4">
                      {t('hotels.currency-property')} {formatNumber(placement.additional_price)}{' '}
                      {currency?.short_name}
                    </Typography.Text>
                  </>
                ) : null}
                <Flex vertical gap={16}>
                  <div className="rounded-lg bg-secondary-light p-4 text-secondary">
                    <Flex justify="start" align="flex-start" gap={8}>
                      <CoinsDollarIcon className="text-[22px]" />
                      <Typography.Text className="text-sm text-secondary">
                        {t('hotels.cost-of-living-description')}
                      </Typography.Text>
                    </Flex>
                  </div>
                  <div className="rounded-lg bg-secondary-light p-4 text-secondary">
                    <Flex justify="start" align="flex-start" gap={8}>
                      <BankTaxesIcon className="text-[22px]" />
                      <Flex vertical>
                        <Typography.Text className="text-sm text-secondary">
                          {t('hotels.cost-of-living-description-2')}
                        </Typography.Text>
                        <Flex>
                          <Typography.Text className="text-sm font-medium">
                            {formatNumber(
                              (placement?.type?.key === 'apartment'
                                ? placement?.min_price
                                : price || 0) / (currency?.rate || 1)
                            )}{' '}
                            {currency?.short_name} ×{' '}
                          </Typography.Text>
                          <Flex className="flex gap-1">
                            <Typography.Text className="notranslate text-sm font-medium">
                              {difference}
                            </Typography.Text>
                            <Typography.Text className="text-sm font-medium">
                              {t('hotels.days')}
                            </Typography.Text>
                          </Flex>
                        </Flex>
                      </Flex>
                    </Flex>
                  </div>
                  <div className="rounded-lg bg-secondary-light p-4 text-secondary">
                    <Flex justify="start" align="flex-start" gap={8}>
                      <BankTaxesIcon className="text-[22px]" />
                      <Flex vertical>
                        <Typography.Text className="text-sm text-secondary">
                          {t('hotels.cost-of-living-description-3')}
                        </Typography.Text>
                        <Flex>
                          <Typography.Text className="text-sm font-medium">
                            {nds}% {t('hotels.vat')} -{' '}
                          </Typography.Text>
                          <Typography.Text className="notranslate text-sm font-medium">
                            {formatNumber(
                              Number(
                                (
                                  ((placement?.type?.key === 'apartment' ? AllPrice : priceByDays) *
                                    (nds + 100)) /
                                    100 -
                                  (placement?.type?.key === 'apartment' ? AllPrice : priceByDays)
                                ).toFixed(2)
                              )
                            )}{' '}
                            {currency?.short_name}
                          </Typography.Text>
                        </Flex>
                      </Flex>
                    </Flex>
                  </div>
                </Flex>
              </Flex>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
