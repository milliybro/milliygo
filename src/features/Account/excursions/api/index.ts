import { ListResponse } from '@/types'
import { IExcursionOrder } from '../types'
import request from '@/utils/axios'

export async function getExcursionOrders(params: any): Promise<ListResponse<IExcursionOrder[]>> {
  const res: ListResponse<IExcursionOrder[]> = await request({
    url: '/gids/order/my_orders/',
    method: 'get',
    params,
  })

  return res
}
