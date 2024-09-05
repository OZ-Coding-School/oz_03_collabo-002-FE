// import { useEffect, useState } from 'react';
// import useClassStore from '../../store/useClassStore';
// import { Link } from 'react-router-dom';
// import { IconCheck } from '../../config/IconData';
// import { myOrder } from '../../type/account.type';
// import useAccountStore from '../../store/useAccountStore';

const MyOrderList = () => {
  // const myOrders = useAccountStore((state) => state.myOrders);
  // const classes = useClassStore((state) => state.classes);
  // const fetchMyOrder = useAccountStore((state) => state.fetchMyOrder);
  // const fetchClasses = useClassStore((state) => state.fetchClasses);

  // const [showTodayClasses, setShowTodayClasses] = useState(false);

  // useEffect(() => {
  //   fetchMyOrder();
  //   fetchClasses();
  // }, [fetchMyOrder, fetchClasses]);

  // // 오늘 날짜 필터링 (추후 API 대응 시 수정될 수 있음)
  // const today = new Date().toISOString().split('T')[0]; // 'YYYY-MM-DD'

  // const filteredOrders = showTodayClasses
  //   ? myOrders?.filter((order) => order.history_date === today)
  //   : myOrders;

  // // filteredOrders 배열의 복사본을 생성한 후 정렬
  // const sortedOrders = filteredOrders
  //   ? [...filteredOrders].sort((a, b) =>
  //       b.history_date.localeCompare(a.history_date),
  //     )
  //   : [];

  // // 날짜별로 그룹화
  // const groupedOrders: { [key: string]: myOrder[] } = sortedOrders.reduce<
  //   Record<string, myOrder[]>
  // >((acc, order) => {
  //   const date = order.history_date;
  //   if (!acc[date]) {
  //     acc[date] = [];
  //   }
  //   acc[date].push(order);
  //   return acc;
  // }, {});

  // const toggleShowToday = (e: React.MouseEvent<HTMLElement>) => {
  //   e.preventDefault();

  //   setShowTodayClasses(!showTodayClasses);
  // };

  // if (!myOrders || !classes) return <h1>Loading..</h1>;

  return (<></>
    // <div className="px-6">
    //   <div className="flex flex-col justify-between items-center">
    //     {/* 오늘의 강좌 보기 버튼 */}
    //     <div className="flex self-end px-6 mb-[15px]">
    //       <label htmlFor="today-class" className="flex items-center">
    //         <button
    //           className={`w-fit mr-1 rounded-full ${showTodayClasses ? 'text-white bg-black' : 'text-black'}`}
    //           onClick={toggleShowToday}
    //         >
    //           <IconCheck />
    //         </button>
    //         <span className="font-extrabold text-sm">Today's Class</span>
    //       </label>
    //     </div>
    //     {/* 전체 목록 리스트 */}
    //     <ul className="relative w-full list-none px-6">
    //       {Object.keys(groupedOrders).length === 0 ? (
    //         <li className="inline-flex w-full aspect-square text-gray-500">
    //           <span className="m-auto w-5/6 text-gray text-xl text-center">
    //             {`Experience your own unique story and discover a new Korea :)`}
    //           </span>
    //         </li>
    //       ) : (
    //         Object.keys(groupedOrders).map((date) => (
    //           <li
    //             key={date}
    //             className="border border-gray rounded-2xl p-5 mb-[15px]"
    //           >
    //             {/* 결제 일자 별 묶음 보기 */}
    //             <ul>
    //               {groupedOrders[date].map((order) => {
    //                 const foundClass = classes.find(
    //                   (cls) => cls.id === order.class.id,
    //                 );
    //                 const imageUrl = foundClass
    //                   ? foundClass.images[0].thumbnail_image_urls[0]
    //                   : '';
    //                 return (
    //                   <li
    //                     key={order.history_id}
    //                     className="relative flex flex-col items-start"
    //                   >
    //                     <div className="flex">
    //                       <Link
    //                         to={`/category/${order.class.id}`}
    //                         className="block w-20 h-20 mr-5"
    //                       >
    //                         <img
    //                           src={imageUrl}
    //                           alt="Go to class"
    //                           className="rounded-md"
    //                         />
    //                       </Link>
    //                       <div className="flex-1 mb-[15px]">
    //                         <h2 className="font-bold">{order.class.title}</h2>
    //                         <p>
    //                           <strong>Payment Price: </strong>
    //                           {order.payment.price}$
    //                         </p>
    //                         <p>
    //                           <strong>State: </strong>
    //                           {order.payment.status}
    //                         </p>
    //                         <p>
    //                           <strong>Review: </strong>
    //                           {order.review?.review_text || 'No review yet'}
    //                         </p>
    //                       </div>
    //                     </div>
    //                   </li>
    //                 );
    //               })}
    //             </ul>
    //           </li>
    //         ))
    //       )}
    //     </ul>
    //   </div>
    // </div>
  );
};
export default MyOrderList;
