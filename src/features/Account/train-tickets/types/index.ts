interface IReturnTicket {
  id: number
  birth_date: string
  citizenship: Citizenship
  doc: string
  pinfl: any
  doc_type: string
  first_name: string
  last_name: string
  middle_name: string
  gender: string
  seats: string
  cost: number
  returned: any
  return_tariff: number
  express_id: string
  timeinway: string
  departure_date: string
  arrival_date: string
  station_from: string
  station_to: string
  children: IReturnTicket | undefined
}

interface Citizenship {
  id: number
  name: string
  code: string
}

export type { IReturnTicket }
