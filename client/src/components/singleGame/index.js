import React from "react";

import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { GET_GAME } from "../../utils/queries";

const SingleGame = () => {

    const { gameId } = useParams();

    const { loading, data } = useQuery(GET_GAME, {
        variables: { gameId: gameId },
    });

    const game = data?.game || {};
    console.log(data);
    if (loading) {
        return <div>Loading...</div>;
    }
    return (
        <>
            <div>
                <h1>This one's a beauty... if you've the coin.</h1>
            </div>
            <div key={game.title} className="game col-5 mb-5">
                <div className="card">
                    <div className="title">
                        <h3>{game.title}</h3>
                    </div>
                    <div className="title">
                        <h4>{game.owner}</h4>
                    </div>
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
                </div>
            </div>
        </>
    )
};

export default SingleGame;