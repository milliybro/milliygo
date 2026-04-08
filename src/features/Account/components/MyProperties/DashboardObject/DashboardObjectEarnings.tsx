import { Button, Divider, Flex, Spin, Typography } from 'antd'
import React, { useEffect, useMemo } from 'react'
import PageHeader from '../../PageHeader'
import ArrowRightUpIcon from '@/components/icons/arrow-right-up'
import { useQuery } from '@tanstack/react-query'
import { getStatisticsPlacement } from '../api'
import { formatNumber } from '@/helpers/number-formatter'
import { useTranslations } from 'next-intl'

export default function DashboardObjectEarnings({ queryId }: { queryId: string }) {
  const { data: statistics = [], isLoading } = useQuery({
    queryKey: ['statistics', queryId],
    queryFn: () => getStatisticsPlacement(queryId),
    refetchOnWindowFocus: false,
  })

  const t = useTranslations()

  const total = useMemo(() => {
    let sum = 0
    statistics?.bookings?.forEach((item: any) => {
      sum += item.total
    })
    return sum
  }, [statistics])

  const bookings = useMemo(() => {
    const newArray = Array.from({ length: 12 }, () => 0)

    statistics?.bookings?.forEach((entry: any) => {
      const { month, count } = entry
      newArray[month - 1] = count
    })

    return newArray
  }, [])

  const chartOptions = useMemo(() => {
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
  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined' && document.getElementById('chart-id')) {
      import('apexcharts')
        .then(({ default: ApexCharts }) => {
          const chart = new ApexCharts(document.getElementById('chart-id'), chartOptions)
          chart.render()
        })
        .catch((error) => {
          console.error('Error importing ApexCharts:', error)
        })
    }
  }, [chartOptions])

  return (
    <Flex vertical gap={24}>
      <PageHeader title={t('earning.title')} description={t('earning.desc')} />

      <Spin size="large" spinning={isLoading}>
        <Flex vertical gap={24}>
          <Flex gap={24} className="grid grid-cols-2">
            <Flex vertical className="rounded-2xl bg-[#F8F8FA] p-[16px_32px]">
              <Typography className="text-sm font-normal text-[#777E90]">
                {t('earning.total-earnings')}
              </Typography>

              <Typography className="mb-[16px] mt-[8px] text-xl font-semibold text-[#232E40]">
                {formatNumber(total)} UZS
              </Typography>

              <Button
                aria-label={t('earning.send-to-card')}
                type="link"
                className="flex h-max w-max items-center p-0"
              >
                {t('earning.send-to-card')}
                <ArrowRightUpIcon />
              </Button>
            </Flex>

            <Flex vertical className="rounded-2xl bg-[#F8F8FA] p-[16px_32px]">
              <Typography className="text-sm font-normal text-[#777E90]">
                {t('earning.balance')}
              </Typography>

              <Typography className="mb-[16px] mt-[8px] text-xl font-semibold text-[#232E40]">
                8 930 000 UZS
              </Typography>

              <Button
                aria-label={t('earning.withdraw')}
                type="link"
                className="flex h-max w-max items-center p-0"
              >
                {t('earning.withdraw')}
                <ArrowRightUpIcon />
              </Button>
            </Flex>
          </Flex>

          <Flex vertical gap={16}>
            <Typography className="text-lg font-semibold text-[#232E40]">
              {t('earning.earnings-by-month')}
            </Typography>

            <div id="chart-id" />
          </Flex>

          <Flex vertical className="rounded-2xl border p-[16px]">
            <Typography className="mb-[24px] text-lg font-semibold text-[#232E40]">
              {t('earning.policy-earnings')}
            </Typography>

            <Typography className="text-base font-normal text-[#232E40]">
              {t('earning.policy-earnings-desc')}
            </Typography>

            <Button
              aria-label={t('my-properties.more')}
              className="mt-[16px] h-max w-max p-0"
              type="link"
            >
              {t('my-properties.more')}
              <ArrowRightUpIcon />
            </Button>

            <Divider className="my-[16px]" />

            <Flex>
              <Typography className="flex items-center text-base font-medium text-[#777E90]">
                {t('earning.comission')}{' '}
                <strong className="text-lg font-semibold text-[#232E40]"> 15%</strong>
              </Typography>
            </Flex>
          </Flex>
        </Flex>
      </Spin>
    </Flex>
  )
}
