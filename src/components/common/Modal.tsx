import React from 'react';
import { useModalOpenCloseStore } from '../../store/useModal';

const Modal = () => {
  const { clearModal, showModal, modalContent } = useModalOpenCloseStore(); // modalContent should now work

  if (!showModal) return null;

  const handleClear = () => {
    clearModal();
  };

  const handleOutsideClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClear();
    }
  };

  return (
    <div
      onClick={handleOutsideClick}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/25 h-screen">
      <div
        onClick={(e) => e.stopPropagation()} // 버블링 예방
        className="border rounded-2xl min-w-[300px] min-h-[200px] max-w-[400px] max-h-[80%] px-10 bg-white flex flex-col justify-evenly items-center overflow-auto">
        <div className="my-5 text-center font-bold text-xl">{modalContent}</div>
        <button
          onClick={handleClear}
          className="bg-primary border mb-5 rounded-md w-16 h-8 text-white hover:bg-primary/90"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
