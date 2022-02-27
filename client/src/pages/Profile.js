import React from 'react';
import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import { GET_ME } from '../utils/queries';
import GameList from '../components/gameList/index';


const Profile = () => {

    const { loading, data } = useQuery(GET_ME);
    const games = data?.me.games || [];
    const me = data?.me || {};
    console.log(data)
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
                        games={games} me={me}
                    />
                )}
            </div>
        </div>
    );
};
export default Profile;
