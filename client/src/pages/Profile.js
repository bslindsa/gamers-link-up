import React from 'react';
import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import { GET_ME } from '../utils/queries';
import GameList from '../components/gameList/index';


const Profile = () => {

    const { loading, data } = useQuery(GET_ME);
    const games = data?.games || [];
    console.log(data)
    return (
        <div>
            <div>
                <h4>Add a new game to your shop!</h4>
                <Link to='/gameform'>
                    <button>Post Game</button>
                </Link>
            </div>
            <div
                className="col-12 col-md-10 mb-3 p-3"
                style={{ border: '4px groove #1a1a1a' }}
            >
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
        </div>

    );
};
export default Profile;
