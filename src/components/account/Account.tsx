import IconOrder from './../../assets/icon/icon-shortcut-order.svg';

const Account = () => {
  return (
    <div>
      <div className="w-full h-full relative bg-white">
        {/* 전체 바디 영역 */}
        <div className="w-full">
          {/* 상단 유저정보 영역 */}
          <div className="w-full h-[250px] bg-primary rounded-bl-3xl">
            <div className="w-6 h-[26.88px] left-[12px] top-[14.56px] " />
            <div className="w-[142px] h-[129px] left-[169px] top-[60px] ">
              <div className="w-[75px] h-[75px] left-[33px] top-0 ">
                <div className="w-[75px] h-[75px] left-0 top-0 ">
                  <div className="w-[75px] h-[75px] left-0 top-0  rounded-full border-2 border-white" />
                  <div className="w-[56.25px] h-[56.25px] left-[9.38px] top-[9.38px] ">
                    <div className="w-[42.19px] h-[46.88px] left-[7.03px] top-[4.69px] "></div>
                  </div>
                </div>
                <div className="w-[30px] h-[30px] left-[45px] top-[45px] ">
                  <div className="w-[30px] h-[30px] left-0 top-0  bg-[#ffcd2a] rounded-full" />
                  <div className="w-[22.50px] h-[22.50px] left-[3.75px] top-[3.75px] ">
                    <div className="w-[18.28px] h-[18.28px] left-[1.88px] top-[2.34px] ">
                      <div className="w-[2.81px] h-[2.81px] left-[12.19px] top-[3.28px]  rounded-full border border-white" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="left-[24px] top-[85px]  text-center text-white text-lg font-extrabold font-['NanumSquare']">
                user name
              </div>
              <div className="left-0 top-[115px]  text-center text-white text-xs font-bold font-['NanumSquare']">
                user_mail@example.com
              </div>
            </div>
          </div>
          {/* 하단 컨텐츠 영역 */}
          <div className="bg-primary">
            <div className="w-full bg-white rounded-tr-3xl">
              <div className="w-full h-[60px] left-0 top-0 ">
                <div className="w-full h-[60px] left-0 top-0" />
                <div className="left-[20px] top-[21px]  text-black text-base font-bold font-['NanumSquare']">
                  Language
                </div>
                <div className="left-[391px] top-[23px]  text-right text-black text-xs font-bold font-['NanumSquare']">
                  English
                </div>
                <div className="w-6 h-6 left-[438px] top-[18px] " />
              </div>
              <div className="w-full h-[60px] left-0 top-[60px] ">
                <div className="w-full h-[60px] left-0 top-0  bg-white" />
                <div className="left-[20px] top-[21px]  text-black text-base font-bold font-['NanumSquare']">
                  Darkmode
                </div>
                <div className="w-10 h-5 left-[420px] top-[20px] ">
                  <div className="w-10 h-5 left-0 top-0  bg-[#d1d1d1] rounded-[25px]" />
                  <div className="w-4 h-4 left-[2px] top-[2px]  bg-white rounded-3xl" />
                </div>
              </div>
              <div className="w-full h-[60px] left-0 top-[120px] ">
                <div className="w-full h-[60px] left-0 top-0  bg-white" />
                <div className="left-[20px] top-[21px]  text-black text-base font-bold font-['NanumSquare']">
                  My Profile
                </div>
                <div className="w-6 h-6 left-[438px] top-[19px] " />
              </div>
              <div className="w-full h-[60px] left-0 top-[180px] ">
                <div className="w-full h-[60px] left-0 top-0  bg-white" />
                <div className="left-[20px] top-[21px]  text-black text-base font-bold font-['NanumSquare']">
                  My Orders
                </div>
                <div className="w-6 h-6 left-[438px] top-[19px] " />
              </div>
              <div className="w-full h-[60px] left-0 top-[240px] ">
                <div className="w-full h-[60px] left-0 top-0  bg-white" />
                <div className="left-[20px] top-[21px]  text-black text-base font-bold font-['NanumSquare']">
                  My Review
                </div>
                <div className="w-6 h-6 left-[438px] top-[19px] " />
              </div>
              <div className="w-full h-[60px] left-0 top-[300px] ">
                <div className="w-full h-[60px] left-0 top-0  bg-white" />
                <div className="left-[20px] top-[21px]  text-black text-base font-bold font-['NanumSquare']">
                  My Question
                </div>
                <div className="w-6 h-6 left-[438px] top-[19px] " />
              </div>
              <div className="w-full h-[60px] left-0 top-[360px] ">
                <div className="w-full h-[60px] left-0 top-0  bg-white" />
                <div className="left-[20px] top-[21px]  text-black text-base font-bold font-['NanumSquare']">
                  Today workshop
                </div>
                <div className="w-6 h-6 left-[438px] top-[19px] " />
              </div>
            </div>
          </div>
        </div>
        {/* 숏컷 영역 */}
        <div className="w-full px-10 absolute top-[250px] -translate-y-1/2">
          <div className="w-full h-24  bg-white rounded-[10px] shadow">
            <div className="w-10 h-10 left-[25px] top-[20px] ">
              <div className="w-5 h-5 left-[10px] top-0 ">
                <div className="w-[15.83px] h-[17.08px] left-[2.08px] top-[1.67px] "></div>
              </div>
              <div className="left-[4px] top-[26px]  text-center text-black text-xs font-bold font-['NanumSquare']">
                <IconOrder />
              </div>
            </div>
            <div className="w-10 h-10 left-[210px] top-[20px] ">
              <div className="w-5 h-5 left-[10px] top-0 ">
                <div className="w-[15.83px] h-[17.08px] left-[2.08px] top-[1.67px] "></div>
              </div>
              <div className="left-[4px] top-[26px]  text-center text-black text-xs font-bold font-['NanumSquare']">
                order
              </div>
            </div>
            <div className="w-10 h-10 left-[395px] top-[20px] ">
              <div className="w-5 h-5 left-[10px] top-0 ">
                <div className="w-[15.83px] h-[17.08px] left-[2.08px] top-[1.67px] "></div>
              </div>
              <div className="left-[4px] top-[26px]  text-center text-black text-xs font-bold font-['NanumSquare']">
                order
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;

