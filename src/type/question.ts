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
  fetchQuestionDetail: (id: string | undefined) => Promise<void>;
  fetchMyQuestions: (userId: string | undefined) => Promise<void>;
  getQuestionAll: () => Promise<void>;
};
