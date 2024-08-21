import { useEffect, useState } from 'react';

type ButtonProp = {
  size: 'sm' | 'md' | 'lg' | 'full';
  value: string;
  onSubmit: () => void;
};
const Button = ({ size, value, onSubmit }: ButtonProp) => {
  const [btnSize, setBtnSize] = useState('');

  useEffect(() => {
    switch (size) {
      case 'sm':
        setBtnSize('px-3 py-2 ');
        break;
      case 'md':
        setBtnSize('px-5 py-3');
        break;
      case 'lg':
        setBtnSize('px-8 py-3');
        break;
      case 'full':
        setBtnSize('w-full py-3');
        break;
    }
  }, [size]);

  return (
    <button
      className={`${btnSize} bg-primary text-white rounded-md`}
      onClick={onSubmit}
    >
      {value}
    </button>
  );
};

export default Button;
