import { PayPalButtons } from '@paypal/react-paypal-js';
import axios from '../../api/axios';
import { BookingData } from '../../store/useBookingStore';
import { useState } from 'react';
import { OnApproveData, OnApproveActions } from '@paypal/paypal-js';
import { useUserStore } from '../../store/useUser';
import { Order } from '../../type/order.type';

type OrderButtonProps = {
  data: BookingData;
  handlePaypal: (orderData: Order) => void;
  handleWireTransfer: (orderData: BookingData) => void;
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

const OrderButton = ({
  data,
  handlePaypal,
  handleWireTransfer,
}: OrderButtonProps) => {
  // const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'info' | 'error' | 'success'>(
    'info',
  );
  const user = useUserStore((state) => state.user);

  const createOrder = async () => {
    setLoading(true);
    try {
      const response = await axios.post('/payments/paypal/orders', {
        amount: data?.amount?.toFixed(2),
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
        data,
      );

      const orderResponse = await response.data;
      const errorDetail = orderResponse?.details?.[0];

      if (errorDetail?.issue === 'INSTRUMENT_DECLINED') {
        setMessage(
          'Your payment method was declined. Please try another method.',
        );
        setMessageType('error');
        return actions.restart();
      } else if (errorDetail) {
        throw new Error(
          `${errorDetail.description} (${orderResponse.debug_id})`,
        );
      } else {
        const transaction =
          orderResponse.purchase_units[0].payments.captures[0];
        setMessage(`Transaction ${transaction.status}: ${transaction.id}`);
        setMessageType('success');
        console.log(
          'Capture result',
          orderResponse,
          JSON.stringify(orderResponse, null, 2),
        );

        // 결제 성공 후 처리
        setTimeout(() => {
          // navigate('/order-confirmation', { state: { orderResponse } });
          handlePaypal(orderResponse);
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
  if (!user) return;

  const onWireTransfer = () => {
    // 서버에 데이터를 전송하는 코드 작성
    // navigate('/wire-transfer', { state: { orderData: data } });
    handleWireTransfer(data);
  };

  return (
    <div className="px-6 py-4">
      <h3 className="font-bold mb-5">Payment Method</h3>
      <div className="flex justify-between gap-4 h-fit">
        {/* 페이팔 버튼 */}
        <PayPalButtons
          createOrder={createOrder}
          onApprove={onApprove}
          style={{ layout: 'horizontal', color: 'white', tagline: false }}
          disabled={loading}
          className="flex-1"
        />
        {/* 무통장입금 버튼 */}
        <button
          className="flex-1 border border-gray-700 rounded-[4px] text-[14px] py-0 h-[36px] font-extrabold"
          onClick={onWireTransfer}
          disabled={loading}
        >
          Wire Transfer
        </button>
        {message && <Message content={message} type={messageType} />}
        {loading && <p>Processing your payment...</p>}{' '}
      </div>
    </div>
  );
};

export default OrderButton;
