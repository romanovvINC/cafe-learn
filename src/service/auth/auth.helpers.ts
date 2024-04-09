import {IUserState} from '../../store/auth/auth.interface';
import {IUser} from '../../types/userTypes';

export const saveTokenStorage = (token: string, user: IUser) => {
    localStorage.setItem('accessToken', token);
    const userStorage: IUserState = {
        pointTests: user.pointTests,
        avatar: user.avatar,
        name: user.name,
        id: user.id,
        role: user.role,
    };
    localStorage.setItem('user', JSON.stringify(userStorage));
};

export const removeTokenStorage = () => {
    localStorage.removeItem('accessToken');
};
