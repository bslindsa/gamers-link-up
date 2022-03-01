import React from "react";

import { Link } from "react-router-dom";
import './style.css';
import image from './assets/a-link-to-the-past.png';

const GameList = ({ games }) => {
    if (!games.length) {
        return (
            <div key='parallax' className="parallax">
                <div className='d-flex justify-content-center'>
                    <div id="sm">
                        <p>Sorry, Adventurer. These games are in another castle</p>
                    </div>
                </div>
            </div>
        )
    }
    console.log(games);

    return (
        <div className="wares">

            {games.map(game => (
                <>
                    <div id = "display-card" key={game._id} className="dog">
                        <div  className="card">
                            <div className='thumbnail'>
                                <img className='gpreview m-2' src={image} alt='Preview' />
                                {/* {game.images[0]} */}
                            </div>
                            <div className="gdata">
                                {/* <img className='gpreview m-2' src={image} alt='Preview' /> */}
                                <Link to={`/games/${game._id}`} className='gtitle'>
                                    <p>{game.title}</p>
                                </Link>
                                <div>
                                    <p className="gdescription">{game.description}</p>
                                </div>
                                <div>
                                    <h3 className="gprice">{game.price}</h3>
                                </div>
                                <div>
                                    <p className="gplatform">{game.platform}</p>
                                </div>
                                <Link to={`/profile/${game.owner}`} className="gowner">
                                    <div>
                                        <p>{game.owner}</p>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className='cat'></div>
                </>
            ))}
        </div>
    )
};

export default GameList;
