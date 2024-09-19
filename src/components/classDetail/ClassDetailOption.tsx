import { useEffect, useState } from 'react';
import {
  IconOptionHeart,
  IconOptionMinus,
  IconOptionPlus,
  IconOptionRemove,
} from '../../config/IconData';
import { useNavigate } from 'react-router-dom';
import { Class } from '../../type/class.type';
import useBookingStore from '../../store/useBookingStore';

type ClassDetailOptionProps = {
  discountedPrice: number;
  bookingQuantity: number;
  setBookingQuantity: (
    value: number | ((prevQuantity: number) => number),
  ) => void;
  selectedDate: Date | null;
  selectedTime: string | null;
  selectedDateId: string | null;
  classItemState: Class;
  selectedSupportLanguage: string;
  selectedClassType: string;
};

const ClassDetailOption = ({
  discountedPrice,
  bookingQuantity,
  setBookingQuantity,
  selectedDate,
  selectedTime,
  selectedDateId,
  classItemState,
  selectedSupportLanguage,
  selectedClassType,
}: ClassDetailOptionProps) => {
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [showSummary, setShowSummary] = useState<boolean>(false);
  const addBookingItem = useBookingStore((state) => state.addBookingItem);
  const totalPrice = bookingQuantity * discountedPrice;
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedDate && selectedTime) {
      setShowSummary(true);
    } else {
      setShowSummary(false);
    }
  }, [selectedDate, selectedTime, selectedSupportLanguage, selectedClassType]);

  const handleBookingClick = () => {
    if (
      !selectedDate ||
      !selectedTime ||
      !selectedSupportLanguage ||
      !selectedClassType
    ) {
      alert(
        'Please select all required options: Date, Time, Support Language, and Class Type',
      );
      return;
    }

    const bookingData = {
      class_id: classItemState.id,
      class_date_id: selectedDateId,
      quantity: bookingQuantity,
      options: selectedClassType,
      amount: totalPrice,
      title: classItemState.title,
      support_language: selectedSupportLanguage,
    };

    addBookingItem(bookingData);
    navigate('/charge/');
  };

  const handleIncrease = () => {
    setBookingQuantity((prevQuantity: number) => prevQuantity + 1);
  };

  const handleDecrease = () => {
    setBookingQuantity((prevQuantity: number) =>
      prevQuantity > 1 ? prevQuantity - 1 : 1,
    );
  };

  const toggleLike = () => {
    setIsLiked((prevIsLiked: boolean) => !prevIsLiked);
  };

  return (
    <>
      <div className="shadow-custom rounded-xl px-6 pt-[27px] fixed bottom-0 left-0 right-0 z-30 bg-white max-w-[473px] w-full m-auto">
        {showSummary && (
          <div className="bg-gray-100 border border-gray-300 rounded-xl py-[18px] px-4">
            <div className="flex justify-between items-center">
              <p id="booking-info" className="text-[12px] max-w-52">
                {selectedDate?.toLocaleDateString()} {selectedTime}
                {selectedSupportLanguage && <br />}
                {selectedSupportLanguage}{' '}
                {selectedClassType && `- ${selectedClassType}`}
              </p>
              <button
                className="cursor-pointer"
                onClick={() => {
                  setBookingQuantity(1);
                }}
              >
                <span className="sr-only">close</span>
                <IconOptionRemove />
              </button>
            </div>
            <div className="flex justify-between items-center mt-[18px]">
              <div className="flex">
                <button
                  className="cursor-pointer bg-gray-300 rounded-full w-6 flex items-center justify-center"
                  onClick={handleDecrease}
                >
                  <IconOptionMinus />
                  <span className="sr-only">minus</span>
                </button>
                <p className="px-3">{bookingQuantity}</p>
                <button
                  className="cursor-pointer bg-gray-300 rounded-full w-6 flex items-center justify-center"
                  onClick={handleIncrease}
                >
                  <IconOptionPlus />
                  <span className="sr-only">plus</span>
                </button>
              </div>
              <div>
                {discountedPrice ? `${discountedPrice.toLocaleString()}$` : ''}
              </div>
            </div>
          </div>
        )}

        <div className="py-6">
          <div className="flex justify-between items-center">
            <p>Total Quantity: {bookingQuantity}</p>
            <p>
              <strong className="text-[#D91010] text-[20px] font-semibold">
                Total:{' '}
                {Number.isNaN(totalPrice) ? '0' : totalPrice.toLocaleString()}$
              </strong>
            </p>
          </div>
          <div className="flex gap-7 mt-4">
            <button onClick={toggleLike}>
              <IconOptionHeart
                className={`${isLiked ? 'fill-primary' : 'fill-none'} hover:fill-primary`}
              />
              <span className="sr-only">heart</span>
            </button>
            <button
              className="flex-grow text-white bg-primary rounded-xl py-4"
              onClick={handleBookingClick}
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ClassDetailOption;
