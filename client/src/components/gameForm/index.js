import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import $ from 'jquery';

import { ADD_GAME } from '../../utils/mutations';

import Auth from '../../utils/auth';

import Nintendo from './assets/nintendo.jpg';
import PlayStation from './assets/playstation.png';
import XBox from './assets/xbox.png';
import PC from './assets/pc.png';
import './style.css'

const GameForm = () => {
    const [formState, setFormState] = useState({
        title: '',
        description: '',
        platform: '',
        price: 0
    });
    const [addGame, { error }] = useMutation(ADD_GAME)

    const [selectedImages, setSelectedImages] = useState([]);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormState({ ...formState, [name]: value });
        
        if (event.target.type === 'image') {
            $('.icon').removeClass('highlight');
            $(event.target).addClass('highlight');
        }

        if (event.target.files) {
            const fileArray = Array.from(event.target.files).map((file) => URL.createObjectURL(file));
            setSelectedImages((prevImages) => prevImages.concat(fileArray));
            Array.from(event.target.files).map(
                (file) => URL.revokeObjectURL(file)
            )
            console.log(selectedImages);
        };

        setFormState({ ...formState, [name]: value });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        console.log(formState)
        // console.log(title);
        try {
            // eslint-disable-next-line

            const { data } = await addGame({
                variables: { ...formState, price: parseFloat(formState.price) },
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
                    <div>
                        <div className="card">
                            <h4 className="custom-card-header card-header bg-dark text-light p-2">Game</h4>
                            <div className="card-body">
                                <div>
                                    <input type="file" multiple className="form-control label" name="images" id="file" onChange={handleChange} />
                                    <div>
                                        <label htmlFor='file' className='label'>
                                            Add Photos
                                        </label>
                                    </div>
                                    <div className='result'>
                                        {renderPhotos(selectedImages)}
                                    </div>
                                </div>

                                <label>Platform</label>
                                <input type='image' border='none' className='icon' src={Nintendo} alt='nintendo' name='platform' value='Nintendo' onClick={handleChange} />
                                <input type='image' border='none' className='icon' src={XBox} alt='Xbox' name='platform' value='XBOX' onClick={handleChange} />
                                <input type='image' border='none' className='icon' src={PlayStation} alt='playstation' name='platform' value='PlayStation' onClick={handleChange} />
                                <input type='image' border='none' className='icon' src={PC} alt='PC' name='platform' value='PC' onClick={handleChange} />

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
                                    <label>Price</label>
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
            )
            }
        </main>
    );
};

export default GameForm;