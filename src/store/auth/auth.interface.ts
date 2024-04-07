import { IUser } from '../../types/userTypes';

export interface IUserRegistration extends Omit<IUser, 'id' | 'pointTests' | 'role'> {}

export interface IUserLogin extends Omit<IUser, 'id' | 'name' | 'avatar' | 'pointTests' | 'role'> {}

export interface IUserState extends Omit<IUser, 'email' | 'password'> {}

export interface IInitialStateAuth {
  isLoading: boolean;
  error: string;
  user: IUserState | null
}
