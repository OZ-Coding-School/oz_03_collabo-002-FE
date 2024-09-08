import React, { useEffect } from 'react';
import { useOrderStore } from '../../store/useOrderStore';

const MyOrderList: React.FC = () => {
  const { fetchPayments, payments, loading, error, refundPayment } = useOrderStore(state => ({
    fetchPayments: state.fetchPayments,
    payments: state.payments,
    loading: state.loading,
    error: state.error,
    refundPayment: state.refundPayment
  }));

  useEffect(() => {
    fetchPayments();
  }, [fetchPayments]);

  const handleRefund = async (paymentId: string) => {
    try {
      await refundPayment(paymentId);
      // 환불 처리 후 UI 업데이트
    } catch (error) {
      // 오류 처리
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>내 결제 목록</h1>
      <ul>
        {payments?.map(payment => (
          <li key={payment.id}>
            {payment.details}
            {payment.status === 'Pending' && (
              <button onClick={() => handleRefund(payment.id)}>환불 요청</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyOrderList;