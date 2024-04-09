import {createAsyncThunk} from '@reduxjs/toolkit';
import {authService} from '../../service/auth/auth.service';
import {IUser} from '../../types/userTypes';
import {IUserImproveSkills, IUserLogin, IUserRegistration} from './auth.interface';
import {userService} from "../../service/user/user.service";

export const registration = createAsyncThunk<IUser, IUserRegistration>('registration', async ({
  email, password, name, avatar,
}, thunkApi) => {
  try {
    const response = await authService.register({
      email, password, name, avatar,
    });
    return response.data;
  } catch (e) {
    return thunkApi.rejectWithValue(e);
  }
});

export const login = createAsyncThunk<IUser, IUserLogin>('login', async ({ email, password }, thunkApi) => {
  try {
    const response = await authService.login({ email, password });
    return response.data;
  } catch (e) {
    return thunkApi.rejectWithValue(e);
  }
});

// eslint-disable-next-line consistent-return
export const logout = createAsyncThunk<void>('logout', async (_, thunkApi) => {
  try {
    await authService.logout();
  } catch (e) {
    return thunkApi.rejectWithValue(e);
  }
});

export const improveSkills = createAsyncThunk<IUser, IUserImproveSkills>('improveSkills', async ({ id, role }, thunkApi) => {
  try {
    const response = await userService.improveSkills(id, role);
    console.log(response.data);
    return response.data;
  } catch (e) {
    return thunkApi.rejectWithValue(e);
  }
});

