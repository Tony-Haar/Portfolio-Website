import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { Form, Button, Row, Col } from 'react-bootstrap';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';



const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ type: '', text: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setStatusMessage({ type: '', text: '' });

    const serviceID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
    const endpoint = 'https://api.emailjs.com/api/v1.0/email/send';

    if (!serviceID || !templateID || !publicKey) {
      console.error('EmailJS credentials not found. Please check your .env file.');
      setStatusMessage({ type: 'error', text: 'Email service is not configured. Please contact support.' });
      setIsLoading(false);
      return;
    }

    const payload = {
      service_id: serviceID,
      template_id: templateID,
      user_id: publicKey,
      template_params: {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
      },
    };

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setStatusMessage({ type: 'success', text: 'Message sent successfully!' });
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatusMessage({ type: 'error', text: 'Failed to send message. Please try again later.' });
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setStatusMessage({ type: 'error', text: 'Failed to send message. Please check your network connection.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container my-5">
        <h2
          className="text-center mb-3"
          style={{ color: 'var(--prussian-blue)' }}
        >
          Let's Connect
        </h2>

        <div
          className="mx-auto mt-2"
          style={{
            width: '80px',
            height: '3px',
            backgroundColor: 'var(--satin-sheen-gold)',
            marginBottom: '16px',
          }}
        ></div>

        <div className="d-flex flex-row justify-content-center align-items-center text-center mb-4">
          <p style = {{width: "350px"}}>I welcome inquiries for consulting, partnerships, and speaking
          engagements. 
          Please use the form below to get in touch, and I will respond
          promptly.</p>
        </div>

        <Form className="mx-auto" style={{ maxWidth: '700px' }} onSubmit = {handleSubmit}>
          {statusMessage.text && (
            <div className={`p-3 mb-4 rounded-md text-sm ${statusMessage.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
              {statusMessage.text}
            </div>
          )}
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name = "name"
                  value = {formData.name}
                  onChange = {handleInputChange}
                  required
                  style={{ border: '2px solid var(--prussian-blue)' }}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name = "email"
                  value = {formData.email}
                  onChange = {handleInputChange}
                  required
                  style={{ border: '2px solid var(--prussian-blue)' }}
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Subject</Form.Label>
            <Form.Control
              type="text"
              name = "subject"
              value = {formData.subject}
              onChange = {handleInputChange}
              required
              style={{ border: '2px solid var(--prussian-blue)' }}
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Message</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              name = "message"
              value = {formData.message}
              onChange = {handleInputChange}
              required
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
              disabled = {isLoading}
            >
              {isLoading ? 'Sending...' : 'Send Message'}
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
        <p style={{ color: 'var(--antiflash-white)', fontWeight: "100"}}>
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
