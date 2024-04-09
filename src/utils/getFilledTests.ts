import { IStatUser } from '../types/userTypes';

export const getFilledTests = (array: IStatUser[]) => {
    const countFilled = array.reduce((prev, current) => {
        if (current.isFilled === true) {
            prev++;
            return prev;
        }

        return prev;
    }, 0);

    return countFilled;
};
