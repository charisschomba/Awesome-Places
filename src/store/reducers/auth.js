import { AUTH_GET_TOKEN, AUTH_SET_TOKEN, AUTH_GET_TOKEN_SUCCESS } from "../actions/actionTypes";

const initialState = {
  token: null,
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
        token: action.token
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
