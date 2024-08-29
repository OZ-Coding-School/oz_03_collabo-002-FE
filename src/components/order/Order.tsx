import { OrderData } from '../../type/order.type';
import OrderHeader from './OrderHeader';
import OrderDetail from './OrderDetail';
import OrderButton from './OrderButton';

type OrderProp = {
  data: OrderData;
};

const Order = ({ data }: OrderProp) => {

  return (
    <>
      <OrderHeader />
      <OrderDetail data={data} />
      <OrderButton data={data} />
    </>
  );
};

export default Order;
