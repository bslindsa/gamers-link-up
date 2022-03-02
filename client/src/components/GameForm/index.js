import React, { useState } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { GET_ME } from '../../utils/queries';

import $ from 'jquery';

import { ADD_GAME } from '../../utils/mutations';

import Auth from '../../utils/auth';

import Nintendo from './assets/nintendo.png';
import PlayStation from './assets/playstation.png';
import XBox from './assets/xbox.png';
import PC from './assets/pc.png';
import './style.css';

const GameForm = () => {

    // const { loading, data } = useQuery(GET_ME);
    // const user = data?.me || {};

    const [formState, setFormState] = useState({
        title: '',
        description: '',
        platform: '',
        price: ''
    });
    const [addGame, { error }] = useMutation(ADD_GAME)

    const [selectedImages, setSelectedImages] = useState([]);
    const [gameImages, setGameImages] = useState([]);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormState({ ...formState, [name]: value });

        if (event.target.type === 'image') {
            $('.icon').removeClass('highlight');
            $(event.target).addClass('highlight');
        }

        if (event.target.files) {
            // const reader = new FileReader();
            // reader.onload = logFile;
            // if (event.target.files[0]) {
            //     const fileArray = reader.readAsDataURL(event.target.files[0]);
            //     console.log(fileArray);

            // }
            // function logFile(event) {
                //     let img = document.createElement('img');
                //     img.src = str;
                //     app.append(img);
                //     console.log(str);
            // }

            const blobArray = Array.from(event.target.files).map((file) => URL.createObjectURL(file));
            setSelectedImages((prevImages) => prevImages.concat(blobArray));
            console.log(selectedImages);
            Array.from(event.target.files).map(
                (file) => URL.revokeObjectURL(file)
            )
        };
        setFormState({ ...formState, [name]: value });
    };


    const handleFormSubmit = async (event) => {
        event.preventDefault()
        try {
            // eslint-disable-next-line
            const { data } = await addGame({

                variables: { ...formState, price: parseFloat(formState.price), images: gameImages },
            });

            setFormState({
                title: '',
                description: '',
                platform: '',
                price: ''
            });

            window.location.assign(`/`);

        } catch (err) {
            console.log('catch');
            console.error(err);
        }
    };

    // Display image previews
    const renderPhotos = (source) => {
        return source.map((photo) => {
            return <img className='preview m-2' src={photo} key={photo} alt='Preview' />
        })
    }

    return (
        <main>
            {Auth.loggedIn() ? (
                <>
                    <div className='gf-back d-flex justify-content-center align-items-center'>
                        <div className='gf-back d-flex justify-content-center mt-5'>
                            <div className="game-card card ">
                                <h4 className="custom-card-header card-header bg-dark text-light p-2">Game</h4>
                                <div className="card-body">
                                    <label htmlFor='file' id='add-photo' className='label'>
                                        Add Photos:
                                    </label>
                                    <input type="file" multiple className="form-control label" name="images" id="file" onChange={handleChange} />
                                    <div className='result'>
                                        {renderPhotos(selectedImages)}
                                    </div>
                                    <div className='mt-2'>
                                        <label>Platform:</label>
                                        <input type='image' border='none' className='icon' src={Nintendo} alt='nintendo' name='platform' value='Nintendo' onClick={handleChange} />
                                        <input type='image' border='none' className='icon' src={XBox} alt='Xbox' name='platform' value='XBOX' onClick={handleChange} />
                                        <input type='image' border='none' className='icon' src={PlayStation} alt='playstation' name='platform' value='PlayStation' onClick={handleChange} />
                                        <input type='image' border='none' className='icon' src={PC} alt='PC' name='platform' value='PC' onClick={handleChange} />
                                    </div>
                                    <form onSubmit={handleFormSubmit} className='mt-2'>
                                        <label>Title:</label>
                                        <input
                                            className="form-input"
                                            placeholder="Game Title"
                                            name="title"
                                            type="text"
                                            value={formState.title}
                                            onChange={handleChange}
                                        />
                                        <label>Description:</label>
                                        <input
                                            className="form-input"
                                            placeholder="Game Description"
                                            name="description"
                                            type="text"
                                            value={formState.description}
                                            onChange={handleChange}
                                        />
                                        <label>Price:</label>
                                        <input
                                            className="form-input"
                                            placeholder="Price"
                                            name="price"
                                            type="text"
                                            pattern='[0-9]*'
                                            value={formState.price}
                                            onChange={handleChange}
                                        />
                                        <button
                                            className="mt-3 btn btn-block btn-primary"
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
                    </div>
                </>
            ) : (
                <>
                    <Redirect to="/login" />
                </>
            )
            }
        </main>
    );
};

export default withRouter(GameForm);
