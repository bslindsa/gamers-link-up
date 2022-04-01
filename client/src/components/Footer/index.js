import React from 'react';
import '../Footer/footer.css'
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div>
      <div className='collapse' id='chat-list'>
        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.
      </div>
      <footer className="my-footer">
        <div>
          <button className="container pop-btn" data-toggle='collapse' data-target='#chat-list' role='button' aria-expanded='false' aria-controls="chat-list">
            Messages
          </button>
        </div>
        <div className="container text-center">
          <Link className="text-light" to={"/"}>
            <button className="btn btn-dark">Games</button>
          </Link>
        </div>
      </footer>
    </div>

  );
};

export default Footer;