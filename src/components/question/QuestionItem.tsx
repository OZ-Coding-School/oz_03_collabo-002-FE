import { useState } from 'react';
import { IconArrowDown, IconArrowUp } from '../../config/IconData';
import { Question } from '../../type/question.type';

interface QuestionItemProps {
  question: Question;
  onEdit: (question: Question) => void;
  onDelete: (questionId: string) => void;
}

const QuestionItem = ({ question, onEdit, onDelete }: QuestionItemProps) => {
  const [openAnswers, setOpenAnswers] = useState(false);

  const toggleAnswerOpen = () => {
    setOpenAnswers(!openAnswers);
  };

  return (
    <div className="divide-y divide-gray-200">
      <div className="flex justify-between px-6 py-4">
        <div className="flex flex-col">
          <div className="flex justify-between items-center">
            <h3 className="font-bold">{question.questionTitle}</h3>
          </div>
          <div className="flex items-center mt-1 text-xs text-gray-600">
            <div>{question.complete ? 'Answered' : 'Pending'}</div>
            <p>・</p>
            <span>{question.author}</span>
            <p>・</p>
            <div>{new Date(question.createDate).toLocaleDateString()}</div>
          </div>
        </div>
        <div>
          <button onClick={() => onEdit(question)}>수정</button>
          <button onClick={() => onDelete(question.id)}>삭제</button>
          {question.complete && (
            <button onClick={toggleAnswerOpen}>
              {openAnswers ? <IconArrowUp /> : <IconArrowDown />}
            </button>
          )}
        </div>
      </div>
      {openAnswers && (
        <div className="mt-2 bg-gray-100 p-6">
          <h3 className="font-bold mb-4">{question.answerTitle}</h3>
          <p className="mb-4">{question.answer}</p>
          <small className="text-sm">{question.answerDate.split('T')[0]}</small>
        </div>
      )}
    </div>
  );
};

export default QuestionItem;
