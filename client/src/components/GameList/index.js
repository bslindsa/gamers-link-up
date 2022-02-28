import React from "react";

import { Link } from "react-router-dom";
import './style.css';
const GameList = ({ games }) => {
    if (!games.length) {
        return <h3>Sorry, Adventurer. These games are in another castle</h3>
    }
    console.log(games);

    // const renderPhotos = (source) => {
    //     return source.map((photo) => {
    //         return <img className='preview m-2' src={photo} key={photo} alt='Preview' />
    //     })
    // }

    return (
        <div className="wares">
            
            {games.map(game => (
                <>
                    <div key={game._id} className="dog game">
                        <div key={game._id + 'A'} className="card">
                            <Link to={`/games/${game._id}`}>
                                <div>
                                    <p className="gtitle">{game.title}</p>
                                </div>
                            </Link>
                            <Link to={`/profile/${game.owner}`}>
                            <div>
                                <p className="gowner">{game.owner}</p>
                            </div>
                            </Link>
                            <div>
                                <p className="gdescription">{game.description}</p>
                            </div>
                            <div>
                                <p className="gplatform">{game.platform}</p>
                            </div>
                            <div>
                                <h3>{game.price}</h3>
                            </div>

                            <div>
                                {/* {renderPhotos(game.images)} */}
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
