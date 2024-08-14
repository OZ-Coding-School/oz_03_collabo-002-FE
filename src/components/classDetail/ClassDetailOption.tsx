import React from 'react';
import {
  IconOptionArw,
  IconOptionCart,
  IconOptionHeart,
  IconOptionMinus,
  IconOptionPlus,
  IconOptionRemove,
} from '../../config/IconData';
import { Link } from 'react-router-dom';

const ClassDetailOption = () => {
  return (
    <>
      <div className="bg-white h-[121px] absolute bottom-[60px] left-0 right-0 z-20"></div>

      <div className="shadow-custom rounded-xl px-6 pt-[27px] pb-[34px] absolute bottom-[167px] z-30 bg-white w-full">
        <div className="relative w-full">
          <select className="outline-none appearance-none border border-gray-400 rounded-lg px-4 py-[16px] w-full text-gray-400">
            <option>class type</option>
            <option>class type</option>
            <option>class type</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <IconOptionArw />
          </div>
        </div>

        <div className="bg-gray-100 border border-gray-300 rounded-xl relative mt-5 py-[18px] px-4">
          <div className="flex justify-between items-center">
            <p className="text-[12px] max-w-52">
              2024. 07. 29 (Sat) 12:00 - 13:30 Korean Cocktail Master Class
            </p>
            <button className="cursor-pointer">
              <span className="sr-only">close</span>
              <IconOptionRemove />
            </button>
          </div>
          <div className="flex justify-between items-center mt-[18px]">
            <div className="flex">
              <p className="cursor-pointer bg-gray-300 rounded-full w-6 flex items-center justify-center">
                <IconOptionMinus />
                <span className="sr-only">minus</span>
              </p>
              <p className="px-3">0</p>
              <p className="cursor-pointer bg-gray-300 rounded-full w-6 flex items-center justify-center">
                <IconOptionPlus />
                <span className="sr-only">plus</span>
              </p>
            </div>
            <div>72$</div>
          </div>
        </div>
      </div>

      <div className="px-6 py-8 border-t border-1 border-gray-300 fixed bottom-0 left-0 right-0 z-30 bg-white max-w-[473px] w-full m-auto">
        <div className="flex justify-between items-center">
          <p>Total 2</p>
          <p>
            <strong className="text-[#D91010] text-[20px] font-semibold">
              Total 72$
            </strong>
          </p>
        </div>
        <div className="flex gap-7 mt-4">
          <button>
            <Link to="">
              <IconOptionHeart />
              <span className="sr-only">heart</span>
            </Link>
          </button>
          <button>
            <Link to="">
              <IconOptionCart />
              <span className="sr-only">cart</span>
            </Link>
          </button>
          <button className="flex-grow text-white bg-primary rounded-xl py-4">
            <Link to="">Book Now</Link>
          </button>
        </div>
      </div>
    </>
  );
};

export default ClassDetailOption;
