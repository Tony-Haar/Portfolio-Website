import React from 'react';
import { useState } from 'react';
import NavBar from '../components/Navbar';
import Footer from '../components/Footer';

const BookConsultationPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    type: 'Aircraft acquisition strategy',
    date: '',
    time: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(JSON.stringify(formData, null, 2));
  };

  const availableDates = {
    green: [8, 18, 19, 29, 30],
    red: [9, 10, 15],
    today: 2,
  };

  return (
    <>
      <NavBar />
      <div
        className="d-flex justify-content-center align-items-center bg-light my-5"
        style={{ minHeight: '80vh' }}
      >
        <div
          className="card shadow-lg p-4"
          style={{ width: '500px', backgroundColor: '#0d3b66', color: 'white' }}
        >
          <h3 className="text-center mb-2">Book a Consultation</h3>
          <p className="text-center small text-light">
            Schedule a private consultation to discuss your aviation needs.
          </p>
          <form onSubmit={handleSubmit}>
            <div className="row mb-3">
              <div className="col">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="mb-3">
              <select
                className="form-select"
                name="type"
                value={formData.type}
                onChange={handleChange}
              >
                <option>Aircraft acquisition strategy</option>
                <option>Flight operations</option>
                <option>Maintenance planning</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">Select a Date</label>
              <div className="d-flex flex-wrap border rounded p-2 bg-dark">
                {[...Array(30)].map((_, i) => {
                  const day = i + 1;
                  let bg = 'btn-secondary';
                  if (availableDates.today === day) bg = 'btn-dark';
                  if (availableDates.green.includes(day)) bg = 'btn-success';
                  if (availableDates.red.includes(day)) bg = 'btn-danger';

                  return (
                    <button
                      key={day}
                      type="button"
                      className={`btn ${bg} m-1`}
                      onClick={() =>
                        setFormData({ ...formData, date: `2025-09-${day}` })
                      }
                    >
                      {day}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">Select Time</label>
              <div className="d-flex flex-wrap gap-2">
                {['10:00 AM', '14:00 PM', '16:30 PM', '22:30 PM'].map((t) => (
                  <button
                    key={t}
                    type="button"
                    className={`btn ${
                      formData.time === t ? 'btn-warning' : 'btn-outline-light'
                    }`}
                    onClick={() => setFormData({ ...formData, time: t })}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-3">
              <textarea
                className="form-control"
                rows="3"
                name="message"
                value={formData.message}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="btn"
                style={{
                  backgroundColor: 'var(--satin-sheen-gold)',
                  color: 'var(--antiflash-white)',
                  borderRadius: 0,
                  padding: '10px 30px',
                }}
              >
                Book
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BookConsultationPage;
