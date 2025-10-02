import React, { useState } from 'react';

import { ChevronLeft, ChevronRight } from "lucide-react";
import emailjs from '@emailjs/browser';

import NavBar from '../components/Navbar';
import Footer from '../components/Footer';



const BookConsultationPage = () => {
  const consultationTypes = [
    'General Inquiry',
    'Technical Support',
    'Aviation Investment Advisory',
    'Making business with us',
    'conferences and events',
    'Other',
  ];

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    consultation_type: 'General Inquiry',
    date: '',
    time: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };  

  const sendEmailJS = async (data) => {
    if (!emailjs) {
        console.error('EmailJS library not loaded.');
        return false;
    }

    const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID
    const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_2_ID;
    const USER_ID = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    const ownerParams = {
        name: data.name,
        to_name: 'Mosety Business',
        to_email: 'lemimkouadio@gmail.com',
        consultation_type: data.consultation_type,
        date: data.date,
        time: data.time,
        message: `New consultation booked by ${data.name}. 
        
        Details: 
        ${data.message || 'No specific message.'}`,
    };

    try {
        await emailjs.send(SERVICE_ID, TEMPLATE_ID, ownerParams, USER_ID);
        return true;
    } catch (error) {
        console.error('EmailJS Failed to send email:', error);
        return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage('');
    setErrorMessage('');

    // 1. POST data to Django Backend
    try {
      const apiEndpoint = 'http://127.0.0.1:8000/api/consultations/';
      const response = await fetch(apiEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
      });

      if (response.status !== 201) {
          const errorData = await response.json();
          console.error('Django API Error:', errorData);
          setErrorMessage('Failed to book consultation. Please check your form data or server logs.');
          setLoading(false);
          return; // Stop if API booking failed
      }

      // 2. Send Notifications via EmailJS
      const emailSuccess = await sendEmailJS(formData);

      // 3. Success Feedback and Reset
      if (emailSuccess) {
          setSuccessMessage('Consultation booked and confirmation email sent successfully!');
      } else {
          setSuccessMessage('Consultation booked successfully, but failed to send confirmation emails.');
      }

      setFormData({
          name: '',
          email: '',
          consultation_type: 'General Inquiry',
          date: '',
          time: '',
          message: '',
      });
      setSelectedDate(null);

    } catch (error) {
        console.error('Network or General Error:', error);
        setErrorMessage('A general error occurred. Check if your Django server is running and accessible.');
    } finally {
        setLoading(false);
    }
  };

  /* const handleSubmit = (e) => {
    e.preventDefault();
    alert(JSON.stringify(formData, null, 2));
  }; */

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
                name="consultation_type"
                value={formData.consultation_type}
                onChange={handleChange}
              >
                {consultationTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
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
                {daysOfWeek.map((day, index) => (
                  <div key={index} className="text-center fw-bold">{day}</div>
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
                disabled={loading || !formData.date || !formData.time}
              >
                {loading ? 'Processing...' : 'Book'}
              </button>
            </div>
          </form>
          {successMessage && <div className="mt-3 alert alert-success">{successMessage}</div>}
          {errorMessage && <div className="mt-3 alert alert-danger">{errorMessage}</div>}

        </div>
      </div>
      <Footer />
    </>
  );
};

export default BookConsultationPage;
