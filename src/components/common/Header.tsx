import { Link } from 'react-router-dom';
import { IconLogo } from '../../config/IconData';

const Header = () => {
  return (
    <header className="bg-white sticky top-0 left-0 border-y border-gray-200">
      <div className="flex items-center justify-between py-4 px-5">
        <h1 className="">
          <IconLogo className="h-[24px]" />
        </h1>
        <ul className="flex items-center justify-center gap-2 text-sm">
          <li>
            <Link to="">LOGIN</Link>
          </li>
          <li>
            <Link to="">CART(0)</Link>
          </li>
        </ul>
      </div>
      <ul className="flex justify-items-start gap-2 w-full py-3 px-5">
        <li className="hover:text-primary">
          <Link to="">홈</Link>
        </li>
        <li className="hover:text-primary">
          <Link to="">제휴업체 바로가기</Link>
        </li>
        <li className="hover:text-primary">
          <Link to="">서포터즈 바로가기</Link>
        </li>
      </ul>
    </header>
  );
};

export default Header;
