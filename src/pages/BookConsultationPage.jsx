import React, { useState } from 'react';
import NavBar from '../components/Navbar';
import Footer from '../components/Footer';
import { ChevronLeft, ChevronRight } from "lucide-react";

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

  // Calendar State
  const [currentMonth, setCurrentMonth] = useState(8); // September (0-indexed)
  const [currentYear, setCurrentYear] = useState(2025);
  const [selectedDate, setSelectedDate] = useState(null);

  // Example statuses for specific dates
  const statusMap = {
    "2025-09-02": "black",
    "2025-09-08": "green",
    "2025-09-09": "green",
    "2025-09-10": "red",
    "2025-09-15": "red",
    "2025-09-18": "green",
    "2025-09-19": "green",
    "2025-09-29": "green",
    "2025-09-30": "green",
  };

  const daysOfWeek = ["S", "M", "T", "W", "T", "F", "S"];

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDay = new Date(currentYear, currentMonth, 1).getDay();

  const generateDates = () => {
    const dates = [];
    for (let i = 0; i < firstDay; i++) {
      dates.push(null); // empty slots
    }
    for (let d = 1; d <= daysInMonth; d++) {
      dates.push(d);
    }
    return dates;
  };

  const getStatusClass = (date) => {
    const key = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(date).padStart(2, "0")}`;
    switch (statusMap[key]) {
      case "green":
        return "bg-success text-white";
      case "red":
        return "bg-danger text-white";
      case "black":
        return "bg-dark text-white";
      default:
        return "bg-transparent";
    }
  };

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const handleDateClick = (day) => {
    const chosenDate = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    setSelectedDate(chosenDate);
    setFormData({ ...formData, date: chosenDate });
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
            {/* Name + Email */}
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

            {/* Type */}
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

            {/* Calendar */}
            <div className="mb-3">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <button type="button" className="btn btn-sm btn-outline-light" onClick={handlePrevMonth}>
                  <ChevronLeft />
                </button>
                <h5 className="mb-0">
                  {new Date(currentYear, currentMonth).toLocaleString("default", {
                    month: "long",
                  })}{" "}
                  {currentYear}
                </h5>
                <button type="button" className="btn btn-sm btn-outline-light" onClick={handleNextMonth}>
                  <ChevronRight />
                </button>
              </div>

              {/* Days of Week */}
              <div className="d-grid" style={{ gridTemplateColumns: "repeat(7, 1fr)" }}>
                {daysOfWeek.map((day) => (
                  <div key={day} className="text-center fw-bold">{day}</div>
                ))}
              </div>

              {/* Dates */}
              <div className="d-grid" style={{ gridTemplateColumns: "repeat(7, 1fr)" }}>
                {generateDates().map((day, idx) => (
                  <div
                    key={idx}
                    onClick={() => day && handleDateClick(day)}
                    className={`d-flex justify-content-center align-items-center border rounded m-1`}
                    style={{
                      height: "40px",
                      cursor: day ? "pointer" : "default",
                      ...(day
                        ? selectedDate === `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
                          ? { outline: "2px solid yellow" }
                          : {}
                        : {}),
                    }}
                  >
                    <div className={`w-100 h-100 d-flex justify-content-center align-items-center rounded ${day ? getStatusClass(day) : ""}`}>
                      {day || ""}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Time Selection */}
            <div className="mb-3">
              <label className="form-label">Select Time</label>
              <div className="d-flex flex-wrap gap-2">
                {['10:00 AM', '14:00 PM', '16:30 PM', '22:30 PM'].map((t) => (
                  <button
                    key={t}
                    type="button"
                    className={`btn ${formData.time === t ? 'btn-warning' : 'btn-outline-light'}`}
                    onClick={() => setFormData({ ...formData, time: t })}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Message */}
            <div className="mb-3">
              <textarea
                className="form-control"
                rows="3"
                name="message"
                value={formData.message}
                onChange={handleChange}
              ></textarea>
            </div>

            {/* Submit */}
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
