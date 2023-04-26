// ./redux/user/userReducer.js
import {
    LOGIN_USER_REQUEST,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILURE,
    SIGNUP_USER_REQUEST,
    SIGNUP_USER_SUCCESS,
    SIGNUP_USER_FAILURE,
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAILURE,
    LIKE_SONG_REQUEST,
    LIKE_SONG_SUCCESS,
    LIKE_SONG_FAILURE,
    FOLLOW_ARTIST_REQUEST,
    FOLLOW_ARTIST_SUCCESS,
    FOLLOW_ARTIST_FAILURE,
    FETCH_LIKED_SONGS_REQUEST,
    FETCH_LIKED_SONGS_SUCCESS,
    FETCH_LIKED_SONGS_FAILURE,
    FETCH_FOLLOWED_ARTISTS_REQUEST,
    FETCH_FOLLOWED_ARTISTS_SUCCESS,
    FETCH_FOLLOWED_ARTISTS_FAILURE,
    FETCH_SONGS_REQUEST,
    FETCH_SONGS_SUCCESS,
    FETCH_SONGS_FAILURE,
    FETCH_ARTISTS_REQUEST,
    FETCH_ARTISTS_SUCCESS,
    FETCH_ARTISTS_FAILURE 
  } from './userActionTypes';
  
  const initialState = {
    loading: false,
    user: null,
    error: null,
    likedSongs: [],
    followedArtists: [],
  };
  
  const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case LOGIN_USER_REQUEST:
      case SIGNUP_USER_REQUEST:
      case UPDATE_PROFILE_REQUEST:
      case LIKE_SONG_REQUEST:
      case FOLLOW_ARTIST_REQUEST:
      case FETCH_LIKED_SONGS_REQUEST:
      case FETCH_FOLLOWED_ARTISTS_REQUEST:
      case FETCH_SONGS_REQUEST:
      case FETCH_ARTISTS_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case LOGIN_USER_SUCCESS:
      case SIGNUP_USER_SUCCESS:
      case UPDATE_PROFILE_SUCCESS:
        return {
          ...state,
          loading: false,
          user: action.payload,
          error: null,
        };
      case LIKE_SONG_SUCCESS:
        return {
          ...state,
          loading: false,
          likedSongs: [...state.likedSongs, action.payload],
          error: null,
        };
      case FOLLOW_ARTIST_SUCCESS:
        return {
          ...state,
          loading: false,
          followedArtists: [...state.followedArtists, action.payload],
          error: null,
        };
      case FETCH_LIKED_SONGS_SUCCESS:
        return {
          ...state,
          loading: false,
          likedSongs: action.payload,
          error: null,
        };
      case FETCH_FOLLOWED_ARTISTS_SUCCESS:
        return {
          ...state,
          loading: false,
          followedArtists: action.payload,
          error: null,
        };
      case FETCH_SONGS_SUCCESS:
        return {
            ...state,
            loading: false,
            Songs: action.payload,
            error: null,
        };
      case FETCH_ARTISTS_SUCCESS:
        return {
            ...state,
            loading: false,
            Artists: action.payload,
            error: null,
        };
      case LOGIN_USER_FAILURE:
      case SIGNUP_USER_FAILURE:
      case UPDATE_PROFILE_FAILURE:
      case LIKE_SONG_FAILURE:
      case FOLLOW_ARTIST_FAILURE:
      case FETCH_LIKED_SONGS_FAILURE:
      case FETCH_FOLLOWED_ARTISTS_FAILURE:
      case FETCH_SONGS_FAILURE:
      case FETCH_ARTISTS_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default userReducer;
  
//   export { loginUser, signupUser, updateProfile as updateUserProfile, likeSong, followArtist, userReducer };
