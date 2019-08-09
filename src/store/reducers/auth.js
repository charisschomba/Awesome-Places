import { AUTH_GET_TOKEN, AUTH_SET_TOKEN } from "../actions/actionTypes";

const initialState = {
  token: null
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
    default:
      return state

  }
};

export default auth;
