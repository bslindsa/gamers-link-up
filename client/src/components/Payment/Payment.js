import React from "react";
import '../Payment/Payment.css'
import { useState } from 'react';

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
    return (
        <div>
            <div className='payment-container'>
                <h4 className='payment-info'>Enter Payment Info.</h4>
                <form>
                    <div className="form-group">
                        <label className='first-name-text'>First Name</label>
                        <br />
                        <input
                            onBlur={handleBlur}
                            name="name"
                            type="text"
                            className="form-name"
                            placeholder="First Name"
                            id="name"
                        />
                        <span className="error">{error}</span>                      
                        <br />
                        <label className='last-name-text'>Last Name</label>
                        <br />
                        <input
                            name="name"
                            type="text"
                            className="form-name"
                            placeholder="Last Name"
                            id="name"
                        />
                        <br />
                        <label className='card-num-text'>Card Number</label>
                        <br />
                        <input
                            name="name"
                            type="text"
                            className="form-name"
                            placeholder="                               💳"
                            id="name"
                        />
                        <br />
                        <label className='card-num-text'>Expires</label>
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
                        <label className='first-name-text'>Country</label>
                        <br />
                        <input
                            name="name"
                            type="text"
                            className="form-name"
                            placeholder=""
                            id="name"
                        />
                        <br />
                        <label className='first-name-text'>Billing Address</label>
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
                        <label className='first-name-text'>City</label>
                        <br />
                        <input
                            name="name"
                            type="text"
                            className="form-name"
                            placeholder=""
                            id="name"
                        />
                        <br />
                        <label className='first-name-text'>State</label>
                        <br />
                        <input
                            name="name"
                            type="text"
                            className="form-name"
                            placeholder=""
                            id="name"
                        />
                        <br />
                        <label className='first-name-text'>Zip Code</label>
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
                        <button
                            className="btn btn-primary"
                            type="submit"
                        >
                            Checkout
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Payment;