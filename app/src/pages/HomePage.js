import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchArtists } from '../redux/artist/artistActions';

const HomePage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchArtists());
  }, [dispatch]);

  const artists = useSelector(state => state.artist.artists);

  return (
    <div>
      <h1>Artists</h1>
      <ul>
        {artists.map(artist => (
          <li key={artist.id}>{artist.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
