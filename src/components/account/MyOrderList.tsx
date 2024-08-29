import { useEffect, useState } from 'react';
import useAccountStore from '../../store/useAccountStore';
import useClassStore from '../../store/useClassStore';
import { Link } from 'react-router-dom';
import {
  IconCheck,
  IconPaginationRight,
} from './../../config/IconData';
import { myOrder } from '../../type/account.type';

const MyOrderList = () => {
  const myOrders = useAccountStore((state) => state.myOrders);
  const classes = useClassStore((state) => state.classes);
  const fetchMyOrder = useAccountStore((state) => state.fetchMyOrder);
  const fetchClasses = useClassStore((state) => state.fetchClasses);

  const [showTodayClasses, setShowTodayClasses] = useState(false);

  useEffect(() => {
    fetchMyOrder('token');
    fetchClasses();
  }, [fetchMyOrder, fetchClasses]);

  // 오늘 날짜 필터링 (추후 API 대응 시 수정될 수 있음)
  const today = new Date().toISOString().split('T')[0]; // 'YYYY-MM-DD'

  const filteredOrders = showTodayClasses
    ? myOrders?.filter((order) => order.history_date === today)
    : myOrders;

  // filteredOrders 배열의 복사본을 생성한 후 정렬
  const sortedOrders = filteredOrders
    ? [...filteredOrders].sort((a, b) =>
        b.history_date.localeCompare(a.history_date),
      )
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

  const toggleShowToday = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    setShowTodayClasses(!showTodayClasses);
  };

  if (!myOrders || !classes) return <h1>Loading..</h1>;

  return (
    <div className="px-6">

      <div className=" py-6 flex justify-between items-center">
        <h1 className="text-xl font-[NanumSquareBold]">My Order List</h1>
        <div className="flex items-center">
          <label htmlFor="today-class" className="flex items-center">
            <button
              className={`w-fit mr-1 rounded-full ${showTodayClasses ? 'text-white bg-black' : 'text-black'}`}
              onClick={toggleShowToday}
            >
              <IconCheck />
            </button>
            <span className="font-extrabold text-sm">
              Today's Class
            </span>
          </label>
        </div>
    <div>


      <div className="flex justify-end px-6 mb-[15px]">
        <label htmlFor="today-class" className="flex items-center">
          <button
            className={`w-fit mr-1 rounded-full ${showTodayClasses ? 'text-white bg-black' : 'text-black'}`}
            onClick={toggleShowToday}
          >
            <IconCheck />
          </button>
          <span className="font-extrabold text-sm">
            Today's Class
          </span>
        </label>
      </div>
      {/* 전체 목록 리스트 */}
      <ul className="relative list-none px-6">
        {Object.keys(groupedOrders).map((date) => (
          <li
            key={date}
            className="border border-gray  rounded-2xl p-5 mb-[15px] "
          >
            <div className="flex justify-between items-center mb-[15px]">
              <h2 className="inline-block text-lg font-bold">
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
                const imageUrl = foundClass ? foundClass.images[0].image_url : '';
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
                        <h2 className="font-bold">
                          {order.class.title}
                        </h2>
                        <p>
                          <strong>Payment Price: </strong>
                          {order.payment.price}$
                        </p>
                        <p>
                          <strong>State: </strong>
                          {order.payment.status}
                        </p>
                        <p>
                          <strong>Review: </strong>
                          {order.review?.review_text || 'No review yet'}
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
    </div>
    </div>
  );
}
export default MyOrderList;
