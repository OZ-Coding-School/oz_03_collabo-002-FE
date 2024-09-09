import { useState } from 'react';
import { IconRemove } from '../../config/IconData';
import { useModalOpenCloseStore } from '../../store/useModal';
import { useClassStore } from '../../store/useClassStore';
import useQnaStore from '../../store/useQuestionStore';
import Button from '../common/Button';
import { motion } from 'framer-motion';
import { Class } from '../../type/class.type';

const CreateQuestionModal = ({
  onClose,
  handleAfterClose,
}: {
  onClose: () => void;
  handleAfterClose: () => void;
}) => {
  const [title, setTitle] = useState('');
  const [inquiry, setInquiry] = useState('');
  const [classId, setClassId] = useState('');

  const classTitle = useClassStore((state) => state.classItem);
  const createQuestion = useQnaStore((state) => state.createQuestion);
  const { clearModal } = useModalStore();

  const handleCreate = () => {
    if (title.trim() === '' || inquiry.trim() === '' || classId === '') {
      return;
    }
    console.log(title, inquiry, classId);
    const questionData = { question_title: title, question: inquiry };
    createQuestion(classId, questionData);
    handleClose();
  };

  const handleClose = () => {
    clearModal();
    onClose();
    handleAfterClose();
  };

  // Debugging classTitle to verify it's populated
  console.log(classTitle);

  if (!classTitle) return null;

  const boxStyle =
    'w-full text-darkgray mb-[15px] border border-darkgray rounded-xl text-sm';

  return (
    <motion.aside
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/25">
        <div className="border rounded-2xl w-11/12 max-w-[450px] bg-white flex flex-col items-center">
          <div className="relative flex justify-center w-full mt-4">
            <span className="w-full text-center font-bold ">New Inquiry</span>
            <IconRemove
              className="absolute w-5 h-5 right-4 top-1/2 -translate-y-1/2 text-darkgray "
              onClick={handleClose}
            />
          </div>
          <hr className="border-b-1 w-full mt-4" />
          <div typeof="submit" className="w-full h-full mt-6 px-8">
            <p className="font-bold mb-4">Please leave your inquiry.</p>
            <select
              className={`h-10 ${boxStyle}`}
              value={classId}
              onChange={(e) => setClassId(e.target.value)}
              required
            >
              <option autoFocus disabled>
                Please select a class.
              </option>
              {classTitle?.map((item: Class) => (
                <option key={item.id} value={item.id}>
                  {item.title}
                </option>
              ))}
            </select>
            <input
              type="text"
              className={`p-3 ${boxStyle} `}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter question title"
            />
            <textarea
              className={`h-[250px] p-3 ${boxStyle}`}
              value={inquiry}
              onChange={(e) => setInquiry(e.target.value)}
              placeholder="Enter question content"
            ></textarea>
            <Button
              type="button"
              size="full"
              className="mb-5 rounded-xl"
              value="Save"
              onClick={handleCreate}
            />
          </div>
        </div>
      </div>
    </motion.aside>
  );
};

export default CreateQuestionModal;
