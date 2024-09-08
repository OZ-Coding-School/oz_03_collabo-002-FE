import React from 'react';
import { useNavigate } from 'react-router-dom';

const DepositorOrderBtn: React.FC = () => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate('/bank-details'); // 무통장 입금 계좌안내 페이지로 이동
  };

  return <button onClick={handleClick}>Bank Deposit Details</button>;
};

export default DepositorOrderBtn;
