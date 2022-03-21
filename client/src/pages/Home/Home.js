import { React, useState } from 'react';
import { useQuery } from '@apollo/client';

import { GET_GAMES } from '../../utils/queries';
import GameList from '../../components/GameList/index';

import './Home.css';

const Home = () => {
  const { loading, data } = useQuery(GET_GAMES);
  const games = data?.games || [];
  const [inputText, setInputText] = useState("");
  let inputHandler = (event) => {
    var inputLower = event.target.value.toLowerCase();
    setInputText(event.target.value);
  }

  return (
      <div id='home-back'>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <>
            <div>
              <div key='parallax' className="parallax">
                <div className='d-flex justify-content-center'>
                  <div className="lttp">
                    <p>It's Dangerous To Go Alone. Take These!</p>
                  </div>
                </div>
                <div id="search">
                  <h1>Search</h1>
                  <input type='text' onChange={inputHandler}/>
                  <button type='submit'>Search</button>
                </div>
              </div>
              <GameList
                games={games} search={inputText}
              />
            </div>
          </>
        )}
      </div>
  
  );
};

export default Home;

