import { React, useState } from 'react';
import { useQuery } from '@apollo/client';
import { Redirect, Link, useParams } from 'react-router-dom';
import { GET_ME, GET_USER } from '../../utils/queries';
import GameList from '../../components/GameList/index.js';
import Auth from '../../utils/auth';
import './Profile.css'


const Profile = () => {

    const { username } = useParams();

    const { loading, data } = useQuery(username ? GET_USER : GET_ME, {
        variables: { username: username },
    });
    const user = data?.user || data?.me || {};
    const games = user.games || []

    const [inputText, setInputText] = useState("");
    let inputHandler = (event) => {
        event.preventDefault();

        let inputLower = document.querySelector('#search').value.toLowerCase();
        // let inputLower = event.target.value.toLowerCase();
        setInputText(inputLower);
    }

    // navigate to personal profile page if username is yours
    if (Auth.loggedIn() && Auth.getProfile().data.username === user.username) {
        return (
            <div>
                <div key='parallax' className="parallax">
                    <div className="lttp">
                        <p>Your Inventory</p>
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
                    <div className='post-game-header'>
                        <h4 className='add-game-header'> Add a new game to your shop!</h4>
                        <Link to='/gameform'>
                            <button className='post-game btn-lg btn-light m-2'>Post Game</button>
                        </Link>
                    </div>
                </div>
                <div>
                    {loading ? (
                        <div>Loading...</div>
                    ) : (
                        <GameList
                            games={games} user={user} search={inputText}
                        />
                    )}
                </div>
            </div>
        );
    }
    else if (Auth.getProfile().data.username !== user.username) {
        return (
            <div>
                <div key='parallax' className="parallax">
                    <div className="lttp">
                        <p> {`${username}'s Inventory`} </p>
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
                <div>
                    {loading ? (
                        <div>Loading...</div>
                    ) : (
                        <GameList
                            games={games} user={user} search={inputText}
                        />
                    )}
                </div>
            </div>
        );
    } else {
        return (
            <Redirect to='/login' />
        );
    };
};
export default Profile;
