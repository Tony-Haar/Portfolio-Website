import React from 'react';
import {useState} from 'react';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FlightCard from '../components/FlightCard';
import BookingFormModal from '../components/BookingFormModal';
import { Modal } from '../components/BookingFormModal'; 
import { destinations } from '../assets/assets';



const BookingPage = () => {

  // Component for adding custom CSS styles
  const CustomStyles = () => (
    <style>
        {`
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap');
            
            :root {
                --prussian-blue: #002147;
                --satin-sheen-gold: #cc9933;
                --antiflash-white: #f2f2f2;
            }

            body {
                font-family: 'Inter', sans-serif;
                background-color: var(--antiflash-white);
            }

            .bg-prussian-blue { background-color: var(--prussian-blue); }
            .text-satin-sheen-gold { color: var(--satin-sheen-gold); }
            .btn-gold {
                background-color: var(--satin-sheen-gold);
                color: var(--prussian-blue);
                font-weight: 700;
                border: none;
                transition: background-color 0.3s;
                border-radius: 0.25rem;
                padding: 0.75rem 1.5rem;
            }
            .btn-gold:hover { background-color: #a67c2a; }

            .form-control, .form-select {
                border-radius: 0 !important;
            }
            .card { border-radius: 0.25rem; }
            
            .container-fluid-custom { max-width: 1400px; }
            .text-muted { color: #6c757d !important; }

            /* Modal Specific Styles */
            .modal-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.5);
                z-index: 1050;
                display: flex;
                justify-content: center;
                align-items: center;
            }
            .modal-content-custom {
                background-color: white;
                border-radius: 0.5rem;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                width: 90%;
                max-width: 800px;
                max-height: 90vh;
                display: flex;
                flex-direction: column;
            }
            .modal-header-custom {
                background-color: var(--prussian-blue);
                color: white;
                padding: 1rem;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            .modal-body-custom { padding: 1.5rem; overflow-y: auto; flex-grow: 1}

            /* Spinner Styles */
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
                100% { transform: rotate(360deg); }
            }
            
            /* Alert Styles */
            .alert {
                padding: 1rem;
                margin-bottom: 1rem;
                border: 1px solid transparent;
                border-radius: 0.25rem;
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
            .alert-success {
                color: #0f5132;
                background-color: #d1e7dd;
                border-color: #badbcc;
            }
        `}
    </style>
  );

  const [searchResults, setSearchResults] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedBookingDetails, setSelectedBookingDetails] = useState(null);
  const [bookingStatus, setBookingStatus] = useState({
    message: '',
    isError: false,
  });

  const [formData, setFormData] = useState({
    departure_airport: '',
    arrival_airport: '',
    departure_date: '',
    return_date: '',
    passengers: 1,
    flight_class: 'economy',
  });

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
    setBookingStatus({ message: '', isError: false }); ///
  };

  const handleBookingClick = (flight, flightClassName) => {
    setSelectedBookingDetails({
        id: flight.id,
        flightNumber: flight.flight_number,
        flightClass: flightClassName,
    });
    setShowBookingModal(true);
    closeModal();
  };

  const handleBookingSubmit = async (formData) => {
    setBookingStatus({ message: 'Processing your booking...', isError: false });
    setIsLoading(true);

    const bookingPayload = {
        flight: selectedBookingDetails.id, 
        flight_class_name: selectedBookingDetails.flightClass,
        full_name: formData.fullName,
        email: formData.email,
        phone_number: formData.phoneNumber,
        seat_number: formData.seatNumber,
    };

    try {
        const response = await fetch('http://127.0.0.1:8000/api/bookings/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bookingPayload),
        });

        if (response.status !== 201) {
            const errorData = await response.json();
            const errorMessage = Object.values(errorData).flat().join(' ');
            setBookingStatus({ message: `Booking failed: ${errorMessage}`, isError: true });
        } else {
            setBookingStatus({ message: 'Booking successful! Check your email for confirmation.', isError: false });
            setShowBookingModal(false);
        }
    } catch (err) {
        setBookingStatus({ message: 'Network error occurred. Please try again.', isError: true });
    } finally {
        setIsLoading(false);
    }
  };

  const [selectedDestination, setSelectedDestination] = useState('International');
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

  return (
    <>
      <CustomStyles />
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
      <Modal show={showModal} onClose={closeModal} title="Available Flights">
        {isLoading ? (
          <div className="text-center my-12">
            <div className="inline-block w-8 h-8 border-4 border-current border-r-transparent rounded-full animate-spin text-blue-500"></div>
            <p className="mt-2">Searching for flights...</p>
          </div>
        ) : error ? (
          <div className="p-4 rounded-md text-red-700 bg-red-100 text-center">{error}</div>
        ) : searchResults.length > 0 ? (
          <>
            <p className="text-center text-gray-500 text-sm mb-4">Showing {searchResults.length} available flights.</p>
            {searchResults.map(flight => (
              <FlightCard 
                key={flight.id} 
                flight={flight} 
                onBookClick={() => handleBookingClick(flight, formData.flight_class)}
              />
            ))}
          </>
        ) : (
          <div className="p-4 rounded-md text-blue-700 bg-blue-100 text-center">No flights found matching your criteria.</div>
        )}
      </Modal>

      {/* Booking Form Modal */}
      <BookingFormModal 
        show={showBookingModal} 
        onClose={() => setShowBookingModal(false)} 
        selectedFlightId={selectedBookingDetails?.id}
        selectedFlightClass={selectedBookingDetails?.flightClass}
        onBookingSubmit={handleBookingSubmit}
        isLoading={isLoading} 
        status={bookingStatus}
      />
    </>
  );
};

export default BookingPage;
