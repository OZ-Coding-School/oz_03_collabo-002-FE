import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import axios from '../api/axios';
import {
  Question,
  QuestionActions,
  QuestionRequest,
  QuestionState,
} from '../type/question.type';
import { useModalStore } from './useModal';

const useQnaStore = create<QuestionState & QuestionActions>()(
  immer((set) => ({
    questions: null,
    myQuestions: null,

    // 특정 클래스의 질문 목록을 가져오는 함수
    fetchQuestionDetail: async (classId) => {
      try {
        const response = await axios.get(`/question/${classId}/`);
        const data: Question[] = response.data;
        set((state) => {
          state.questions = data;
        });
      } catch (error) {
        console.error('Failed to fetch QnA data for Class: ', error);
      }
    },

    // 모든 질문을 가져오는 함수
    getMyQuestions: async () => {
      try {
        const response = await axios.get<QuestionRequest>(
          '/question/?page=1&size=10',
        );
        console.log(response.data);
        const data = response.data.questions;
        set((state) => {
          state.myQuestions = data;
        });
      } catch (error) {
        console.error('Failed to get all questions: ', error);
      }
    },

    // 새로운 질문을 생성하는 함수
    createQuestion: async (classId, questionData) => {
      try {
        const response = await axios.post(`/question/${classId}`, questionData);
        const newQuestion: Question = response.data;
        set((state) => ({
          questions: [...(state.questions || []), newQuestion],
        }));
      } catch (error) {
        console.error('Failed to create question: ', error);
      }
    },

    // 질문을 수정하는 함수
    updateQuestion: async (classId, questionData) => {
      try {
        const response = await axios.patch(
          `/question/${classId}/`,
          questionData,
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
        await axios.delete(`/v1/question/${classId}/${questionId}/`);
        set((state) => ({
          questions: state.questions?.filter((q) => q.id !== questionId),
        }));
        useModalStore.getState().setModal('Success to remove your question');
      } catch (error) {
        console.error('Failed to delete question: ', error);
        useModalStore.getState().setModal('Failed to remove');
      }
    },
  })),
);

export default useQnaStore;
