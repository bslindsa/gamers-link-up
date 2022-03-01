import React from "react";
import '../Payment/Payment.css'
import { useState } from 'react';
import Accepted from '../Accepted/Accepted';

const Payment = () => {
    let [error, setError] = useState();
    function handleBlur(event) {
        console.log(event.target.value)
        if (event.target.value.match(/^$/)) {
            setError("Required Field")
            console.log(error)
        } else {
            setError("")
            return
        }
    }

    const [checkout, setCheckout] = useState(false)

    // const handleChange = (event) => {
    //     const { name, value } = event.target;
        
    //     setFormState({ [name]: value });

    //     if (event.target.type === 'image') {
    //         $('.icon').removeClass('highlight');
    //         $(event.target).addClass('highlight');
    //     }

    // };

    
    return (
        <div>
            <div className='payment-container'>
                <h4 className='payment-info'>Enter Payment Info.</h4>
                <form>
                    <div className="form-group">
                        <label className='name-text'>First Name</label>
                        <br />
                        <input
                            onBlur={handleBlur}
                            name="name"
                            type="text"
                            className="name-text"
                            placeholder="First Name"
                            id="name"
                        />
                        <span className="error">{error}</span>                      
                        <br />
                        <label className='name-text'>Last Name</label>
                        <br />
                        <input
                            onBlur={handleBlur}
                            name="name"
                            type="text"
                            className="form-name"
                            placeholder="Last Name"
                            id="name"
                        />
                        <span className="error">{error}</span>   
                        <br />
                        <label className='name-text'>Card Number</label>
                        <br />
                        <input
                            onBlur={handleBlur}
                            name="name"
                            type="text"
                            className="form-name"
                            placeholder="                               💳"
                            id="name"
                        />
                        <span className="error">{error}</span>   
                        <br />
                        <label className='name-text'>Expires</label>
                        <br />
                        <input
                            name="name"
                            type="number"
                            className="form-name"
                            placeholder="MONTH"
                            id="name"
                        />
                        <input
                            name="name"
                            type="number"
                            className="form-name"
                            placeholder="YEAR"
                            id="name"
                        />
                        <br />
                        <h4 className='billing-info'>Enter Billing Info.</h4>
                        <label className='name-text'>Country</label>
                        <br />
                        <input
                            name="name"
                            type="text"
                            className="form-name"
                            placeholder=""
                            id="name"
                        />
                        <br />
                        <label className='name-text'>Billing Address</label>
                        <br />
                        <input
                            name="name"
                            type="text"
                            className="form-name"
                            placeholder="Address Line 1"
                            id="name"
                        />
                        <br />
                        <input
                            name="name"
                            type="text"
                            className="form-name"
                            placeholder="Address Line 2"
                            id="name"
                        />
                        <br />
                        <label className='name-text'>City</label>
                        <br />
                        <input
                            name="name"
                            type="text"
                            className="form-name"
                            placeholder=""
                            id="name"
                        />
                        <br />
                        <label className='name-text'>State</label>
                        <br />
                        <input
                            name="name"
                            type="text"
                            className="form-name"
                            placeholder=""
                            id="name"
                        />
                        <br />
                        <label className='name-text'>Zip Code</label>
                        <br />
                        <input
                            name="name"
                            type="text"
                            className="form-name"
                            placeholder=""
                            id="name"
                        />
                        <br />
                        <label className='name-text'>Email</label>
                        <br />
                        <input
                            name="email"
                            type="text"
                            className="form-email"
                            placeholder="your_email@mail.com"
                            id="email"
                        />
                        <br />
                        
                        <br />
                        {/* Button to Submit Billing Info */}
                        {checkout ? (
                            <Accepted />
                        ) : (
                            <button id="buy-now" className="btn btn-dark mb-3" onClick={() => {
                                setCheckout(true);
                            }}
                            >
                                Checkout
                            </button>
                        )}
                        {/* <button
                            className="btn btn-primary"
                            type="submit"
                            // onClick={handleChange}
                        >
                            Checkout
                        </button> */}
                        
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Payment;