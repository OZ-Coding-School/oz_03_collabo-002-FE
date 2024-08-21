import { Link } from 'react-router-dom';
import { IconAllArw } from '../../config/IconData';

const ClassDetailPhotoReview = () => {
  return (
    <div>
      <h3 className="text-[20px] px-6 font-semibold flex justify-between">
        Photo Reviews
        <Link to="" className="text-[14px] font-normal flex items-center">
          view all
          <IconAllArw className="ml-1" />
        </Link>
      </h3>
      <div className="px-6 flex gap-4 mt-4">
        <div className="rounded-3xl overflow-hidden">
          <img src="./images/img-sample2.jpg" alt="sample img" />
        </div>
        <div className="rounded-3xl overflow-hidden">
          <img src="./images/img-sample2.jpg" alt="sample img" />
        </div>
      </div>
    </div>
  );
};

export default ClassDetailPhotoReview;
