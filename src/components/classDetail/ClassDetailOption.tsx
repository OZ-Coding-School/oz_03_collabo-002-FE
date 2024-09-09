import React, { useState } from 'react';
import {
  IconOptionHeart,
  IconOptionMinus,
  IconOptionPlus,
  IconOptionRemove,
} from '../../config/IconData';

type Props = {
  discountedPrice: number;
  bookingQuantity: number;
  setBookingQuantity: (
    value: number | ((prevQuantity: number) => number),
  ) => void;
  selectedDate: Date | null;
  selectedTime: string | null;
  selectedClassType: string | null;
  classPrice: number;
  availableTimes: string[];
  onBookNowClick: () => void;
  onRemoveOptionClick?: () => void;
  onBookingClick?: () => void;
};

const ClassDetailOption: React.FC<Props> = ({
  discountedPrice,
  bookingQuantity,
  setBookingQuantity,
  selectedDate,
  selectedTime,
  selectedClassType,
  classPrice = 0,
  availableTimes,
  onRemoveOptionClick,
  onBookNowClick,
}) => {
  const [isLiked, setIsLiked] = useState(false);

  const handleIncrease = () => {
    setBookingQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecrease = () => {
    setBookingQuantity((prevQuantity) =>
      prevQuantity > 0 ? prevQuantity - 1 : 0,
    );
  };

  const toggleLike = () => {
    setIsLiked((prevIsLiked) => !prevIsLiked);
  };

  const totalPrice = bookingQuantity * classPrice;

  return (
    <>
      <div className="shadow-custom rounded-xl px-6 pt-[27px] fixed bottom-0 left-0 right-0 z-30 bg-white max-w-[473px] w-full m-auto">
        {selectedDate && selectedTime && (
          <div className="bg-gray-100 border border-gray-300 rounded-xl py-[18px] px-4">
            <div className="flex justify-between items-center">
              <p className="text-[12px] max-w-52">
                {selectedDate.toLocaleDateString()} {selectedTime}
                {selectedClassType && `(${selectedClassType})`}
              </p>
              <button className="cursor-pointer" onClick={onRemoveOptionClick}>
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
              <div>{classPrice ? `${classPrice.toLocaleString()}$` : ''}</div>
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
              onClick={onBookNowClick}
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
