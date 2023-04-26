// ./redux/artist/artistActionCreators

import {
  // FETCH_FOLLOWING_REQUEST,
  // FETCH_FOLLOWING_SUCCESS,
  // FETCH_FOLLOWING_FAILURE,
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
  DELETE_SONG_FAILURE
} from './artistActionTypes';

// Fetch Following Action Creators
// export const fetchFollowingRequest = () => ({ type: FETCH_FOLLOWING_REQUEST });
// export const fetchFollowingSuccess = (following) => ({ type: FETCH_FOLLOWING_SUCCESS, payload: following });
// export const fetchFollowingFailure = (error) => ({ type: FETCH_FOLLOWING_FAILURE, payload: error });

// export const fetchFollowing = () => async (dispatch) => {
//   dispatch(fetchFollowingRequest());
//   try {
//     const response = await fetch('http://localhost:3001/api/following', {
//       headers: {
//         'Authorization': `Bearer ${localStorage.getItem('token')}`,
//       },
//     });
//     const data = await response.json();
//     dispatch(fetchFollowingSuccess(data));
//   } catch (error) {
//     dispatch(fetchFollowingFailure(error.message));
//   }
// };

// Fetch Created Songs Action Creators
export const fetchCreatedSongsRequest = () => ({ type: FETCH_CREATED_SONGS_REQUEST });
export const fetchCreatedSongsSuccess = (songs) => ({ type: FETCH_CREATED_SONGS_SUCCESS, payload: songs });
export const fetchCreatedSongsFailure = (error) => ({ type: FETCH_CREATED_SONGS_FAILURE, payload: error });

export const fetchCreatedSongs = () => async (dispatch) => {
  dispatch(fetchCreatedSongsRequest());
  try {
    const response = await fetch('http://localhost:3001/api/artists/songs', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
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

export const addSong = (songData) => async (dispatch) => {
  dispatch(addSongRequest());
  try {
    const response = await fetch('http://localhost:3001/api/artists/songs/upload', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(songData),
    });
    console.log('response', response, localStorage.getItem('token'), songData)
    const data = await response.json();
    dispatch(addSongSuccess(data));
  } catch (error) {
    dispatch(addSongFailure(error.message));
  }
};

// Edit Song Action Creators
export const editSongRequest = () => ({ type: EDIT_SONG_REQUEST });
export const editSongSuccess = (song) => ({ type: EDIT_SONG_SUCCESS, payload: song });
export const editSongFailure = (error) => ({ type: EDIT_SONG_FAILURE, payload: error });

export const editSong = (songData, id) => async (dispatch) => {
  dispatch(editSongRequest());
  try {
    const response = await fetch(`http://localhost:3001/api/artists/songs/edit/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(songData),
    });
    const data = await response.json();
    dispatch(editSongSuccess(data));
  } catch (error) {
    dispatch(editSongFailure(error.message));
  }
};

// Delete Song Action Creators
export const deleteSongRequest = () => ({ type: DELETE_SONG_REQUEST });
export const deleteSongSuccess = (id) => ({ type: DELETE_SONG_SUCCESS, payload: id });
export const deleteSongFailure = (error) => ({ type: DELETE_SONG_FAILURE, payload: error });

export const deleteSong = (id, token) => async (dispatch) => {
  dispatch(deleteSongRequest());
  try {
    const response = await fetch(`http://localhost:3001/api/artists/songs/delete/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });
    if (response.status === 200) {
      dispatch(deleteSongSuccess(id));
    } else {
      const data = await response.json();
      dispatch(deleteSongFailure(data.message));
    }
  } catch (error) {
    dispatch(deleteSongFailure(error.message));
  }
};
