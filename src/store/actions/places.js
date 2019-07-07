import {
  ADD_PLACE,
  SELECT_PLACE,
  DELETE_PLACE,
  DESELECT_PLACE
} from "./actionTypes";

export const addPlace = (place) => {
  return {
    type: ADD_PLACE,
    placeName: place
  }
};

export const deletePlace = (key) => {
  return {
    type: DELETE_PLACE,
    placeKey: key
  }
};

