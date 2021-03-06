import { Redirect, Link, useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';

import { GET_GAME, GET_USER } from "../../utils/queries";
import { DELETE_GAME } from '../../utils/mutations';

import Auth from '../../utils/auth';
import React, { useState } from 'react';
import rupee from './assets/rupee.png';
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

    const [deleteGame, { error }] = useMutation(DELETE_GAME, {
        variables: {
            gameId: game._id
        }
    })

    const sendMail = () => {
        const email = user.email;
        const subject = `${Auth.getProfile().data.username} interested in ${game.title}`;
        const body = '';
        let link = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.location.href = link;
    }

    // function blobToFile(theBlob, fileName){
    //     theBlob.lastModifiedDate = new Date();
    //     theBlob.name = fileName;
    //     return theBlob;
    // }

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
                        <div id='sg-head' className='d-flex justify-content-center align-items-center'>
                            {Auth.getProfile().data.username === game.owner ?
                                <h1>Nice stuff you've got here.</h1> :
                                <h1>This one's a beauty... if you've the coin.</h1>}
                        </div>
                        <div key={game.title} className=" game d-flex justify-content-center">
                            <div className="card1">
                                <div className='d-flex flex-wrap justify-content-center'>
                                    {renderPhotos(game.images)}
                                </div>
                                <div className="sgtitle">
                                    <p>{game.title}</p>
                                </div>

                                <div className="sgdescription">
                                    <p>{game.description}</p>
                                </div>
                                <div className="sgplatform">
                                    <p>{game.platform}</p>
                                </div>
                                <div className="sgprice">
                                    <p>{game.price}<img className="rupee" src={rupee} alt="green rupee" /></p>
                                </div>
                                <Link to={`/profile/${game.owner}`} className='sgowner'>
                                    <div>
                                        <p>{game.owner}</p>
                                    </div>
                                </Link>
                                {Auth.getProfile().data.username === game.owner ?
                                    <div className='delete d-flex m-3 justify-content-around row justify-content-center'>
                                        <button className='sg-btn col-2 btn btn-danger mt-3' onClick={() => { deleteGame(); window.location.assign('/'); }}>Delete</button>
                                        <Link to={`/editgame/${game._id}`} className='sg-btn col-2 btn btn-light mt-3'>
                                            Edit
                                        </Link>
                                    </div>
                                    : <></>}
                                {Auth.getProfile().data.username !== game.owner ?
                                    <div className='d-flex m-3 justify-content-around'>
                                        <div>
                                            <button className='sg-btn custom-btn btn btn-dark mb-3' onClick={sendMail}>Barter</button>
                                        </div>
                                        <div>
                                            {buy ? (
                                                <Payment />
                                            ) : (
                                                <button className="sg-btn custom-btn btn btn-dark mb-3" onClick={() => {
                                                    setBuy(true);
                                                }}
                                                >
                                                    Buy Now
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                    : <></>}
                            </div>
                        </div>

                    </div>
                </>
            ) : (
                <>
                    <div className='sg-back'>
                        <div className='card1'>
                            <Redirect to="/login" />
                        </div>
                    </div>
                </>
            )}
        </div>
    )
};

export default SingleGame;
