import React from 'react';
import { useQuery } from '@apollo/client';
import { Link, useParams } from 'react-router-dom';
import { GET_ME, GET_USER } from '../utils/queries';
import GameList from '../components/GameList/index';
import Auth from '../utils/auth';



const Profile = () => {

    const { username: userParam } = useParams();

    const { loading, data } = useQuery(userParam ? GET_USER : GET_ME, {
        variables: { username: userParam },
    });
    const games = data?.me.games || data?.user.games || []
    const user = data?.me || data?.user || {};

    // navigate to personal profile page if username is yours
    if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
        
    }
    else if (!user?.username) {
        return (
            <h1>We don't recognize you stranger. Please Login or Sign Up so we can add you to our guild.</h1>
        );
    };

    return (
        <div>
            <div>
                <h4>Add a new game to your shop!</h4>
                <Link to='/gameform'>
                    <button>Post Game</button>
                </Link>
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
};
export default Profile;
