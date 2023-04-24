// ./redux/user/userSelectors.js

export const getUser = (state) => state.user;
// export const getAllSongs = (state) => state.user.Songs.songs
// export const getAllArtists = (state) => state.user.Artists.users;
// export const getLikedSongs = (state) => state.user.likedSongs;
// export const getFollowedArtists = (state) => state.user.following;
// export const getUser = (state) => state.user;

export const getAllSongs = (state) => state.user.Songs;
export const getAllArtists = (state) => state.user.Artists;
export const getLikedSongs = (state) => state.user.likedSongs;
export const getFollowedArtists = (state) => state.user.followedArtists;
