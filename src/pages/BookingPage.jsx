import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import { destinations } from '../assets/assets';

const BookingPage = () => {
  const bgStyle = {
    minHeight: '100vh',
    width: '100%',
    backgroundImage: `url('/src/assets/booking-page-hero.png')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fff',
    textAlign: 'center',
  };

  return (
    <>
      <Navbar />
      <div style={bgStyle}>
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(0,0,0,0.4)',
            zIndex: 1,
          }}
        ></div>

        <div style={{ zIndex: 2 }}>
          <h1 className="fw-bold mb-3" style={{ fontSize: '3rem' }}>
            Book Your Flight
          </h1>
          <p style={{ fontSize: '1.2rem' }}>
            Experience the pinnacle of luxury air travel.
          </p>
        </div>
      </div>
      {/* ooooooooooooooo */}
      <div
        className="container p-4"
        style={{
          backgroundColor: 'var(--antiflash-white)',
          boxShadow: '0 4px 8px rgba(0,0,0,0.9)',
        }}
      >
        <form className="row g-3 align-items-end">
          <div className="col-md-3">
            <label className="form-label">Departure Date</label>
            <input
              type="date"
              className="form-control"
              style={{ borderRadius: 0 }}
            />
          </div>
          <div className="col-md-3">
            <label className="form-label">Return Date</label>
            <input
              type="date"
              className="form-control"
              style={{ borderRadius: 0 }}
            />
          </div>
          <div className="col-md-2">
            <label className="form-label">Passengers</label>
            <input
              type="number"
              min="1"
              defaultValue="1"
              className="form-control"
              style={{ borderRadius: 0 }}
            />
          </div>
          <div className="col-md-2">
            <label className="form-label">Travel Class</label>
            <select className="form-select" style={{ borderRadius: 0 }}>
              <option>First Class</option>
              <option>Business</option>
              <option>Economy</option>
            </select>
          </div>
          <div className="col-md-2">
            <button
              type="submit"
              className="btn w-100 text-muted"
              style={{
                backgroundColor: 'var(--satin-sheen-gold)',
                fontWeight: 'bold',
                borderRadius: 0,
              }}
            >
              Search Flights
            </button>
          </div>
        </form>
      </div>
      {/* oooooooooooooooooooo */}
      <div className="container py-5">
        <h2
          className="text-center mb-3"
          style={{ color: 'var(--prussian-blue)' }}
        >
          Popular Destinations
        </h2>

        <div
          style={{
            width: '100px',
            height: '3px',
            backgroundColor: 'var(--satin-sheen-gold)',
            margin: '0 auto 20px',
          }}
        ></div>
        <div
          className="d-flex justify-content-center mb-5 align-items-center mx-auto"
          style={{
            border: '2px solid var(--prussian-blue)',
            width: 'fit-content',
            padding: '5px',
          }}
        >
          <div
            className="btn-group d-flex justify-content-center align-items-center"
            style={{ borderRadius: 0, backgroundColor: 'none' }}
          >
            <button
              className="btn fw-bold"
              style={{
                backgroundColor: 'var(--prussian-blue)',
                color: 'var(--antiflash-white)',
                borderRadius: 0,
              }}
            >
              Domestic
            </button>
            <button
              className="btn border-0 fw-bold"
              style={{
                backgroundColor: 'none',
                color: 'var(--prussian-blue)',
                borderRadius: 0,
              }}
            >
              International
            </button>
          </div>
        </div>

        <div className="row g-4">
          {destinations.map((dest, idx) => (
            <div className="col-md-3 col-sm-6" key={idx}>
              <div className="card border-0 shadow-sm h-100">
                <div
                  style={{
                    backgroundImage: `url(${dest.img})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    height: '250px',
                    position: 'relative',
                  }}
                >
                  <div
                    className=""
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      background: 'rgba(0,0,0,0.5)',
                      color: '#fff',
                      padding: '10px',
                    }}
                  >
                    <h6 className="fw-bold">{dest.city}</h6>
                    <p className="mb-2 small">{dest.desc}</p>

                    <button
                      className="btn fw-bold px-4 text-dark"
                      style={{
                        backgroundColor: 'var(--satin-sheen-gold)',
                        borderRadius: 0,
                      }}
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-5">
          <h5 className="fw-bold" style={{ color: 'var(--prussian-blue)' }}>
            With us, it is always a safe and fast trip.
          </h5>
          <p className="text-dark small">
            Want some information? Feel free to contact us and we will <br />
            assist you as fast as possible.
          </p>
          <button
            className="btn fw-bold px-4"
            style={{
              backgroundColor: 'var(--satin-sheen-gold)',
              color: 'var(--antiflash-white)',
              borderRadius: 0,
            }}
          >
            Contact Us
          </button>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default BookingPage;
