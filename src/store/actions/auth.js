import AsyncStorage from '@react-native-community/async-storage';
import { AUTH_SET_TOKEN, AUTH_GET_TOKEN_SUCCESS, AUTH_CLEAR_STORAGE } from "./actionTypes";
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

export const authSetToken = (token, expiryDate) => {
  return {
    type:  AUTH_SET_TOKEN,
    token,
    expiryDate
  }
};

export const authStoreToken = (token, expiresIn, refreshToken) => {
  const now = new Date();
  const expiryDate = now.getTime() + expiresIn * 1000;
  return dispatch => {
    dispatch(authSetToken(token, expiryDate));
    AsyncStorage.setItem('authToken', token);
    AsyncStorage.setItem('authExpiresIn', expiryDate.toString());
    AsyncStorage.setItem('authRefreshToken', refreshToken)
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
  let persedToken;
  return (dispatch, getState) => {
    const promise = new Promise((resolve, reject) => {
      const token = getState().auth.token;
      const expiryDate = getState().auth.expiryDate;
      if(!token || new Date(expiryDate) <= new Date()) {
        AsyncStorage.getItem('authToken')
          .catch( error => {
            dispatch(authGetTokenSuccess());
            reject()
          })
          .then(tokenFromStorage => {
            persedToken = tokenFromStorage;
            if (!tokenFromStorage) {
              dispatch(authGetTokenSuccess());
              reject();
              return;
            }
            return AsyncStorage.getItem('authExpiresIn');
          })
          .then( expiryDate => {
            const persedDate = new Date (parseInt(expiryDate));
            const now = new Date();
            if(persedDate > now) {
              dispatch(authSetToken(persedToken));
              resolve(persedToken);
              dispatch(authGetTokenSuccess())
            } else {
              reject();
              dispatch(authGetTokenSuccess())
            }
          })
          .catch(err => reject());
      } else {
        resolve(token);
        dispatch(authGetTokenSuccess())
      }
    });
    return promise.catch(err => {
      return AsyncStorage.getItem('authRefreshToken')
        .then( refreshToken => {
          return fetch('https://securetoken.googleapis.com/v1/token?key=AIzaSyAa15ldjxojbXPWb7FZwGM4lvayGzJg1i4', {
            method: 'POST',
            body: "grant_type=refresh_token&refresh_token=" + refreshToken,
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          })
        })
        .then(res => res.json())
        .then(({id_token, refresh_token, expires_in}) => {
          if(id_token){
            dispatch(authStoreToken(id_token, expires_in, refresh_token));
            dispatch(stopLoading());
            return id_token
          } else {
            dispatch(authClearStorage());
          }
        });
    })
      .then(token => {
        if(!token){
          throw new Error()
        } else {
          return token
        }
      });
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
         const { idToken, expiresIn, refreshToken } = persedRes;
            dispatch(authStoreToken(idToken, expiresIn, refreshToken));
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
          const { idToken, expiresIn, refreshToken } = persedRes;
          dispatch(authStoreToken(idToken, expiresIn, refreshToken));
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

const authClearStorage = () => {
  return dispatch => {
    AsyncStorage.removeItem('authToken');
    AsyncStorage.removeItem('authExpiresIn');
    return AsyncStorage.removeItem('authRefreshToken');
  }
};

export const authLogout = (callBack) => {
  return dispatch => {
    dispatch(authClearStorage())
      .then(() => {
        callBack();
      });
    dispatch(authRemoveToken());
  }
};

export const authRemoveToken = () => {
  return {
    type: AUTH_CLEAR_STORAGE
  }
};
