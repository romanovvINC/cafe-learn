import { createSlice } from '@reduxjs/toolkit';
import { MyToast } from '../../components/ui/MyToast/MyToast';
import { getStoreLocal } from '../../utils/getStoreLocal';
import {improveSkills, login, logout, registration} from './auth.actions';
import { IInitialStateAuth, IUserState } from './auth.interface';

const initialState: IInitialStateAuth = {
  isLoading: false,
  error: '',
  user: getStoreLocal<IUserState>('user'),
};
// @ts-ignore
export const authSlice = createSlice<IInitialStateAuth>({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(registration.pending, (state) => {
      state.isLoading = true;
    })
      .addCase(registration.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.user = {
          name: payload.name,
          id: payload.id,
          avatar: payload.avatar,
          pointTests: payload.pointTests,
          role: payload.role,
        };
        MyToast('Вы успешно зарегистрировались', true);
      })
      .addCase(registration.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        MyToast('Произошла ошибка при регистрации', false);
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.user = {
          name: payload.name,
          id: payload.id,
          avatar: payload.avatar,
          pointTests: payload.pointTests,
          role: payload.role,
        };
        console.log(payload);
        MyToast('Вы успешно авторизировались', true);
      })
      .addCase(login.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        MyToast('Произошла ошибка при авторизации', false);
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        MyToast('Вы вышли успешно', true);
      })
        .addCase(improveSkills.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(improveSkills.fulfilled, (state, { payload }) => {
          state.isLoading = false;
          console.log(payload);
          state.user = {
            name: payload.name,
            id: payload.id,
            avatar: payload.avatar,
            pointTests: payload.pointTests,
            role: payload.role,
          };
          console.log(payload);
          MyToast('Ваша квалификация успешно повышена', true);
        })
        .addCase(improveSkills.rejected, (state) => {
          state.isLoading = false;
          MyToast('Не удалось повысить квалификацию', false);
        })
  },
});

export const { reducer } = authSlice;
