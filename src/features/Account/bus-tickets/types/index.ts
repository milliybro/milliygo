export interface IBusTicketInfo {
  id: number
  order_id: number
  status: number
  full_name: string
  station_from: string
  station_to: string
  seat_number: number
  bus_number: string
  arrival_time: string
  departure_time: string
  amount: number
}

export interface IBusOrderDetail {
  id: number
  deleted: any
  deleted_by_cascade: boolean
  created_at: string
  updated_at: string
  full_name: string
  status: number
  uuid: string
  phone: string
  trip_id: number
  trip_time: string
  sold_time: string
  route_id: number
  route_name: string
  route_name_uz: string
  route_name_en: string
  is_international: boolean
  from_id: number
  to_id: number
  station_from: string
  station_from_uz: string
  station_from_en: string
  station_to: string
  station_to_uz: string
  station_to_en: string
  amount: number
  tax: number
  discount: number
  seat_number: number
  bus_number: string
  departure_time: string
  arrival_time: string
  platform: number
  order_id: number
  payment_type: number
  payment_origin: string
  image: string
  qr: string
  qrtext: string
  user: number
  organization: any
}
