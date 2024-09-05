import { useEffect, useState } from 'react';
import { useUserStore } from '../../store/useUser';
import useQnaStore from '../../store/useQuestionStore';
import {
  IconArrowDown,
  IconArrowUp,
  IconEdit,
  IconRemove,
} from '../../config/IconData';
import EditQuestionModal from '../question/EditQuestionModal'; // 질문 수정 모달 컴포넌트
import CreateQuestionModal from '../question/CreateQuestionModal'; // 질문 생성 모달 컴포넌트
import { Question } from '../../type/question.type';
import Button from '../common/Button';

const MyQuestionList = () => {
  const user = useUserStore((state) => state.user);
  const myQuestions = useQnaStore((state) => state.myQuestions);
  const getMyQuestions = useQnaStore((state) => state.getMyQuestions);
  const deleteQuestion = useQnaStore((state) => state.deleteQuestion);
  const updateQuestion = useQnaStore((state) => state.updateQuestion);
  const [openAnswers, setOpenAnswers] = useState<{ [key: string]: boolean }>(
    {},
  );
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    if (user?.id) {
      getMyQuestions();
    }
  }, [getMyQuestions, user]);

  const toggleAnswerOpen = (qnaId: string) => {
    setOpenAnswers((prev) => ({
      ...prev,
      [qnaId]: !prev[qnaId],
    }));
  };

  const handleEditQuestion = (question: Question) => {
    setEditingQuestion(question);
    setShowEditModal(true);
  };

  const handleDeleteQuestion = async (questionId: string) => {
    if (window.confirm('Are you sure you want to delete this question?')) {
      await deleteQuestion(user?.id ?? undefined, questionId);
      getMyQuestions();
    }
  };

  const handleCreateQuestion = () => {
    setShowCreateModal(true);
  };

  const handleAfterClose = () => {
    getMyQuestions();
  };

  if (!myQuestions || !user)
    return (
      <div className="inline-flex w-full aspect-square text-gray-500">
        <span className="m-auto w-5/6 text-gray text-xl text-center">
          {`No data`}
        </span>
      </div>
    );

  return (
    <div className="">
      {myQuestions?.map((data) => (
        <div key={data.id} className="divide-y divide-gray-200">
          <div className="flex justify-between px-6 py-[15px] items-center">
            <div id="question-item" className="flex flex-col flex-grow">
              <div className="flex items-center">
                <h3 className="font-bold mr-5">{data.question_title}</h3>
                <div className="flex items-center space-x-2">
                  <button onClick={() => handleEditQuestion(data)}>
                    <IconEdit className="text-gray w-5 h-5" />
                  </button>
                  <button onClick={() => handleDeleteQuestion(String(data.id))}>
                    <IconRemove className="text-gray w-5 h-5" />
                  </button>
                </div>
              </div>
              <div
                id="qnaStatus"
                className="flex items-center mt-1 text-xs text-darkgray"
              >
                <div>{data.answer !== '' ? 'Answered' : 'Pending'}</div>
                <p>・</p>
                <span>{data.user_id}</span>
                <p>・</p>
                <div>
                  {new Date(data.created_at).toLocaleDateString('ko-KR')}
                </div>
              </div>
            </div>
            {data.answer !== null && data.answer !== '' ? (
              <button onClick={() => toggleAnswerOpen(String(data.id))}>
                {openAnswers[String(data.id)] ? (
                  <IconArrowUp />
                ) : (
                  <IconArrowDown />
                )}
              </button>
            ) : null}
          </div>
          {openAnswers[String(data.id)] && (
            <div className="mt-2 bg-gray p-6">
              <h3 className="font-bold mb-[15px]">{data.answer_title}</h3>
              <p className="mb-[15px]">{data.answer}</p>
              {/* <small className="text-sm">{data.updated_at.split('T', 1)}</small> */}
            </div>
          )}
        </div>
      ))}
      <div className="px-6 py-[15px]">
        <Button
          size="full"
          value="Create"
          onClick={handleCreateQuestion}
          className="rounded-xl"
        />
      </div>

      {showEditModal && editingQuestion && (
        <EditQuestionModal
          question={editingQuestion}
          onClose={() => setShowEditModal(false)}
          onSave={(updatedQuestion) => {
            updateQuestion(
              user?.id ?? 0,
              String(updatedQuestion.id),
              updatedQuestion,
            );
            getMyQuestions();
            setShowEditModal(false);
          }}
        />
      )}

      {showCreateModal && (
        <CreateQuestionModal
          onClose={() => {
            setShowCreateModal(false);
          }}
          handleAfterClose={handleAfterClose}
        />
      )}
    </div>
  );
};

export default MyQuestionList;
