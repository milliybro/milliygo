import type {
  Currency,
  ICreateChat,
  ICreateTourPackageParams,
  IRequestedUserData,
  ISearchRegions,
  ITaxiSearch,
  ListResponse,
  Region,
  TourPackagesType,
  User,
} from '@/types'
import requestAuth from '@/utils/authRequest'
import request from '@/utils/axios'
import requestLocaleChat from '@/utils/requestSupport'

export async function getCurrencies(): Promise<Currency[]> {
  const res: Currency[] = await request({
    url: '/base/currencies/',
    method: 'get',
  })

  return res
}

export async function getRegions(params?: {
  search?: string
  country__iso_code2?: string
  page?: number
  page_size?: number
}): Promise<ListResponse<Region[]>> {
  const res: ListResponse<Region[]> = await request({
    url: '/regions/regions/',
    method: 'get',
    params,
  })

  return res
}

export async function searchRegions(params?: { search?: string }): Promise<ISearchRegions> {
  const res: ISearchRegions = await request({
    url: '/regions/search/',
    method: 'get',
    params,
  })

  return res
}

export async function createChatWithUser(data: {
  from_user: { external_id: number; username: string; last_name: string }
}): Promise<ICreateChat> {
  const res: ICreateChat = await requestLocaleChat({
    url: '/chats/chat/',
    method: 'post',
    data,
  })

  return res
}

export async function receiveUser(id: string, data: IRequestedUserData): Promise<ICreateChat> {
  const res: ICreateChat = await requestLocaleChat({
    url: `/chats/chat/${id}/receive_user_short_info/`,
    method: 'post',
    data,
  })

  return res
}

export async function createChat(): Promise<ICreateChat> {
  const res: ICreateChat = await requestLocaleChat({
    url: '/chats/chat/',
    method: 'post',
  })

  return res
}

export async function postTelegramUser(
  data: any
): Promise<{ access: string; refresh?: string; user: User }> {
  const res: any = await requestAuth({
    url: '/auth/user/telegram-token/',
    method: 'post',
    data,
  })
  return res
}

export async function createTourPackageBooking(requestId: string, data: any): Promise<any> {
  const res = await request({
    url: `/tour-packages/${requestId}/create-booking/`,
    method: 'post',
    data,
  })

  return res
}

export async function createTourPackages(data: TourPackagesType): Promise<any> {
  const res = await request({
    url: '/tour-packages/',
    method: 'post',
    data,
  })

  return res
}

export async function updateTourPackage(
  data: Partial<ICreateTourPackageParams>,
  id: number
): Promise<any> {
  const res = await request({
    url: `/tour_package/${id}/`,
    method: 'put',
    data,
  })

  return res
}

export async function getLocalRegions({
  params,
}: {
  params?: Record<string, string>
}): Promise<Region[]> {
  return await request({ url: '/regions/regions/local-regions/', method: 'get', params })
}

export async function getTaxiSearch(params: { address: string }): Promise<ITaxiSearch[]> {
  const res: ITaxiSearch[] = await request({
    url: `/integrations/millenium/preorder/search_address/`,
    method: 'get',
    params,
  })

  return res
}
