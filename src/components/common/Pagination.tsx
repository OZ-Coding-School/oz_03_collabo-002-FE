import { IconPaginationLeft, IconPaginationRight } from '../../config/IconData';

const Pagination = () => {
  return (
    <>
      <ol className="flex items-center justify-center text-center gap-1">
        <li className="text-zero w-6 h-6 rounded-full border border-gray-800 bg-gray-200">
          <span className="sr-only">prev</span>
          <button className="mb-[2px]">
            <IconPaginationLeft />
          </button>
        </li>
        <li className="w-6 h-6 rounded-full text-white bg-primary">
          <button className="w-full">1</button>
        </li>
        <li className="w-6 h-6 rounded-full text-gray-700">
          <button className="w-full">2</button>
        </li>
        <li className="w-6 h-6 rounded-full text-gray-700">
          <button className="w-full">3</button>
        </li>
        <li className="w-6 h-6 rounded-full text-gray-700">
          <button className="w-full">4</button>
        </li>
        <li className="w-6 h-6 rounded-full text-gray-700">
          <button className="w-full">5</button>
        </li>
        <li className="text-zero w-6 h-6 rounded-full border border-gray-300 bg-white">
          <button className="mb-[24px]">
            <IconPaginationRight />
          </button>
          <span className="sr-only">next</span>
        </li>
      </ol>
    </>
  );
};

export default Pagination;
