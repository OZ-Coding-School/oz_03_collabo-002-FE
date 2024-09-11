import { useState } from 'react';
import OrderButton from '../components/order/OrderButton';
import OrderDetail from '../components/order/OrderDetail';
import OrderHeader from '../components/order/OrderHeader';
import useBookingStore from '../store/useBookingStore';

const ChargePage = () => {
  const bookingItem = useBookingStore((state) => state.bookingItem);
  const updateBookingWithReferral = useBookingStore(
    (state) => state.updateBookingWithReferral,
  );
  const updateBookingWithReservationName = useBookingStore(
    (state) => state.updateBookingWithReservationName,
  );
  const [referralCode, setReferralCode] = useState('');
  const [reservationName, setReservationName] = useState('');

  const handleReferralCodeChange = (code: string) => {
    setReferralCode(code);
    updateBookingWithReferral(code);
  };
  const handleReservationNameChange = (name: string) => {
    setReservationName(name);
    updateBookingWithReservationName(name);
  };

  
  if (!bookingItem) return null;

  return (
    <div>
      <OrderHeader />
      <OrderDetail
        data={bookingItem}
        referralCode={referralCode}
        reservationName={reservationName}
        onReservationNameChange={handleReservationNameChange}
        onReferralCodeChange={handleReferralCodeChange}
      />
      <OrderButton data={bookingItem} />
    </div>
  );
};

export default ChargePage;
