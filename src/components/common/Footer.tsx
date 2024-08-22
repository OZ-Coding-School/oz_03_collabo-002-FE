import { Link } from 'react-router-dom';
import { IconFtInsta } from '../../config/IconData';
import { twMerge as tw } from 'tailwind-merge';

const Footer = () => {
  return (
    <footer className="relative pt-[60px] z-10">
      <ul className="absolute right-[24px] top-[60px] flex text-s gap-6 text-sm">
        <li>
          <Link to="">Terms and conditions</Link>
        </li>
        <li>
          <Link to="">Privacy policy</Link>
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
        <strong>Custom-K</strong>
        <p>Representative: Jinwoo Park</p>
        <p>
          Address: 502ho, 3-37, Baekjegobun-ro 34-gil, Songpa-gu, Seoul, South
          Korea
        </p>
        <p>Business Registration Number: 146-30-01485</p>
        <p>
          <Link
            to="http://www.ftc.go.kr/bizCommPop.do?wrkr_no=1463001485"
            target="_blank"
          >
            [Business Information Verification]
          </Link>
        </p>
        <p>Telecommunication Sales Report Number: No. 2024-Seoul Songpa-2502</p>
        <p>Personal Information Manager: Jinwoo Park</p>
        <p>Email : customk7878@gmail.com</p>
      </div>
    </footer>
  );
};

export default Footer;
