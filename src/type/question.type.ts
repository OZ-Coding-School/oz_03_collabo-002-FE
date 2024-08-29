export type Question = {
  id: string;
  questionTitle: string;
  question: string;
  answerTitle: string;
  answer: string;
  author: string;
  classId: string;
  complete: boolean;
  createDate: string;
  answerDate: string;
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
    questionData: Pick<Question, 'questionTitle' | 'question'>,
  ) => Promise<void>;
  updateQuestion: (
    classId: string | undefined,
    questionId: string | undefined,
    questionData: Pick<Question, 'questionTitle' | 'question'>,
  ) => Promise<void>;
  deleteQuestion: (
    classId: string | undefined,
    questionId: string | undefined,
  ) => Promise<void>;
};
