import * as authActions from './auth/auth.actions';
import { currentTestSlice } from './currentTest/currentTest.slice';
import * as currentTestAction from './currentTest/currentTest.action';
import { authModalSlice } from './authModal/authModal.slice';

export const allActions = {
  ...authActions,
  ...currentTestAction,
  ...currentTestSlice.actions,
  ...authModalSlice.actions,
};
