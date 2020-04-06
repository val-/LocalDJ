import { ADD_TRACKS } from '../actions/types';

const initialState = [];

const tracklistReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TRACKS:
      return [
        ...state,
        ...action.payload,
      ];
    default:
      return state;
  }
};

export default tracklistReducer;
