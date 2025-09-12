import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import { spotlights } from '../assets/assets';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const spotlightPage = () => {
  return (
    <>
      <Navbar />
      <div className="container my-5">
        <div className="text-center mb-5">
          <div
            className="text-center mt-5"
            style={{ color: 'var(--prussian-blue)' }}
          >
            <h2 className="fw-bold text-center" style={{ color: 'var(--prussian-blue)' }}>In The Spotlight</h2>
            <div
              className="mx-auto mt-2"
              style={{
                width: '80px',
                height: '3px',
                backgroundColor: 'var(--satin-sheen-gold)',
                marginBottom: '16px',
              }}
            ></div>
          </div>

          <div className="d-flex flex-row justify-content-center align-items-center text-center mb-4">
            <p style = {{width: "350px"}}>Eng. Mosety Kat is a sought-after voice in the aviation industry,
            featured in leading publications and headlining major conferences.</p>
          </div>
        </div>

        <div className="row g-4">
          {spotlights.map((item, index) => (
            <div key={index} className="col-md-4">
              <div className="card h-100 shadow-sm">
                <img
                  src={item.img}
                  className="card-img-top"
                  alt={item.title}
                  style={{ height: '220px', objectFit: 'cover' }}
                />
                <div className="card-body">
                  <h6 className="card-title fw-bold">{item.title}</h6>
                  <p className="card-text text-muted small">{item.desc}</p>
                </div>
                <div className="card-footer bg-white border-0">
                  <a
                    href={item.link}
                    className="fw-bold small text-decoration-none"
                    style={{ color: 'var(--satin-sheen-gold)' }}
                  >
                    Read More <FaArrowRight className="ms-1" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div
        className="text-center mt-5 p-5"
        style={{
          backgroundColor: 'var(--prussian-blue)',
          color: 'var(--antiflash-white)',
        }}
      >
        <h4 className="fw-bold">Ready to Inspire Your Audience?</h4>
        <p className="" style = {{fontWeight: "100"}}>
          Secure Eng. Mosety Kat for your next event and provide an unparalleled<br/>
          experience in aviation innovation and visionary leadership.
        </p>
        <button
          className="btn"
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
            Book Me for Speaking
          </Link>
        </button>
      </div>
      <Footer />
    </>
  );
};

export default spotlightPage;
