export interface IExcursionOrder {
  id: number
  status: any
  excursion: {
    id: number
    name: string
    description: string
    tour_first_image_url: string
    price: number
    regions: string[]
    start_date: string
    end_date: string
  }
  tour: {
    id: number
    name: string
    description: string
    tour_first_image_url: string
    price: number
    regions: string[]
    start_date: string
    end_date: string
  }
}
