import { useState } from 'react';
import { OrderData } from '../../type/order.type';

type OrderDetailProps = {
  data: OrderData;
};

const OrderDetail = ({ data }: OrderDetailProps) => {
  const [participantName, setParticipantName] = useState(data.name);
  console.log(data);
  const date = new Date(data.date);
  const classDate = date.toDateString();

  return (
    <div className="w-full relative text-black px-6 py-[15px]">
      {/* 선택 클래스 정보 */}
      <div className="flex w-full mb-10">
        <div className="w-20 h-20 bg-gray rounded-xl mr-5">
          <img src="/" alt="classThumbnail" />
        </div>
        <div className="leading-relaxed">
          <div>{data.classTitle}</div>
          <div>
            {classDate} / {data.time}
          </div>
          <div className="font-bold">
            Payment for {data.numberOfPeople} Person
          </div>
          <div>
            <span className="w-11 h-4 border border-darkgray text-darkgray text-xs mr-1 px-0.5">
              Option
            </span>
            <small className="   text-darkgray text-xs">
              {'Required Options : ' + data.option}
            </small>
          </div>
        </div>
      </div>
      {/* 클래스 참여자 정보 입력 */}
      <div className="mb-5">
        <div className="flex">
          <h2 className="text-lg font-extrabold mb-3">
            Application Details
          </h2>
          <span className="text-red font-[NanumSquareBold] ml-2">*</span>
        </div>
        <input
          value={participantName}
          onChange={(e) => setParticipantName(e.target.value)}
          className="w-96 h-8  rounded-lg border border-darkgray px-3 py-5"
          placeholder="Please enter your name."
          required
        />
      </div>
      {/* 결제 정보 */}
      <div className="mb-5">
        <h2 className="text-lg font-extrabold mb-3">
          Payment Amount
        </h2>
        <div className="flex justify-between leading-loose">
          <div>Base Workship Amount</div>
          <div>{data.baseWorkshopAmount + '$'}</div>
        </div>
        <div className="flex justify-between  leading-loose">
          <div>Language Support</div>
          <div>{data.languageSupport + '$'}</div>
        </div>
        <div className="flex justify-between  leading-loose">
          <div className="font-[NanumSquareBold]">Total Amount</div>
          <div className="font-[NanumSquareBold] text-red">
            {data.baseWorkshopAmount + data.languageSupport + '$'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
