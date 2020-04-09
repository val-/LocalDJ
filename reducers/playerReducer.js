import {
  PLAY,
  PAUSE,
  SET_TRACK,
  ROLLBACK_TRACK,
  ROLLFORWARD_TRACK
} from '../actions/types';

const initialState = {
  isActive: false,
  track: {
    past: [],
    present: false,
    future: [],
  },
};

const playerReducer = (state = initialState, action) => {
  const { past, present, future } = state.track;
  switch (action.type) {
    case SET_TRACK:
      return {
        ...state,
        track: {
          past: present ? [...past, present] : past,
          present: action.payload.track,
          future: [],
        },
      };
    case ROLLBACK_TRACK:
      return {
        ...state,
        track: {
          past: past.slice(0, past.length - 1),
          present: past[past.length - 1],
          future: [present, ...future]
        },
      };
    case ROLLFORWARD_TRACK:
      return {
        ...state,
        track: {
          past: [...past, present],
          present: future[0],
          future: future.slice(1)
        },
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
