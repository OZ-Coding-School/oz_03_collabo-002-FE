import { Link, useParams } from 'react-router-dom';
import { IconAllArw, IconArrowDown, IconArrowUp } from '../../config/IconData';
import { useEffect, useState } from 'react';
import useQnaStore from '../../store/useQnaStore';

const ClassDetailQna = () => {
  const { id } = useParams<{ id: string }>();
  console.log(id);

  const [openAnswers, setOpenAnswers] = useState<{ [key: string]: boolean }>(
    {},
  );
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
    <div className="mt-10">
      <h3 className="text-[20px] px-6 font-semibold flex justify-between">
        Questions
        <Link
          to={`/question/${id}`}
          className="text-[14px] font-normal flex items-center"
        >
          view all
          <IconAllArw className="ml-1" />
        </Link>
      </h3>
      <div className='mt-4'>
        {questions
          ?.map((data) => (
            <div key={data.id} className="divide-y divide-gray-200">
              <div className="flex justify-between px-6 py-[15px]">
                <div id="question-item" className="flex flex-col">
                  <div className="flex justify-between items-center">
                    <h3 className="font-bold">
                      {data.questionTitle}
                    </h3>
                  </div>
                  <div
                    id="qnaStatus"
                    className="flex items-center mt-1 text-xs text-darkgray"
                  >
                    <div>{data.complete ? 'Answered' : 'Pending'}</div>
                    <p>・</p>
                    <span>{data.author}</span>
                    <p>・</p>
                    <div>
                      {new Date(data.createDate).toLocaleDateString('ko-KR')}
                    </div>
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
                  <h3 className="font-bold mb-[15px]">
                    {data.answerTitle}
                  </h3>
                  <p className="mb-[15px]">{data.answer}</p>
                  <small className="text-sm">
                    {data.answerDate.split('T', 1)}
                  </small>
                </div>
              )}
            </div>
          ))
          .slice(0, 1)}
        {/* 첫 번째 인덱스로부터 1개의 값만 출력되도록 함 */}
      </div>
    </div>
  );
};

export default ClassDetailQna;
