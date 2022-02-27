import React from "react";
import { Link } from "react-router-dom";
// import { Link } from 'react-router-dom';

const GameList = ({ games }) => {
    if (!games.length) {
        return <h3>Sorry, Adventurer. These games are in another castle</h3>
    }

    return (
        <div>
            <div className='d-flex flex-wrap justify-content-around'>
                {games.map(game => (
                    <div key={game.title} className="game col-5 mb-5">
                        <div className="card">
                            <Link to={`/games/${game._id}`}>
                            <div className="title">
                                <h3>{game.title}</h3>
                            </div>
                            </Link>
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
                                    {game.tags}
                                </ul>
                                </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
};

export default GameList;
