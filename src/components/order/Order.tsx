import { OrderData } from '../../type/order';
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
      <OrderButton />
    </>
  );
};

export default Order;
