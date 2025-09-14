import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProfilePage from './pages/ProfilePage';
import HomePage from './pages/HomePage';
import CompaniesPage from './pages/CompaniesPage';
import BookConsultationPage from './pages/BookConsultationPage';
import Contact from './pages/Contact';
import SpotlightPage from './pages/spotlightPage';
import CompanyDetailPage from './pages/CompanyDetailPage';
import BookingPage from './pages/BookingPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProfilePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/companies" element={<CompaniesPage />} />
        <Route path="/consultation" element={<BookConsultationPage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/spotlight" element={<SpotlightPage />} />
        <Route path="/companies/:id" element={<CompanyDetailPage />} />
        <Route path="/booking" element={<BookingPage />} />
      </Routes>
    </Router>
  );
}

export default App;
