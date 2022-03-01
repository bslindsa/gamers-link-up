import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { GET_GAME, GET_USER } from "../../utils/queries";

import Auth from '../../utils/auth';
import React, { useState } from 'react';
import Payment from '../Payment/Payment';
import './SingleGame.css'

const SingleGame = () => {

    const [buy, setBuy] = useState(false)

    const { gameId } = useParams();

    const { loading: gameLoading, data: gameData } = useQuery(GET_GAME, {
        variables: {
            gameId: gameId,
        },
    });

    const game = gameData?.game || {};

    const { data: userData } = useQuery(GET_USER, {
        variables: {
            username: game.owner,
        },
    });

    const user = userData?.user || {};

    const sendMail = () => {
        const email = user.email;
        const subject = `${Auth.getProfile().data.username} interested in ${game.title}`;
        const body = '';
        let link = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.location.href = link;
    }

    const renderPhotos = (source) => {
        return source.map((photo) => {
            return <img className='preview m-2' src={photo} key={photo} alt='Preview' />
        })
    }

    if (gameLoading) {
        return <div>Loading...</div>;
    }
    return (
        <div>
            {Auth.loggedIn() ? (
                <>
                    <div className='sg-back'>
                        <div id='sg-head' className=' d-flex justify-content-center align-items-center'>
                            <h1>This one's a beauty... if you've the coin.</h1>
                        </div>
                        <div key={game.title} className="game d-flex justify-content-center">
                            <div className="card1">
                                <div className='d-flex flex-wrap justify-content-center'>
                                    {renderPhotos(game.images)}
                                </div>
                                <div className="gtitle">
                                    <p>{game.title}</p>
                                </div>
                                <Link to={`/profile/${game.owner}`}>
                                    <div className='gowner'>
                                        <p>{game.owner}</p>
                                    </div>
                                </Link>
                                <div className="gdescription">
                                    <p>{game.description}</p>
                                </div>
                                <div className="gplatform">
                                    <p>{game.platform}</p>
                                </div>
                                <div className="gprice">
                                    <p>${game.price}</p>
                                </div>
                                <div className='d-flex m-3 justify-content-around'>
                                    <div>
                                        <button className='custom-btn btn btn-dark mb-3' onClick={sendMail}>Barter</button>
                                    </div>
                                    <div>
                                        {buy ? (
                                            <Payment />
                                        ) : (
                                            <button className="custom-btn btn btn-dark mb-3" onClick={() => {
                                                setBuy(true);
                                            }}
                                            >
                                                Buy Now
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <div className='sg-back'>
                        <div className='card1'>
                            <h1>We don't recognize you stranger. Please Login or Sign Up so we can add you to our guild.</h1>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
};

export default SingleGame;