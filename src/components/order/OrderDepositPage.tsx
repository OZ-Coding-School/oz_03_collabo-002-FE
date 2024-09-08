import { useLocation, Link } from 'react-router-dom';
import { IconArrowLeft } from '../../config/IconData'; // 아이콘 import 필요

const OrderDepositPage = () => {
  const location = useLocation();
  const { orderData } = location.state || {};

  return (
    <div>
      <div className="py-[15px] absolute top-0 z-40 left-1/2 -translate-x-1/2">
        <h1 className="text-xl font-bold">Wire Transfer Info</h1>
      </div>

      {orderData ? (
        <div className="p-6">
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Order Summary</h2>
            <p className="text-gray-600">Class: {orderData.title}</p>
            <p className="text-gray-600">Date: {orderData.class_date_id}</p>
            <p className="text-gray-600">Quantity: {orderData.quantity}</p>
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Payment Details</h2>
            <p className="text-xl font-bold text-primary">Amount: ${orderData.amount}</p>
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Bank Account Information</h2>
            <p className="text-gray-600">Account Number: 123-456-789</p>
            <p className="text-gray-600">Bank Name: Example Bank</p>
            <p className="text-gray-600">Account Holder: Company Name</p>
          </div>

          <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6" role="alert">
            <p className="font-bold">Important:</p>
            <p>Please make sure to include your order number in the transfer description.</p>
          </div>

          <Link 
            to="/account?page=orders" 
            className="block w-full text-center bg-primary text-white py-2 px-4 rounded hover:bg-primary-dark transition duration-300"
          >
            Check Order History
          </Link>
        </div>
      ) : (
        <div className="p-6">
          <p className="text-red-500">Unable to load order information.</p>
        </div>
      )}
    </div>
  );
};

export default OrderDepositPage;