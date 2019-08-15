import {
  ADD_PLACE,
  SELECT_PLACE,
  DELETE_PLACE,
  DESELECT_PLACE,
  SET_PLACES
} from "./actionTypes";
import { stopLoading, startLoading, authGetToken } from './';

const imageUri = 'https://us-central1-awesome-places-1564486653305.cloudfunctions.net/storeImage';
const storeUri = 'https://awesome-places-1564486653305.firebaseio.com/places.json';
const deleteUri = 'https://awesome-places-1564486653305.firebaseio.com/places/';

export const deletePlaceLocally = (key) => {
  return {
    type: DELETE_PLACE,
    placeKey: key
  }
};

export const setPlace = places => {
  return {
    type: SET_PLACES,
    places
  }
};

export const addPlace = (place, location, image, callBack) => {

  return dispatch => {
    let authToken;
    dispatch(startLoading());
    dispatch(authGetToken())
      .catch(err => {
        alert('please log in first to share a place');
      })
      .then( token => {
        authToken = token;
        return fetch(imageUri, {
          method: "POST",
          body: JSON.stringify({
            image: image.base64
          }),
          headers: {
            "Authorization": "Bearer "+ token
          }
        })
      })
      .then(res => {
        if(res.ok){
          return res.json();
        } else {
          throw new Error();
        }
      })
      .then( res => {
        const placeData = {
          name: place,
          location,
          image: res
        };
        return fetch(storeUri + '?auth=' + authToken,{
            method: "POST",
            body: JSON.stringify(placeData)
          })
          .catch(err => {
            console.log('Error', err);
            alert('something wrong! try again');
            dispatch(stopLoading());
          })
          .then(res => {
            if(res.ok){
              return res.json();
            } else {
              throw new Error();
            }
          })
          .then(res => {
            callBack();
            dispatch(stopLoading());
          });

    })
      .catch(err => {
        console.log('Error', err);
        alert('something wrong! try again');
        dispatch(stopLoading());
      })
  }
};

export const getPlaces = () => {
  return dispatch => {
    dispatch(authGetToken())
      .then( token =>{
        return fetch(storeUri + '?auth=' + token)
      })
      .catch(err => {
        alert('please login first')
      })
      .then(res => {
        if(res.ok){
          return res.json();
        } else {
          throw new Error();
        }
      })
      .then(persedRes => {
        const places = [];
        for(let key in persedRes){
          places.push({
            ...persedRes[key],
            key: key,
            image: {
              uri: persedRes[key].image.imageUrl
            }
          })
        }
        dispatch(setPlace(places))
      })
      .catch(err => {
        console.log('Error', err);
        alert('something wrong! try again11')
      });
};
};

export const deletePlace = key => {
  return dispatch => {
    dispatch(deletePlaceLocally(key));
    dispatch(authGetToken())
      .then( token => {
        return fetch(deleteUri + key + '.json?auth=' + token  , {
          method: "DELETE",
          body: JSON.stringify({
            id: key
          })
        })
      })
      .catch( err => {
        alert('please login first')
      })
      .then(res => {
        alert('place deleted')
      })
      .catch(err => {
        console.log(err)
      });
  }
};
