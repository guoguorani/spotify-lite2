import { combineReducers } from 'redux';

import axios from 'axios';

// Action Types
const SIGNUP_REQUEST = 'SIGNUP_REQUEST';
const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
const SIGNUP_FAILURE = 'SIGNUP_FAILURE';

const LOGIN_REQUEST = 'LOGIN_REQUEST';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGIN_FAILURE = 'LOGIN_FAILURE';

const LOGOUT_USER = 'LOGOUT_USER';

// Action Creators
export const signUpUser = (name, email, password) => {
  return async (dispatch) => {
    try {
      dispatch(signUpRequest());
      await axios.post("http://localhost:3000/user/signup", {
        name,
        email,
        password,
      });
      dispatch(signUpSuccess());
    } catch (error) {
      dispatch(signUpFailure(error.response.data.message));
    }
  };
};

export const signUpRequest = () => {
  return {
    type: SIGNUP_REQUEST,
  };
};

export const signUpSuccess = () => {
  return {
    type: SIGNUP_SUCCESS,
  };
};

export const signUpFailure = (error) => {
  return {
    type: SIGNUP_FAILURE,
    payload: error,
  };
};

export const loginUser = (email, password) => {
  return async (dispatch) => {
    try {
      dispatch(loginRequest());
      const response = await axios.post("http://localhost:3000/user/login", { email, password });
      localStorage.setItem("token", response.data.token);
      dispatch(loginSuccess());
    } catch (error) {
      dispatch(loginFailure(error.response.data.message));
    }
  };
};

export const loginRequest = () => {
  return {
    type: LOGIN_REQUEST,
  };
};

export const loginSuccess = () => {
  return {
    type: LOGIN_SUCCESS,
  };
};

export const loginFailure = (error) => {
  return {
    type: LOGIN_FAILURE,
    payload: error,
  };
};

export const logoutUser = () => {
  localStorage.removeItem("token");
  return {
    type: LOGOUT_USER,
  };
};

// Reducers
const authReducer = (state = { token: null }, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return { ...state, token: localStorage.getItem('token') };
    case LOGOUT_USER:
      return { ...state, token: null };
    default:
      return state;
  }
};

const signUpReducer = (state = { loading: false, error: null }, action) => {
  switch (action.type) {
    case SIGNUP_REQUEST:
      return { ...state, loading: true };
    case SIGNUP_SUCCESS:
      return { ...state, loading: false };
    case SIGNUP_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const loginReducer = (state = { loading: false, error: null }, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return { ...state, loading: true };
    case LOGIN_SUCCESS:
      return { ...state, loading: false };
    case LOGIN_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  auth: authReducer,
  signUp: signUpReducer,
  login: loginReducer,
});

export default rootReducer;


export const fetchUserProfile = () => {
  return async (dispatch) => {
    try {
      dispatch(fetchProfileRequest());
      const response = await axios.get("http://localhost:3000/user/info");
      dispatch(fetchProfileSuccess(response.data));
    } catch (error) {
      dispatch(fetchProfileFailure(error.response.data.message));
    }
  };
};

export const updateProfile = (userData) => {
  return async (dispatch) => {
    try {
      dispatch(updateProfileRequest());
      const response = await axios.put("http://localhost:3000/user/info", userData);
      dispatch(updateProfileSuccess(response.data));
    } catch (error) {
      dispatch(updateProfileFailure(error.response.data.message));
    }
  };
};

export const loginRequest = () => {
  return {
    type: "LOGIN_REQUEST",
  };
};

export const loginSuccess = () => {
  return {
    type: "LOGIN_SUCCESS",
  };
};

export const loginFailure = (error) => {
  return {
    type: "LOGIN_FAILURE",
    payload: error,
  };
};

export const fetchProfileRequest = () => {
  return {
    type: "FETCH_PROFILE_REQUEST",
  };
};

export const fetchProfileSuccess = (profileData) => {
  return {
    type: "FETCH_PROFILE_SUCCESS",
    payload: profileData,
  };
};

export const fetchProfileFailure = (error) => {
  return {
    type: "FETCH_PROFILE_FAILURE",
    payload: error,
  };
};

export const updateProfileRequest = () => {
  return {
    type: "UPDATE_PROFILE_REQUEST",
  };
};

export const updateProfileSuccess = (profileData) => {
  return {
    type: "UPDATE_PROFILE_SUCCESS",
    payload: profileData,
  };
};

export const updateProfileFailure = (error) => {
  return {
    type: "UPDATE_PROFILE_FAILURE",
    payload: error,
  };
};
