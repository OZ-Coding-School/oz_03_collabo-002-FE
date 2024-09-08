import { useNavigate } from 'react-router-dom';
import { useOrderStore } from '../../store/useOrderStore';
import { useState } from 'react';
import { BookingData } from '../../store/useBookingStore';

type OrderButtonProps = {
  data: BookingData;
};

const OrderButton = ({ data }: OrderButtonProps) => {
  const navigate = useNavigate();
  const { createPayPalOrder, capturePayPalOrder } = useOrderStore();
  const [loading, setLoading] = useState(false);

  const handlePayPal = async () => {
    setLoading(true);
    try {
      const orderId = await createPayPalOrder(String(data.amount));
      const captureData = {
        class_id: Number(data.class_id),
        options: data.options || '',
        class_date_id: Number(data.class_date_id),
        quantity: data.quantity,
        referral_code: data.referral_code,
      };
      const result = await capturePayPalOrder(String(orderId), captureData);
      navigate('/order-complete', { state: { orderResult: result } });
    } catch (error) {
      console.error('PayPal payment failed:', error);
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
        <button
          className="flex-1 p-2 border rounded bg-blue-500 text-white"
          onClick={handlePayPal}
          disabled={loading}
        >
          {loading ? 'Processing...' : 'Paypal'}
        </button>
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
