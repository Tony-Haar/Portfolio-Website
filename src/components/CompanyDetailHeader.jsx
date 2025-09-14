import React from 'react';
import { FaPlane, FaFlask, FaBriefcase, FaGrinTears, FaDollarSign } from 'react-icons/fa';
import { assets } from '../assets/assets';



const CompanyDetailHeader = ({data}) => {
  const journey = data.journey;
  console.log(data);
  return (
    <div className="container mt-5">
      <nav aria-label="breadcrumb" style={{ color: 'var(--prussian-blue)' }}>
        <ol className="breadcrumb bg-transparent px-0" >
          <li className="breadcrumb-item"><a href="#">Home</a></li>
          <li className="breadcrumb-item"><a href="#">Ventures</a></li>
          <li className="breadcrumb-item active" aria-current="page" >{data.name}</li>
        </ol>
      </nav>

      <div className="d-flex flex-column justify-content-between mb-3">
        <div>
          <img src={data.logo} alt="Imperial Logo" style={{ height: '80px', borderRadius: '8px', padding: '10px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.9)' }} className="mb-2" />
          <h2 className="fw-bold">{data.name}</h2>
          <p className="text-muted">{data.slogan}</p>
        </div>
        <div>
          <button className="btn btn-warning me-2">Request Consultation</button>
          <button className="btn btn-outline-secondary">Download Brochure</button>
        </div>
      </div>

      <div className="row align-items-start">
        <div className="col-md-6 mb-4">
          <img
            src={data.img} 
            alt="Meeting"
            className="img-fluid rounded"
          />
        </div>
        <div className="col-md-6">
          <h4 className="fw-bold" style={{ color: 'var(--prussian-blue)' }}>{data.descriptionHeading}</h4>
          <p>
            {data.description}
          </p>

          <ul className="list-inline mb-3 d-flex flex-row gap-4">
            <li className="list-inline-item d-flex flex-column" style={{ color: 'var( --satin-sheen-gold)' }}><strong>{data.founded}</strong> <small className="text-dark">Founded</small></li>
            <li className="list-inline-item d-flex flex-column" style={{ color: 'var( --satin-sheen-gold)' }}><strong>{data.headquarters}</strong> <small className="text-dark">Headquarters</small></li>
            <li className="list-inline-item d-flex flex-column" style={{ color: 'var( --satin-sheen-gold)' }}><strong>{data.specialities}</strong> <small className="text-dark">Specialties</small></li>
          </ul>

          <h6 className="fw-bold mt-4">Our Journey</h6>
          <ul className="list-unstyled">
            {journey.map((item, index) => (
              <li key={index} className="mb-2">
                <strong>🟡 {item.event}</strong><br />
                <small className="text-muted">{item.detail}</small>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CompanyDetailHeader;
