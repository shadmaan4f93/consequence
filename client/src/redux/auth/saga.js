import {
  all, call, fork, put, takeEvery,
} from 'redux-saga/effects';

import axiosInstance  from "../../service/request.js";

import { ActionTypes } from '../types';
import {
  postLoginSuccess,
  postLoginError,
  postRegisterSuccess,
  postRegisterError
} from './actions';

const postLoginAsync = (payload) => axiosInstance.post('api/accounts/login/', payload);

function* postLogin({payload}) {
  try {
    const { data } = yield call(postLoginAsync, payload);
    localStorage.setItem("userData", JSON.stringify(data));
    yield put(postLoginSuccess(data));
  } catch (error) {
    yield put(postLoginError(error));
  }
}

export function* watchPostLogin() {
  yield takeEvery(ActionTypes.POST_LOGIN, postLogin);
}


const postRegisterAsync = (payload) => axiosInstance.post('api/accounts/register/', payload);

function* postRegister({payload}) {
  try {
    const { data } = yield call(postRegisterAsync, payload);
    yield put(postRegisterSuccess(data));
  } catch (error) {
    yield put(postRegisterError(error));
  }
}

export function* watchPostRegister() {
  yield takeEvery(ActionTypes.POST_REGISTER, postRegister);
}

export default function* rootSaga() {
  yield all([
    fork(watchPostLogin),
    fork(watchPostRegister)
  ]);
}
