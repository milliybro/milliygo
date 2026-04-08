import requestTour from '@/utils/tourRequest'
import { ITourAgentOrder } from '../types'
import { QueryFunctionContext } from '@tanstack/react-query'
import { ListResponse } from '@/types'

export async function getTourAgentOrders(
  { signal }: QueryFunctionContext,
  params?: any
): Promise<ListResponse<ITourAgentOrder[]>> {
  return await requestTour({
    url: '/tourist/my-orders/',
    method: 'GET',
    params,
    signal,
  })
}
