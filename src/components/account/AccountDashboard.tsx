import { Link } from 'react-router-dom';
import { IconPaginationRight } from '../../config/IconData';

const AccountDashboard = () => {
  return (
    <div className={`w-full px-6`}>
      {/* 회원정보 수정 */}
      <Link
        to={'/account?page=edit'}
        className="w-full h-[60px] flex justify-between items-center"
      >
        <h3>Edit Profile</h3>
        <div className="w-6 h-6">
          <IconPaginationRight />
        </div>
      </Link>
      {/* 주문내역 보기 */}
      <Link
        to={'/account?page=orders'}
        className="w-full h-[60px] flex justify-between items-center"
      >
        <h3>My Orders</h3>
        <div className="w-6 h-6">
          <IconPaginationRight />
        </div>
      </Link>
      {/* 나의 리뷰 보기 */}
      <Link
        to={'/account?page=review'}
        className="w-full h-[60px] flex justify-between items-center"
      >
        <h3>My Review</h3>
        <div className="w-6 h-6">
          <IconPaginationRight />
        </div>
      </Link>
      {/* 나의 문의글 보기 */}
      <Link
        to={'/account?page=question'}
        className="w-full h-[60px] flex justify-between items-center"
      >
        <h3>My Question</h3>
        <div className="w-6 h-6">
          <IconPaginationRight />
        </div>
      </Link>
    </div>
  );
};

export default AccountDashboard;
