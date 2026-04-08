export interface ITourAgentOrderItem {
  id: number
  status: ITourAgentOrderStatus
  participants_count: number
  ordered_by: {
    id: number
    first_name: string
    last_name: string
    middle_name: any
    avatar: string
    country: any
    region: any
  }
  tour: {
    id: number
    name: string
    description: string
    tour_first_image_url: string
    regions: string[]
    price: number
    start_date: string
    end_date: string
    transports: { id: number; name: string }[]
    start_location: { id: number; lat: number; long: number; name: string }
  }
  tour_agent: {
    id: number
    brand_name: any
    phone_number: any
    email: any
    legal_entity_country: any
    legal_entity_region: any
    legal_entity_district: any
    legal_entity_street: any
    legal_entity_house_number: any
    legal_entity_apartment_number: any
    legal_entity_postal_code: any
  }
  adults: number
  children: number
  tour_details: {
    id: number
    type: number
    activity_level: string
    duration_days: number
    duration_nights: number
    accomodation_type: string
    accomodation_format: string
    meal_plan: string
  }
}

export interface IOrderDetail {
  id: number
  tour: {
    start_date: string
    start_time: string
    transports: any
    transport_capacity: any
    transfer_type: any
    tour_services: { id: number; service: string }[]
    start_location: {
      id: number
      lat: number
      long: number
      name: string
    }
  }
  tour_agent: {
    id: number
    brand_name: string
    phone_number: string
  }
  participants: {
    id: number
    first_name: string
    last_name: string
    father_name: any
    document_number: string
    birth_date: string
    phone: any
  }[]
  created_at: string
}

export type ITourAgentPaymentStatus =
  | 'awaiting_payment'
  | 'payment_unconfirmed'
  | 'payment_confirmed'
  | 'payment_refunded'
  | 'payment_not_refunded'

export type ITourAgentOrderStatus =
  | 'new'
  | 'approved'
  | 'cancelled_by_tour_agent'
  | 'cancelled_by_tourist '

export interface IFileUploadResponse {
  id: string
  type: string
  file: string
  thumbnail: string
  order: number
}
