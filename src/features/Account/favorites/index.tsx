import AccountMainLayout from '@/components/Layouts/Account/AcountMainLayout'
import HotelIcon from '@/components/icons/hotel'
import { getFavoritesList } from '@/features/HotelsItem/api'
import { Button, Flex, Spin, Typography } from 'antd'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'
import FavoriteItem from '../components/Favorites/FavoriteItem'
import PageHeader from '../components/PageHeader'

function FavoritesItems() {
  const t = useTranslations()

  const {
    data: favorites,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['favorites'],
    queryFn: async () => {
      const res = await getFavoritesList()
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
          title: t('others.saved'),
        },
      ]}
    >
      <Spin spinning={isLoading}>
        {favorites && favorites?.results?.length > 0 ? (
          <Flex vertical gap={24}>
            <Flex vertical>
              <PageHeader
                title={t('others.saved-hotels')}
                description={t('others.saved-hotels-desc')}
              />

              <Flex vertical gap={16} className="mt-[16px]">
                {favorites?.results.map((item: any, i: number) => (
                  <FavoriteItem key={item.placement_slug + i} refetch={refetch} {...item} />
                ))}
              </Flex>
            </Flex>
          </Flex>
        ) : (
          <div className="mt-[20%] flex h-full flex-col items-center justify-center">
            <div className="flex h-[56px] w-[56px] items-center justify-center rounded-2xl bg-[#F8F8FA]">
              <HotelIcon className="text-2xl" />
            </div>
            <Typography className="mb-6 max-w-[412px] text-center">
              <Typography.Title level={3}>{t('others.no-saved-hotels')}</Typography.Title>
              <Typography.Text>{t('others.no-saved-hotels-desc')}</Typography.Text>
            </Typography>

            <Link href="/find-accommodation" aria-label={t('others.explore-hotels')}>
              <Button type="link" aria-label={t('others.explore-hotels')}>
                {t('others.explore-hotels')}
              </Button>
            </Link>
          </div>
        )}
      </Spin>
    </AccountMainLayout>
  )
}

export default FavoritesItems
