import AccountMainLayout from '@/components/Layouts/Account/AcountMainLayout'
import ArrowLeftIcon from '@/components/icons/arrow-left'
import CommentIcon from '@/components/icons/comment'
import { myReviewList } from '@/features/Support/api'
import { getItem } from '@/helpers/menu-get-item'
import { Flex, MenuProps, Spin, Typography } from 'antd'
import { useTranslations } from 'next-intl'
import { useQuery } from '@tanstack/react-query'
import PageHeader from '../components/PageHeader'
import ReviewItem from '../components/Reviews/ReviewItem'

function Reviews() {
  const t = useTranslations()

  let items: MenuProps['items'] = [
    getItem(
      t('buttons.all-reviews'),
      '/account/account-management',
      <ArrowLeftIcon className="text-lg" />
    ),
    getItem(t('others.my-reviews'), '/account/reviews', <CommentIcon className="text-2xl" />),
    getItem(
      t('others.object-reviews'),
      '/account/my-reviews',
      <CommentIcon className="text-2xl" />
    ),
  ]

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['notifications'],
    queryFn: async () => {
      const res: any = await myReviewList()
      return res
    },
  })

  return (
    <AccountMainLayout
      breadCrumbItems={[
        {
          title: t('preferences.main'),
          href: '/',
        },
        {
          title: t('reviews.title'),
          href: '',
        },
      ]}
      menuItems={items}
    >
      <Spin spinning={isLoading}>
        {data?.results?.length > 0 ? (
          <Flex vertical gap={24}>
            <Flex className="items-center justify-between">
              <PageHeader title={t('others.my-reviews')} description={t('others.no-reviews')} />
            </Flex>
            <div className="flex flex-col gap-[16px] divide-y divide-gray-200">
              {data?.results?.map((item: any) => (
                <ReviewItem key={item.id} item={item} refetch={refetch} />
              ))}
            </div>
          </Flex>
        ) : (
          <div className="mt-[20%] flex h-full flex-col items-center justify-center gap-6">
            <div className="flex h-[56px] w-[56px] items-center justify-center rounded-2xl bg-[#F8F8FA]">
              <CommentIcon className="text-2xl" />
            </div>
            <Typography className="mb-6 max-w-[412px] space-y-4 text-center">
              <Typography.Title level={3}>{t('others.here-reviews')}</Typography.Title>
              <Typography.Text>{t('others.no-reviews')}</Typography.Text>
            </Typography>
          </div>
        )}
      </Spin>
    </AccountMainLayout>
  )
}

export default Reviews
