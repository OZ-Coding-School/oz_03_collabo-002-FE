export type Question = {
  id: string | number;
  created_at: string;
  question: string;
  question_title: string;
  answer: string | null;
  answer_title: string | null;
  class_id: string | number;
  user_id: string | number;
  updated_at?: string;
};

export type QuestionRequest = {
  total_count: number;
  total_pages: number;
  current_page: number;
  questions: Question[];
};

export type QuestionState = {
  questions: Question[] | null;
  myQuestions: Question[] | null;
};
export type QuestionActions = {
  getMyQuestions: () => Promise<void>;
  fetchQuestionDetail: (classId: string | undefined) => Promise<void>;
  createQuestion: (
    classId: string | undefined,
    questionData: Pick<Question, 'question_title' | 'question'>,
  ) => Promise<void>;
  updateQuestion: (questionData: Question | null) => Promise<void>;
  deleteQuestion: (classId: string, questionId: string) => Promise<void>;
};
