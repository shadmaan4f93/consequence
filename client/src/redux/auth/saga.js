import {
  all, call, fork, put, takeEvery,
} from 'redux-saga/effects';

import axiosInstance  from "../../service/request.js";

import { ActionTypes } from '../types';
import {
  postLoginSuccess,
  postLoginError,
  postRegisterSuccess,
  postRegisterError,
  getUserSuccess,
  getUserError,
  updateUserSuccess,
  updateUserError
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


const getUserAsync = () => axiosInstance.get('api/accounts/user/');

function* getUser() {
  try {
    const { data } = yield call(getUserAsync);
    yield put(getUserSuccess(data));
  } catch (error) {
    yield put(getUserError(error));
  }
}

export function* watchGetUser() {
  yield takeEvery(ActionTypes.GET_USER, getUser);
}


const updateUserAsync = (payload) => axiosInstance.put(`api/accounts/user/${payload.id}/`, payload);

function* updateUser({payload}) {
  try {
    const { data } = yield call(updateUserAsync, payload);
    yield put(updateUserSuccess(data));
  } catch (error) {
    yield put(updateUserError(error));
  }
}

export function* watchUpdateUser() {
  yield takeEvery(ActionTypes.UPDATE_USER, updateUser);
}


export default function* rootSaga() {
  yield all([
    fork(watchPostLogin),
    fork(watchPostRegister),
    fork(watchGetUser),
    fork(watchUpdateUser)
  ]);
}
