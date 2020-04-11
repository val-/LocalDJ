import { ADD_TRACKS, REMOVE_TRACK } from '../actions/types';

const initialState = [];

const tracklistReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TRACKS:
      return [
        ...state,
        ...action.payload.tracks,
      ];
    case REMOVE_TRACK:
      return removeFromList(state, action.payload.track);      
    default:
      return state;
  }
};

const removeFromList = (list, removedItem) => list.filter((item) => item !== removedItem);

export default tracklistReducer;
