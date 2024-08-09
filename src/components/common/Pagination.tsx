import { IconPaginationLeft } from '../../config/IconData';

const Pagination = () => {
  return (
    <>
      <ol className="flex items-center justify-center text-center gap-1">
        <li className="text-zero w-6 h-6 rounded-full border border-gray-800 bg-gray-200">
          <button>prev</button>
        </li>
        <li className="w-6 h-6 rounded-full text-gray-700 bg-primary text-white">
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
        <li className="text-zero w-6 h-6 rounded-full border border-gray-800 bg-gray-200">
          <button className="w-full">next</button>
        </li>
      </ol>
    </>
  );
};

export default Pagination;
