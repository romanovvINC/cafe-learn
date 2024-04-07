import {IUserState} from '../../store/auth/auth.interface';
import {IUser, role} from '../../types/userTypes';

export const saveTokenStorage = (token: string, user: IUser) => {
    localStorage.setItem('accessToken', token);
    const userStorage: IUserState = {
        pointTests: user.pointTests,
        avatar: user.avatar,
        name: user.name,
        id: user.id,
        role: role.INTERN,
    };
    localStorage.setItem('user', JSON.stringify(userStorage));
};

export const removeTokenStorage = () => {
    localStorage.removeItem('accessToken');
};
