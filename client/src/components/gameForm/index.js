import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import $ from 'jquery';

import { ADD_GAME } from '../../utils/mutations';

import Auth from '../../utils/auth';
import './style.css';
import logo from './logo192.png';
import landscape from './zelda_landscape.jpg';


const GameForm = () => {
    const [formState, setFormState] = useState({
        title: '',
        description: '',
        platform: '',
        price: 0,
    });
    const [addGame, { error }] = useMutation(ADD_GAME)
    //     update(cache, { data: { addGame } }) {
    //         try {
    //             const { games } = cache.readQuery({ query: GET_GAME })

    //             cache.writeQuery({
    //                 query: GET_GAME,
    //                 data: { games: [addGame, ...games] },
    //             });
    //         } catch (err) {
    //             console.error(err)
    //         }

    //         const { me } = cache.readQuery({ query:GET_ME });
    //         cache.writeQuery({
    //             query: GET_ME,
    //             data: {me: {...me, games: [...me.games, addGame]}},
    //         });
    //     }    
    // });


    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({ ...formState, [name]: value });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        // console.log(title);
        try {
            // eslint-disable-next-line
            const { data } = await addGame({
                variables: { ...formState },
            });
            setFormState({
                title: '',
                description: '',
                platform: '',
                price: 0
            });
        } catch (err) {
            console.log('catch');
            console.error(err);
        }
    };


    // Upload and display image
    // const reader = new FileReader();
    const uploadedImages = [logo, landscape];
    let uploadImage = '';


    console.log(uploadedImages);

    function readURL(input) {
        if (input.files && input.files[0]) {
            const reader = new FileReader();
            reader.onload = function (e) {
                $("#imgPreview")
                    .attr("src", e.target.result)
                    .width(100)
                    .height(100);
                uploadImage = e.target.result;
                uploadedImages.push(uploadImage);
            };
            reader.readAsDataURL(input.files[0]);
        }
    }

    $("#img").change(function () {
        console.log(this.files);
        readURL(this);
    });

    return (
        <main>
            {Auth.loggedIn() ? (
                <>
                    <div>

                        <div className="card">
                            <h4 className="card-header bg-dark text-light p-2">Game</h4>
                            <div className="card-body">

                                <div className='d-flex flex-row'>
                                    {uploadedImages.map(image => (
                                        <img key={image} className='preview' src={image} alt='Preview' />
                                    ))}
                                </div>

                                {/* <img src="#" id="imgPreview" alt="" /> */}

                                <label>Upload Images</label>
                                <input type="file" className="form-control" name="image" id="img" />
                                <form onSubmit={handleFormSubmit}>
                                    <label>Title</label>
                                    <input
                                        className="form-input"
                                        placeholder="Game Title"
                                        name="title"
                                        type="text"
                                        value={formState.title}
                                        onChange={handleChange}
                                    />
                                    <label>Description</label>
                                    <input
                                        className="form-input"
                                        placeholder="Game Description"
                                        name="description"
                                        type="text"
                                        value={formState.description}
                                        onChange={handleChange}
                                    />
                                    <label>Platform</label>
                                    <input
                                        className="form-input"
                                        placeholder="Platform"
                                        name="platform"
                                        type="text"
                                        value={formState.platform}
                                        onChange={handleChange}
                                    />
                                    <label>Price</label>
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
                <>
                    <p>
                        You need to be logged to share your games. Please{' '}
                        <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
                    </p>
                </>
            )}
        </main>
    );
};

export default GameForm;