import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_GAME } from '../../utils/mutations';
// import { GET_GAMES, GET_ME } from '../utils/queries';
// dropzone imagekit
// imagekit ID: b7ythpwldzw
import Auth from '../../utils/auth';
import './style.css'

const GameForm = () => {

    const [formState, setFormState] = useState({
        title: 'Turok',
        description: 'Too bloody for my kids',
        platform: 'N64',
        price: 900,
    });
    const [addGame, { error }] = useMutation(ADD_GAME);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value,
        });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
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

    // Upload and display image
    const imageInput = document.querySelector("#image_input");
    // const preview = document.querySelector('.preview');
    const reader = new FileReader();
    let uploadedImages = [];
    // let uploadedImage = '';

    const handleEvent = (event) => {
        if (imageInput) {
            if (event.type === 'load') {
                // preview.src = reader.result;
                let uploadImage = reader.result;
                uploadedImages.push(uploadImage);
            }
            console.log(`Uploaded Images: ${uploadedImages}`);
        }
    };

    const handleSelected = (e) => {
        const selectedFile = imageInput.files[0];
        if (selectedFile) {
            reader.addEventListener('load', handleEvent);
            reader.readAsDataURL(selectedFile);
        }
    };

    if (imageInput) {
        imageInput.addEventListener('change', handleSelected);
    }


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
                                        <div>
                                        <img className='preview' src={image} alt='Preview' />
                                        </div>
                                    ))}
                                </div>

                                {/* <img className='preview' src='' alt='Preview' /> */}
                                <label>Upload Images</label>
                                <input type='file' id='image_input' accept='image/png, image/jpg' />
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
                <p>
                    You need to be logged to share your games. Please{' '}
                    <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
                </p>
            )}
        </main>
    );
};

export default GameForm;