import BookingIcon from '@/components/icons/booking-icon'
import FavoriteIcon from '@/components/icons/favorite-icon'
import ViewsIcon from '@/components/icons/views-icon'
import { Flex, Spin, Typography } from 'antd'
import { useEffect, useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import PageHeader from '../../PageHeader'
import { getStatisticsPlacement } from '../api'
import { useTranslations } from 'next-intl'

export default function DashboardObjectAnalytics({
  placement,
  queryId,
}: {
  placement: any
  queryId: string
}) {
  const t = useTranslations()
  const { data: statistics, isLoading } = useQuery({
    queryKey: ['statistics', queryId],
    queryFn: () => getStatisticsPlacement(queryId),
    refetchOnWindowFocus: false,
  })

  const views = useMemo(() => {
    const newArray = Array.from({ length: 12 }, () => 0)

    statistics?.views?.forEach((entry: any) => {
      const { month, total_views } = entry
      newArray[month - 1] = total_views
    })

    return newArray
  }, [])

  const bookings = useMemo(() => {
    const newArray = Array.from({ length: 12 }, () => 0)

    statistics?.bookings?.forEach((entry: any) => {
      const { month, count } = entry
      newArray[month - 1] = count
    })

    return newArray
  }, [statistics])

  const chartOptionsViews = useMemo(() => {
    return {
      chart: {
        height: 350,
        type: 'area',
        toolbar: {
          show: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'smooth',
      },
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.7,
          opacityTo: 0.9,
          stops: [0, 90, 100],
        },
      },
      xaxis: {
        categories: [
          t('months.january'),
          t('months.february'),
          t('months.march'),
          t('months.april'),
          t('months.may'),
          t('months.june'),
          t('months.july'),
          t('months.august'),
          t('months.september'),
          t('months.october'),
          t('months.november'),
          t('months.december'),
        ],
      },
      series: [
        {
          data: views,
        },
      ],
    }
  }, [views])

  const chartOptionsBookings = useMemo(() => {
    return {
      chart: {
        height: 350,
        type: 'area',
        toolbar: {
          show: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'smooth',
      },
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.7,
          opacityTo: 0.9,
          stops: [0, 90, 100],
        },
      },
      xaxis: {
        categories: [
          t('months.january'),
          t('months.february'),
          t('months.march'),
          t('months.april'),
          t('months.may'),
          t('months.june'),
          t('months.july'),
          t('months.august'),
          t('months.september'),
          t('months.october'),
          t('months.november'),
          t('months.december'),
        ],
      },
      series: [
        {
          data: bookings,
        },
      ],
    }
  }, [bookings])

  useEffect(() => {
    if (typeof window !== 'undefined' && document.getElementById('your-chart-id')) {
      import('apexcharts')
        .then(({ default: ApexCharts }) => {
          const chart = new ApexCharts(document.getElementById('your-chart-id'), chartOptionsViews)
          chart.render()
        })
        .catch((error) => {
          console.error('Error importing ApexCharts:', error)
        })
    }
  }, [chartOptionsViews])

  useEffect(() => {
    if (typeof window !== 'undefined' && document.getElementById('your-chart-id2')) {
      import('apexcharts')
        .then(({ default: ApexCharts }) => {
          const chart = new ApexCharts(
            document.getElementById('your-chart-id2'),
            chartOptionsBookings
          )
          chart.render()
        })
        .catch((error) => {
          console.error('Error importing ApexCharts:', error)
        })
    }
  }, [chartOptionsBookings])

  return (
    <Spin size="large" spinning={isLoading}>
      <Flex vertical gap={24}>
        <PageHeader
          title={t('analytics.analytics')}
          description={t('analytics.analytics-description')}
        />
        <Flex vertical gap={24}>
          <Flex className="grid grid-cols-3 gap-[24px]">
            <Flex vertical className="rounded-2xl bg-[#F8F8FA] p-[16px_32px]">
              <Typography className="text-[#777E90]">{t('analytics.analytics-views')}</Typography>

              <Typography className="mb-[16px] mt-[8px] text-xl font-semibold">
                {placement.views || 0}
              </Typography>

              <ViewsIcon className="text-[40px]" />
            </Flex>

            <Flex vertical className="rounded-2xl bg-[#F8F8FA] p-[16px_32px]">
              <Typography className="text-[#777E90]">
                {t('analytics.analytics-bookings')}
              </Typography>

              <Typography className="mb-[16px] mt-[8px] text-xl font-semibold">
                {placement.bookings_count || 0}
              </Typography>

              <BookingIcon className="text-[40px]" />
            </Flex>

            <Flex vertical className="rounded-2xl bg-[#F8F8FA] p-[16px_32px]">
              <Typography className="text-[#777E90]">
                {t('analytics.analytics-favorites')}
              </Typography>

              <Typography className="mb-[16px] mt-[8px] text-xl font-semibold">
                {placement.favorites_count || 0}
              </Typography>

              <FavoriteIcon className="text-[40px]" />
            </Flex>
          </Flex>

          <Typography className="text-lg font-semibold text-[#232E40]">
            {t('analytics.analytics-views-chart')}
          </Typography>

          <div id="your-chart-id" />

          <Typography className="text-lg font-semibold text-[#232E40]">
            {t('analytics.analytics-bookings-chart')}
          </Typography>

          <div id="your-chart-id2" />
        </Flex>
      </Flex>
    </Spin>
  )
}
