// ./redux/artist/artistActionCreators

import {
    UPDATE_SONG_REQUEST,
    UPDATE_SONG_SUCCESS,
    UPDATE_SONG_FAILURE,
    ADD_SONG_REQUEST,
    ADD_SONG_SUCCESS,
    ADD_SONG_FAILURE,
    FETCH_FOLLOWING_REQUEST,
    FETCH_FOLLOWING_SUCCESS,
    FETCH_FOLLOWING_FAILURE,
    FETCH_CREATED_SONGS_REQUEST,
    FETCH_CREATED_SONGS_SUCCESS,
    FETCH_CREATED_SONGS_FAILURE,
  } from './artistActionTypes';
  
  // Fetch Following Action Creators
  export const fetchFollowingRequest = () => ({ type: FETCH_FOLLOWING_REQUEST });
  export const fetchFollowingSuccess = (following) => ({ type: FETCH_FOLLOWING_SUCCESS, payload: following });
  export const fetchFollowingFailure = (error) => ({ type: FETCH_FOLLOWING_FAILURE, payload: error });
  
  export const fetchFollowing = (token) => async (dispatch) => {
    dispatch(fetchFollowingRequest());
    try {
      const response = await fetch('/api/following', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      const data = await response.json();
      dispatch(fetchFollowingSuccess(data));
    } catch (error) {
      dispatch(fetchFollowingFailure(error.message));
    }
  };
  
  // Fetch Created Songs Action Creators
  export const fetchCreatedSongsRequest = () => ({ type: FETCH_CREATED_SONGS_REQUEST });
  export const fetchCreatedSongsSuccess = (songs) => ({ type: FETCH_CREATED_SONGS_SUCCESS, payload: songs });
  export const fetchCreatedSongsFailure = (error) => ({ type: FETCH_CREATED_SONGS_FAILURE, payload: error });
  
  export const fetchCreatedSongs = (token) => async (dispatch) => {
    dispatch(fetchCreatedSongsRequest());
    try {
      const response = await fetch('/api/created-songs', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      const data = await response.json();
      dispatch(fetchCreatedSongsSuccess(data));
    } catch (error) {
      dispatch(fetchCreatedSongsFailure(error.message));
    }
  };
  
  // Add Song Action Creators
  export const addSongRequest = () => ({ type: ADD_SONG_REQUEST });
  export const addSongSuccess = (song) => ({ type: ADD_SONG_SUCCESS, payload: song });
  export const addSongFailure = (error) => ({ type: ADD_SONG_FAILURE, payload: error });
  
  export const addSong = (songData, token) => async (dispatch) => {
    dispatch(addSongRequest());
    try {
      const response = await fetch('/api/songs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(songData),
      });
      const data = await response.json();
      dispatch(addSongSuccess(data));
    } catch (error) {
      dispatch(addSongFailure(error.message));
    }
  };
  
  // Update Song Action Creators
export const updateSongRequest = () => ({ type: UPDATE_SONG_REQUEST });
export const updateSongSuccess = (song) => ({ type: UPDATE_SONG_SUCCESS, payload: song });
export const updateSongFailure = (error) => ({ type: UPDATE_SONG_FAILURE, payload: error });

export const updateSong = (songData, id, token) => async (dispatch) => {
  dispatch(updateSongRequest());
  try {
    const response = await fetch(`/api/songs/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        // 'Authorization': localStorage.getItem('token'),
      },
      body: JSON.stringify(songData),
    });
    const data = await response.json();
    dispatch(updateSongSuccess(data));
  } catch (error) {
    dispatch(updateSongFailure(error.message));
  }
};
