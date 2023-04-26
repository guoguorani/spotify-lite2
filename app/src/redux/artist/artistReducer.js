// ./redux/artist/artistReducer.js

import {
  FETCH_FOLLOWING_REQUEST,
  FETCH_FOLLOWING_SUCCESS,
  FETCH_FOLLOWING_FAILURE,
  FETCH_CREATED_SONGS_REQUEST,
  FETCH_CREATED_SONGS_SUCCESS,
  FETCH_CREATED_SONGS_FAILURE,
  ADD_SONG_REQUEST,
  ADD_SONG_SUCCESS,
  ADD_SONG_FAILURE,
  EDIT_SONG_REQUEST,
  EDIT_SONG_SUCCESS,
  EDIT_SONG_FAILURE,
  DELETE_SONG_REQUEST,
  DELETE_SONG_SUCCESS,
  DELETE_SONG_FAILURE,
} from "./artistActionTypes";

const initialState = {
  following: [],
  createdSongs: [],
  loading: false,
  error: null,
};

const artistReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_FOLLOWING_REQUEST:
      return { ...state, loading: true };
    case FETCH_FOLLOWING_SUCCESS:
      return { ...state, loading: false, following: action.payload };
    case FETCH_FOLLOWING_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case FETCH_CREATED_SONGS_REQUEST:
      return { ...state, loading: true };
    case FETCH_CREATED_SONGS_SUCCESS:
      return { ...state, loading: false, createdSongs: action.payload };
    case FETCH_CREATED_SONGS_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case ADD_SONG_REQUEST:
      return { ...state, loading: true };
    case ADD_SONG_SUCCESS:
      return {
        ...state,
        loading: false,
        createdSongs: [...state.createdSongs, action.payload],
      };
    case ADD_SONG_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case EDIT_SONG_REQUEST:
      return { ...state, loading: true };
    case EDIT_SONG_SUCCESS:
      return {
        ...state,
        loading: false,
        createdSongs: state.createdSongs.map((song) =>
          song.id === action.payload.id ? action.payload : song
        ),
      };
    case EDIT_SONG_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case DELETE_SONG_REQUEST:
      return { ...state, loading: true };
    case DELETE_SONG_SUCCESS:
      return {
        ...state,
        loading: false,
        createdSongs: state.createdSongs.filter(
          (song) => song.id !== action.payload
        ),
        error: "",
      };
    case DELETE_SONG_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default artistReducer;
