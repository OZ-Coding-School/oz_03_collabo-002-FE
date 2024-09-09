import { useNavigate } from 'react-router-dom';
import useBookingStore, { BookingData } from '../../store/useBookingStore';
import { PayPalButtons } from '@paypal/react-paypal-js';
import axios from '../../api/axios';
import { CreateOrderActions } from '../../type/order.type';

type OrderButtonProps = {
  data: BookingData;
};

const OrderButton = ({ data }: OrderButtonProps) => {
  const navigate = useNavigate();
  const bookingItem  = useBookingStore((state) => ({
    classId: state.bookingItem?.class_id,
    options: state.bookingItem?.options,
    classDateId: state.bookingItem?.class_date_id,
    quantity: state.bookingItem?.quantity,
    referral_code: state.bookingItem?.referral_code,
    amount: state.bookingItem?.amount,
    title: state.bookingItem?.title,
  }));

  const createOrder = (data: any, actions: any) => {
    return actions.order.create({
      purchase_units: [
        {
          description: `Class ID: ${bookingItem.classId}`,
          amount: {
            value: bookingItem.amount,
          },
        },
      ],
    });
  };

  const onApprove = async (data: any, actions: any) => {
    return actions.order.capture().then(async (details: any) => {
      // 서버로 주문 데이터를 전송
      try {
        const response = await axios.post('/payment/paypal/orders/', {
          orderID: data.orderID,
          payerID: data.payerID,
        });
        const result = response.data;
        console.log('결제 성공:', result);
      } catch (error) {
        console.error('결제 처리 중 오류 발생:', error);
      }
    });
  };  

  const handleWireTransfer = () => {
    navigate('/wire-transfer', { state: { orderData: data } });
  };

  return (
    <div className="px-6 py-4">
      <h3 className="font-bold mb-2">Payment Method</h3>
      <div className="flex justify-between gap-4">
        {/* 페이팔 버튼 */}
        <PayPalButtons createOrder={createOrder} onApprove={onApprove} />

        {/* <button
          className="flex-1 p-2 border rounded bg-blue-500 text-white"
          onClick={handlePayPal}
          disabled={loading}
        >
          {loading ? 'Processing...' : 'Paypal'}
        </button> */}
        {/* 무통장입금 버튼 */}
        <button
          className="flex-1 p-2 border rounded"
          onClick={handleWireTransfer}
        >
          Wire Transfer
        </button>
      </div>
    </div>
  );
};

export default OrderButton;
