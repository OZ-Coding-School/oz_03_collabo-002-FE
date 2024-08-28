import { Link } from 'react-router-dom';
import {
  IconAllArw,
  IconReviewHeart,
  IconReviewStar,
} from '../../config/IconData';

const ClassDetailReview = () => {
  return (
    <div className="mt-10">
      <h3 className="text-[20px] px-6 font-semibold flex justify-between">
        Reviews
        <Link to="/review" className="text-[14px] font-normal flex items-center">
          view all
          <IconAllArw className="ml-1" />
        </Link>
      </h3>
      <div className="px-6 flex mt-4">
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
      </div>
    </div>
  );
};

export default ClassDetailReview;
