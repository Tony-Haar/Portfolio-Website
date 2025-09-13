import React from 'react'
import { useParams } from 'react-router-dom'; 

import CompanyDetailHeader from '../components/CompanyDetailHeader';
import VisualShowcase from '../components/VisualShowcase';
import Offers from '../components/Offers';
import Team from '../components/Team';
import NavBar from '../components/Navbar';
import Footer from '../components/Footer';
import {companydetails} from '../assets/assets';


const CompanyDetailPage = () => {

  const { id } = useParams();

  const company = companydetails.find(c => c.id === parseInt(id));

  const companyHeaderData = {
    id: company.id,
    name: company.name,
    logo: company.logo,
    slogan: company.slogan,
    descriptionHeading: company.descriptionHeading,
    description: company.description,
    img: company.img,
    founded: company.founded,
    headquarters: company.headquarters,
    specialities: company.specialties,
    journey: company.journey,
  }

  const offersData = company.offerings;
  const visualShowcaseData = company.visual;
  const teamData = company.leadership;

  return (
    <div>
        <NavBar />
        <CompanyDetailHeader data = {companyHeaderData}/>
        <Offers data = {offersData}/>
        <VisualShowcase data = {visualShowcaseData}/>
        <Team data = {teamData} companyname = {company.name} companyemail = {company.email}/>
        <Footer />
    </div>
  )
}

export default CompanyDetailPage