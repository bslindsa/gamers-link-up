import React, { useState } from 'react';
import { useMutation } from '@apollo/client';

import { ADD_GAME } from '../utils/mutations';
import { GET_GAMES, GET_ME } from '../utils/queries';

import Auth from '../utils/auth';

const GameForm = () => {

    const [formState, setFormState] = useState({
        title: '',
        description: '',
        platform: '',
        price: 0
    });
    const [addGame, { error }] = useMutation(ADD_GAME, {
        update(cache, { data: { addGame } }) {
            try {
                const { games } = cache.readQuery({ query: GET_GAMES });

                cache.writeQuery({
                    query: GET_GAMES,
                    data: { games: [addGame, ...games] }
                });
            } catch (err) {
                console.error(err);
            };

            const { me } = cache.readQuery({ query: GET_ME });
            cache.writeQuery({
                query: GET_ME,
                data: { me: { ...me, games: [...me.games, addGame] } }
            });
        }
    });

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        console.log(formState);
        try {
            // eslint-disable-next-line
            const { data } = await addGame({
                variables: { 
                    ...formState,
                    owner: {
                        username: Auth.getProfile().data.username,
                        email: Auth.getProfile().data.email
                    }
                }
            });

            setFormState({
                title: '',
                description: '',
                platform: '',
                price: 0,
            });
        } catch (err) {
            console.error(err);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value,
        });
    };

    return (
        <main className="flex-row justify-center mb-4">
            <div className="col-12 col-lg-10">
                <div className="card">
                    <h4 className="card-header bg-dark text-light p-2">Game</h4>
                    <div className="card-body">
                        <form onSubmit={handleFormSubmit}>
                            <input
                                className="form-input"
                                placeholder="Game Title"
                                name="title"
                                type="text"
                                value={formState.title}
                                onChange={handleChange}
                            />
                            <input
                                className="form-input"
                                placeholder="Game Description"
                                name="description"
                                type="text"
                                value={formState.description}
                                onChange={handleChange}
                            />
                            <input
                                className="form-input"
                                placeholder="Platform"
                                name="platform"
                                type="text"
                                value={formState.platform}
                                onChange={handleChange}
                            />
                            <input
                                className="form-input"
                                placeholder="Price"
                                name="price"
                                type="number"
                                value={formState.price}
                                onChange={handleChange}
                            />
                            <button
                                className="btn btn-block btn-primary"
                                style={{ cursor: 'pointer' }}
                                type="submit"
                            >
                                Submit
                            </button>
                        </form>
                        {error && (
                            <div className="my-3 p-3 bg-danger text-white">
                                {error.message}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
};

export default GameForm;