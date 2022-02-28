import React from 'react';
import { Link } from 'react-router-dom';
import '../header/header.css'
import Auth from '../../utils/auth';

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <header className="available-games">
      <div className="container">
        <div>
          <Link className="text-light" to="/">
            <h1 className="see-games">See Available Games</h1>
          </Link>

        </div>
        <div className='content'>
          {Auth.loggedIn() ? (
            <>
              <Link className="text-light" to={`/profile/${Auth.getProfile().data.username}`}>
                <h1 className="m-0">View My Inventory</h1>
              </Link>
              <button className="btn-lg btn-light m" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="btn btn-lg btn-info m-2" to="/login">
                Login
              </Link>
              <Link className="btn btn-lg btn-light m-2" to="/signup">
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;