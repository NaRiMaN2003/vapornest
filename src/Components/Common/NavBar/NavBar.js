import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useUserContext } from '../../Pages/Register/UserContext';
import { FaHome, FaBookOpen, FaUserCircle } from 'react-icons/fa';
import { FaCartShopping } from 'react-icons/fa6';
import { IoLogOutOutline } from 'react-icons/io5';
import { GiSmokeBomb } from 'react-icons/gi';
import './NavBar.css';

export default function NavBar() {
  const { user, logoutUser } = useUserContext();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logoutUser();
    localStorage.removeItem('user');
    navigate('/loginsignup');
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <>
      <div
        className={`backdrop ${menuOpen ? 'show' : ''}`}
        onClick={closeMenu}
      ></div>

      <nav className="custom-navbar">
        <div className="hamburger-menu" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </div>

        <Link to="/home" className="navbar-brand" style={{ fontSize: '1.5rem' }}>
          Vapornest
        </Link>

        <ul className={`navbar-links ${menuOpen ? 'show-menu' : ''}`}>
          <li>
            <NavLink to="/home" className="navbar-link" onClick={closeMenu}>
              <FaHome className="navbar-icon" /> Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/brands" className="navbar-link" onClick={closeMenu}>
              <GiSmokeBomb className="navbar-icon" /> Brands
            </NavLink>
          </li>
          <li>
            <NavLink to="/products" className="navbar-link" onClick={closeMenu}>
              <FaCartShopping className="navbar-icon" /> Products
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" className="navbar-link" onClick={closeMenu}>
              <FaBookOpen className="navbar-icon" /> About
            </NavLink>
          </li>
        </ul>

        <div className="navbar-user-section">
          <NavLink to="/loginsignup" className="navbar-user-link">
            <FaUserCircle className="navbar-user-icon" />
            {user ? <span>{user}</span> : <span>Login/SignUp</span>}
          </NavLink>
          {user && (
            <button className="navbar-logout-btn" onClick={handleLogout}>
              <IoLogOutOutline className="navbar-logout-icon" />
              Logout
            </button>
          )}
        </div>
      </nav>
    </>
  );
}