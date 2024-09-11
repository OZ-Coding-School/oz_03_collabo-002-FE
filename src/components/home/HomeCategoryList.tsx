import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const categoryMap: { [key: string]: string } = {
  Cooking: 'cooking',
  'Art & Culture': 'art-culture',
  'Beauty & Fashion': 'beauty-fashion',
  DIY: 'diy',
  Activities: 'activities',
  All: 'all',
};

const HomeCategoryList = () => {
  const [categories] = useState([
    'All',
    'Cooking',
    'Art & Culture',
    'Beauty & Fashion',
    'DIY',
    'Activities',
  ]);

  const navigate = useNavigate();

  const handleMoveCategory = (item: string) => {
    const route = categoryMap[item] || 'all';
    navigate(`/category/${route}`);
  };

  return (
    <div className="mt-[50px] mb-[50px] px-[20px]">
      <ul className="grid grid-cols-2 md:grid-cols-4 gap-5 text-left">
        {categories.map((category, index) => (
          <li key={index} className="flex-1">
            <img
              src={`./Home/CategoryList/category-${categoryMap[category]}.png`}
              alt={category}
              className="mb-2 border-2 border-gray-400 rounded-full cursor-pointer"
              onClick={() => handleMoveCategory(category)}
            />
            <p className='text-center'>{category}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default HomeCategoryList;
