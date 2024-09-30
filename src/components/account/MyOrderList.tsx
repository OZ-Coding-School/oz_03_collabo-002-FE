import { useEffect } from 'react';
import { useOrderStore } from '../../store/useOrderStore';
import { Order } from '../../type/order.type';

const MyOrderList = () => {
  const { fetchPayments, payments, loading, refundPayment } = useOrderStore();

  useEffect(() => {
    fetchPayments();
  }, [fetchPayments]);

  const handleRefund = async (paymentId: number) => {
    try {
      await refundPayment(paymentId);
      // 환불 처리 후 UI 업데이트
      fetchPayments();
    } catch (error) {
      console.error('Refund failed:', error);
      // 사용자에게 오류 메시지 표시
    }
  };

  if (loading) return <div>Loading...</div>;
  // if (error) return <div>Error: {error}</div>;
  if (!payments){
    return (
      <div className="inline-flex w-full aspect-square text-gray-500">
        <span className="m-auto w-5/6 text-gray text-xl text-center">
          {`No data`}
        </span>
      </div>
    )}

    console.log(payments)
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">My Orders</h1>
      <ul className="space-y-4">
        {payments?.results.map((order: Order) => (
          <li key={order.id} className="border p-4 rounded shadow">
            <h2 className="font-semibold">{order.class_title}</h2>
            <p>Date: {order.class_date_info}</p>
            <p>Created: {new Date(order.created_at).toLocaleDateString()}</p>
            <p>
              Amount: {order.amount} {order.currency}
            </p>
            <p>Status: {order.status}</p>
            <p>Payment Method: {order.Order_method}</p>
            {order.status === 'Pending' && (
              <button
                onClick={() => handleRefund(order.id)}
                className="mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Request Refund
              </button>
            )}
          </li>
        ))}
      </ul>
      {payments && (
        <div className="mt-4">
          {/* <p>
            Page {payments.current_page} of {payments.total_pages}
          </p> */}
          <p>Total Orders: {payments.total_count}</p>
        </div>
      )}
    </div>
  );
};

export default MyOrderList;
