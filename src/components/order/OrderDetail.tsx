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

  useEffect(() => {
    const fetchClassInfo = async () => {
      if (data?.class_id) {
        const currentClass = await findOneClass(String(data.class_id));
        setClassInfo(currentClass);
      }
    };
    fetchClassInfo();
  }, [data?.class_id, findOneClass]);

  if (!classInfo) return <div>Loading...</div>;

  return (
    <div className="px-6 py-[30px]">
      <div className="flex items-center mb-4">
        <div className="w-16 h-16 bg-gray-200 mr-4">
          {classInfo.images[0]?.thumbnail_image_urls[0]}
        </div>
        <div>
          <h2 className="font-bold text-lg">{classInfo.title}</h2>
          <p className="text-sm text-gray-600">{data?.class_date_id}</p>
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
        <h3 className="font-bold mb-2">Application Details *</h3>
        <input
          type="text"
          placeholder="Please enter your name."
          className="w-full p-2 border rounded"
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
