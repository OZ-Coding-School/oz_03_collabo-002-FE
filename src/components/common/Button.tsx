import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

type ButtonProp = {
  type?: 'button' | 'reset' | 'submit';
  size: 'sm' | 'md' | 'lg' | 'full';
  value: string;
  className?: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
};
const Button = ({ size, value, onClick, type = 'button', className = '' }: ButtonProp) => {
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
    <motion.button
    initial={{ scale: 1}}
    whileTap={{ scale: 0.9}}
      type={type}
      className={`${btnSize} ${className} bg-primary text-white rounded-full`}
      onClick={onClick}
    >
      {value}
    </motion.button>
  );
};

export default Button;
