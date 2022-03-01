import React from 'react';
import { useQuery } from '@apollo/client';
import { Link, useParams } from 'react-router-dom';
import { GET_ME, GET_USER } from '../../utils/queries';
import GameList from '../../components/GameList/index.js';
import Auth from '../../utils/auth';
import './Profile.css'


const Profile = () => {

    const { username } = useParams();

    const { loading, data } = useQuery(username ? GET_USER : GET_ME, {
        variables: { username: username },
    });
    const user = data?.me || data?.user || {};
    const games = user.games || []
    // navigate to personal profile page if username is yours
    if (Auth.loggedIn() && Auth.getProfile().data.username === username) {
        return (
            <div>
                <div key='parallax' id="parallax">
                    <div className='d-flex justify-content-center'>
                        <div id="lttp">
                            <p>Your Inventory</p>
                        </div>
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
    else {
        return (
            <h1>We don't recognize you stranger. Please Login or Sign Up so we can add you to our guild.</h1>
        );
    };
    //  else {
    //     return (
    //         <div>
    //             <div key='parallax' id="parallax">
    //                 <div id="lttp">
    //                     <p> {`${username}'s Inventory`} </p>
    //                 </div>
    //             </div>
    //             <div>
    //                 {loading ? (
    //                     <div>Loading...</div>
    //                 ) : (
    //                     <GameList
    //                         games={games} user={user}
    //                     />
    //                 )}
    //             </div>
    //         </div>
    //     );
    // };

};
export default Profile;
