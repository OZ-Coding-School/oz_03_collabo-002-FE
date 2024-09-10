import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import axios from '../api/axios';
import {
  Question,
  QuestionActions,
  QuestionRequest,
  QuestionState,
} from '../type/question.type';
import { useModalOpenCloseStore } from './useModal';

const useQnaStore = create<QuestionState & QuestionActions>()(
  immer((set, get) => ({
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
        const response = await axios.get<QuestionRequest>('/question/', {
          params: {
            page: 1,
            size: 10,
          },
        });
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
    updateQuestion: async (questionData) => {
      try {
        const response = await axios.patch(
          `/question/${questionData?.class_id}/?question_id=${questionData?.id}`,
          {
            question_title: questionData?.question_title,
            question: questionData?.question,
          },
        );
        const updatedQuestion: Question = response.data;
        set((state) => ({
          questions: state.questions?.map((q) =>
            q.id === updatedQuestion.id ? updatedQuestion : q,
          ),
        }));
        get().getMyQuestions();
      } catch (error) {
        console.error('Failed to update question: ', error);
      }
    },

    // 질문을 삭제하는 함수
    deleteQuestion: async (classId, questionId) => {
      try {
        await axios.delete(`/question/${classId}/?question_id=${questionId}`);
        set((state) => ({
          questions: state.questions?.filter((q) => q.id !== questionId),
        }));
        useModalOpenCloseStore
          .getState()
          .setModal('Success to remove your question');
      } catch (error) {
        console.error('Failed to delete question: ', error);
        useModalOpenCloseStore.getState().setModal('Failed to remove');
      }
    },
  })),
);

export default useQnaStore;
