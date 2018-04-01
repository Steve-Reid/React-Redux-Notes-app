import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import notesReducer from '../reducers/notes';
import selectorReducer from '../reducers/selectors';
import userReducer from '../reducers/users';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    combineReducers({
      notes: notesReducer,
      selectors: selectorReducer,
      user: userReducer
    }),
    composeEnhancers(applyMiddleware(thunk))
  );

  return store;
};
