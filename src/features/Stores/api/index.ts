import request from '@/utils/axios'
import type { IPopularRegion } from '@/types'

export async function getPopularRegions(): Promise<IPopularRegion[]> {
  const res: IPopularRegion[] = await request({
    url: '/base/popular-regions/',
    method: 'get',
  })

  return res
}
