import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import playerReducer from './reducers/playerReducer';
import tracklistReducer from './reducers/tracklistReducer';

const rootReducer = combineReducers({
  player: playerReducer,
  tracklist: tracklistReducer,
});

function logger({getState}) {
  return next => action => {
    console.log('will dispatch: ', action);
    const returnValue = next(action);
    console.log('state after dispatch: ', JSON.stringify(getState(), false, 2));
    console.log('__________________________________________________________');
    return returnValue;
  };
}

const configureStore = () => {
  return createStore(rootReducer, {}, applyMiddleware(thunk, logger));
};

export default configureStore;

/*

 STATE SHAPE:

 {

  player: {
    isActive: true,
    track: {
      past: [],
      present: 'c.mp3',
      future: [],
    }
  },

  tracklist: [
    'a.mp3',
    'b.mp3',
    'c.mp3',
    'd.mp3',
  ]

 }


 ACTIONS:

 SET_TRACK - устанавливает текущий трэк
 
 PLAY - включает текущий трэк
 PAUSE - выключает текущий трэк




*/
