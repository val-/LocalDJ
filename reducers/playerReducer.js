import {PLAY, PAUSE} from '../actions/types';

const initialState = {
  isActive: false,
};

const playerReducer = (state = initialState, action) => {
  switch (action.type) {
    case PLAY:
      return {
        ...state,
        isActive: true,
        track: action.payload.track
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
