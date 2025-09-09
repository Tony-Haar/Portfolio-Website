import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Contact = () => {
  return (
    <>
      <Navbar />
      <div className="container my-5">
        <h2
          className="text-center mb-3"
          style={{ color: 'var(--prussian-blue)' }}
        >
          Let’s Connect
        </h2>

        <div
          style={{
            width: '60px',
            height: '3px',
            backgroundColor: 'var(--satin-sheen-gold)',
            margin: '0 auto 20px',
          }}
        ></div>

        <p className="text-center mb-4">
          I welcome inquiries for consulting, partnerships, and speaking
          engagements. <br />
          Please use the form below to get in touch, and I will respond
          promptly.
        </p>

        <Form className="mx-auto" style={{ maxWidth: '700px' }}>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  style={{ border: '2px solid var(--prussian-blue)' }}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  style={{ border: '2px solid var(--prussian-blue)' }}
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Subject</Form.Label>
            <Form.Control
              type="text"
              style={{ border: '2px solid var(--prussian-blue)' }}
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Message</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              style={{ border: '2px solid var(--prussian-blue)' }}
            />
          </Form.Group>

          <div className="text-center">
            <Button
              type="submit"
              style={{
                backgroundColor: 'var(--satin-sheen-gold)',
                border: 'none',
                padding: '10px 30px',
                color: 'white',
                borderRadius: 0,
              }}
            >
              Send Message
            </Button>
          </div>
        </Form>
      </div>
      <div
        className="d-flex flex-column justify-content-center align-items-center text-center"
        style={{
          backgroundColor: 'var(--prussian-blue)',
          padding: '50px 20px',
        }}
      >
        <h3 style={{ color: 'var(--antiflash-white)' }}>
          Want a one to one consultation?{' '}
        </h3>
        <p style={{ color: 'var(--antiflash-white)' }}>
          feel free to fill the consultation form and select the available date
          that suit you the most.{' '}
        </p>
        <button
          className="btn"
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
    </>
  );
};

export default Contact;
