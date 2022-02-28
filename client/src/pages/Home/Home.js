import React from 'react';
import { useQuery } from '@apollo/client';

import { GET_GAMES } from '../../utils/queries';
import GameList from '../../components/gameList/index';

import './Home.css';

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
            <div>
              <div key='parallax' id="parallax">
                <div>
                  <div id="lttp">
                    <p>It's Dangerous to go Alone. Take these!</p>
                  </div>
                </div>
              </div>
              <GameList
                games={games}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;

