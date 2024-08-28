type OrderButtonProps = {};

const OrderButton = ({}: OrderButtonProps) => {
  return (
    <div className="px-6 mb-5">
      <h2 className="text-lg font-extrabold mb-3">
        Payment Method
      </h2>
      <div className="flex gap-3 flex-wrap sm:flex-nowrap">
        <button className="w-full rounded-lg border border-darkgray py-2">
          Paypal
        </button>
        <button className="w-full rounded-lg border border-darkgray py-2">
          Wire Transfer
        </button>
      </div>
    </div>
  );
};

export default OrderButton;
