import { useEffect } from 'react';
import useAccountStore from '../../store/useAccount';
import useClassStore from '../../store/useClassStore';
import { Link } from 'react-router-dom';
import { IconPaginationRight } from './../../assets/icon';
import { myOrder } from '../../type/account';

const MyOrderList = () => {
  const myOrders = useAccountStore((state) => state.myOrders);
  const classes = useClassStore((state) => state.classes);
  const fetchMyOrder = useAccountStore((state) => state.fetchMyOrder);
  const fetchClasses = useClassStore((state) => state.fetchClasses);

  useEffect(() => {
    fetchMyOrder('token');
    fetchClasses();
  }, [fetchMyOrder, fetchClasses]);

  // myOrders 배열의 복사본을 생성한 후 정렬
  const sortedOrders = myOrders
    ? [...myOrders].sort((a, b) => b.history_date.localeCompare(a.history_date))
    : [];

  // 날짜별로 그룹화
  const groupedOrders: { [key: string]: myOrder[] } = sortedOrders.reduce<
    Record<string, myOrder[]>
  >((acc, order) => {
    const date = order.history_date;
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(order);
    return acc;
  }, {});

  if (!myOrders || !classes) return <h1>Loading..</h1>;

  return (
    <div className="px-6">
      <div className=' py-6 flex justify-between'>
        <h1 className="text-xl font-[NanumSquareBold]">My Order List</h1>
        <div></div>
      </div>
      {/* 전체 목록 리스트 */}
      <ul className="relative list-none">
        {Object.keys(groupedOrders).map((date) => (
          <li
            key={date}
            className="border border-gray  rounded-2xl p-5 mb-[15px] "
          >
            <div className="flex justify-between items-center mb-[15px]">
              <h2 className="inline-block text-lg font-[NanumSquareBold]">
                {date}
              </h2>
              <div className="flex items-center text-right">
                <Link to="" className="block mr-2 text-sm text-gray">
                  Order Detail
                </Link>
                <IconPaginationRight className="inline-block" />
              </div>
            </div>
            {/* 결제 일자 별 묶음 보기 */}
            <ul>
              {groupedOrders[date].map((order) => {
                const foundClass = classes.find(
                  (cls) => cls.id === order.class.id,
                );
                const imageUrl = foundClass ? foundClass.photoGallery[0] : '';
                return (
                  <li
                    key={order.history_id}
                    className="relative flex flex-col items-start "
                  >
                    <div className="flex">
                      <Link
                        to={`/category/${order.class.id}`}
                        className="block w-20 h-20 mr-5"
                      >
                        <img
                          src={imageUrl}
                          alt="Go to class"
                          className="rounded-md"
                        />
                      </Link>
                      <div className="flex-1 mb-[15px]">
                        <h2 className="font-[NanumSquareBold]">
                          {order.class.title}
                        </h2>
                        <p>
                          <strong>Payment Price: </strong>{order.payment.price}$
                        </p>
                        <p><strong>State: </strong>{order.payment.status}</p>
                        <p>
                          <strong>Review: </strong>{order.review?.review_text || 'No review yet'}
                        </p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyOrderList;
