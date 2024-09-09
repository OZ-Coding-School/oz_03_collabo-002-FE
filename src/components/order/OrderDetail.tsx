import { useEffect, useState } from 'react';
import { BookingData } from '../../store/useBookingStore';
import useClassStore from '../../store/useClassStore';
import { Class } from '../../type/class.type';

type Props = {
  data: BookingData;
};
const OrderDetail = ({ data }: Props) => {
  const findOneClass = useClassStore((state) => state.findOneClass);
  const [classInfo, setClassInfo] = useState<Class | null>(null);
  const [reservedDate, setReservedDate] = useState<string>('Loading...')
  const [reservedTime, setReservedTime] = useState<string>('Loading...')

  useEffect(() => {
    const fetchClassInfo = async () => {
      if (data?.class_id) {
        const currentClass = await findOneClass(String(data.class_id));
        setClassInfo(currentClass);

        const reserved = await currentClass?.dates.find((date) => date.id === data.class_date_id);
        setReservedDate(reserved?.start_date || 'Date not available');
          setReservedTime(
            reserved ? `${reserved.start_time} - ${reserved.end_time}` : 'Time not available'
          );
      }
    };
    fetchClassInfo();
  }, [data?.class_id, data?.class_date_id, findOneClass]);

  if (!classInfo) return <div>Loading...</div>;

  return (
    <div className="px-6 py-[30px]">
      <div className="flex items-center mb-4">
        <div className="w-28 aspect-square bg-gray-200 mr-4">
          <img src={classInfo.images[0]?.thumbnail_image_urls[0]} alt={classInfo.images[0]?.thumbnail_image_urls[0]}  className='w-full h-full rounded-md'/>
        </div>
        <div>
          <h2 className="font-bold text-lg">{classInfo.title}</h2>
          <p className="text-sm text-gray-600">{reservedDate}{' '}{reservedTime}</p>
          <p className="text-sm">Payment for {data?.quantity} Person</p>
        </div>
      </div>

      <div className="mb-4">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
          Option
        </span>
        <span className="text-sm text-gray-600">
          Required Options : {data?.options}
        </span>
      </div>

      <div className="mb-4">
        <h3 className="font-bold mb-2">Application Details  <span className='text-red'>*</span></h3>
        <input
          type="text"
          placeholder="Please enter your name."
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div className="mb-4">
        <h3 className="font-bold mb-2">Payment Amount</h3>
        <div className="flex justify-between mb-1">
          <span>Base Workshop Amount</span>
          <span>${data?.amount}</span>
        </div>
        <div className="flex justify-between mb-1">
          <span>Language Support</span>
          <span>0$</span>
        </div>
        <div className="flex justify-between font-bold text-red-500">
          <span>Total Amount</span>
          <span>${data?.amount}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
