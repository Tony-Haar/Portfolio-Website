import React from 'react';
import { FaPlane, FaFlask, FaBriefcase, FaGrinTears, FaDollarSign } from 'react-icons/fa';
import { assets } from '../assets/assets';
const ImperialGroup = () => {
  return (
    <div className="container mt-5">
      <nav aria-label="breadcrumb" style={{ color: 'var(--prussian-blue)' }}>
        <ol className="breadcrumb bg-transparent px-0" >
          <li className="breadcrumb-item"><a href="#">Home</a></li>
          <li className="breadcrumb-item"><a href="#">Ventures</a></li>
          <li className="breadcrumb-item active" aria-current="page" >Imperial Group Ltd</li>
        </ol>
      </nav>

      <div className="d-flex flex-column justify-content-between mb-3">
        <div>
          <img src={assets.ImperialGroupLogo} alt="Imperial Logo" style={{ height: '80px', borderRadius: '8px', padding: '10px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.9)' }} className="mb-2" />
          <h2 className="fw-bold">Imperial Group Ltd</h2>
          <p className="text-muted">A visionary leader in aviation and luxury services.</p>
        </div>
        <div>
          <button className="btn btn-warning me-2">Request Consultation</button>
          <button className="btn btn-outline-secondary">Download Brochure</button>
        </div>
      </div>

      <div className="row align-items-start">
        <div className="col-md-6 mb-4">
          <img
            src={assets.Visual1} 
            alt="Meeting"
            className="img-fluid rounded"
          />
        </div>
        <div className="col-md-6">
          <h4 className="fw-bold" style={{ color: 'var(--prussian-blue)' }}>Pioneering the Future of Luxury Travel</h4>
          <p>
            Founded by Eng. Mosety Kat, Imperial Group Ltd is built on a foundation of precision, innovation,
            and an unwavering commitment to excellence. We specialize in providing bespoke aviation solutions
            and curating unparalleled luxury experiences for a discerning global clientele.
          </p>
          <p>
            Our mission is to redefine the boundaries of what’s possible, ensuring every journey and interaction
            is seamless, secure, and unforgettable.
          </p>

          <ul className="list-inline mb-3 d-flex flex-row gap-4">
            <li className="list-inline-item d-flex flex-column" style={{ color: 'var( --satin-sheen-gold)' }}><strong>2015</strong> <small className="text-dark">Founded</small></li>
            <li className="list-inline-item d-flex flex-column" style={{ color: 'var( --satin-sheen-gold)' }}><strong>South Sudan, Juba</strong> <small className="text-dark">Headquarters</small></li>
            <li className="list-inline-item d-flex flex-column" style={{ color: 'var( --satin-sheen-gold)' }}><strong>Aviation & Luxury</strong> <small className="text-dark">Specialties</small></li>
          </ul>

          <h6 className="fw-bold mt-4">Our Journey</h6>
          <ul className="list-unstyled">
            <li>
              <strong>🟡 Acquisition of Ex-Momentum Ltd</strong><br />
              <small className="text-muted">Expanding our technological edge.</small>
            </li>
            <li className="mt-2">
              <strong>🟡 Launch of Imperial Luxury Motors</strong><br />
              <small className="text-muted">Bringing our standard of excellence to the ground.</small>
            </li>
            <li className="mt-2">
              <strong>🟡 Establishment of Capitol Lounge</strong><br />
              <small className="text-muted">Creating an exclusive global network of private lounges.</small>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ImperialGroup;
