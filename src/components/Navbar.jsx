import React from 'react';
import { Link, NavLink } from 'react-router-dom';

import { assets } from '../assets/assets';

const Navbar = () => {
  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark px-4"
      style={{ backgroundColor: 'var(--prussian-blue' }}
    >
      <Link to="/" className="text-decoration-none">
        <span
          className="navbar-brand d-flex align-items-center fw-bold gap-0"
          style={{ color: 'var(--satin-sheen-gold)' }}
        >
          <img
            src={assets.Logo}
            alt="Mosety Logo"
            style={{ width: '80px', height: '80px' }}
          />
          <span className="me-2">Mosety</span>
        </span>
      </Link>

      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarNav">
        <ul
          className="navbar-nav mx-auto mb-2 mb-lg-0"
          style={{
            fontSize: '15px',
            fontWeight: '500',
            color: 'var(--antiflash-white)',
          }}
        >
          <li className="nav-item">
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? 'nav-link text-white navbar-active'
                  : 'nav-link text-white'
              }
              to="/"
              end
            >
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? 'nav-link text-white navbar-active'
                  : 'nav-link text-white'
              }
              to="/profile"
              end
            >
              Profile
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? 'nav-link text-white navbar-active'
                  : 'nav-link text-white'
              }
              to="/spotlight"
            >
              Spotlight
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? 'nav-link text-white navbar-active'
                  : 'nav-link text-white'
              }
              to="/companies"
            >
              Companies
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? 'nav-link text-white navbar-active'
                  : 'nav-link text-white'
              }
              to="/contact"
            >
              Contact
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? 'nav-link text-white navbar-active'
                  : 'nav-link text-white'
              }
              to="/booking"
            >
              Flight Booking
            </NavLink>
          </li>
        </ul>
        <button
          className="btn d-flex"
          style={{
            backgroundColor: 'var(--satin-sheen-gold)',
            color: 'var(--antiflash-white)',
            borderRadius: 0,
          }}
        >
          <Link
            className="text-decoration-none fw-semibold"
            style={{ color: 'var(--antiflash-white)' }}
            to="/consultation"
          >
            Book a Consultation
          </Link>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
