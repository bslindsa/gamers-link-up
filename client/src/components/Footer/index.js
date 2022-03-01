import React from 'react';
import '../Footer/footer.css'
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="w-100 mt-auto bg-secondary">
      <div className="container text-center">
        <Link className="text-light" to={"/"}>
          <button className="btn btn-dark">Games</button>
        </Link>
      </div>
    </footer>
  );
};

export default Footer;