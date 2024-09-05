import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  IconArrowDown,
  IconArrowLeft,
  IconArrowUp,
} from '../../config/IconData';
import useQnaStore from '../../store/useQuestionStore';

const ClassDetailQnaAll = () => {
  const { id } = useParams<{ id: string }>();
  const [openAnswers, setOpenAnswers] = useState<{ [key: string]: boolean }>(
    {},
  );
  const navigate = useNavigate();
  const questions = useQnaStore((state) => state.questions);
  const fetchQuestionDetail = useQnaStore((state) => state.fetchQuestionDetail);

  useEffect(() => {
    fetchQuestionDetail(id);
  }, [fetchQuestionDetail, id]);

  const toggleAnswerOpen = (qnaId: string) => {
    setOpenAnswers((prev) => ({
      ...prev,
      [qnaId]: !prev[qnaId],
    }));
  };

  return (
    <div className="">
      <div className="w-full flex items-center py-[15px] px-6 mb-[15px]">
        <button onClick={() => navigate(-1)} className="pointer">
          <IconArrowLeft className="mr-[15px]" />
        </button>
        <h1 className="text-lg font-extrabold mr-1 ">Questions</h1>
        <span className="font-sans">({questions?.length})</span>
      </div>
      {questions?.map((data) => (
        <div key={data.id} className="divide-y divide-gray-200">
          <div className="flex justify-between px-6 py-[15px]">
            <div id="question-item" className="flex flex-col">
              <div className="flex justify-between items-center">
                <h3 className="font-bold">{data.question_title}</h3>
              </div>
              <div
                id="qnaStatus"
                className="flex items-center mt-1 text-xs text-darkgray"
              >
                <div>{data.answer !== '' ? 'Answered' : 'Pending'}</div>
                <p>・</p>
                <span>{data.id}</span>
                <p>・</p>
                <div>
                  {new Date(data.created_at).toLocaleDateString('ko-KR')}
                </div>
              </div>
            </div>
            {data.answer !== '' ? (
              <button onClick={() => toggleAnswerOpen(String(data.id))}>
                {openAnswers[data.id ?? ''] ? <IconArrowUp /> : <IconArrowDown />}
              </button>
            ) : null}
          </div>
          {openAnswers[data.id ?? ''] && (
            <div className="mt-2 bg-gray p-6">
              <h3 className="font-bold mb-[15px]">{data.answer_title}</h3>
              <p className="mb-[15px]">{data.answer}</p>
              <small className="text-sm">{data.updated_at?.split('T', 1)}</small>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ClassDetailQnaAll;
