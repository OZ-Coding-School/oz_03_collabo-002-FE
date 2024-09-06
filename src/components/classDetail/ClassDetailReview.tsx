import { useNavigate, useParams } from 'react-router-dom';
import {
  IconAllArw,
  IconReviewHeart,
  IconReviewStar,
  // IconArrowDown,
  // IconArrowUp,
} from '../../config/IconData';
import { useEffect } from 'react';
import useReviewStore from '../../store/useReviewStore';

const ClassDetailReview = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  console.log(id);

  // const [openReviews, setOpenReviews] = useState<{ [key: string]: boolean }>(
  //   {},
  // );

  const reviews = useReviewStore((state) => state.reviews);

  const getReviews = useReviewStore((state) => state.getReviews);

  useEffect(() => {
    getReviews(Number(id));
  }, [getReviews, id]);

  const handleAllReview = () => {
    navigate(`/review/${id}`);
  };

  // const toggleReviewopen = (reviewId: string) => {
  //   setOpenReviews((prev) => ({
  //     ...prev,
  //     [reviewId]: !prev[reviewId],
  //   }));
  // };

  return (
    <div className="mt-10 px-6">
      <h3 className="text-[20px] font-semibold flex justify-between">
        Reviews
        <button
          onClick={handleAllReview}
          className="text-[14px] font-normal flex items-center"
        >
          view all
          <IconAllArw className="ml-1" />
        </button>
      </h3>
      {/* <div className="px-6 flex mt-4">
        <div className="relative">
          <div className="flex">
            <div className="w-12 h-12 rounded-full overflow-hidden">
              <img src="./images/img-sample2.jpg" alt="sample img"></img>
            </div>
            <div className="text-[14px] ml-4">
              <strong className="font-semibold">name</strong>
              <p className="flex items-center">
                <IconReviewStar className="mr-1" />
                4.5
              </p>
            </div>
          </div>
          <p className="text-[14px] mt-4">
            다양한 분야에서 사업하고 계시는 분들, 준비 중이신 분들과 이야기를
            나누며 인사이트도 공유하고 동기부여도 받을 수 있습니다.
          </p>
          <button className="absolute right-0 top-0 p-2 border border-gray-300 rounded-lg flex items-center">
            <IconReviewHeart className="mr-1 fill-none stroke-current hover:stroke-none hover:fill-primary" />
            00
          </button>
        </div>
      </div> */}
      <div className="mt-4 px-6">
        {reviews
          ?.map((review) => (
            // <div key={data.id} className="divide-y divide-gray-200">
            //   <div className="flex justify-between px-6 py-[15px]">
            //     <div id="question-item" className="flex flex-col">
            //       <div className="flex justify-between items-center">
            //         <h3 className="font-bold">{data.question_title}</h3>
            //       </div>
            //       <div
            //         id="qnaStatus"
            //         className="flex items-center mt-1 text-xs text-darkgray"
            //       >
            //         <div>{data.complete ? 'Answered' : 'Pending'}</div>
            //         <p>・</p>
            //         <span>{data.author}</span>
            //         <p>・</p>
            //         <div>
            //           {new Date(data.createDate).toLocaleDateString('ko-KR')}
            //         </div>
            //       </div>
            //     </div>
            //     {data.complete ? (
            //       <button onClick={() => toggleReviewopen(data.id)}>
            //         {openReviews[data.id] ? <IconArrowUp /> : <IconArrowDown />}
            //       </button>
            //     ) : null}
            //   </div>
            //   {openReviews[data.id] && (
            //     <div className="mt-2 bg-gray p-6">
            //       <h3 className="font-bold mb-[15px]">{data.answerTitle}</h3>
            //       <p className="mb-[15px]">{data.answer}</p>
            //       <small className="text-sm">
            //         {data.answerDate.split('T', 1)}
            //       </small>
            //     </div>
            //   )}
            // </div>
            <div className="relative" key={review.id}>
              <div className="flex">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  {}
                  <img
                    src={
                      review.user.profile_image_url || '/images/user-empty.png'
                    }
                    alt="sample img"
                  ></img>
                </div>
                <div className="text-[14px] ml-4">
                  <strong className="font-semibold">{review.user.name}</strong>
                  <p className="flex items-center">
                    <IconReviewStar className="mr-1" />
                    {review.rating}
                  </p>
                </div>
              </div>
              <p className="text-[14px] mt-4">{review.review}</p>
              <span className="absolute right-0 top-0 p-2 border border-gray-300 rounded-lg flex items-center">
                <IconReviewHeart className="mr-1 fill-none stroke-current hover:stroke-none hover:fill-primary" />
                {review.likes_count}
              </span>
            </div>
          ))
          .slice(0, 1)}
      </div>
    </div>
  );
};

export default ClassDetailReview;
