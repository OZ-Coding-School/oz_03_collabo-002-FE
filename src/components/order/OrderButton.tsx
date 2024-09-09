import { useNavigate } from 'react-router-dom';
import { PayPalButtons } from '@paypal/react-paypal-js';
import axios from '../../api/axios';
import useBookingStore, { BookingData } from '../../store/useBookingStore';
import { useState } from 'react';
import { OnApproveData, OnApproveActions } from "@paypal/paypal-js";


type OrderButtonProps = {
  data: BookingData;
};

export function Message({
  content,
  type = 'info',
}: {
  content: string;
  type?: 'info' | 'error' | 'success';
}) {
  return <p className={`message ${type}`}>{content}</p>;
}

const OrderButton = ({ data }: OrderButtonProps) => {
  const navigate = useNavigate();
  const bookingItem = useBookingStore((state) => state.bookingItem);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'info' | 'error' | 'success'>(
    'info',
  );

  const createOrder = async () => {
    setLoading(true);
    console.log(bookingItem);
    try {
      const response = await axios.post('/payments/paypal/orders', {
        amount: bookingItem?.amount,
      });

      const orderData = await response.data;

      if (orderData.id) {
        return orderData.id;
      } else {
        const errorDetail = orderData?.details?.[0];
        const errorMessage = errorDetail
          ? `${errorDetail.issue} ${errorDetail.description} (${orderData.debug_id})`
          : JSON.stringify(orderData);

        throw new Error(errorMessage);
      }
    } catch (error) {
      console.error(error);
      setMessage(`Could not initiate PayPal Checkout...${error}`);
      setMessageType('error');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const onApprove = async (data: OnApproveData, actions: OnApproveActions) => {
    setLoading(true);
    console.log(data);
    try {
      const response = await axios.post(
        `/payments/paypal/orders/${data.orderID}/capture`,
      );

      const orderData = await response.data;
      const errorDetail = orderData?.details?.[0];

      if (errorDetail?.issue === 'INSTRUMENT_DECLINED') {
        setMessage(
          'Your payment method was declined. Please try another method.',
        );
        setMessageType('error');
        return actions.restart();
      } else if (errorDetail) {
        throw new Error(`${errorDetail.description} (${orderData.debug_id})`);
      } else {
        const transaction = orderData.purchase_units[0].payments.captures[0];
        setMessage(`Transaction ${transaction.status}: ${transaction.id}`);
        setMessageType('success');
        console.log(
          'Capture result',
          orderData,
          JSON.stringify(orderData, null, 2),
        );

        // 결제 성공 후 처리
        setTimeout(() => {
          navigate('/order-confirmation', { state: { orderData } });
        }, 2000);
      }
    } catch (error) {
      console.error(error);
      setMessage(`Sorry, your transaction could not be processed...${error}`);
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };

  const handleWireTransfer = () => {
    navigate('/wire-transfer', { state: { orderData: data } });
  };

  return (
    <div className="px-6 py-4">
      <h3 className="font-bold mb-2">Payment Method</h3>
      <div className="flex justify-between gap-4">
        {/* 페이팔 버튼 */}
        <PayPalButtons
          createOrder={createOrder}
          onApprove={onApprove}
          style={{ layout: 'horizontal', color: 'blue' }}
          disabled={loading}
        />
        {/* 무통장입금 버튼 */}
        <button
          className="flex-1 p-2 border rounded"
          onClick={handleWireTransfer}
          disabled={loading}
        >
          Wire Transfer
        </button>
        {message && <Message content={message} type={messageType} />}
        {loading && <p>Processing your payment...</p>}      </div>
    </div>
  );
};

export default OrderButton;
