import { ICurrentQuestion } from '../../types/questionTypes';

export interface IInitialStateCreateTest {
  questions: ICurrentQuestion[]
}

export interface AddQuestionPayload {
  questionsText: string;
  answers: IAnswerCreateTest[];
  questionId: string;
}

export interface IAnswerCreateTest {
  answerText: string;
  answerCorrect: boolean;
}
