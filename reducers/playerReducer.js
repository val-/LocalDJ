import { PLAY, PAUSE, SET_TRACK } from '../actions/types';

const initialState = {
  isActive: false,
  track: false,
};

const playerReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TRACK:
      return {
        ...state,
        track: action.payload.track,
      };
    case PLAY:
      return {
        ...state,
        isActive: true,
      };
    case PAUSE:
      return {
        ...state,
        isActive: false,
      };
    default:
      return state;
  }
};

export default playerReducer;
