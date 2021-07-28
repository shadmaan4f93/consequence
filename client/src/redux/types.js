const mirror = require("keymirror");

export const ActionTypes = mirror({
  POST_LOGIN: null,
  POST_LOGIN_SUCCESS: null,
  POST_LOGIN_ERROR: null,

  POST_REGISTER: null,
  POST_REGISTER_SUCCESS: null,
  POST_REGISTER_ERROR: null,

  GET_USER: null,
  GET_USER_SUCCESS: null,
  GET_USER_ERROR: null,

  UPDATE_USER: null,
  UPDATE_USER_SUCCESS: null,
  UPDATE_USER_ERROR: null,

});


