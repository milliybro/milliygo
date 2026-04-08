import { IPlacementType, ListResponse } from '@/types'
import request from '@/utils/axios'

export async function getPlacementTypes(): Promise<ListResponse<IPlacementType[]>> {
  const res: ListResponse<IPlacementType[]> = await request({
    url: `/placement_references/placement_types/`,
    method: 'get',
  })

  return res
}

export async function getByidPlacement(id: string): Promise<any> {
  const res = await request({
    url: `/placements/owner-placement-list/${id}`,
    method: 'get',
  })

  return res
}

export async function getByidRoom(id: string): Promise<any> {
  const res = await request({
    url: `/placements/rooms/?placement__id=${id}`,
    method: 'get',
  })

  return res
}

export async function getStatisticsPlacement(id: string): Promise<any> {
  const res = await request({
    url: `placements/placement-statistics/${id}/`,
    method: 'get',
  })

  return res
}

export async function getPlacementBookings(id: string, placementId: string): Promise<any> {
  const res = await request({
    url: `/placements/owner-placement-list/${placementId}/bookings/${id}/`,
    method: 'get',
  })

  return res
}

export async function uploadFile(data: any): Promise<any> {
  const res = await request({
    url: '/placements/write-file/',
    method: 'post',
    data,
  })

  return res
}

export async function sendRejectReason(data: any): Promise<any> {
  const res = await request({
    url: '/placements/placement-deactivate-reason/',
    method: 'post',
    data,
  })

  return res
}

export async function getOwnerAccomodation(): Promise<any> {
  const res = await request({
    url: `/accommodations/accommodations/owner_accommodation/`,
    method: 'get',
  })

  return res
}

export async function getMinMaxPrice(placementTypeKey: string): Promise<any> {
  const res = await request({
    url: `/placements/placement-min-max-price/?placement_type_key=${placementTypeKey}`,
    method: 'get',
  })

  return res
}

export async function findGuest(data: any): Promise<any> {
  const res = await request({
    url: '/accommodations/find_guest/',
    method: 'post',
    data,
  })

  return res
}

export async function createAccommodationGuest(data: any): Promise<any> {
  const res = await request({
    url: '/accommodations/accommodation_guests/',
    method: 'post',
    data,
  })

  return res
}

export async function getAccomodation({ id }: any): Promise<any> {
  const res = await request({
    url: `/accommodations/accommodations/${id}/`,
    method: 'get',
  })

  return res
}

export async function getAccommodationGuest({ id }: any): Promise<any> {
  const res = await request({
    url: `/accommodations/accommodation_guests/${id}/`,
    method: 'get',
  })

  return res
}

export async function updateCadastr(data: any): Promise<any> {
  const res = await request({
    url: `/accommodations/accommodations/${data?.id}/`,
    method: 'patch',
    data,
  })

  return res
}

export async function reloadCadastr(): Promise<any> {
  const res = await request({
    url: `/account/cadastr-info/update`,
    method: 'get',
  })

  return res
}
