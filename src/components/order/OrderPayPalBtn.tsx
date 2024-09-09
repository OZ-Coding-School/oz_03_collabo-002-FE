import { useLocation, Link } from 'react-router-dom';

const OrderCompletePage = () => {
  const location = useLocation();
  const { orderResult } = location.state || {};

  return (
    <div>
      <h1>주문 완료</h1>
      {orderResult ? (
        <div>
          <p>주문이 성공적으로 완료되었습니다.</p>
          <p>주문 번호: {orderResult.order_id}</p>
          {/* 기타 주문 정보 표시 */}
        </div>
      ) : (
        <p>주문 정보를 불러올 수 없습니다.</p>
      )}
      <Link to="/account?page=orders">주문 내역 확인하기</Link>
    </div>
  );
};

export default OrderCompletePage;