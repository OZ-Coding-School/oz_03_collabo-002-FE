import { useState } from 'react';
import { Link } from 'react-router-dom';

const HomeInstaStory = () => {
  const [showAll, setShowAll] = useState(false);

  const toggleShowAll = () => {
    setShowAll((prevShowAll) => !prevShowAll);
  };

  return (
    <div className="px-6 my-20 text-center">
      <h3 className="text-[20px] mb-5 text-left">
        <strong>Custom-k's Story</strong>
      </h3>
      <ul className="grid grid-cols-2 gap-[15px] text-left">
        <li>
          <Link to="">
            <img src="./Home/home-insta01.jpg" alt="" />
          </Link>
        </li>
        <li>
          <Link to="">
            <img src="./Home/home-insta02.jpg" alt="" />
          </Link>
        </li>
        {showAll && (
          <>
            <li>
              <Link to="">
                <img src="./Home/home-insta03.jpg" alt="" />
              </Link>
            </li>
            <li>
              <Link to="">
                <img src="./Home/home-insta04.jpg" alt="" />
              </Link>
            </li>
            <li>
              <Link to="">
                <img src="./Home/home-insta05.jpg" alt="" />
              </Link>
            </li>
          </>
        )}
      </ul>
      <button
        type="button"
        onClick={toggleShowAll}
        className="bg-primary text-white px-4 py-2 margin-auto mt-5 text-[14px]"
      >
        {showAll ? 'Close' : 'More'}
      </button>
    </div>
  );
};

export default HomeInstaStory;
