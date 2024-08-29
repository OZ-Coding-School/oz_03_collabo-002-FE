import { IconRemove } from '../../config/IconData';

const OrderHeader = () => {
  return (
    <div className="w-full h-fit flex relative py-[15px]">
      <div className="m-auto font-extrabold">Proceed to Payment</div>
      <button className="absolute right-5 ">
        <IconRemove />
      </button>
    </div>
  );
};

export default OrderHeader;
