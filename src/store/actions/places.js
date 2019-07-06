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

export const deletePlace = () => {
  return {
    type: DELETE_PLACE
  }
};

export const selectPlace = key => {
  return {
    type: SELECT_PLACE,
    placeKey: key
  }
};

export const deselectPlace = () => {
  return {
    type: DESELECT_PLACE
  }
};
