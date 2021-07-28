import { ActionTypes } from '../types';

const INIT_STATE = {
  user: {}
};

export default (state = INIT_STATE, action) => {
  state.actionType = action.type;
  switch (action.type) {
    case ActionTypes.POST_LOGIN:
      return { ...state, postLoginSuccess: false, error: false };
    case ActionTypes.POST_LOGIN_SUCCESS:
      return { ...state, user: action.payload, postLoginSuccess: true, error: false };
    case ActionTypes.POST_LOGIN_ERROR:
      return { ...state, postLoginError: action.payload, postLoginSuccess: false, error: true };
    case ActionTypes.POST_REGISTER:
      return { ...state, postRegisterSuccess: false, error: false };
    case ActionTypes.POST_REGISTER_SUCCESS:
      return { ...state, user: action.payload, postRegisterSuccess: true, error: false };
    case ActionTypes.POST_REGISTER_ERROR:
      return { ...state, postRegisterError: action.payload, postRegisterSuccess: false, error: true };
    case ActionTypes.GET_USER:
      return { ...state, getUserSuccess: false, error: false };
    case ActionTypes.GET_USER_SUCCESS:
      return { ...state, user: action.payload, getUserSuccess: true, error: false };
    case ActionTypes.GET_USER_ERROR:
      return { ...state, getUserError: action.payload, getUserSuccess: false, error: true };

    case ActionTypes.UPDATE_USER:
      return { ...state, updateUserSuccess: false, error: false };
    case ActionTypes.UPDATE_USER_SUCCESS:
      return { ...state, user: action.payload, updateUserSuccess: true, error: false };
    case ActionTypes.UPDATE_USER_ERROR:
      return { ...state, updateUserError: action.payload, updateUserSuccess: false, error: true };

    default:
      return { ...state };
  }
};
