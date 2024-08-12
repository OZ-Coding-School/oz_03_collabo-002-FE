import { Link } from 'react-router-dom';
import { IconFtInsta } from '../../config/IconData';
import { twMerge as tw } from 'tailwind-merge';

const Footer = () => {
  return (
    <footer className="relative pt-[60px]">
      <ul className="absolute right-[24px] top-[60px] flex text-s gap-6 text-sm">
        <li>
          <Link to="">이용약관</Link>
        </li>
        <li>
          <Link to="">개인정보 처리방침</Link>
        </li>
      </ul>
      <div className="px-6 text-sm">
        <p
          className={tw(
            'w-8 h-8 border border-gray-300 rounded-full',
            'flex items-center justify-center mb-4 cursor-pointer',
          )}
        >
          <Link
            to="https://www.instagram.com/customk_official/"
            target="_blank"
          >
            <IconFtInsta />
          </Link>
        </p>
        <strong>커스텀케이(Custom-K)</strong>
        <p>대표 : 박진우</p>
        <p>주소 : 서울특별시 송파구 백제고분로34길 3-37, 502호(석촌동)</p>
        <p>사업자등록번호 : 146-30-01485</p>
        <p>
          <Link
            to="http://www.ftc.go.kr/bizCommPop.do?wrkr_no=1463001485"
            target="_blank"
          >
            [사업자 정보 확인]
          </Link>
        </p>
        <p>통신판매신고번호 : 제 2024-서울송파-2502</p>
        <p>개인정보관리책임자 : 박진우</p>
        <p>연락처 : 01042220225</p>
        <p>이메일 문의 : customk7878@gmail.com</p>
      </div>
    </footer>
  );
};

export default Footer;
