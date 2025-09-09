import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Button, Row, Col } from 'react-bootstrap';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import { companies } from '../assets/assets';

const CompaniesPage = () => {
  return (
    <>
      <Navbar />
      <div className="container my-5">
        <h2
          className="text-center mb-3"
          style={{ color: 'var(--prussian-blue)' }}
        >
          Our Companies
        </h2>

        <div
          style={{
            width: '60px',
            height: '3px',
            backgroundColor: 'var(--satin-sheen-gold)',
            margin: '0 auto 20px',
          }}
        ></div>

        <p className="text-center mb-5">
          A portfolio of exceptional companies dedicated to luxury, innovation,
          and unparalleled service in the aviation and automotive sectors.
        </p>

        <Row>
          {companies.map((company) => (
            <Col key={company.id} md={3} className="mb-4">
              <Card className="h-100 shadow-sm text-center">
                <div
                  style={{
                    backgroundColor: 'var(--prussian-blue)',
                    height: '180px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {company.img ? (
                    <img
                      src={company.img}
                      alt={company.name}
                      style={{ maxWidth: '100%', maxHeight: '100%' }}
                    />
                  ) : null}
                </div>

                <Card.Body>
                  <Card.Title
                    className="fw-bold"
                    style={{ fontSize: '1rem', color: 'var(--prussian-blue)' }}
                  >
                    {company.name}
                  </Card.Title>
                  <Card.Text style={{ fontSize: '0.9rem' }}>
                    {company.description}
                  </Card.Text>
                  <Link
                    to={company.link}
                    className="btn"
                    style={{
                      backgroundColor: 'var(--satin-sheen-gold)',
                      color: 'var(--antiflash-white)',
                      borderRadius: 0,
                    }}
                  >
                    Learn More
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
      <Footer />
    </>
  );
};

export default CompaniesPage;
