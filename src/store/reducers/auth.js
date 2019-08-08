import { AUTH_SUCCESS } from "../actions/actionTypes";

const initialState = {
  success: false
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_SUCCESS:
      return {
        ...state,
        success: true
      };
    default:
      return state

  }
};

export default auth;
