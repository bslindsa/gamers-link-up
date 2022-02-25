import React from 'react';
import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';

import { GET_GAME } from '../utils/queries';
import { GameList } from '../components/GameList'

const Home = () => {
    const { loading, data } = useQuery(GET_GAME);
    const games = data?.games || [];

    return (
        <main>
          <div className="flex-row justify-center">
            <div
              className="col-12 col-md-10 mb-3 p-3"
              style={{ border: '4px groove #1a1a1a' }}
            >
            </div>
            <div className="col-12 col-md-8 mb-3">
              {loading ? (
                <div>Loading...</div>
              ) : (
                <GameList
                    games={games}
                />
              )}
            </div>
          </div>
        </main>
      );
    };
    
    export default Home;