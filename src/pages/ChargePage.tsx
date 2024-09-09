import OrderMain from '../components/order/OrderMain';
import useBookingStore from '../store/useBookingStore';
// import useBookingStore from '../store/useBookingStore';

const ChargePage = () => {
  
  const bookingItem = useBookingStore((state) => state.bookingItem);
  // // console.log(bookingItem);
  // const data = {
  //   class_id: 5,
  //   class_date_id: 9,
  //   quantity: 1,
  //   referral_code: 'BD4CFEG',
  //   amount: 90,
  // };

  if (!bookingItem) return null;

  return (
    <div>
      <OrderMain data={bookingItem} />
    </div>
  );
};

export default ChargePage;
