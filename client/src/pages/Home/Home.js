import React from 'react';
import { useQuery } from '@apollo/client';

import { GET_GAMES } from '../../utils/queries';
import GameList from '../../components/GameList/index';

const Home = () => {
  const { loading, data } = useQuery(GET_GAMES);
  const games = data?.games || [];

  return (
    <div>
      <div>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <>
            <h1>It's Dangerous to go Alone. Take these!</h1>
            <GameList
              games={games}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Home;

