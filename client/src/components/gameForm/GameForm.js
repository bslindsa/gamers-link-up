import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_GAME } from '../../utils/mutations';
// import { GET_GAMES, GET_ME } from '../utils/queries';

import Auth from '../../utils/auth';

const GameForm = () => {

    const [formState, setFormState] = useState({
        title: 'DDR',
        description: 'Old',
        platform: 'PS2',
        price: 30,
    });
    const [addGame, { error }] = useMutation(ADD_GAME);

    const handleChange = (event) => {
        const { name, value } = event.target;
        // console.log(`${name}: ${value}`);
        setFormState({
            ...formState,
            [name]: value,
        });
        // console.log(formState);
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        console.log(formState);
        try {
            // eslint-disable-next-line
            const { data } = await addGame({
                variables: {
                    ...formState,                  
                }
            });
            // setFormState({
            //     title: '',
            //     description: '',
            //     platform: '',
            //     price: 0,
            // });
            window.location.reload();
        } catch (err) {
            console.log('catch');
            console.error(err);
        }
    };

    return (
        <main className="flex-row justify-center mb-4">
            {Auth.loggedIn() ? (
                <>
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
                </>
            ) : (
                <p>
                    You need to be logged to share your games. Please{' '}
                    <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
                </p>
            )}
        </main>
    );
};

export default GameForm;