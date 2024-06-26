import { IStatUser } from '../types/userTypes';

export const getAverageScore = (array: IStatUser[]) => {
    let countScore = 0;
    const allScore = array.reduce((prev, current) => {
        if (current.isFilled === true) {
            countScore++;
            return prev + current.value;
        }

        return prev;
    }, 0);

    if (((allScore / countScore) * 10) % 10 === 0) {
        return (allScore / countScore);
    }

    return (allScore / countScore).toFixed(1);
};
