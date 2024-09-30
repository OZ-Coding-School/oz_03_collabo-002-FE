import { useEffect, useState } from 'react';
import { BookingData } from '../../store/useBookingStore';
import { useClassStore } from '../../store/useClassStore';
import { Class } from '../../type/class.type';
import { twJoin as tw } from 'tailwind-merge';

type Props = {
  data: BookingData;
  referralCode: string;
  reservationName: string;
  onReferralCodeChange: (code: string) => void;
  onReservationNameChange: (name: string) => void;
};
const OrderDetail = ({
  data,
  referralCode,
  onReferralCodeChange,
  reservationName,
  onReservationNameChange,
}: Props) => {
  const findOneClass = useClassStore((state) => state.findOneClass);
  const [classInfo, setClassInfo] = useState<Class | null>(null);
  const [reservedDate, setReservedDate] = useState<string>('Loading...');
  const [reservedTime, setReservedTime] = useState<string>('Loading...');

  useEffect(() => {
    const fetchClassInfo = async () => {
      if (data?.class_id) {
        const currentClass = await findOneClass(String(data.class_id));
        setClassInfo(currentClass);
        console.log('currentClass.Date: ', currentClass?.dates[0].id);
        console.log('data.Date: ', data.class_date_id);
        const reserved = await currentClass?.dates.find(
          (item) => item.id === data.class_date_id,
        );
        console.log('reserved: ', reserved);
        setReservedDate(reserved?.start_date || 'Date not available');
        setReservedTime(
          reserved
            ? `${reserved.start_time} - ${reserved.end_time}`
            : 'Time not available',
        );
      }
    };
    fetchClassInfo();
  }, [data?.class_id, data?.class_date_id, findOneClass]);

  if (!classInfo) return <div>Loading...</div>;

  return (
    <div className="px-6 pt-10">
      {/* 예약 클래스 정보 */}
      <div className="flex mb-10">
        <div className="w-28 aspect-square bg-gray-200 mr-4">
          <img
            src={
              classInfo.images[0]?.thumbnail_image_urls?.[0] ||
              classInfo.images[0]?.description_image_urls[0]
            }
            className="w-28 aspect-square cover object-cover object-top rounded-md"
          />
        </div>
        <div>
          <div>
            <h2 className="font-bold text-lg mb-3">{classInfo.title}</h2>
            <p className="text-sm text-gray-600">
              {reservedDate} {reservedTime}
            </p>
            <p className="text-sm mb-3">Payment for {data?.quantity} Person</p>
          </div>
          <div className="mb-4">
            <span
              className={tw(
                'inline-block bg-gray/30 rounded-full px-2 py-1/2 mr-2',
                'text-sm font-semibold ',
              )}
            >
              Option
            </span>
            <span className="text-sm text-gray-600">{data?.options}</span>
          </div>
        </div>
      </div>

      {/* 예약자명 입력 */}
      <div className="mb-10">
        <h3 className="font-bold mb-3">
          Application Details <span className="text-red">*</span>
        </h3>
        <input
          id="username"
          name="username"
          type="text"
          placeholder="Please enter your name."
          className="w-full p-2 border rounded"
          value={reservationName}
          onChange={(e) => onReservationNameChange(e.target.value)}
          required
        />
      </div>

      {/* 결제금액 정보 */}
      <div className="mb-10 leading-8">
        <h3 className="font-bold mb-2">Payment Amount</h3>
        <div className="flex justify-between mb-1">
          <span>Base Workshop Amount</span>
          <span>${data?.amount}</span>
        </div>
        <div className="flex justify-between mb-1">
          <span>Language Support</span>
          <span>0$</span>
        </div>
        <hr />
        <div className="flex justify-between font-bold text-red-500">
          <span>Total Amount</span>
          <span>${data?.amount}</span>
        </div>
      </div>

      {/* 추천인 입력 */}
      <div className="mb-10">
        <h3 className="font-bold mb-3">Referral Code</h3>
        <input
          id="referral-code"
          name="referral-code"
          type="text"
          placeholder="Please enter the referral code."
          className="w-full p-2 border rounded"
          value={referralCode}
          onChange={(e) => onReferralCodeChange(e.target.value)}
        />
      </div>
    </div>
  );
};

export default OrderDetail;
