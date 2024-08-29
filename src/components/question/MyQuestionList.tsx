import { useEffect, useState } from 'react';
import useAccountStore from '../../store/useAccountStore';
import useQnaStore from '../../store/useQuestionStore';
import { IconArrowDown, IconArrowLeft, IconArrowUp, IconEdit, IconRemove } from '../../config/IconData';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../../store/useUser';
import EditQuestionModal from './EditQuestionModal';  // 질문 수정 모달 컴포넌트
import CreateQuestionModal from './CreateQuestionModal';  // 질문 생성 모달 컴포넌트
import { Question } from '../../type/question.type';

const MyQuestionList = () => {
  const navigate = useNavigate();
  const user = useUserStore((state) => state.user);
  const myQuestions = useQnaStore((state) => state.myQuestions);
  const fetchUser = useAccountStore((state) => state.fetchUser);
  const fetchMyQuestions = useQnaStore((state) => state.fetchMyQuestions);
  const deleteQuestion = useQnaStore((state) => state.deleteQuestion);
  const updateQuestion = useQnaStore((state) => state.updateQuestion);
  const [openAnswers, setOpenAnswers] = useState<{ [key: string]: boolean }>({});
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);

  // 임시 사용자 불러오기
  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  useEffect(() => {
    if (user?.id) {
      fetchMyQuestions(user.id);
    }
  }, [fetchMyQuestions, user]);

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
      fetchMyQuestions(user?.id ?? undefined);  // 삭제 후 목록 새로고침
    }
  };

  const handleCreateQuestion = () => {
    setShowCreateModal(true);
  };

  if (!user) return <div>Loading..</div>;

  return (
    <div className="">
      <div className="w-full flex items-center bg-gray py-[15px] px-6 mb-[15px]">
        <IconArrowLeft className="mr-[15px]" onClick={() => navigate(-1)} />
        <h1 className="text-lg font-[NanumSquareBold] mr-1 ">My Question</h1>
        <span className="font-sans">({myQuestions?.length})</span>
        <button onClick={handleCreateQuestion} className="ml-auto">
          Add Question
        </button>
      </div>
      {myQuestions?.map((data) => (
        <div key={data.id} className="divide-y divide-gray-200">
          <div className="flex justify-between px-6 py-[15px] items-center">
            <div id="question-item" className="flex flex-col flex-grow">
              <div className="flex justify-between items-center">
                <h3 className="font-[NanumSquareBold]">{data.questionTitle}</h3>
                <div className="flex items-center space-x-2">
                  <button onClick={() => handleEditQuestion(data)}><IconEdit /></button>
                  <button onClick={() => handleDeleteQuestion(data.id)}><IconRemove /></button>
                </div>
              </div>
              <div id="qnaStatus" className="flex items-center mt-1 text-xs text-darkgray">
                <div>{data.complete ? 'Answered' : 'Pending'}</div>
                <p>・</p>
                <span>{data.author}</span>
                <p>・</p>
                <div>{new Date(data.createDate).toLocaleDateString('ko-KR')}</div>
              </div>
            </div>
            {data.complete ? (
              <button onClick={() => toggleAnswerOpen(data.id)}>
                {openAnswers[data.id] ? <IconArrowUp /> : <IconArrowDown />}
              </button>
            ) : null}
          </div>
          {openAnswers[data.id] && (
            <div className="mt-2 bg-gray p-6">
              <h3 className="font-[NanumSquareBold] mb-[15px]">{data.answerTitle}</h3>
              <p className="mb-[15px]">{data.answer}</p>
              <small className="text-sm">{data.answerDate.split('T', 1)}</small>
            </div>
          )}
        </div>
      ))}

      {showEditModal && editingQuestion && (
        <EditQuestionModal
          question={editingQuestion}
          onClose={() => setShowEditModal(false)}
          onSave={(updatedQuestion) => {
            updateQuestion(user?.id ?? 0, updatedQuestion.id, updatedQuestion);
            fetchMyQuestions(user?.id ?? 0);
            setShowEditModal(false);
          }}
        />
      )}

      {showCreateModal && (
        <CreateQuestionModal
          onClose={() => setShowCreateModal(false)}
          onCreate={(newQuestion) => {
            useQnaStore.getState().createQuestion(user?.id ?? undefined, newQuestion);
            fetchMyQuestions(user?.id ?? 0);
            setShowCreateModal(false);
          }}
        />
      )}
    </div>
  );
};

export default MyQuestionList;
