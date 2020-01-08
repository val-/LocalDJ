import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import playerReducer from './reducers/playerReducer';

const rootReducer = combineReducers({
  player: playerReducer,
});

function logger({getState}) {
  return next => action => {
    console.log('will dispatch: ', action);
    const returnValue = next(action);
    console.log('state after dispatch: ', getState());
    console.log('__________________________________________________________');
    return returnValue;
  };
}

const configureStore = () => {
  return createStore(rootReducer, {}, applyMiddleware(thunk, logger));
};

export default configureStore;
