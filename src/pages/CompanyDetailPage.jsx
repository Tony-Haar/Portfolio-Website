import React from 'react'
import ImperialGroup from '../components/ImperialGroup';
import VisualShowcase from '../components/VisualShowcase';
import Offers from '../components/Offers';
import Team from '../components/Team';
import NavBar from '../components/Navbar';
import Footer from '../components/Footer';

const CompanyDetailPage = () => {
  return (
    <div>
        <NavBar />
        <ImperialGroup />
        <Offers />
        <VisualShowcase />
        <Team />
        <Footer />
    </div>
  )
}

export default CompanyDetailPage