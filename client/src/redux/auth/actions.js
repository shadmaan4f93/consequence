import { ActionTypes } from '../types';

export const postLogin = (user) => ({
  type: ActionTypes.POST_LOGIN,
  payload: user 
});

export const postLoginSuccess = (user) => ({
  type: ActionTypes.POST_LOGIN_SUCCESS,
  payload: user,
});
export const postLoginError = (message) => ({
  type: ActionTypes.POST_LOGIN_ERROR,
  payload: { message },
});


export const postRegister = (user) => ({
  type: ActionTypes.POST_REGISTER,
  payload: user 
});
export const postRegisterSuccess = (user) => ({
  type: ActionTypes.POST_REGISTER_SUCCESS,
  payload: user,
});
export const postRegisterError = (message) => ({
  type: ActionTypes.POST_REGISTER_ERROR,
  payload: { message },
});


export const getUser = () => ({
  type: ActionTypes.GET_USER,
});

export const getUserSuccess = (user) => ({
  type: ActionTypes.GET_USER_SUCCESS,
  payload: user,
});

export const getUserError = (message) => ({
  type: ActionTypes.GET_USER_ERROR,
  payload: { message },
});

export const updateUser = (user) => ({
  type: ActionTypes.UPDATE_USER,
  payload: user,
});

export const updateUserSuccess = (user) => ({
  type: ActionTypes.UPDATE_USER_SUCCESS,
  payload: user,
});

export const updateUserError = (message) => ({
  type: ActionTypes.UPDATE_USER_ERROR,
  payload: { message },
});