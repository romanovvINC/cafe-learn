import { IAnswerUser } from '../store/currentTest/currentTest.interface';
import { ICurrentQuestion } from '../types/questionTypes';

export const getPointUser = (allQuestions: ICurrentQuestion[], answersUser: IAnswerUser[]) => {
    let points = 0;
    allQuestions.forEach((question) => {
        let numberEquals = 0;
        question.correctAnswerId.forEach((correctAnswerId) => {
            const answerUser = answersUser.find((answer) => answer.idQuestion === question.id);
            if (answerUser !== undefined) {
                const answer = answerUser.IdAnswersUser.find((aUser) => aUser === correctAnswerId);

                if (answer !== undefined) {
                    numberEquals += 1;
                }
            }
        });

        if (numberEquals === question.correctAnswerId.length) {
            points += 1;
        }
    });

    return String(points);
};
