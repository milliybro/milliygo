import type { DatePicker } from 'antd'
import type { ComponentProps } from 'react'

export type RangeValue = Parameters<
  NonNullable<ComponentProps<typeof DatePicker.RangePicker>['onChange']>
>[0]

export { }

export type IMainSearchFormTabs =
  | 'train'
  | 'bus'
  | 'hotel'
  | 'program'
  | 'plane'
  | 'taxi'
  | 'guide'
  | 'tour'

export interface ListResponse<T> {
  count: number
  next: string | null
  previous: string | null
  results: T

  current_page: number
  current_page_size: number
  next_page: any
  page_size: number
  previous_page: any

  filters: any
}

export interface IFaq {
  id: number
  title: string
  slug: string
}

export interface IFaqFull {
  id: number
  title: string
  slug: string
  question: string
  answer: string
  service: number
}
export interface ICard {
  card_number: string
  card_holder: string
  expiration_date: string
  cvv: number
  card_type: string
}

export interface ICreditCard {
  card_number: string
  card_holder: string
  expiration_date: string
  cvv: number
  card_type: 'visa' | 'master-card' | 'humo' | 'uzcard'
  created_at: Date
  id: number
  status: string
  updated_at: Date
}

export interface IFaqCategories {
  id: number
  name: string
  slug: string
  order: number
}

export interface ISendQuestion {
  email: string
  question_text: string
}

export interface IReviewsCategory {
  id: number
  name: string
  avg_rating: number
  image: string
}

export interface ISendComment {
  review: string
  rating: number
  placement: number
  booking: number
  placement_rating: {
    placement_review_category: number
    rating: number
  }[]
  code: number
}

export interface ISupport {
  id: number
  name: string
  description: string
  created_at: string
  updated_at: string
}

interface HotelItemType {
  key: string // Ensure that `key` exists on the `type` object
}

export interface Placement {
  id: number
  name: string
  slug: string
  description: string
  additional_price: number
  image: string
  address: string
  lat: number
  long: number
  post_code: string
  status: boolean
  checkin_start: string
  checkin_end: string
  checkout_start: string
  checkout_end: string
  breakfast: number
  parking: number
  placement_name: string
  type: HotelItemType | null
  discount: number
  min_price: number
  discount_start_date: string
  published_at: string
  discount_end_date: string
  placement_image: string
  discount_name: string
  free_booking_cancellation: number
  accidental_booking_protection: boolean
  type_id: number
  type_key: string
  country_id: any
  region_id: any
  owner: Owner
  district_id: number
  notRoom: string
  placement_rooms: {
    id: number
    person_count: number
  }[]
  facilities: {
    id: number
    name: string
    key: string
    icon: string
    category_id: number
  }[]
  prohibitions: number[]
  payment_types: {
    id: number
    created_at: string
    updated_at: string
    image: string
    name: string
    key: string
  }[]
  images: {
    id: number
    image: string
  }[]
  organization: {
    id: number
    name: string
    slug: string
    avatar: string
    created_at: string
  }
  avg_rating: number
  is_favorite: boolean
  legal_property: boolean
  general_terms: boolean
  available_rooms: number
}

export interface SimilarPlacements {
  id: number
  name: string
  description: string
  person_count: number
  room_count: number
  price: number
  children_age: number
  children_allowed: boolean
  crib_provided: boolean
  is_favorite: boolean
  placement_id: number
  placement_name: string
  placement_description: string
  placement_slug: string
  address: string
  lat: number
  long: number
  type_id: number
  region_id: number
  discount_name: any
  placement_discount: number
  avg_rating: number
  star_rating: number
  type_key: string
  review_count: number
  available_rooms: number
  images_list: ImagesList[]
}

interface ImagesList {
  id: number
  image: string
  placement: number
}

interface Owner {
  id: number
  username: string
  first_name: string
  last_name: string
  avatar: string
}

export interface ISearchPlacement {
  id: number
  name: string
  description: string
  area: number
  bathrooms: number
  bedrooms: number
  person_count: number
  room_count: number
  price: number

  is_favorite: boolean
  placement_name: string
  placement_slug: string
  slug: string
  placement_description: string
  placement_image: string
  address: string
  lat: number
  long: number
  country_id: number
  region_id: number
  district_id: number
  discount_name: any
  placement_discount: number
  placement_id: number
  avg_rating: any
  star_rating: number
  refetch: any
  images_list: {
    id: number
    image: string
    placement: number
  }[]
  image: string
  type_id: number
  date?: any
  rooms?: any
  region?: Region
}

export interface IFavoriteItem {
  id: number
  name: string
  slug: string
  image: string
  address: string
  description: string
  lat: number
  long: number
  free_booking_cancellation: number
  images: {
    id: number
    image: string
  }[]
  star_rating: number
  avg_rating: number
  distance_region: number
}

export interface Currency {
  id: number
  name: string
  short_name: string
  symbol: string
  rate: number
  is_default: boolean
}

export interface IPlacementImages {
  id: number
  image: string
  placement: number
}

export interface IPlacementReview {
  review: string
  rating: number
  placement: number
  created_at: string
  replies: {
    review: string
  }[]
  user: {
    id: number
    first_name: string
    last_name: string
    middle_name: string
    avatar: string
    country: string
    region: string
  }
}

export interface IPlacementReviewsResults<T> {
  count: number
  next: string | null
  previous: string | null
  results: T
  total: number
  avg: {
    total: number
    avg_rating: number
    ratings: {
      rating: number
      count: number
    }[]
  }
}

export interface IPlacementRoom {
  id: number
  name: string
  description: string
  area: number
  additional_price: number
  bathrooms: number
  children_allowed: boolean
  bedrooms: number
  person_count: number
  room_count: number
  price: number
  placement_id: number
  available_rooms: number
  floor_count: number
  room_floor: number
  facilities: {
    id: number
    name: string
    key: string
    icon: string
    category: number
  }[]
  variations: {
    id: number
    discount: number
    person_count: number
  }[]
  beds: {
    id: number
    width: number
    height: number
    person_count: number
  }[]
  room_images: {
    id: number
    image: string
  }[]
}

export interface IPlacementExtractedRoom {
  id: number
  name: string
  description: string
  area: number
  available_rooms: number
  bathrooms: number
  additional_price: number
  bedrooms: number
  person_count: number
  room_count: number
  price: number
  placement_id: number
  unique_id?: number
  facilities: {
    id: number
    name: string
    key: string
    icon: string
    category: number
  }[]
  variation: {
    id: number
    discount: number
    person_count: number
    room_id: number
  }
  beds: {
    id: number
    width: number
    height: number
    person_count: number
  }[]
  room_images: {
    id: number
    image: string
  }[]
}

export interface IMe {
  phone_number?: any
  id: number
  last_login: any
  is_superuser: boolean
  username: string
  first_name: string
  middle_name: string
  last_name: string
  email: string
  avatar: string
  phone: string
  pinfl: string
  passport_sn: string
  passport_given_by: any
  passport_expire_date: any
  address: string
  is_staff: boolean
  is_active: boolean
  date_joined: string
  groups: Group[]
  region: number
  district: number
  country: number
  user_type: string
  notification: any[]
  language: Language[]
  telegram_id: number
  type: string
  guide: Guide
  gender: string
  is_guide: boolean
  birth_date: string
  is_full: boolean
  country_name: string
  region_name: string
  district_name: string
  nationality_name: string
}

export interface Group {
  id: number
  name: string
}

export interface Language {
  id: number
  name: string
  key: string
  image: string
}

export interface Guide {
  id: number
  certificate_file: string
  publishing_status: string
  guide_category_name: string
  description: string
  regions: Region[]
}

export interface ISupportCategory {
  id: number
  name: string
  slug: string
}

export interface IBookingHotelInfoState {
  date: { start_date: string; end_date: string; difference: number } | null
  rooms: IBookingRoom[] | null
  placement: Placement | null
  stepOne: boolean
  placementRooms?: {
    extractedVariations: IPlacementExtractedRoom[]
    idRowSpanMap: any
    count: number
    next: string | null
    previous: string | null
    results: IPlacementRoom[]
  } | null
  roomCount: number
}

export interface IBookingRoom {
  room: any
  id: string
  roomId: number
  roomName: string
  roomCount: number
  beds: {
    id: number
    width: number
    height: number
    person_count: number
  }[]
  variationId: number
  roomCapacity: number
  price: number
  quantity?: number
  facilities: {
    id: number
    name: string
    key: string
    icon: string
    category: number
  }[]
  totalPrice: number
}

export interface IPopularRegion {
  region_id: number
  region_name: string
  types: {
    type_id: number
    type_name: string
    count: number
  }[]
}

export interface IPlatformReview {
  id: number
  user: {
    id: number
    username: string
    first_name: string
    middle_name: string
    last_name: string
    avatar: string
  }
  rating: number
  review: string
  source: number
  anonymous: boolean
  created_at: string
}

export interface IPlacementFilters {
  price_range: IPriceRange[]
  placements_type: IPlacementsType[]
  facilities: IFacility[]
  room_facilities: IRoomFacility[]
  room_count_by_name: IPlacementsType[]
  nutrition_facilities: IPlacementsType[]
  placement_count_by_star_rating: {
    star_rating: number
    count: number
  }[]
}

export interface IPriceRange {
  min_price: number
  max_price: number
}

export interface IPlacementsType {
  id: number
  name: string
  key: string
  icon: string
  count: number
}

export interface IFacility {
  id: number
  name: string
  key: string
  icon: string
  count: number
}

export interface IRoomFacility {
  id: number
  name: string
  key: string
  icon: string
  count: number
}

export interface IPostBooking {
  items: {
    room_count: number
    room: number
    person_count: number
    guest: string
  }[]
  start_date: string
  end_date: string
  first_name: string
  last_name: string
  email?: string
  phone: string
  message: string
  estimated_time: string
  main_guest: string
  code?: number
  country?: number
  status?: number
  payment_type?: number
  placement: number
  prefer_adjacent_rooms?: boolean
  telegram_id?: number
  is_pay_to_arrival: boolean
}

export interface IBookingResponse {
  country: number
  created_at: string | null
  deleted: string | null
  email: string
  end_date: string
  estimated_time: string
  first_name: string
  id: number
  last_name: string
  main_guest: string
  message: string | null
  payment_type: number
  phone: string | null
  placement: number
  start_date: string
  status: number
  status_text: string | null
  total: number
  updated_at: string | null
  user: number
}

export interface IPreferences {
  id: number
  key: string
  title: string
  description: string
  group: string
  file: any
  created_at: string
}

export interface OnePreferences {
  id: number
  rating: number
  placement_review_category: {
    id: number
    name: string
    image: string
  }
}

export interface OneReview {
  id: number
  placement: {
    name: string
    address: string
    image: string
  }
  placement_ratings: OnePreferences[]
}

export interface ISearchRegions {
  countries: Country[]
  regions: Region[]
  districts: Districts[]
}

export interface Country {
  id: number
  name: string
  code: string
}

export interface Region {
  id: number
  name: string
  code: string
  parent: any
}

export interface Districts {
  id: number
  name: string
  code: string
  parent: any
}

export interface IBooking {
  country: number
  end_date: string
  first_name: string
  id: number
  items: IBookingItem[]
  last_name: string
  placement: IBookingPlacement
  start_date: string
  status: number
  status_text: string | null
  total: number
  user: number
}

export interface IBookingPlacement {
  accidental_booking_protection: boolean
  address: string
  checkin_start: string
  checkout_end: string
  country: number
  description: string
  discount: number
  discount_end_date: string
  discount_name: string | null
  discount_start_date: string
  district: number
  free_booking_cancellation: number
  id: number
  image: string
  images: IPlacementImages[]
  is_approved: string
  lat: number
  long: number
  name: string
  region: number
  slug: string
  star_rating: number
  user: any
}

export interface IBookingItem {
  booking: number
  children: any
  id: number
  person_count: number
  price: number
  room: number
  room_count: number
  subtotal: number
}

export interface IBookingsDetail {
  results: any
  id: number
  items: {
    id: number
    room_count: number
    room: {
      id: number
      name: string
      description: string
      beds: {
        id: number
        width: number
        height: number
        person_count: number
      }[]
      facilities: IHotelFacility[]
      person_count: number
      children_allowed: boolean
    }
    person_count: number
    guest: any
    children: any
    price: number
    subtotal: number
  }[]
  start_date: string
  end_date: string
  total: number
  prefer_adjacent_rooms: boolean
  first_name: string
  last_name: string
  email: string
  phone: string
  message: any
  estimated_time: string
  for_me: boolean
  main_guest: string
  code: number
  country: {
    id: number
    name: string
    code: string
  }
  user: {
    id: number
    username: string
    first_name: string
    middle_name: any
    last_name: string
    avatar: string
    language: any[]
  }
  status: {
    name: string
    type: string
  }
  status_text: string | null
  payment_type: {
    id: number
    name: string
    image: string
    key: string
    created_at: string
    updated_at: string
  }
  placement: {
    id: number
    name: string
    slug: string
    description: string
    image: string
    address: string
    lat: number
    long: number
    user: {
      id: number
      username: string
      first_name: string
      last_name: string
      email: string
      phone: string
      avatar: string
      telegram_id: any
    }
    checkin_start: string
    checkout_end: string
  }
}

export interface IHotelFacility {
  id: number
  name: string
  key: string
  icon: string
  category: number
}

export interface ICreateChat {
  id: number
  updated_at: string
  created_at: string
  user_session: string
  admins: number[]
  creator: any
  email_receive: 'is_being_received' | 'not_received' | 'received'
}

export interface ISendMessage {
  id: number
  admin: any
  updated_at: string
  created_at: string
  content: string
  file: any
  chat_room: number
  user_session: string
}

export interface IProperty {
  accidental_booking_protection: boolean
  address: string
  avg_rating: number | null
  bookings_count: number
  breakfast: number
  checkin_end: string
  checkin_start: string
  checkout_end: string
  checkout_start: string
  country_id: number
  description: string
  discount: number
  discount_end_date: Date | null
  discount_name: string | null
  discount_start_date: Date | null
  district_id: number
  facilities: number[]
  favorites_count: number
  free_booking_cancellation: number
  general_terms: boolean
  id: number
  image: string
  is_approved: boolean
  is_favorite: boolean
  lat: number
  legal_property: boolean
  long: number
  min_price: number
  max_price: number
  name: string
  payment_types: number[]
  post_code: string
  prohibitions: any[]
  published_at: Date
  region_id: number
  slug: string
  star_rating: number
  status: boolean
  type_id: number
  views: number
}

export interface IBookingVerification {
  booking_id: number
  code: number
}

export interface IBookingCode {
  code: number
}

export interface IBookingCodeResponse {
  message: string
  send_type: 'email' | 'telegram'
}

export interface IRequestedUserData {
  email: string
  first_name: string
  last_name: string
}

export interface User {
  id: number
  username: string
  first_name: string
  last_name: string
  middle_name: string | null
  email: string
  phone: string | null
  avatar: string
  telegram_id: number | null
  type: string | null
}

export interface IMessage {
  id: number
  content: string | null
  file: string | null
  created_at: string
  conversation: string
  user: User
}

export interface IConversation {
  id: number
  last_message: any
  name: string
  object_id: number
  type: 'complaint' | 'support'
  unread_count: number
  users: User[]
}

export interface IPlacementType {
  id: number
  name: string
  icon: string
  key: string
  description: string
  star_rating: boolean
}

export interface ISearchHotelFields {
  adults: number
  children: number
  rooms: number
}

export interface ITravelPackageFields {
  adults: number
  children: number
  infants: number
}

export interface ICreateTourPackageParams {
  booking: number
  departure_flight: number
  return_flight: number
  departure_taxi: number
  return_taxi: number
  gid_travel: number
}

export type TourPackagesType = {
  region1: number
  region2: number
  start_date: string
  end_date: string
  children: number
  adults: number
  infants: number
  currency: string
}

export type CreatePackageMutationVars = {
  payload: TourPackagesType
  values: any
  fields: any
}

export interface IErrorMessage {
  error_type: string
  field: string
  detail: string
  status_code: number
}

export interface TSeoMetaTags {
  title: string | null
  description: string | null
  og_title: string | null
  og_description: string | null
  og_url: string | null
  og_type: string | null
  og_site_name: string | null
  og_image: string | null
  key: string | null
}

export interface ITaxiSearch {
  label: string
  value: string
  place: string
  key: string
  title: string
  description: string
}
