import { AUTH_GET_TOKEN, AUTH_SET_TOKEN, AUTH_GET_TOKEN_SUCCESS, AUTH_CLEAR_STORAGE } from "../actions/actionTypes";

const initialState = {
  token: null,
  expiryDate: null,
  isAuthenticated: true
};
const auth = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_GET_TOKEN:
      return {
        ...state,
        success: true
      };
    case AUTH_SET_TOKEN:
      return {
        ...state,
        token: action.token,
        expiryDate: action.expiryDate

      };
    case AUTH_CLEAR_STORAGE:
      return {
        ...state,
        token: null,
        expiryDate: null
      };
    case AUTH_GET_TOKEN_SUCCESS:
      return {
        ...state,
        isAuthenticated: false
      };
    default:
      return state

  }
};

export default auth;
