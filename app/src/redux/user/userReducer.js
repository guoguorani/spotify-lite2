// ./redux/user/userReducer.js

// ActionTypes
const LOGIN_USER_REQUEST = 'LOGIN_USER_REQUEST';
const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE';

const SIGNUP_USER_REQUEST = 'SIGNUP_USER_REQUEST';
const SIGNUP_USER_SUCCESS = 'SIGNUP_USER_SUCCESS';
const SIGNUP_USER_FAILURE = 'SIGNUP_USER_FAILURE';

const UPDATE_PROFILE_REQUEST = 'UPDATE_PROFILE_REQUEST';
const UPDATE_PROFILE_SUCCESS = 'UPDATE_PROFILE_SUCCESS';
const UPDATE_PROFILE_FAILURE = 'UPDATE_PROFILE_FAILURE';

const LIKE_SONG_REQUEST = 'LIKE_SONG_REQUEST';
const LIKE_SONG_SUCCESS = 'LIKE_SONG_SUCCESS';
const LIKE_SONG_FAILURE = 'LIKE_SONG_FAILURE';

const FOLLOW_ARTIST_REQUEST = 'FOLLOW_ARTIST_REQUEST';
const FOLLOW_ARTIST_SUCCESS = 'FOLLOW_ARTIST_SUCCESS';
const FOLLOW_ARTIST_FAILURE = 'FOLLOW_ARTIST_FAILURE';

// ActionCreators
const loginUserRequest = () => ({
  type: LOGIN_USER_REQUEST,
});

const loginUserSuccess = (user) => ({
  type: LOGIN_USER_SUCCESS,
  payload: user,
});

const loginUserFailure = (error) => ({
  type: LOGIN_USER_FAILURE,
  payload: error,
});

// loginUser action creator
const loginUser = ({ email, password }) => {
    return async (dispatch) => {
      dispatch(loginUserRequest());
      try {
        const response = await fetch('http://localhost:3001/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
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
   

const signupUserRequest = () => ({
  type: SIGNUP_USER_REQUEST,
});

const signupUserSuccess = (user) => ({
  type: SIGNUP_USER_SUCCESS,
  payload: user,
});

const signupUserFailure = (error) => ({
  type: SIGNUP_USER_FAILURE,
  payload: error,
});

const updateProfileRequest = () => ({
    type: UPDATE_PROFILE_REQUEST,
  });
  
const updateProfileSuccess = (user) => ({
    type: UPDATE_PROFILE_SUCCESS,
    payload: user,
  });
  
const updateProfileFailure = (error) => ({
    type: UPDATE_PROFILE_FAILURE,
    payload: error,
  });
  
const likeSongRequest = () => ({
    type: LIKE_SONG_REQUEST,
  });
  
const likeSongSuccess = (songId) => ({
    type: LIKE_SONG_SUCCESS,
    payload: songId,
  });
  
const likeSongFailure = (error) => ({
    type: LIKE_SONG_FAILURE,
    payload: error,
  });
  
const followArtistRequest = () => ({
    type: FOLLOW_ARTIST_REQUEST,
  });
  
const followArtistSuccess = (artistId) => ({
    type: FOLLOW_ARTIST_SUCCESS,
    payload: artistId,
  });
  
const followArtistFailure = (error) => ({
    type: FOLLOW_ARTIST_FAILURE,
    payload: error,
  });

const signupUser = ({ name, email, password, isArtist }, onSuccess) => {
    return (dispatch) => {
      dispatch(signupUserRequest());
      fetch('http://localhost:3001/api/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password, role: isArtist ? 'artist' : 'user' }),
      })
        .then((response) => {
            console.log('Server response:', response); // Add this line to log the server response
            return response.json()
        })
        .then((data) => {
          dispatch(signupUserSuccess(data.user));
          if (onSuccess) {
            onSuccess();
          }
        })
        .catch((error) => dispatch(signupUserFailure(error.message)));
    };
  };

// Update the updateProfile action creator
const updateProfile = (userId, updatedInfo) => async (dispatch) => {
    dispatch(updateProfileRequest());
    try {
      const response = await fetch(`http://localhost:3001/api/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('token'),
        },
        body: JSON.stringify(updatedInfo),
      });
  
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }
  
      const updatedUser = { ...updatedInfo, id: userId };
      dispatch(updateProfileSuccess(updatedUser));
    } catch (error) {
      dispatch(updateProfileFailure({ error: error.message }));
    }
  };
  
  // Update the likeSong action creator
  const likeSong = (userId, songId) => async (dispatch) => {
    dispatch(likeSongRequest());
    try {
      // Assuming your server supports liking a song, modify the endpoint and request method as needed
      await fetch(`http://localhost:3001/api/users/${userId}/likes/${songId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('token'),
        },
      });
  
      dispatch(likeSongSuccess(songId));
    } catch (error) {
      dispatch(likeSongFailure({ error: error.message }));
    }
  };
  
  // Update the followArtist action creator
  const followArtist = (userId, artistId) => async (dispatch) => {
    dispatch(followArtistRequest());
    try {
      const response = await fetch(`http://localhost:3001/api/follow/${artistId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('token'),
        },
      });
  
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }
  
      dispatch(followArtistSuccess(artistId));
    } catch (error) {
      dispatch(followArtistFailure({ error: error.message }));
    }
  };
  
  
// Reducer
const initialState = {
    loading: false,
    user: null,
    error: null,
  };
  
  const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case LOGIN_USER_REQUEST:
      case SIGNUP_USER_REQUEST:
      case UPDATE_PROFILE_REQUEST:
      case LIKE_SONG_REQUEST:
      case FOLLOW_ARTIST_REQUEST:
        return { ...state, loading: true };
  
      case LOGIN_USER_SUCCESS:
      case SIGNUP_USER_SUCCESS:
      case UPDATE_PROFILE_SUCCESS:
        return { ...state, loading: false, user: action.payload, error: null };
  
      case LIKE_SONG_SUCCESS:
        return {
          ...state,
          loading: false,
          user: {
            ...state.user,
            likedSongs: [...state.user.likedSongs, action.payload],
          },
          error: null,
        };
  
      case FOLLOW_ARTIST_SUCCESS:
        return {
          ...state,
          loading: false,
          user: {
            ...state.user,
            followedArtists: [...state.user.followedArtists, action.payload],
          },
          error: null,
        };
  
      case LOGIN_USER_FAILURE:
      case SIGNUP_USER_FAILURE:
      case UPDATE_PROFILE_FAILURE:
      case LIKE_SONG_FAILURE:
      case FOLLOW_ARTIST_FAILURE:
        return { ...state, loading: false, error: action.payload };
  
      default:
        return state;
    }
  };
  
  export { loginUser, signupUser, updateProfile as updateUserProfile, likeSong, followArtist, userReducer };
