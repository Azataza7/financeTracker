import React from 'react';
import {Link} from 'react-router-dom';

const Header = () => {
  return (
    <nav className="navbar bg-body-tertiary">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand" href="#">Navbar</Link>
        <div className="nav-container" id="navbarNav">
          <ul className="navbar-nav d-flex flex-row gap-2">
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