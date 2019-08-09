import {AUTH_SET_TOKEN, AUTH_GET_TOKEN} from "./actionTypes";
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

export const authSetToken = token => {
  return {
    type:  AUTH_SET_TOKEN,
    token
  }
};

export const authGetToken = () => {
  return (dispatch, getState) => {
    const promise = new Promise((resolve, reject) => {
      const token = getState().auth.token;
      if(!token) {
        reject()
      } else {
        resolve(token)
      }
    });
    return promise
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
            dispatch(authSetToken(persedRes.idToken));
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
          dispatch(authSetToken(persedRes.idToken));
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

