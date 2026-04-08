export interface ITourAgentOrder {
  id: number
  status: string | null
  tour: {
    id: number
    name: string
    description: string
    tour_first_image_url: string
    price: number
    regions: string[]
    start_date: string
    end_date: string
    tour_main_image: {
      thumbnail: string
    }
  }
}
