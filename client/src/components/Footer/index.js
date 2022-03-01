import React from 'react';
import '../Footer/footer.css'
import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';

const Footer = () => {
    return (
      <footer className="w-100 mt-auto bg-secondary p-3">
        <div className="container text-center mb-5">
        <Link className="text-light" to={"/"}>
                <button className="btn btn-dark mb-3">Games</button>
        </Link>
          
        </div>
      </footer>
    );
  };
  
  export default Footer;