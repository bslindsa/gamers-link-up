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
    event.preventDefault();

    let inputLower = document.querySelector('#search').value.toLowerCase();
    // let inputLower = event.target.value.toLowerCase();
    setInputText(inputLower);
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
                  <form onSubmit={inputHandler}>
                    <div className='d-flex justify-content-center'>
                    <input
                      type='text'
                      id="search"
                      placeholder='Search Games'
                    />
                    <button className='search-btn btn btn-dark'>Search</button>
                    </div>
                    
                  </form>
                </div>
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

