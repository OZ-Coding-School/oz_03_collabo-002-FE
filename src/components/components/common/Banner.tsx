import { IconBnrSmile } from '../../config/IconData';

const Banner = () => {
  return (
    <div className="bg-gradient-to-r from-[#9095ff] to-[#f9fdb2] flex px-10 py-[29px] text-white rounded-2xl items-center justify-items-start">
      <IconBnrSmile />
      <div className="ml-[22px]">
        <strong className="text-xl">제휴업체 지원하기</strong>
        <p className="text-sm mt-1">
          외국인 관광객분들께 소중한 추억을 선물할 제작자 <br />
          분들을 모집합니다.
        </p>
      </div>
    </div>
  );
};

export default Banner;
