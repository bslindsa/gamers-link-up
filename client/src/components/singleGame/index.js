import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import $ from 'jquery';

import { GET_GAME, GET_USER } from "../../utils/queries";

import Auth from '../../utils/auth';

import React, {useState } from 'react';
import PayPal from '../Payment/PayPal';

const SingleGame = () => {

    // const sendMail = () => {
    //     const email = 'example@gmail.com';
    //     const subject = 'Test Email';
    //     const body = 'This is a test';
    //     let link = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    //     window.location.href = link;
    // }

    function sendMail() {

        const emailFrom = 'gamerslinkup22@gmail.com'
        const emailTo = 'bslindsa@gmail.com';
        const toUsername = 'thatguy'
        const subject = 'Test Email';
        const body = 'This is a test';

        $.ajax({
            type: 'POST',
            url: 'https://mandrillapp.com/api/1.0/messages/send.json',
            data: {
                'key': 'a9e67737038f528468098ad6f2f10b0c-us14',
                'message': {
                    'from_email': emailFrom,
                    'to': [
                        {
                            'email': emailTo,
                            'name': toUsername,
                            'type': 'to'
                        }
                    ],
                    'autotext': 'true',
                    'subject': subject,
                    'html': body
                }
            }
        }).done(function (response) {
            console.log(response); // if you're into that sorta thing
        });
    }

    const [buy, setBuy] = useState(false)

    const { gameId } = useParams();

    const { loading, data } = useQuery(GET_GAME, {
        variables: { gameId: gameId },
    });

    const game = data?.game || {};
    if (loading) {
        return <div>Loading...</div>;
    }
    return (
        <div>
            {Auth.loggedIn() ? (
                <>
                    <div>
                        <h1>This one's a beauty... if you've the coin.</h1>
                    </div>
                    <div key={game.title} className="game">
                        <div className="card">
                            <div className="title">
                                <h3>{game.title}</h3>
                            </div>
                            <Link to={`/profile/${game.owner}`}>
                                <div>
                                    <h4>{game.owner}</h4>
                                </div>
                            </Link>
                            <div className="title">
                                <p>{game.description}</p>
                            </div>
                            <div className="title">
                                <h3>{game.platform}</h3>
                            </div>
                            <div className="title">
                                <h3>{game.price}</h3>
                            </div>
                            <div>
                                <ul>
                                    {game.tags.map(tag => (
                                        <li>{tag}</li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <button onClick={sendMail}>I Want It!</button>
                            </div>
                            <div>
                                {buy ? (
                                    <PayPal />
                                ) : (
                                    <button onClick={() => {
                                        setBuy(true);
                                    }}
                                    >
                                        Buy
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <h1>We don't recognize you stranger. Please Login or Sign Up so we can add you to our guild.</h1>
                </>
            )}
        </div>
    )
};

export default SingleGame;