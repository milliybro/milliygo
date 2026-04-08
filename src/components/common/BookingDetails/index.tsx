import HotelBookingDetails from './hotel-booking-details'
import { useBookingStore } from './store/useBookingStore'
import TourBookingDetail from './tour-booking-details'

const BookingDetailsHotel = () => {
  const { bookingData } = useBookingStore()

  return <>{bookingData.type === 'booking' ? <HotelBookingDetails /> : <TourBookingDetail />}</>
}

export default BookingDetailsHotel
