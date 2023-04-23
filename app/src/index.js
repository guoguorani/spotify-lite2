// New Features
// - A user can register as a regular user or as an artist 
// (provide the same signup information,
// update their backend model to include a role).
// - Artists are limited to the following functionality: 
// view their list of followers, upload new songs,
// edit and delete their existing songs.
// *** For simplicity, they cannot like songs, follow other artists, or view/edit their own profile.
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { rootReducer } from './redux/reducer/userReducer';
import App from './App';

const store = createStore(rootReducer, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

