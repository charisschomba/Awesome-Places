import AsyncStorage from '@react-native-community/async-storage';
import { AUTH_SET_TOKEN, AUTH_GET_TOKEN_SUCCESS } from "./actionTypes";
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

export const authStoreToken = token => {
  return dispatch => {
    dispatch(authSetToken(token));
    AsyncStorage.setItem('authToken', token)

  }
};

export const authGetTokenSuccess = () => {
  return {
    type: AUTH_GET_TOKEN_SUCCESS
  }
};

export const authAutoSignIn = (callBack) => {
  return dispatch => {
    dispatch(authGetToken())
      .then( token => {
        callBack();
      })
      .catch(err => {
        return;
      })
  };
};

export const authGetToken = () => {
  return (dispatch, getState) => {
    const promise = new Promise((resolve, reject) => {
      const token = getState().auth.token;
      if(!token) {
        AsyncStorage.getItem('authToken')
          .catch( error => {
            dispatch(authGetTokenSuccess());
            reject()
          })
          .then(tokenFromStorage => {
            if (!tokenFromStorage) {
              dispatch(authGetTokenSuccess());
              reject();
              return;
            }
            dispatch(authSetToken(tokenFromStorage));
            resolve(tokenFromStorage);
            dispatch(authGetTokenSuccess())
          });
      } else {
        resolve(token);
        dispatch(authGetTokenSuccess())
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
            dispatch(authStoreToken(persedRes.idToken));
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
          dispatch(authStoreToken(persedRes.idToken));
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

