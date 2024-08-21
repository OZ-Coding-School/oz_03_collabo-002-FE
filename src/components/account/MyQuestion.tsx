import { useParams } from 'react-router-dom';
import axios from './../../api/axios';
import { useEffect, useState } from 'react';
import { IconArrowDown, IconArrowLeft, IconArrowUp } from '../../assets/icon';

type Qna = {
  id: string;
  questionTitle: string;
  question: string;
  answerTitle: string;
  answer: string;
  author: string;
  classId: string;
  complete: boolean;
  createDate: string;
  answerDate: string
};

const MyQuestion = () => {
  const { id } = useParams<{ id: string }>(); 
  const [qnaData, setQnaData] = useState<Qna[]>([]);
  const [openAnswers, setOpenAnswers] = useState<{ [key: string]: boolean }>(
    {},
  );

  useEffect(() => {
    const fetchQna = async () => {
      try {
        const response = await axios.get(`/api/v1/question/${id}`);
        const data: Qna[] = response.data;
        const filteredData = data.filter((data) => data.classId === id);
        setQnaData(filteredData);
      } catch (error) {
        console.error('Failed to fetch QnA data', error);
      }
    };

    fetchQna();
  }, [id]);

  const toggleAnswerOpen = (qnaId: string) => {
    setOpenAnswers((prev) => ({
      ...prev,
      [qnaId]: !prev[qnaId],
    }));
  };

  return (
    <div className="">
      <div className='w-full flex items-center bg-gray py-[15px] px-6 mb-[15px]'>
        <IconArrowLeft className='mr-[15px]'/>
        <h1 className="text-lg font-[NanumSquareBold] mr-1 ">
          QnA
        </h1>
          <span className="font-sans">({qnaData.length})</span>
      </div>
      {qnaData.map((data) => (
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
              <h3 className="font-[NanumSquareBold] mb-[15px]">{data.answerTitle}</h3>
              <p className='mb-[15px]'>{data.answer}</p>
              <small className='text-sm'>{data.answerDate.split('T',1)}</small>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default MyQuestion;
