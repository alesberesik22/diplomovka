import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar({ handleLogout }) {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  return (
    <>
      <nav className="navbar">
        <Link to="/" className="navbar-logo">
          Domaca automatizacia <i class="fas fa-grip-lines-vertical" />
        </Link>
        <div className="menu-icon" onClick={handleClick}>
          <i className={click ? "fas fa-times" : "fas - fa-bars"} />
        </div>
        <ul className={click ? "nav-menu active" : "nav-menu"}>
          <li className="nav-item">
            <Link to="/" className="nav-links" onClick={closeMobileMenu}>
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/pocasie" className="nav-links" onClick={closeMobileMenu}>
              Weather
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/izby" className="nav-links" onClick={closeMobileMenu}>
              Rooms
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/ToDo" className="nav-links" onClick={closeMobileMenu}>
              ToDo
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/Settings"
              className="nav-links"
              onClick={closeMobileMenu}
            >
              Settings
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/" className="nav-links" onClick={handleLogout}>
              Log out
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Navbar;
