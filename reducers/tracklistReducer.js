import { ADD_TRACKS, REMOVE_TRACK } from '../actions/types';
import { removeFromList } from '../utils';

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

export default tracklistReducer;
