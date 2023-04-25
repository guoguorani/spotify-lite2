// ./redux/store.js

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { rootReducer } from './user/userReducer';

// const rootReducer = combineReducers({
//   user: userReducer,
//   // other reducers...
// });

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;

