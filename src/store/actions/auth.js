import { TRY_AUTH, AUTH_SUCCESS } from "./actionTypes";
import { stopLoading, startLoading} from "./loader";

export const tryAuth = (authData, authMode, callBack) => {
  return dispatch => {
    if(authMode === 'login') {
      dispatch(authLogin(authData, callBack));
    } else {
      dispatch(authSignup(authData, callBack));
    }
  }
};

export const authSuccess = () => {
  return {
    type: AUTH_SUCCESS
  }
};

export const authSignup = (authData, callBack) => {
  return dispatch => {
    dispatch(startLoading());
    fetch("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAa15ldjxojbXPWb7FZwGM4lvayGzJg1i4", {
      method: 'POST',
      body: JSON.stringify({
        email: authData.email,
        password: authData.password,
        returnSecureToken: true
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(persedRes => {
       if (!persedRes.error) {
            callBack();
            dispatch(stopLoading())
        } else {
         console.warn(error);
          alert('Authentication failed, try again');
          dispatch(stopLoading())
        }
      })
      .catch(error => {
        console.warn(error);
        alert('Authentication failed, try again');
        dispatch(stopLoading())
      })
  };
};

export const authLogin = (authData, callBack) => {
  return dispatch => {
    dispatch(startLoading());
    fetch("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAa15ldjxojbXPWb7FZwGM4lvayGzJg1i4", {
      method: 'POST',
      body: JSON.stringify({
        email: authData.email,
        password: authData.password,
        returnSecureToken: true
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(persedRes => {
        if (!persedRes.error) {
          callBack();
          dispatch(stopLoading())
        } else {
          console.warn(persedRes.error);
          alert('Authentication failed, try again');
          dispatch(stopLoading())
        }
      })
      .catch(error => {
        console.warn(error);
        alert('Authentication failed, try again');
        dispatch(stopLoading())
      })
  };
};

