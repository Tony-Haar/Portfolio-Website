import React from 'react';
import { Link } from 'react-router-dom';
import { assets } from '../assets/assets';

const ProfilePage = () => {
  const bgStyle = {
    // minHeight: '100vh',
    height: '100%',
    width: '100%',
    backgroundImage: `url('/src/assets/placeholder-portfolio-owner.png')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
  };
  return (
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
        className="d-flex align-items-center p-3 "
        style={{ position: 'absolute', top: 0, left: 0, zIndex: 2 }}
      >
        <img
          src={assets.Logo}
          alt="Profile"
          style={{ width: 60, height: 80, marginRight: 8 }}
        />
        <span
          style={{
            fontWeight: 'bold',
            fontSize: '1.2rem',
            color: 'var(--satin-sheen-gold)',
            /* textShadow: '1px 1px 4px #000', */
          }}
        >
          Mosety
        </span>
      </div>
      <div
        className="d-flex flex-column justify-content-center align-items-center text-center w-100 h-100"
        style={{
          minHeight: '100vh',
          zIndex: 2,
          paddingTop: '15vh',
          paddingBottom: '5vh',
          color: 'var(--antiflash-white)',
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
          Eng. Mosety Kat Monyjok
        </h1>
        <h4
          style={{
            color: 'var(--antiflash-white)',
            textShadow: '1px 1px 4px #000',
            maxWidth: 600,
            fontWeight: 200,
          }}
        >
          Juba International Airport Director | Founder & C.E.O Imperial Group
          Ltd | Ex- Momentum Ltd | Imperial Luxury Motors | Capitol Lounge
        </h4>
        <p
          style={{
            color: 'var(--antiflash-white)',
            textShadow: '1px 1px 4px #000',
            maxWidth: 600,
            fontWeight: 100,
            marginBottom: 40,
          }}
        >
          My vision is to redefine the boundaries of aviation and engineering,
          creating solutions that are not only innovative but also sustainable
          and impactful.
        </p>

        <button
          className="btn d-flex"
          style={{
            backgroundColor: 'var(--satin-sheen-gold)',
            borderRadius: 0,
          }}
        >
          <Link
            className="text-decoration-none fw-semibold"
            style={{ color: 'var(--black)' }}
            to="/home"
          >
            Explore my world
          </Link>
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
