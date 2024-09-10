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
import { useClassStore } from '../../store/useClassStore';

const MyQuestionList = () => {
  const user = useUserStore((state) => state.user);
  const myQuestions = useQnaStore((state) => state.myQuestions);
  const getMyQuestions = useQnaStore((state) => state.getMyQuestions);
  const deleteQuestion = useQnaStore((state) => state.deleteQuestion);
  const updateQuestion = useQnaStore((state) => state.updateQuestion);
  const [openAnswerId, setOpenAnswerId] = useState<string | null>(null); // 열려있는 질문 ID를 관리
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const classTitle = useClassStore((state) => state.classTitle);

  useEffect(() => {
    if (user?.id) {
      getMyQuestions();
    }
  }, [getMyQuestions, user]);

  // 상태 변화 확인을 위해 useEffect 추가
  useEffect(() => {
    console.log('showCreateModal 상태:', showCreateModal);
  }, [showCreateModal]);

  const toggleAnswerOpen = (qnaId: string) => {
    setOpenAnswerId((prevId) => (prevId === qnaId ? null : qnaId));
  };

  const handleEditQuestion = (question: Question) => {
    setEditingQuestion(question);
    setShowEditModal(true);
  };

  const handleDeleteQuestion = async (classId: string, questionId: string) => {
    if (window.confirm('Are you sure you want to delete this question?')) {
      await deleteQuestion(classId, questionId);
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
        <div
          key={data.id}
          className="divide-y divide-gray-200"
          onClick={(e: React.MouseEvent<HTMLDivElement>) => {
            e.stopPropagation();
            toggleAnswerOpen(String(data.id));
          }}
        >
          <div className="flex justify-between px-6 py-[15px] items-center">
            <div id="question-item" className="flex flex-col flex-grow">
              {/* Question Title */}
              <div className="flex items-center">
                <h3 className="font-bold mr-5">{data.question_title}</h3>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                      e.stopPropagation();
                      handleEditQuestion(data);
                    }}
                  >
                    <IconEdit className="text-gray w-5 h-5" />
                  </button>
                  <button
                    onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                      e.stopPropagation();
                      handleDeleteQuestion(
                        data.class_id.toString(),
                        data.id.toString(),
                      );
                    }}
                  >
                    <IconRemove className="text-gray w-5 h-5" />
                  </button>
                </div>
              </div>
              {/* IsAnswer & Date */}
              <div
                id="qnaStatus"
                className="flex items-center mt-1 text-xs text-darkgray"
              >
                <div>{data.answer !== '' ? 'Answered' : 'Pending'}</div>
                <p>・</p>
                <div>
                  {new Date(data.created_at).toLocaleDateString('ko-KR')}
                </div>
              </div>
            </div>
            {/* Open Answer Button */}
            {data.answer !== null && data.answer !== '' ? (
              <button>
                {openAnswerId === String(data.id) ? (
                  <IconArrowUp />
                ) : (
                  <IconArrowDown />
                )}
              </button>
            ) : null}
          </div>
          {/* Answer & Detail Question */}
          {openAnswerId === String(data.id) && (
            <div className="mt-2 bg-slate-100 p-6">
              {/* Class Title */}
              <div className="text-darkgray text-xs mb-1">
                {classTitle?.find((item) => item.id === data.class_id)?.title}
              </div>
              <p className="mb-[15px] whitespace-pre leading-8 ">
                Q. {data.question}
              </p>
              <p className="text-center my-[15px]">{`  -    -    -    -  `}</p>
              <h3 className="font-extrabold mb-[15px]">{data.answer_title}</h3>
              <p className="mb-[15px] whitespace-pre">{data.answer}</p>
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
            updateQuestion(updatedQuestion);

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
