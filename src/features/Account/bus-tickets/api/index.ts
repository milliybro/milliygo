import { ListResponse } from '@/types'
import request from '@/utils/axios'
import { IBusOrderDetail, IBusTicketInfo } from '../types'

export async function getBusTickets(): Promise<ListResponse<IBusTicketInfo[]>> {
  return await request({
    url: '/integrations/autoticket/list/',
    method: 'get',
  })
}

export async function getBusTicketDetail(id: number): Promise<IBusOrderDetail> {
  return await request({
    url: `/integrations/autoticket/${id}/detail/`,
    method: 'get',
  })
}
