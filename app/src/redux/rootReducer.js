// ./redux/rootReducer.js

import { combineReducers } from 'redux';
import userReducer from './user/userReducer';
import artistReducer from './artist/artistReducer';

const rootReducer = combineReducers({
  user: userReducer,
  artist: artistReducer,
});

export default rootReducer; // export as default

