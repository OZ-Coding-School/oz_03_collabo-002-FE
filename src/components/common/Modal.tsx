import { useModalStore } from '../../store/useModal';

const Modal = () => {
  const { modalMessage, clearModal, showModal } = useModalStore();

  if (!showModal) return;

  const handleClear = () => {
    clearModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/25">
      <div className="border rounded-2xl w-[300px] h-[200px] bg-white flex flex-col  justify-evenly items-center">
        {/* <label className="font-bold text-xl mb-5">Info</label> */}

        <div className="my-5 text-center font-bold text-xl">
          {modalMessage}
          {/* Login Success! */}
        </div>
        <button
          onClick={handleClear}
          className="bg-primary border  rounded-md w-16 h-8 text-white hover:bg-primary/90"
        >
          close
        </button>
      </div>
    </div>
  );
};

export default Modal;
