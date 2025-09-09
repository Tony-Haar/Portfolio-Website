import React from 'react'
import { leadership, caseStudy } from '../assets/assets';

const Team = () => {
  return (
      <div className="container my-5">
      <div className="text-center mb-4">
        <h3 className="fw-bold" style={{ color: 'var(--prussian-blue)' }}>Our Leadership</h3>
        <p className="text-black">
          The visionary team steering Imperial Group to new heights.
        </p>
      </div>

      <div className="row text-center mb-5 d-flex justify-content-center align-items-center gap-2">
        {leadership.map((member, index) => (
          <div key={index} className="col-md-4 mb-4">
            <img
              src={member.img}
              alt={member.name}
              className="img-fluid rounded shadow-sm mb-3"
              style={{ height: "250px", objectFit: "cover" }}
            />
            <h6 className="fw-bold text-dark">{member.name}</h6>
            <p className="text-warning small fw-bold">{member.title}</p>
            <p className="text-muted small">{member.desc}</p>
          </div>
        ))}
      </div>

      <div className="row align-items-center bg-light rounded shadow-sm overflow-hidden">
        <div className="col-md-6 p-0">
          <img
            src={caseStudy.img}
            alt="Case Study"
            className="img-fluid w-100 h-100"
            style={{ objectFit: "cover" }}
          />
        </div>

        <div className="col-md-6 p-4">
          <p className="text-uppercase text-warning small fw-bold">
            {caseStudy.tag}
          </p>
          <h5 className="fw-bold text-primary mb-3">
            {caseStudy.quote}
          </h5>
          <p className="text-muted">– {caseStudy.author}</p>
          <a href={caseStudy.link} className="fw-bold text-dark">
            Read Full Case Study
          </a>
        </div>
      </div>

      {/* OOOOOOOOO */}
       <div className="container text-center my-5 py-5">
      <h5 className="fw-bold mb-3" style={{ color: 'var(--prussian-blue)' }}>
        Ready to Elevate Your Aviation Venture?
      </h5>
      <p className="text-muted mx-auto" style={{ maxWidth: "600px" }}>
        Connect with our team of experts to explore how Imperial Group can serve
        your needs. We invite you to schedule a private, no-obligation
        consultation at your convenience.
      </p>

      <div className="mb-4">
        <button className="btn btn-warning fw-bold px-4">
          Request Consultation
        </button>
      </div>

      <p className="small text-dark">
        <a href="mailto:contact@imperialgroup.com" className="text-dark text-decoration-none">
          contact@imperialgroup.com
        </a>{" "}
        |{" "}
        <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="text-dark text-decoration-none">
          connect on LinkedIn
        </a>
      </p>
    </div>
    </div>
  )
}

export default Team

