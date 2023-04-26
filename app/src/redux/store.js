// ./redux/store.js

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './rootReducer'; // import as default

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
