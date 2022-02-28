import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_GAME } from '../../utils/mutations';
// import { GET_GAMES, GET_ME } from '../utils/queries';
// dropzone imagekit
// imagekit ID: b7ythpwldzw
import Auth from '../../utils/auth';
<<<<<<< HEAD:client/src/components/gameForm/GameForm.js
// import { GET_GAME, GET_ME } from '../../utils/queries';
=======
import './style.css'
>>>>>>> e7b2b0a8aab47930e5fae2f502fc055baa14d621:client/src/components/gameForm/index.js

const GameForm = () => {
    const [formState, setFormState] = useState({
        tite: '',
        description: '',
        platform: '',
        price: 0
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
                setFormState({...formState, [name]: value});
        };

<<<<<<< HEAD:client/src/components/gameForm/GameForm.js
        const handleFormSubmit = async (event) => {
            event.preventDefault();
            // console.log(title);
            try {
                // eslint-disable-next-line
                const {data} = await addGame({
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

        

        return(
        <main className = "flex-row justify-center mb-4" >
            {
                Auth.loggedIn() ? (
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
=======
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
>>>>>>> e7b2b0a8aab47930e5fae2f502fc055baa14d621:client/src/components/gameForm/index.js
                            </div>
                        </div>
                    </>
                ) : (
                    <p>
                        You need to be logged to share your games. Please{' '}
                        <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
                    </p>
                )
            }
        </main >
    );
};

export default GameForm;