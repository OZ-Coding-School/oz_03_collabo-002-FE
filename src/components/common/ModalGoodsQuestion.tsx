import arrowLeft from '../../icon/icon-arrow-left.svg';
import { useModalOpenCloseStore } from '../../store/useModal';
const ModalGoodsQuestion = () => {
  const { clearModal } = useModalOpenCloseStore();
  const handleClose = () => {
    clearModal();
  };
  return (
    <form>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/25">
        <div className="border rounded-2xl w-[440px] h-[550px] bg-white flex flex-col  items-center">
          <div className="flex justify-between w-full mt-4">
            <img
              src={arrowLeft}
              alt="나가기"
              className="mx-6 w-4 stroke-[#666666]"
              onClick={handleClose}
            />
            <span className="w-full text-center mr-14 font-bold">Inquiry</span>
          </div>
          <hr className="border-b-1 w-full mt-4" />
          <div className="w-full h-full mt-6 px-8">
            <p className="font-bold mb-4">Please leave your inquiry.</p>
            <textarea
              className="w-full h-[350px] border border-gray-800 p-3  rounded-xl resize-none text-xs"
              id="qna"
              name="qna"
              placeholder="If you have any questions or questions about the class before you experience it.
Please leave a comment. I will check it out quickly and get back to you!"
            ></textarea>
            <button className="bg-primary w-full h-11 text-white font-bold rounded-lg my-2">
              Save
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ModalGoodsQuestion;
