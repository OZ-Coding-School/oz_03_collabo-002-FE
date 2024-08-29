import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import axios from '../api/axios';
import {
  Question,
  QuestionActions,
  QuestionState,
} from '../type/question.type';

const useQnaStore = create<QuestionState & QuestionActions>()(
  immer((set) => ({
    questions: null,
    myQuestions: null,

    // 특정 클래스의 질문 목록을 가져오는 함수
    fetchQuestionDetail: async (classId) => {
      try {
        const response = await axios.get(`/v1/question/${classId}/`);
        const data: Question[] = response.data;
        set({ questions: data });
      } catch (error) {
        console.error('Failed to fetch QnA data for Class: ', error);
      }
    },

    // 내 질문 목록을 가져오는 함수
    fetchMyQuestions: async (userId) => {
      try {
        const response = await axios.get(`/v1/question/`);
        const data: Question[] = response.data;
        const filteredMyQuestions = data.filter(
          (question: Question) => question.author === userId?.toString(),
        );
        set({ myQuestions: filteredMyQuestions });
      } catch (error) {
        console.error('Failed to fetch my questions', error);
      }
    },

    // 모든 질문을 가져오는 함수
    getQuestionAll: async () => {
      try {
        const response = await axios.get('/v1/question/');
        const data = response.data;
        set({ questions: data });
      } catch (error) {
        console.error('Failed to get all questions: ', error);
      }
    },

    // 새로운 질문을 생성하는 함수
    createQuestion: async (classId, questionData) => {
      try {
        const response = await axios.post(
          `/v1/question/${classId}/`,
          questionData,
        );
        const newQuestion: Question = response.data;
        set((state) => ({
          questions: [...(state.questions || []), newQuestion],
        }));
      } catch (error) {
        console.error('Failed to create question: ', error);
      }
    },

    // 질문을 수정하는 함수
    updateQuestion: async (classId, questionId, questionData) => {
      try {
        const response = await axios.patch(
          `/v1/question/${classId}/`,
          questionData,
          {
            params: { question_id: questionId },
          },
        );
        const updatedQuestion: Question = response.data;
        set((state) => ({
          questions: state.questions?.map((q) =>
            q.id === updatedQuestion.id ? updatedQuestion : q,
          ),
        }));
      } catch (error) {
        console.error('Failed to update question: ', error);
      }
    },

    // 질문을 삭제하는 함수
    deleteQuestion: async (classId, questionId) => {
      try {
        await axios.delete(`/v1/question/${classId}/`, {
          params: { question_id: questionId },
        });
        set((state) => ({
          questions: state.questions?.filter((q) => q.id !== questionId),
        }));
      } catch (error) {
        console.error('Failed to delete question: ', error);
      }
    },
  })),
);

export default useQnaStore;
