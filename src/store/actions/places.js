import {
  ADD_PLACE,
  SELECT_PLACE,
  DELETE_PLACE,
  DESELECT_PLACE,
  SET_PLACES
} from "./actionTypes";
import { stopLoading, startLoading } from './';

const imageUri = 'https://us-central1-awesome-places-1564486653305.cloudfunctions.net/storeImage';
const storeUri = 'https://awesome-places-1564486653305.firebaseio.com/places.json';

export const deletePlace = (key) => {
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

export const addPlace = (place, location, image) => {

  return dispatch => {
    dispatch(startLoading());
    fetch(imageUri, {
      method: "POST",
      body: JSON.stringify({
        image: image.base64
      })
    })
      .catch(err => {
        console.log('Error', err);
        alert('something wrong! try again');
        dispatch(stopLoading());
      })
      .then(res => res.json())
      .then( res => {
        const placeData = {
          name: place,
          location,
          image: res
        };
        return fetch(storeUri,{
            method: "POST",
            body: JSON.stringify(placeData)
          })
          .catch(err => {
            console.log('Error', err);
            alert('something wrong! try again');
            dispatch(stopLoading());
          })
          .then(res => res.json())
          .then(res => {
            dispatch(stopLoading());
          })

    })
  }
};

export const getPlaces = () => {
  return dispatch => {
    fetch(storeUri)
      .catch(err => {
        console.log('Error', err);
        alert('something wrong! try again')
      })
      .then(res => res.json())
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
}
};

// export const deletePlace = key => {
//   return dispatch => {
//     fetch(storeUri, {
//       method: "DELETE",
//       body: JSON.stringify({
//         id: key
//       })
//     })
//       .then(res => {
//         console.log(res)
//       })
//       .catch(err => {
//         console.log(err)
//       })
//   }
// };
