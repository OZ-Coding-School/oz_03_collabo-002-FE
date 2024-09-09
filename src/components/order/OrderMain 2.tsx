import OrderHeader from './OrderHeader';
import OrderDetail from './OrderDetail';
import OrderButton from './OrderButton';
import { BookingData } from '../../store/useBookingStore';

type OrderProp = {
  data: BookingData;
};

const OrderMain = ({ data }: OrderProp) => {
  return (
    <>
      <OrderHeader />
      <OrderDetail data={data} />
      <OrderButton data={data} />
    </>
  );
};

export default OrderMain;
