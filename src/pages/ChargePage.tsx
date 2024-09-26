import { useState } from 'react';
import OrderButton from '../components/order/OrderButton';
import OrderDetail from '../components/order/OrderDetail';
import OrderHeader from '../components/order/OrderHeader';
import useBookingStore, { BookingData } from '../store/useBookingStore';
import OrderCompletePage from '../components/order/OrderPayPalBtn';
import OrderDepositPage from '../components/order/OrderDepositPage';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import { Order } from '../type/order.type';

const ChargePage = () => {
  const [isWireTransfer, setIsWireTransfer] = useState(false);
  const [isPaypal, setIsPaypal] = useState(false);
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

  const handlePaypal = (data: Order) => {
    setIsPaypal(true);
    console.log(data);
  };
  const handleWireTransfer = (data: BookingData) => {
    setIsWireTransfer(true);
    console.log(data);
  };

  if (!bookingItem) return null;

  return (
    <PayPalScriptProvider
      options={{ clientId: import.meta.env.VITE_PAYPAL_SANDBOX_CLIENT_ID }}
    >
      {' '}
      <OrderHeader />
      <OrderDetail
        data={bookingItem}
        referralCode={referralCode}
        reservationName={reservationName}
        onReservationNameChange={handleReservationNameChange}
        onReferralCodeChange={handleReferralCodeChange}
      />
      <OrderButton
        data={bookingItem}
        handlePaypal={handlePaypal}
        handleWireTransfer={handleWireTransfer}
      />
      {isPaypal && <OrderCompletePage />}
      {isWireTransfer && <OrderDepositPage />}
      {/* <Route path="/order-complete/" element={<OrderCompletePage />} />
      <Route path="/wire-transfer/" element={<OrderDepositPage />} />{' '} */}
    </PayPalScriptProvider>
  );
};

export default ChargePage;
