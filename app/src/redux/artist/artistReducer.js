// ./redux/artist/artistReducer.js

// ActionTypes
const FETCH_ARTISTS_REQUEST = 'FETCH_ARTISTS_REQUEST';
const FETCH_ARTISTS_SUCCESS = 'FETCH_ARTISTS_SUCCESS';
const FETCH_ARTISTS_FAILURE = 'FETCH_ARTISTS_FAILURE';

// ActionCreators
const fetchArtistsRequest = () => ({
  type: FETCH_ARTISTS_REQUEST,
});

const fetchArtistsSuccess = (artists) => ({
  type: FETCH_ARTISTS_SUCCESS,
  payload: artists,
});

const fetchArtistsFailure = (error) => ({
  type: FETCH_ARTISTS_FAILURE,
  payload: error,
});

const fetchArtists = () => {
  return (dispatch) => {
    dispatch(fetchArtistsRequest());
    fetch('/api/artists')
      .then((response) => response.json())
      .then((data) => dispatch(fetchArtistsSuccess(data.artists)))
      .catch((error) => dispatch(fetchArtistsFailure(error.message)));
  };
};

// Reducers
const initialState = {
  loading: false,
  artists: [],
  error: '',
};

const artistReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ARTISTS_REQUEST:
      return { ...state, loading: true };
    case FETCH_ARTISTS_SUCCESS:
      return { ...state, loading: false, artists: action.payload, error: '' };
    case FETCH_ARTISTS_FAILURE:
      return { ...state, loading: false, artists: [], error: action.payload };
    default:
      return state;
  }
};

export { fetchArtists, artistReducer };
