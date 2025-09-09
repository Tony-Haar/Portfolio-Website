import React from 'react';
import { Link } from 'react-router-dom';

import ProfilePage from './ProfilePage';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import {
  FaPlane,
  FaFlask,
  FaBriefcase,
  FaGrinTears,
  FaDollarSign,
} from 'react-icons/fa';

import '../colors.css';
import { assets, myJourney, expertise } from '../assets/assets';

const icons = {
  FaPlane: FaPlane,
  FaGrinTears: FaGrinTears,
  FaDollarSign: FaDollarSign,
  FaFlask: FaFlask,
  FaBriefcase: FaBriefcase,
};

const HomePage = () => {
  const bgStyle = {
    minHeight: '100vh',
    width: '100%',
    backgroundImage: `url('/src/assets/hero.jpg')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
  };
  return (
    <div>
      <Navbar />
      <div style={bgStyle}>
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(0,0,0,0.4)',
            zIndex: 1,
          }}
        ></div>
        <div
          className="d-flex flex-column justify-content-center align-items-center text-center w-100 h-100"
          style={{
            minHeight: '100vh',
            zIndex: 2,
            paddingTop: '15vh',
            paddingBottom: '5vh',
          }}
        >
          <h1
            style={{
              color: 'var(--antiflash-white)',
              textShadow: '2px 2px 8px #000',
              fontWeight: 'bold',
              fontSize: '2.5rem',
            }}
          >
            Crafting the future of Aviation
          </h1>
          <p
            style={{
              color: 'var(--antiflash-white)',
              textShadow: '1px 1px 4px #000',
              maxWidth: 600,
            }}
          >
            With a legacy of innovation and a vision for tomorrow, Gustave le
            Clair transforms aviation challenges into opportunities. His
            expertise shapes the industry's trajectory.{' '}
          </p>

          <button
            className="btn d-flex"
            style={{
              backgroundColor: 'var(--satin-sheen-gold)',
              color: 'var(--antiflash-white)',
              borderRadius: 0,
            }}
          >
            <Link
              className="text-decoration-none fw-semibold"
              style={{ color: 'var(--antiflash-white)' }}
              to="/companies"
            >
              Explore Companies
            </Link>
          </button>
        </div>
      </div>
      {/* A Journey Of Excellence */}
      <div
        className="text-center my-5"
        style={{ color: 'var(--prussian-blue)' }}
      >
        <h2 className="fw-bold">A Journey Of Excellence</h2>
        <div
          className="mx-auto mt-2"
          style={{
            width: '80px',
            height: '3px',
            backgroundColor: 'var(--satin-sheen-gold)',
          }}
        ></div>
      </div>

      <div className="row mb-5 shadow-lg bg-body rounded d-flex flex-wrap justify-content-center align-items-center p-4 d-flex flex-column">
        {Object.entries(myJourney).map(([category, items]) =>
          items.map((item) => {
            const IconComponent = icons[item.icon];
            return (
              <div
                key={`${category}-${item.id}`}
                className="col-12 col-md-4 mb-4 d-flex flex-row gap-3 align-items-start"
              >
                <div
                  className="flex-shrink-0"
                  style={{
                    backgroundColor: 'var(--prussian-blue)',
                    height: '50px',
                    width: '50px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {IconComponent && (
                    <IconComponent
                      size={24}
                      style={{ color: 'var(--satin-sheen-gold)' }}
                    />
                  )}
                </div>
                <div>
                  <h5
                    className="fw-bold"
                    style={{ color: 'var(--prussian-blue)' }}
                  >
                    {item.title}
                  </h5>
                  <p
                    className="mb-1"
                    style={{ color: 'var(--satin-sheen-gold)' }}
                  >
                    {item.duration}
                  </p>
                  <p className="mb-0">{item.description}</p>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Core Expertise */}
      <div
        className="text-center my-5"
        style={{ color: 'var(--prussian-blue)' }}
      >
        <h2 className="fw-bold">Core Expertise</h2>
        <div
          className="mx-auto mt-2"
          style={{
            width: '80px',
            height: '3px',
            backgroundColor: 'var(--satin-sheen-gold)',
          }}
        ></div>
      </div>

      <div className="row g-4 mx-5">
        {expertise.map((item) => {
          const IconComponent = icons[item.icon];
          return (
            <div key={item.id} className="col-12 col-md-4">
              <div className="card shadow h-100 border-0 d-flex align-items-center text-center p-4 mx-2">
                <div
                  className="mb-3"
                  style={{
                    backgroundColor: 'var(--prussian-blue)',
                    height: '60px',
                    width: '60px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {IconComponent && (
                    <IconComponent
                      size={26}
                      style={{ color: 'var(--satin-sheen-gold)' }}
                    />
                  )}
                </div>
                <h5
                  className="fw-bold"
                  style={{ color: 'var(--prussian-blue)' }}
                >
                  {item.title}
                </h5>
                <p className="mb-0">{item.description}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* oooooooooooooooooooooooooooooo */}
      <div
        className="d-flex flex-column justify-content-center align-items-center text-center"
        style={{
          minHeight: '100vh',
          zIndex: 2,
          paddingTop: '15vh',
          paddingBottom: '5vh',
        }}
      >
        <h3 style={{ color: 'var(--prussian-blue)' }}>
          Ready to Elevate Your Aviation Venture?{' '}
        </h3>
        <p style={{ color: 'var(--black)' }}>
          Let's connect to discuss how my expertise can help you navigate the
          complexities of the aviation industry and achieve your strategic
          goals.
        </p>
        <button
          className="btn d-flex"
          style={{
            backgroundColor: 'var(--satin-sheen-gold)',
            color: 'var(--antiflash-white)',
            borderRadius: 0,
          }}
        >
          <Link
            className="text-decoration-none fw-semibold"
            style={{ color: 'var(--antiflash-white)' }}
            to="/consultation"
          >
            Book a Consultation
          </Link>
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
