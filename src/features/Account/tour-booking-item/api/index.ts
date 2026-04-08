import requestTour from '@/utils/tourRequest'
import { QueryFunctionContext } from '@tanstack/react-query'
import { IFileUploadResponse, IOrderDetail } from '../types'

export async function getTourBooking(
  { signal }: QueryFunctionContext,
  tourId: string | number
): Promise<IOrderDetail> {
  return await requestTour({
    url: `/tourist/order/detail/${tourId}/`,
    method: 'GET',
    signal,
  })
}

export async function uploadFilesFiles(data: FormData): Promise<IFileUploadResponse> {
  return await requestTour({
    url: '/files/files/',
    method: 'post',
    data,
  })
}
