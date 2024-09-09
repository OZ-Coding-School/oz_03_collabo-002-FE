import React, { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';

type OrderResult = {
  status: string | null;
  paymentId: string | null;
};

const OrderResult: React.FC = () => {
  const [result, setResult] = useState<OrderResult | null>(null);
  const location = useLocation();
  const query = useMemo(() => new URLSearchParams(location.search), [location.search]);

  useEffect(() => {
    const status = query.get('status');
    const paymentId = query.get('paymentId');
    // 상태에 따라 결과를 처리
    setResult({ status, paymentId });
  }, [query]);

  return (
    <div>
      <h1>결제 결과</h1>
      <div>Status: {result?.status}</div>
      <div>Payment ID: {result?.paymentId}</div>
    </div>
  );
};

export default OrderResult;
