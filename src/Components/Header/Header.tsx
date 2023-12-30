import React from 'react';
import {Link} from 'react-router-dom';

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">Navbar</a>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/categories" className="nav-link" href="#">Category</Link>
            </li>
            <li className="nav-item">
              <Link to="/add-transaction" className="nav-link" href="#">Add</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;