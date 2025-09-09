import React from 'react';
import { FaLinkedinIn, FaFacebook, FaInstagram } from 'react-icons/fa';

import '../colors.css';

const Footer = () => {
  return (
    <footer
      className="text-center mt-auto py-4 navbar-dark"
      style={{ backgroundColor: 'var(--prussian-blue)' }}
    >
      <div className="container w-100">
        <div
          className="row align-items-center justify-content-between"
          style={{ color: 'var(--antiflash-white)' }}
        >
          <div className="col-12 col-md-4 d-flex flex-column align-items-center align-items-md-start justify-content-center">
            <h3 className="mb-1" style={{ color: 'var(--satin-sheen-gold)' }}>
              Mosety
            </h3>
            <div className="" style={{ color: 'var(--antiflash-white)' }}>
              2025, All rights reserved.
            </div>
          </div>
          <div className="col-12 col-md-4 d-flex align-items-center justify-content-center gap-3">
            <ul className="list-inline mb-0">
              <li className="list-inline-item">
                <a
                  href="#"
                  className="text-decoration-none"
                  style={{ color: 'var(--antiflash-white)' }}
                >
                  Privacy Policy
                </a>
              </li>
              <li className="list-inline-item">
                <a
                  href="#"
                  className="text-decoration-none"
                  style={{ color: 'var(--antiflash-white)' }}
                >
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
          <div className="col-12 col-md-4 d-flex align-items-center justify-content-center justify-content-md-end gap-3">
            <ul className="list-inline mb-0">
              <li className="list-inline-item">
                <a
                  href="#"
                  className="fs-5"
                  style={{ color: 'var(--satin-sheen-gold)' }}
                >
                  <FaFacebook />
                </a>
              </li>
              <li className="list-inline-item">
                <a
                  href="#"
                  className="fs-5"
                  style={{ color: 'var(--satin-sheen-gold)' }}
                >
                  <FaInstagram />
                </a>
              </li>
              <li className="list-inline-item">
                <a
                  href="#"
                  className="fs-5"
                  style={{ color: 'var(--satin-sheen-gold)' }}
                >
                  <FaLinkedinIn />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
