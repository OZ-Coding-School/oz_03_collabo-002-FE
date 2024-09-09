import { useState, useEffect } from 'react';
import { IconArrowLeft } from '../../config/IconData';
import { useModalOpenCloseStore } from '../..//store/useModal'; // 대신에 useModalStore 사용
import { Question } from '../../type/question.type';

interface EditQuestionModalProps {
  question: Question;
  onClose: () => void;
  onSave: (updatedQuestion: Question) => void;
}

const EditQuestionModal = ({
  question,
  onClose,
  onSave,
}: EditQuestionModalProps) => {
  const [title, setTitle] = useState(question.question_title);
  const [content, setContent] = useState(question.question);

  const { clearModal } = useModalOpenCloseStore();

  const handleSave = () => {
    onSave({ ...question, question_title: title, question: content });
  };

  useEffect(() => {
    setTitle(question.question_title);
    setContent(question.question);
  }, [question]);

  const handleClose = () => {
    clearModal();
    onClose();
  };

  return (
    <form>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/25">
        <div className="border rounded-2xl w-[440px] h-[550px] bg-white flex flex-col items-center">
          <div className="flex justify-between w-full mt-4">
            <IconArrowLeft
              className="mx-6 w-4 stroke-[#666666]"
              onClick={handleClose}
            />
            <span className="w-full text-center mr-14 font-bold">
              Edit Inquiry
            </span>
          </div>
          <hr className="border-b-1 w-full mt-4" />
          <div className="w-full h-full mt-6 px-8">
            <p className="font-bold mb-4">Update your inquiry.</p>
            <input
              type="text"
              className="w-full border border-gray-800 p-3 rounded-xl mb-4 text-xs"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter question title"
            />
            <textarea
              className="w-full h-[250px] border border-gray-800 p-3 rounded-xl resize-none text-xs"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Enter question content"
            ></textarea>
            <button
              type="button"
              className="bg-primary w-full h-11 text-white font-bold rounded-lg my-2"
              onClick={handleSave}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default EditQuestionModal;
