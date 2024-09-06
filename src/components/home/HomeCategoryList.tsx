import { Link } from 'react-router-dom';

const HomeCategoryList = () => {
  return (
    <div>
      <div className="mt-[50px] mb-[50px] px-[20px]">
        <ul className="flex text-center justify-between gap-5">
          <li className="flex-1">
            <Link to="/category/all" className="block py-2 text-[13px]">
              <img
                src="./Home/CategoryList/main-category01.png"
                alt="all"
                className="mb-2 border-2 border-gray-400 rounded-full"
              />
              <p>All</p>
            </Link>
          </li>
          <li className="flex-1">
            <Link to="/category/cooking" className="block py-2 text-[13px]">
              <img
                src="./Home/CategoryList/main-category02.png"
                alt="Cooking"
                className="mb-2 border-2 border-gray-400 rounded-full"
              />
              <p>Cooking</p>
            </Link>
          </li>
          <li className="flex-1">
            <Link to="/category/art-culture" className="block py-2 text-[13px]">
              <img
                src="./Home/CategoryList/main-category03.png"
                alt="Art & Culture"
                className="mb-2 border-2 border-gray-400 rounded-full"
              />
              <p>Art & Culture</p>
            </Link>
          </li>
          <li className="flex-1">
            <Link to="/category/test2" className="block py-2 text-[13px]">
              <img
                src="./Home/CategoryList/main-category03.png"
                alt="test2"
                className="mb-2 border-2 border-gray-400 rounded-full"
              />
              <p>Art & Culture</p>
            </Link>
          </li>
        </ul>
        <ul className="flex text-center justify-between gap-5">
          <li className="flex-1">
            <Link
              to="/category/beauty-fashion"
              className="block py-2 text-[13px]"
            >
              <img
                src="./Home/CategoryList/main-category04.png"
                className="mb-2 border-2 border-gray-400 rounded-full"
                alt="Beauty & Fashion"
              />
              <p>Beauty & Fashion</p>
            </Link>
          </li>
          <li className="flex-1">
            <Link to="/category/diy" className="block py-2 text-[13px]">
              <img
                src="./Home/CategoryList/main-category05.png"
                className="mb-2 border-2 border-gray-400 rounded-full"
                alt="DIY"
              />
              <p>DIY</p>
            </Link>
          </li>
          <li className="flex-1">
            <Link to="/category/activities" className="block py-2 text-[13px]">
              <img
                src="./Home/CategoryList/main-category06.png"
                className="mb-2 border-2 border-gray-400 rounded-full"
                alt="Activities"
              />
              <p>Activities</p>
            </Link>
          </li>
          <li className="flex-1">
            <Link to="/category/test" className="block py-2 text-[13px]">
              <img
                src="./Home/CategoryList/main-category06.png"
                className="mb-2 border-2 border-gray-400 rounded-full"
                alt="test"
              />
              <p>Activities</p>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default HomeCategoryList;
