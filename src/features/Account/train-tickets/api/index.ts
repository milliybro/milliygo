import request from '@/utils/axios'

import type { IReturnTicket } from '../types'

export async function getReturnTicketInfo({
  order,
  ticket,
}: {
  order: number | string
  ticket: number
}): Promise<IReturnTicket> {
  const res: IReturnTicket = await request({
    url: `/tickets/railway-orders/${order}/return_ticket_info/${ticket}/`,
    method: 'get',
  })

  return res
}

export async function returnTicket({
  order,
  ticket,
}: {
  order: number | string
  ticket: number
}): Promise<any> {
  const res = await request({
    url: `/tickets/railway-orders/${order}/return_ticket/${ticket}/`,
    method: 'patch',
  })

  return res
}
