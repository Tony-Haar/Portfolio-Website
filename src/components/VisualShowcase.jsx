import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { showcase } from "../assets/assets"; 


const VisualShowcase = ({data}) => {
  return (
    <div className="container my-5">
      {/* Section Header */}
      <div className="text-center mb-4" style={{ color: 'var(--prussian-blue)' }}>
        <h3 className="fw-bold">Visual Showcase</h3>
        <p className="text-muted">A glimpse into the world of Imperial Group</p>
      </div>

      {/* Showcase Grid */}
      <div className="row g-3">
        {/* Left big image */}
        <div className="col-md-8">
          <img
            src={data.img1}
            alt="Showcase 1"
            className="img-fluid rounded shadow-sm w-100 h-100"
            style={{ objectFit: "cover" }}
          />
        </div>

        {/* Right stacked images */}
        <div className="col-md-4 d-flex flex-column gap-3">
          <img
            src={data.img2}
            alt="Showcase 2"
            className="img-fluid rounded shadow-sm"
            style={{ height: "50%", objectFit: "cover" }}
          />
          <img
            src={data.img3}
            alt="Showcase 3"
            className="img-fluid rounded shadow-sm"
            style={{ height: "50%", objectFit: "cover" }}
          />
        </div>
      </div>
    </div>
  )
}

export default VisualShowcase