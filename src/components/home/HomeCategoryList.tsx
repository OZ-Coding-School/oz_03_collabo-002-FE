import { Link } from 'react-router-dom';

const HomeCategoryList = () => {
  return (
    <div>
      <div className="mt-[34px] mb-[50px] px-[75px]">
        <ul className="flex text-center justify-between">
          <li className="flex-1">
            <Link to="" className="block py-2">
              <p>All</p>
            </Link>
          </li>
          <li className="flex-1">
            <Link to="" className="block py-2">
              <p>Cooking</p>
            </Link>
          </li>
          <li className="flex-1">
            <Link to="" className="block py-2">
              <p>Art & Culture</p>
            </Link>
          </li>
        </ul>
        <ul className="flex text-center justify-between">
          <li className="flex-1">
            <Link to="" className="block py-2">
              <p>Beauty & Fashion</p>
            </Link>
          </li>
          <li className="flex-1">
            <Link to="" className="block py-2">
              <p>DIY</p>
            </Link>
          </li>
          <li className="flex-1">
            <Link to="" className="block py-2">
              <p>Activities</p>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default HomeCategoryList;
