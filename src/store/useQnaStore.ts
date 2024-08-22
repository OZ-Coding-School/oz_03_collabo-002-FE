import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { Question, QuestionActions, QuestionState } from '../type/question';
import axios from './../api/axios';

const useQnaStore = create<QuestionState & QuestionActions>()(
  immer((set) => ({
    questions: null,
    myQuestions: null,

    fetchQuestionDetail: async (id) => {
      try {
        const response = await axios.get(`/api/v1/question/${id}`);
        const data: Question[] = response.data;
        const filteredData = data.filter((data) => data.classId === id);
        set({ questions: filteredData });
      } catch (error) {
        console.error('Failed to fetch QnA data', error);
      }
    },
    fetchMyQuestions: async (userId) => {
      try {
        const { data } = await axios.get(`/api/v1/question`);
        const filteredMyQuestions = data.filter(
          (data: Question) => data.author === userId?.toString(),
        );
        set({ myQuestions: filteredMyQuestions });
      } catch (error) {
        console.log('Failed to fetch my questions', error);
      }
    },
  })),
);

export default useQnaStore;
