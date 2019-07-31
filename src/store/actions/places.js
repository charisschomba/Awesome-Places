import {
  ADD_PLACE,
  SELECT_PLACE,
  DELETE_PLACE,
  DESELECT_PLACE
} from "./actionTypes";

export const addPlace = (place, location, image) => {
  return {
    type: ADD_PLACE,
    placeName: place,
    location,
    image
  }
};

export const deletePlace = (key) => {
  return {
    type: DELETE_PLACE,
    placeKey: key
  }
};

