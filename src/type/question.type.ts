export type Question = {
  id: string | number;
  created_at: string
  updated_at: string
  question: string
  question_title: string
  answer: string
  answer_title: string
  class_id: string | number;
  user_id: string | number;
};

export type QuestionState = {
  questions: Question[] | null;
  myQuestions: Question[] | null;
};
export type QuestionActions = {
  fetchQuestionDetail: (classId: string | undefined) => Promise<void>;
  fetchMyQuestions: (userId: string | undefined) => Promise<void>;
  getQuestionAll: () => Promise<void>;
  createQuestion: (
    classId: string | undefined,
    questionData: Pick<Question, 'question_title' | 'question'>,
  ) => Promise<void>;
  updateQuestion: (
    classId: string | undefined,
    questionId: string | undefined,
    questionData: Pick<Question, 'question_title' | 'question'>,
  ) => Promise<void>;
  deleteQuestion: (
    classId: string | undefined,
    questionId: string | undefined,
  ) => Promise<void>;
};
