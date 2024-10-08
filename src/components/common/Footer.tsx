import { Link } from 'react-router-dom';
import { IconFtInsta } from '../../config/IconData';
import { twMerge as tw } from 'tailwind-merge';
import { useModalOpenCloseStore } from '../../store/useModal'; // useModalOpenCloseStore 사용
import Modal from './Modal'; // 모달 컴포넌트 임포트
import Terms from './Terms'; // Terms 컴포넌트 임포트
import Policy from './Policy'; // Policy 컴포넌트 임포트
import { useEffect } from 'react';

const Footer = () => {
  const { setModal } = useModalOpenCloseStore();
  const path = location.pathname;

  useEffect(() => {
    const footer = document.querySelector('#footer') as HTMLElement
    if (footer) {
      if (location.pathname.includes('/class/')) {
        footer.style.paddingBottom = '200px';
      } else {
        footer.style.paddingBottom = '';
      }
    }

    return () => {
      if (footer) {
        footer.style.paddingBottom = '';
      }
    };
  }, [path]);

  const handleTerms = () => {
    setModal(<Terms />); // Terms 모달 열기
  };

  const handlePrivacy = () => {
    setModal(<Policy />); // Privacy Policy 모달 열기
  };

  return (
    <>
      <footer id='footer' className="relative pt-20 z-10 pb-10">
        <ul className="absolute right-[24px] top-20 flex text-s gap-6 text-sm">
          <li>
            <button onClick={handleTerms}>Terms and conditions</button>
          </li>
          <li>
            <button onClick={handlePrivacy}>Privacy policy</button>
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
          <p>
            Telecommunication Sales Report Number: No. 2024-Seoul Songpa-2502
          </p>
          <p>Personal Information Manager: Jinwoo Park</p>
          <p>Email : customk7878@gmail.com</p>
        </div>
      </footer>

      {/* 커스텀 모달 */}
      <Modal />
    </>
  );
};

export default Footer;
