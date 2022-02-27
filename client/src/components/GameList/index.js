import React from "react";
import { Link } from "react-router-dom";
// import { Link } from 'react-router-dom';
import './style.css';

const GameList = ({ games }) => {
    if (!games.length) {
        return <h3>Sorry, Adventurer. These games are in another castle</h3>
    }

    return (
        <div className="wares">
            <div key='parallax' id="parallax">
                <h2 id="lttp"> </h2>
            </div>
            {games.map(game => (
                <>
                    <div key={game._id} className="dog game col-5 mb-5">
                        <div className="card">
                            <Link to={`/games/${game._id}`}>
                                <div>
                                    <h3>{game.title}</h3>
                                </div>
                            </Link>
                            <div>
                                <h4>{game.owner}</h4>
                            </div>
                            <div>
                                <p>{game.description}</p>
                            </div>
                            <div>
                                <h3>{game.platform}</h3>
                            </div>
                            <div>
                                <h3>{game.price}</h3>
                            </div>
                            {/* Add tags */}
                        </div>
                    </div>
                    <div className='cat'></div>
                </>
            ))}
        </div>
    )
};

export default GameList;
