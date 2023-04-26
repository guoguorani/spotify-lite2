// ./redux/user/userActionCreators.js

// import axios from 'axios';

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
  FETCH_ARTISTS_FAILURE,
} from "./userActionTypes";

// Login user action creators
export const loginUserRequest = () => ({
  type: LOGIN_USER_REQUEST,
});

export const loginUserSuccess = (user) => ({
  type: LOGIN_USER_SUCCESS,
  payload: user,
});

export const loginUserFailure = (error) => ({
  type: LOGIN_USER_FAILURE,
  payload: error,
});

// loginUser action creator
export const loginUser = ({ email, password }) => {
  return async (dispatch) => {
    dispatch(loginUserRequest());
    try {
      const response = await fetch("http://localhost:3001/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        dispatch(loginUserSuccess(data));
        return { payload: data }; // Return the result
      } else {
        dispatch(loginUserFailure({ error: data.message }));
        return { payload: { error: data.message } }; // Return the result
      }
    } catch (error) {
      dispatch(loginUserFailure({ error: error.message }));
      return { payload: { error: error.message } }; // Return the result
    }
  };
};

// Sign up user action creators
export const signupUserRequest = () => ({
  type: SIGNUP_USER_REQUEST,
});

export const signupUserSuccess = (user, token) => ({
  type: SIGNUP_USER_SUCCESS,
  payload: { user, token },
});

export const signupUserFailure = (error) => ({
  type: SIGNUP_USER_FAILURE,
  payload: error,
});

export const signupUser = ({ name, email, password, isArtist }, onSuccess) => {
  return (dispatch) => {
    dispatch(signupUserRequest());
    fetch("http://localhost:3001/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
        role: isArtist ? "artist" : "user",
      }),
    })
      .then((response) => {
        // console.log("Server response:", response); // Add this line to log the server response
        return response.json();
      })
      // .then((data) => {
      //   dispatch(signupUserSuccess(data.user));
      //   if (onSuccess) {
      //     onSuccess();
      //   }
      // })
      .then((data) => {
        dispatch(signupUserSuccess(data.user, data.token));
        localStorage.setItem("token", data.token); // Store the token
        if (onSuccess) {
          onSuccess();
        }
      })
      .catch((error) => dispatch(signupUserFailure(error.message)));
  };
};

// Update profile action creators
export const updateProfileRequest = () => ({
  type: UPDATE_PROFILE_REQUEST,
});

export const updateProfileSuccess = (user) => ({
  type: UPDATE_PROFILE_SUCCESS,
  payload: user,
});

export const updateProfileFailure = (error) => ({
  type: UPDATE_PROFILE_FAILURE,
  payload: error,
});


// Update profile action creators
export const updateProfile = (userId, updatedInfo) => async (dispatch) => {
  dispatch(updateProfileRequest());
  try {
    const response = await fetch(`http://localhost:3001/api/users`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(updatedInfo),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }

    const updatedUser = { ...updatedInfo, id: userId };
    // console.log('updatedUser', updatedUser);
    dispatch(updateProfileSuccess(updatedUser));
  } catch (error) {
    dispatch(updateProfileFailure({ error: error.message }));
  }
};

// Like song action creators
export const likeSongRequest = () => ({
  type: LIKE_SONG_REQUEST,
});

export const likeSongSuccess = (song) => ({
  type: LIKE_SONG_SUCCESS,
  payload: song,
});

export const likeSongFailure = (error) => ({
  type: LIKE_SONG_FAILURE,
  payload: error,
});

export const likeSong = (userId, songId) => async (dispatch) => {
  dispatch(likeSongRequest());
  // console.log("localStorage", localStorage);
  try {
    // Assuming your server supports liking a song, modify the endpoint and request method as needed
    await fetch(`http://localhost:3001/api/like/songs/${songId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });

    dispatch(likeSongSuccess(songId));
  } catch (error) {
    // console.log("also went here");
    dispatch(likeSongFailure({ error: error.message }));
  }
};

//   http://localhost:3001/api/like/songs/ce90529f-a9b9-46bc-8970-38926ce2e61d

// Follow artist action creators
export const followArtistRequest = () => ({
  type: FOLLOW_ARTIST_REQUEST,
});

export const followArtistSuccess = (artist) => ({
  type: FOLLOW_ARTIST_SUCCESS,
  payload: artist,
});

export const followArtistFailure = (error) => ({
  type: FOLLOW_ARTIST_FAILURE,
  payload: error,
});

export const followArtist = (userId, artistId) => async (dispatch) => {
  dispatch(followArtistRequest());
  // console.log("localStorage", localStorage);
  try {
    // Assuming your server supports liking a song, modify the endpoint and request method as needed
    await fetch(`http://localhost:3001/api/follow/artists/${artistId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });

    dispatch(followArtistSuccess(artistId));
  } catch (error) {
    // console.log("went here");
    dispatch(followArtistFailure({ error: error.message }));
  }
};

// Fetch liked songs action creators
export const fetchLikedSongsRequest = () => ({
  type: FETCH_LIKED_SONGS_REQUEST,
});

export const fetchLikedSongsSuccess = (songs) => ({
  type: FETCH_LIKED_SONGS_SUCCESS,
  payload: songs,
});

export const fetchLikedSongsFailure = (error) => ({
  type: FETCH_LIKED_SONGS_FAILURE,
  payload: error,
});

export const fetchLikedSongs = () => {
  return (dispatch) => {
    dispatch(fetchLikedSongsRequest());
    fetch("http://localhost:3001/api/like/songs", {
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error fetching liked songs");
        }
        return response.json();
      })
      .then((data) => {
        dispatch(fetchLikedSongsSuccess(data));
      })
      .catch((error) => {
        dispatch(fetchLikedSongsFailure(error.message));
      });
  };
};

// Fetch followed artists action creators
export const fetchFollowedArtistsRequest = () => ({
  type: FETCH_FOLLOWED_ARTISTS_REQUEST,
});

export const fetchFollowedArtistsSuccess = (artists) => ({
  type: FETCH_FOLLOWED_ARTISTS_SUCCESS,
  payload: artists,
});

export const fetchFollowedArtistsFailure = (error) => ({
  type: FETCH_FOLLOWED_ARTISTS_FAILURE,
  payload: error,
});

export const fetchFollowedArtists = () => {
  return (dispatch) => {
    dispatch(fetchFollowedArtistsRequest());
    fetch("http://localhost:3001/api/follow/artists", {
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error fetching followed artists");
        }
        return response.json();
      })
      .then((data) => {
        dispatch(fetchFollowedArtistsSuccess(data));
      })
      .catch((error) => {
        dispatch(fetchFollowedArtistsFailure(error.message));
      });
  };
};

// Fetch all songs action creators
export const fetchSongsRequest = () => ({
  type: FETCH_SONGS_REQUEST,
});

export const fetchSongsSuccess = (songs) => ({
  type: FETCH_SONGS_SUCCESS,
  payload: songs,
});

export const fetchSongsFailure = (error) => ({
  type: FETCH_SONGS_FAILURE,
  payload: error,
});

export const fetchSongs = () => {
  return (dispatch) => {
    dispatch(fetchSongsRequest());
    fetch("http://localhost:3001/api/songs")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error fetching songs");
        }
        return response.json();
      })
      .then((data) => {
        dispatch(fetchSongsSuccess(data.songs)); // Update this line
      })
      .catch((error) => {
        dispatch(fetchSongsFailure(error.message));
      });
  };
};

// Fetch all artists action creators
export const fetchArtistsRequest = () => ({
  type: FETCH_ARTISTS_REQUEST,
});

export const fetchArtistsSuccess = (artists) => ({
  type: FETCH_ARTISTS_SUCCESS,
  payload: artists,
});

export const fetchArtistsFailure = (error) => ({
  type: FETCH_ARTISTS_FAILURE,
  payload: error,
});

export const fetchArtists = () => {
  return (dispatch) => {
    dispatch(fetchArtistsRequest());
    fetch("http://localhost:3001/api/users")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error fetching artists");
        }
        return response.json();
      })
      .then((data) => {
        //   console.log('Artists data:', data); // Add this line
        const artists = data.users.filter((user) => user.role === "artist");
        dispatch(fetchArtistsSuccess(artists));
      })
      .catch((error) => {
        dispatch(fetchArtistsFailure(error.message));
      });
  };
};
