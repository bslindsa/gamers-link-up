import { React, useState } from "react";
// import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import './style.css';
import rupee from './assets/rupee.png';
import image from './assets/a-link-to-the-past.png';
import Auth from '../../utils/auth';

const GameList = ({ games, search }) => {

    // if (!games.length) {
    //     return (
    //         <div key='parallax' className="parallax">
    //             <div className='d-flex justify-content-center'>
    //                 <div id="sm">
    //                     <p>Sorry, Adventurer. These games are in another castle</p>
    //                 </div>
    //             </div>
    //         </div>
    //     )
    // }

    const filteredGames = games.filter((game) => {
        if (search.input === '') {
            return game;
        }
        else {
            return game.title.toLowerCase().includes(search)
        }
    })

    return (
        <div>
            {filteredGames.length ?
                <div className="wares">
                    {filteredGames.slice(0).reverse().map(game => (
                    // {games.slice(0).reverse().map(game => (
                        <>
                            <div id="display-card" key={game._id} className="dog">
                                <div className="card">
                                    <div className='thumbnail'>
                                        <img className='gpreview m-2' src={image} alt='Preview' />
                                        {/* {game.images[0]} */}
                                    </div>
                                    <div className="gdata">
                                        <Link to={`/games/${game._id}`} className='gtitle'>
                                            <p>{game.title}</p>
                                        </Link>
                                        <div>
                                            <p className="gdescription">{game.description}</p>
                                        </div>
                                        <div>
                                            <p className="gprice">{game.price}<img className="rupee" src={rupee} alt="green rupee" /></p>
                                        </div>
                                        <div>
                                            <p className="gplatform">{game.platform}</p>
                                        </div>
                                        {Auth.loggedIn() ?
                                            <Link to={`/profile/${game.owner}`} className="gowner">
                                                <div>
                                                    <p>{game.owner}</p>
                                                </div>
                                            </Link> : <Link to={`/profile/${game.owner}`} className="gowner">
                                                <div>
                                                    <p>{game.owner}</p>
                                                </div>
                                            </Link>
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className='cat'></div>
                        </>
                    ))}
                </div> :
                <div key='parallax' className="parallax">
                    <div className='d-flex justify-content-center'>
                        <div id="sm">
                            <p>Sorry, Adventurer. These games are in another castle</p>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
};

export default GameList;
