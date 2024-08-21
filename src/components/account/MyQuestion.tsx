import { useEffect, useState } from 'react';
import useAccountStore from '../../store/useAccountStore';
import useQnaStore from '../../store/useQnaStore';
import { IconArrowDown, IconArrowLeft, IconArrowUp } from '../../assets/icon';
import { useNavigate } from 'react-router-dom';

const MyQuestion = () => {
  const navigate = useNavigate();
  const user = useAccountStore((state) => state.user);
  const myQuestions = useQnaStore((state) => state.myQuestions);
  const fetchUser = useAccountStore((state) => state.fetchUser);
  const fetchMyQuestions = useQnaStore((state) => state.fetchMyQuestions);
  const [openAnswers, setOpenAnswers] = useState<{ [key: string]: boolean }>(
    {},
  );

  // 임시 사용자 불러오기
  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  useEffect(() => {
    if (user?.id) {
      fetchMyQuestions(user.id);
    }
  }, [fetchMyQuestions]);

  const toggleAnswerOpen = (qnaId: string) => {
    setOpenAnswers((prev) => ({
      ...prev,
      [qnaId]: !prev[qnaId],
    }));
  };

  if (!user) return <div>Loading..</div>;

  return (
    <div className="">
      <div className="w-full flex items-center bg-gray py-[15px] px-6 mb-[15px]">
        <IconArrowLeft className="mr-[15px]" onClick={() => navigate(-1)} />
        <h1 className="text-lg font-[NanumSquareBold] mr-1 ">My Question</h1>
        <span className="font-sans">({myQuestions?.length})</span>
      </div>
      {myQuestions?.map((data) => (
        <div key={data.id} className="divide-y divide-gray-200">
          <div className="flex justify-between px-6 py-[15px]">
            <div id="question-item" className="flex flex-col">
              <div className="flex justify-between items-center">
                <h3 className="font-[NanumSquareBold]">{data.questionTitle}</h3>
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
              <h3 className="font-[NanumSquareBold] mb-[15px]">
                {data.answerTitle}
              </h3>
              <p className="mb-[15px]">{data.answer}</p>
              <small className="text-sm">{data.answerDate.split('T', 1)}</small>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default MyQuestion;
