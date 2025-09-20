import React from 'react';
import {useState} from 'react';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import { destinations } from '../assets/assets';



const BookingPage = () => {
  const [selectedDestination, setSelectedDestination] = useState('International');

  const [formData, setFormData] = useState({
    departure_airport: '',
    arrival_airport: '',
    departure_date: '',
    return_date: '',
    passengers: 1,
    flight_class: 'economy',
  });
  const [searchResults, setSearchResults] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSearchResults([]);
    setShowModal(true);

    const params = new URLSearchParams();
    if (formData.departure_airport) params.append('departure_airport', formData.departure_airport);
    if (formData.arrival_airport) params.append('arrival_airport', formData.arrival_airport);
    if (formData.departure_date) params.append('departure_date', formData.departure_date);
    if (formData.return_date) params.append('return_date', formData.return_date);
    if (formData.passengers) params.append('passengers', formData.passengers);
    if (formData.flight_class) params.append('flight_class', formData.flight_class);

    const url = `http://127.0.0.1:8000/api/flights/?${params.toString()}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Something went wrong with the search.');
      }
      const data = await response.json();
      setSearchResults(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setSearchResults([]);
    setError(null);
  };


  const handleDestinationChange = (destination) => {
    setSelectedDestination(destination);
  }

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

  const Modal = ({ show, onClose, children }) => {
    if (!show) {
      return null;
    }
    return (
      <div className="modal d-block" tabIndex="-1" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 1050, overflow: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ position: 'relative', width: '90%', maxWidth: '1200px', margin: '1.75rem auto', pointerEvents: 'none' }}>
          <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', width: '100%', pointerEvents: 'auto', backgroundColor: '#fff', backgroundClip: 'padding-box', border: '1px solid rgba(0,0,0,.2)', borderRadius: '.3rem', outline: '0' }}>
            <div style={{ display: 'flex', flexShrink: 0, alignItems: 'center', justifyContent: 'space-between', padding: '1rem', borderBottom: '1px solid #dee2e6', borderTopLeftRadius: 'calc(.3rem - 1px)', borderTopRightRadius: 'calc(.3rem - 1px)', backgroundColor: '#002147', color: 'white' }}>
              <h5 style={{ margin: 0 }}>Available Flights</h5>
              <button type="button" onClick={onClose} style={{ border: 0, backgroundColor: 'transparent', color: 'white', fontSize: '1.5rem' }}>&times;</button>
            </div>
            <div style={{ position: 'relative', flex: '1 1 auto', padding: '1rem', backgroundColor: '#f8f9fa' }}>
              {children}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', flexShrink: 0, alignItems: 'center', justifyContent: 'flex-end', padding: '.75rem', borderTop: '1px solid #dee2e6', borderBottomRightRadius: 'calc(.3rem - 1px)', borderBottomLeftRadius: 'calc(.3rem - 1px)', backgroundColor: '#002147' }}>
              <button type="button" style={{ color: 'white', backgroundColor: '#6c757d', border: '1px solid #6c757d', padding: '.375rem .75rem', borderRadius: '.25rem' }} onClick={onClose}>Close</button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Helper component for a single flight card
  const FlightCard = ({ flight }) => {
    const formatDuration = (isoDuration) => {
      const regex = /PT(?:(\d+)H)?(?:(\d+)M)?/;
      const matches = isoDuration.match(regex);
      if (!matches) return isoDuration;
      const hours = matches[1] ? parseInt(matches[1], 10) : 0;
      const minutes = matches[2] ? parseInt(matches[2], 10) : 0;
      return `${hours}h ${minutes}m`;
    };

    return (
      <div style={{ border: '1px solid #e9ecef', borderRadius: '8px', boxShadow: '0 0.125rem 0.25rem rgba(0,0,0,.075)', margin: '1rem 0' }}>
        <div style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h5 style={{ fontWeight: 'bold', margin: 0, color: '#002147' }}>
              {flight.airline}
            </h5>
            <span style={{ backgroundColor: '#6c757d', color: 'white', padding: '.35em .65em', borderRadius: '.25rem' }}>{flight.flight_number}</span>
          </div>
          <hr />
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
            <div style={{ flex: '1 1 0%' }}>
              <p style={{ fontWeight: 'bold', marginBottom: 0 }}>{new Date(flight.departure_time).toLocaleTimeString()}</p>
              <p style={{ color: '#6c757d', marginBottom: 0, fontSize: '0.875em' }}>{flight.departure_airport_name}</p>
            </div>
            <div style={{ flex: '0 0 auto', width: '25%' }}>
              <span style={{ color: '#6c757d', fontSize: '0.875em' }}>{formatDuration(flight.duration)}</span>
              <div style={{ borderBottom: '1px solid #6c757d', width: '100%', margin: '0.5rem 0' }}></div>
            </div>
            <div style={{ flex: '1 1 0%' }}>
              <p style={{ fontWeight: 'bold', marginBottom: 0 }}>{new Date(flight.arrival_time).toLocaleTimeString()}</p>
              <p style={{ color: '#6c757d', marginBottom: 0, fontSize: '0.875em' }}>{flight.arrival_airport_name}</p>
            </div>
            <div style={{ flex: '0 0 auto', width: '25%', padding: '1rem', textAlign: 'left' }}>
              {flight.class_details.map(detail => (
                <div key={detail.flight_class} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '0.5rem 0' }}>
                  <span style={{ fontWeight: 'bold' }}>{detail.flight_class.charAt(0).toUpperCase() + detail.flight_class.slice(1)}</span>
                  <div>
                    <span style={{ color: '#198754', fontWeight: 'bold', marginRight: '0.5rem' }}>${detail.price}</span>
                    <button style={{ backgroundColor: '#ffc107', color: '#212529', border: '1px solid #ffc107', padding: '.25rem .5rem', borderRadius: '.25rem', fontWeight: 'bold' }}>
                      Book
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <style>{`
        .container {
          max-width: 1140px;
          margin: 0 auto;
          padding: 1.5rem;
        }
        .row {
          display: flex;
          flex-wrap: wrap;
          margin: -0.75rem;
        }
        .col-md-2, .col-md-3, .col-sm-6 {
          flex-grow: 1;
          padding: 0.75rem;
        }
        @media (min-width: 576px) {
          .col-sm-6 {
            flex-basis: 50%;
            max-width: 50%;
          }
        }
        @media (min-width: 768px) {
          .col-md-2 {
            flex-basis: 16.666667%;
            max-width: 16.666667%;
          }
          .col-md-3 {
            flex-basis: 25%;
            max-width: 25%;
          }
          .col-md-3, .col-sm-6 {
            flex-basis: 25%;
            max-width: 25%;
          }
        }
        .btn {
          display: inline-block;
          font-weight: 400;
          text-align: center;
          white-space: nowrap;
          vertical-align: middle;
          user-select: none;
          border: 1px solid transparent;
          padding: .375rem .75rem;
          font-size: 1rem;
          line-height: 1.5;
          border-radius: .25rem;
          transition: color .15s ease-in-out, background-color .15s ease-in-out, border-color .15s ease-in-out, box-shadow .15s ease-in-out;
        }
        .btn-group {
          display: flex;
          gap: 0.5rem;
        }
        .form-label {
          margin-bottom: 0.5rem;
        }
        .form-control, .form-select {
          display: block;
          width: 100%;
          padding: .375rem .75rem;
          font-size: 1rem;
          line-height: 1.5;
          color: #212529;
          background-color: #fff;
          background-clip: padding-box;
          border: 1px solid #ced4da;
          appearance: none;
        }
        .spinner-border {
          display: inline-block;
          width: 2rem;
          height: 2rem;
          vertical-align: -0.125em;
          border: 0.25em solid currentColor;
          border-right-color: transparent;
          border-radius: 50%;
          animation: .75s linear infinite spinner-border;
        }
        @keyframes spinner-border {
          100% {
            transform: rotate(360deg);
          }
        }
        .alert {
          position: relative;
          padding: 1rem 1rem;
          margin-bottom: 1rem;
          border: 1px solid transparent;
          border-radius: .25rem;
        }
        .alert-info {
          color: #055160;
          background-color: #cff4fc;
          border-color: #b6effb;
        }
        .alert-danger {
          color: #842029;
          background-color: #f8d7da;
          border-color: #f5c2c7;
        }
      `}</style>
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
          <p style={{fontWeight: '100' }}>
            Experience the pinnacle of luxury air travel.
          </p>
        </div>
      </div>
      {/* ooooooooooooooo */}
      <div
        className="container p-4"
        style={{
          /* backgroundColor: 'var(--antiflash-white)', */
          boxShadow: '0 4px 8px rgba(0,0,0,0.9)',
        }}
      >
        <form className="row g-3 align-items-end" onSubmit={handleSearch}>
          <div className="col-md-2">
            <label className="form-label">Departure</label>
            <select 
              className="form-select" 
              style={{ borderRadius: 0 }}
              name="departure_airport"
              value={formData.departure_airport}
              onChange={handleInputChange}
            >
              <option value = "JUB">Juba International Airport</option>
              <option value = "NBO">Nairobi Jomo Kenyatta</option>
              <option value = "ADD">International Airport of Addis Ababa</option>
              <option value = "LHR">London Heathrow Airport</option>
            </select>
          </div>

          <div className="col-md-2">
            <label className="form-label">Arrival</label>
            <select 
              className="form-select" 
              style={{ borderRadius: 0 }}
              name="arrival_airport"
              value={formData.arrival_airport}
              onChange={handleInputChange}
            >
              <option value = "JUB">Juba International Airport</option>
              <option value = "NBO">Nairobi Jomo Kenyatta</option>
              <option value = "ADD">International Airport of Addis Ababa</option>
              <option value = "LHR">London Heathrow Airport</option>
            </select>
          </div>

          <div className="col-md-3">
            <label className="form-label">Departure Date</label>
            <input
              type="date"
              className="form-control"
              style={{ borderRadius: 0 }}
              name="departure_date"
              value={formData.departure_date}
              onChange={handleInputChange}
            />
          </div>

          <div className="col-md-3">
            <label className="form-label">Return Date</label>
            <input
              type="date"
              className="form-control"
              style={{ borderRadius: 0 }}
              name="return_date"
              value={formData.return_date}
              onChange={handleInputChange}
            />
          </div>

          <div className="col-md-2">
            <label className="form-label">Passengers</label>
            <input
              type="number"
              min="1"
              className="form-control"
              style={{ borderRadius: 0 }}
              name="passengers"
              value={formData.passengers}
              onChange={handleInputChange}
            />
          </div>

          <div className="col-md-2">
            <label className="form-label">Travel Class</label>
            <select 
              className="form-select" 
              style={{ borderRadius: 0 }}
              name="flight_class"
              value={formData.flight_class}
              onChange={handleInputChange}
            >
              <option value = "first">First Class</option>
              <option value = "business">Business</option>
              <option value = "economy">Economy</option>
              <option value = "premium_economy">Premium Economy</option>
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
              className={`btn fw-bold ${selectedDestination === "International" ? "active" : ""}`}
              style={{
                backgroundColor:
                  selectedDestination === 'International'
                    ? 'var(--prussian-blue)'
                    : 'transparent',
                color:
                  selectedDestination === 'International'
                    ? 'var(--antiflash-white)'
                    : 'var(--prussian-blue)',
                borderRadius: 0,
              }}
              onClick={() => handleDestinationChange('International')}
            >
              International
            </button>
            <button
              className={`btn border-0 fw-bold ${selectedDestination === 'Domestic' ? 'active' : ''}`}
              style={{
                backgroundColor:
                  selectedDestination === 'Domestic'
                    ? 'var(--prussian-blue)'
                    : 'transparent',
                color:
                  selectedDestination === 'Domestic'
                    ? 'var(--antiflash-white)'
                    : 'var(--prussian-blue)',
                borderRadius: 0,
              }}
              onClick={() => handleDestinationChange('Domestic')}
            >
              Domestic
            </button>
          </div>
        </div>

        <div className="row g-4">
          {selectedDestination === 'International'
            ? destinations.international.map((dest, idx) => (
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
            ))
            : destinations.domestic.map((dest, idx) => (
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

      {/* Flight Search Results Modal */}
      <Modal show={showModal} onClose={closeModal}>
        {isLoading ? (
          <div style={{ textAlign: 'center', margin: '3rem 0' }}>
            <div style={{ display: 'inline-block', width: '2rem', height: '2rem', border: '0.25em solid currentColor', borderRightColor: 'transparent', borderRadius: '50%', animation: 'spinner-border .75s linear infinite' }}>
              <span style={{ position: 'absolute', width: '1px', height: '1px', padding: 0, margin: -1, overflow: 'hidden', clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap', border: 0 }}>Loading...</span>
            </div>
            <p style={{ marginTop: '0.5rem' }}>Searching for flights...</p>
          </div>
        ) : error ? (
          <div style={{ position: 'relative', padding: '1rem', marginBottom: '1rem', border: '1px solid transparent', borderRadius: '0.25rem', color: '#842029', backgroundColor: '#f8d7da', borderColor: '#f5c2c7', textAlign: 'center' }}>{error}</div>
        ) : searchResults.length > 0 ? (
          <div>
            <p style={{ textAlign: 'center', color: '#6c757d', fontSize: '0.875em' }}>
              Showing {searchResults.length} available flights.
            </p>
            {searchResults.map(flight => (
              <FlightCard key={flight.id} flight={flight} />
            ))}
          </div>
        ) : (
          <div style={{ position: 'relative', padding: '1rem', marginBottom: '1rem', border: '1px solid transparent', borderRadius: '0.25rem', color: '#055160', backgroundColor: '#cff4fc', borderColor: '#b6effb', textAlign: 'center' }}>
            No flights found matching your criteria.
          </div>
        )}
      </Modal>
    </>
  );
};

export default BookingPage;
