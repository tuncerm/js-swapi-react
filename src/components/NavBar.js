import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavBar.css';

function NavBar() {
  return (
    <header>
      <nav>
        <ul className="navbar-nav-menu">
          <li className="navbar-nav-item"><NavLink to="/">Home</NavLink></li>
          <li className="navbar-nav-item"><NavLink to="/films">Films</NavLink></li>
          <li className="navbar-nav-item"><NavLink to="/people">People</NavLink></li>
          <li className="navbar-nav-item"><NavLink to="/planets">Planets</NavLink></li>
          <li className="navbar-nav-item"><NavLink to="/species">Species</NavLink></li>
          <li className="navbar-nav-item"><NavLink to="/starships">Starships</NavLink></li>
          <li className="navbar-nav-item"><NavLink to="/vehicles">Vehicles</NavLink></li>
        </ul>
      </nav>
    </header>
  );
}

export default NavBar;