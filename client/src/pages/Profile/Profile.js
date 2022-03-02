import React from 'react';
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
    // navigate to personal profile page if username is yours
    if (Auth.loggedIn() && Auth.getProfile().data.username === username) {
        return (
            <div>
                <div key='parallax' className="parallax">
                    <div className="lttp">
                        <p>Your Inventory</p>
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
                            games={games} user={user}
                        />
                    )}
                </div>
            </div>
        );
    }
    else if (Auth.getProfile().data.username !== username) {
        return (
            <div>
                <div key='parallax' className="parallax">
                    <div className="lttp">
                        <p> {`${username}'s Inventory`} </p>
                    </div>
                </div>
                <div>
                    {loading ? (
                        <div>Loading...</div>
                    ) : (
                        <GameList
                            games={games} user={user}
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
