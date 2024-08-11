import { Link } from 'react-router-dom';
import { IconLogo } from '../../config/IconData';

const Header = () => {
  return (
    <div className="h-[60px] bg-white sticky top-0 left-0 flex items-center border-y border-gray-200 px-[30px] justify-between">
      <h1 className="">
        <IconLogo className="h-[24px]" />
      </h1>
      <div className="w-[30px] h-[24px] flex flex-col justify-between cursor-pointer">
        <span className="block w-full h-[1px] border-b border-b-1 border-black"></span>
        <span className="block w-full h-[1px] border-b border-b-1 border-black"></span>
        <span className="block w-full h-[1px] border-b border-b-1 border-black"></span>
      </div>
      <ul className="flex items-center justify-center">
        <li>
          <Link to="">LOGIN</Link>
        </li>
        <li>
          <Link to="">CART(0)</Link>
        </li>
      </ul>
      <ul className="flex">
        <li>
          <Link to="">제휴업체 바로가기</Link>
        </li>

        <li>
          <Link to="">서포터즈 바로가기</Link>
        </li>
      </ul>
    </div>
  );
};

export default Header;
