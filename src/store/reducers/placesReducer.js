import {
  SET_PLACES,
  DELETE_PLACE
} from '../actions/actionTypes';


const initialState = {
  places: [],
  placesLoaded: false
};

const reducer = (state = initialState, action) => {
  const { places } = action;
  switch (action.type) {
    case SET_PLACES:
      return {
        ...state,
        places: places,
        placesLoaded: true


      };
    case DELETE_PLACE:
      return {
        ...state,
        places: state.places.filter(place => {
          return place.key !== action.placeKey
        }),
      };
    default:
      return state
  }
};

export default reducer;
