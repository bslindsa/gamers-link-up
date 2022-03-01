import React from 'react';
import { useQuery } from '@apollo/client';

import { GET_GAMES } from '../../utils/queries';
import GameList from '../../components/GameList/index';

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
                  <div id="Home_lttp">
                    <p></p>
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

