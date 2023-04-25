// ./redux/store.js

import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { rootReducer } from './user/userReducer';

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;

