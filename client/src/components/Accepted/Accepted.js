import React from "react";
import Checkone from './assets/check-mark.png'


const Accepted = () => {

    return (
        <div>
            <div>
            <h1> Payment Accepted 
            <img className='icon' src={Checkone} alt='PC' name='platform'/>
            
            </h1>
            </div>
        </div>
    );
};

export default Accepted;