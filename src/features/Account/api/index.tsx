import {
  Country,
  IBooking,
  IBookingCode,
  IBookingCodeResponse,
  IBookingsDetail,
  IBookingVerification,
  IMe,
  IProperty,
  ListResponse,
} from '@/types'
import requestAuth from '@/utils/authRequest'
import request from '@/utils/axios'
import requestChat from '@/utils/requestChat'

export async function getAccountMe(): Promise<IMe> {
  const res: IMe = await requestAuth({
    url: `/auth/user/me/`,
    method: 'get',
  })

  return res
}

export async function updateAccountMe(data: any): Promise<IMe> {
  const res: IMe = await requestAuth({
    url: `account/users/update_profile/`,
    method: 'patch',
    data,
  })

  return res
}

export async function deleteMyAccount(id: number): Promise<void> {
  await requestAuth({
    url: `/account/users/${id}/`,
    method: 'delete',
  })
}

export async function updatePatchAccountMe(data: any): Promise<IMe> {
  const res: IMe = await requestAuth({
    url: `account/users/update_profile/`,
    method: 'patch',
    data,
  })

  return res
}

export async function getListCountries(params?: {
  search?: string
}): Promise<ListResponse<Country[]>> {
  const res: ListResponse<Country[]> = await requestAuth({
    url: '/regions/countries/',
    method: 'get',
    params: { page_size: 260, ...params },
  })

  return res
}

export async function getCountry(countryId: string): Promise<any> {
  const res = await requestAuth({
    url: 'regions/countries/' + countryId + '/',
    method: 'get',
  })

  return res
}

export async function getListCities(countryId: string): Promise<any> {
  const res = await request({
    url: `regions/regions/`,
    method: 'get',
    params: {
      country: countryId,
      country__iso_code2: 'UZ',
    },
  })

  return res
}

export async function getListDistricts(countryId: string): Promise<any> {
  const res = await request({
    url: `regions/districts/`,
    method: 'get',
    params: {
      region: countryId,
    },
  })

  return res
}

export async function getListCategoriesNotification(): Promise<any> {
  const res = await request({
    url: `base/notification-category`,
    method: 'get',
  })

  return res
}

export async function unsubscribeAllNotification(data: any): Promise<any> {
  const res = await requestAuth({
    url: '/account/me/unsubscribe/all-notif/',
    method: 'post',
    data,
  })

  return res
}

export async function getBookings(params: any): Promise<ListResponse<IBooking[]>> {
  const res: ListResponse<IBooking[]> = await request({
    url: '/bookings/bookings/?ordering=-start_date',
    method: 'get',
    params,
  })

  return res
}

export async function getBookingsItem(id: number): Promise<IBookingsDetail> {
  const res: IBookingsDetail = await request({
    url: `/bookings/bookings/${id}/`,
    method: 'get',
  })

  return res
}

export async function getPlacementBooking(id: number): Promise<IBookingsDetail> {
  const res: IBookingsDetail = await request({
    url: `/placements/owner-placement-list/${id}/bookings/`,
    method: 'get',
  })

  return res
}

export async function sendMessagePlacement(data: any): Promise<any> {
  const res = await request({
    url: '/chats/placement-messages/',
    method: 'post',
    data,
  })

  return res
}

export async function createConversation(data: any): Promise<any> {
  const res = await requestChat({
    url: '/chats/create-conversation/',
    method: 'post',
    data,
  })

  return res
}

export async function sendMessageToConversation(data: any): Promise<any> {
  const res = await requestChat({
    url: '/chats/create-message/',
    method: 'post',
    data,
  })

  return res
}

export async function getMyProperties(): Promise<ListResponse<IProperty[]>> {
  return await request({
    url: '/placements/owner-placement-list/',
    method: 'get',
  })
}

export async function getAccommodationGuests(params?: {
  page?: number
  birth_country?: number
  search?: string
}): Promise<ListResponse<any>> {
  return await request({
    url: '/accommodations/accommodation_guests/',
    method: 'get',
    params,
  })
}

export async function getFacilities(type: string): Promise<any> {
  const res = await request({
    url: `/placement_references/facility_categories/?facilities__placement_type__key=${type}`,
    method: 'get',
  })

  return res
}

export async function getRFacilities(type: string): Promise<any> {
  const res = await request({
    url: `/placement_references/r_facility_categories/?r_facilities__placement_type__key=${type}`,
    method: 'get',
  })

  return res
}

export async function getProhibitions(): Promise<any> {
  const res = await request({
    url: `/placement_references/prohibitions`,
    method: 'get',
  })

  return res
}

export async function newCreatePlacement(data: any): Promise<any> {
  const res = await request({
    url: '/placements/owner-placement-list/',
    method: 'post',
    data,
  })

  return res
}

export async function newUpdatePlacement(data: any): Promise<any> {
  const res = await request({
    url: `/placements/owner-placement-list/${data.id}/`,
    method: 'put',
    data,
  })

  return res
}

export async function cencelBooking(data: any): Promise<any> {
  const res = await request({
    url: `/bookings/bookings/${data.id}/cancel/`,
    method: 'patch',
    data,
  })

  return res
}

export async function getImagesPlacements(id: string): Promise<any> {
  const res = await request({
    url: `/placements/placement-images/?placement_id=${id}`,
    method: 'get',
  })

  return res
}

export async function getPaymentTypes(): Promise<any> {
  const res = await request({
    url: '/bookings/payment_types',
    method: 'get',
  })

  return res
}

export async function deleteProperty(id: any): Promise<any> {
  const res = await request({
    url: `/placements/owner-placement-list/${id}`,
    method: 'delete',
  })

  return res
}

export async function updateBooking(data: any): Promise<any> {
  const res = await request({
    url: `/bookings/bookings/${data.id}/`,
    method: 'put',
    data,
  })

  return res
}

export async function checkDateById(data: any): Promise<any> {
  const res = await request({
    url: `/bookings/bookings/${data.id}/check_dates/`,
    method: 'post',
    data: {
      start_date: data.start_date,
      end_date: data.end_date,
    },
  })

  return res
}

export async function sendVerificationCode(
  data: IBookingVerification
): Promise<IBookingCodeResponse> {
  const res: IBookingCodeResponse = await request({
    url: '/bookings/order-check/',
    method: 'post',
    data,
  })

  return res
}

export async function verifyEmailCode(data: IBookingCode): Promise<{ access_token: string }> {
  const res: { access_token: string } = await requestAuth({
    url: '/account/bookings/verify_code/',
    method: 'post',
    data,
  })

  return res
}

export async function getAviaOrders(): Promise<ListResponse<any>> {
  const res: ListResponse<any> = await request({
    url: '/avia/ticket_booking/',
    method: 'get',
  })

  return res
}

export async function getTaxiOrders(): Promise<ListResponse<any>> {
  const res: ListResponse<any> = await request({
    url: '/order-services/millenium/',
    method: 'get',
  })

  return res
}
