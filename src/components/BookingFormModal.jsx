import React, { useState } from 'react';



const Modal = ({ show, onClose, children, title }) => {
    if (!show) {
        return null;
    }
    return (
        <div className="modal-overlay">
            <div className="modal-content-custom">
                <div className="modal-header-custom">
                    <h5 className="modal-title">{title}</h5>
                    <button type="button" className="btn-close" onClick={onClose} style={{ color: 'white' }}>&times;</button>
                </div>
                <div className="modal-body-custom">
                    {children}
                </div>
            </div>
        </div>
    );
};


const BookingFormModal = ({ show, onClose, onBookingSubmit, isLoading, status, selectedFlightId, selectedFlightClass }) => {
    const { message, isError } = status || { message: '', isError: false };
    const [formData, setFormData] = useState({
      fullName: '',
      email: '',
      phoneNumber: '',
      seatNumber: '',
    });

    useState(() => {
      if (show) {
        setFormData({
            fullName: '',
            email: '',
            phoneNumber: '',
            seatNumber: '',
        });
      }
    }, [show, selectedFlightId]);
  
    const handleFormChange = (e) => {
      const { name, value } = e.target;
      const stateKey = name.replace(/_([a-z])/g, (g) => g[1].toUpperCase());
      setFormData(prev => ({ ...prev, [stateKey]: value }));
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      onBookingSubmit(formData);
    };
  
    return (
      <Modal show={show} onClose={onClose} title="Complete Your Booking">
          <div className="bg-white p-6 rounded-lg shadow-xl border-gray-200">
              <form onSubmit={handleSubmit}>
                  {selectedFlightId && selectedFlightClass && (
                      <div className="mb-4 p-4 bg-gray-100 rounded-lg border border-gray-300">
                          <p className="font-semibold text-gray-800">
                            Booking Details:
                          </p>
                          <p className="text-sm text-gray-600">
                            Flight ID: <span className="font-bold">{selectedFlightId}</span>
                          </p>
                          <p className="text-sm text-gray-600">
                            Class: <span className="font-bold capitalize">{selectedFlightClass}</span>
                          </p>
                      </div>
                  )}

                  <div className="mb-4">
                      <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
                      <input 
                          type="text" 
                          name="full_name" 
                          className="form-control" 
                          onChange={handleFormChange} 
                          value={formData.fullName} 
                          required 
                      />
                  </div>
                  <div className="mb-4">
                      <label className="block text-sm font-bold text-gray-700 mb-2">Email</label>
                      <input 
                          type="email" 
                          name="email" 
                          className="form-control" 
                          onChange={handleFormChange} 
                          value={formData.email} 
                          required 
                      />
                  </div>
                  <div className="mb-4">
                      <label className="block text-sm font-bold text-gray-700 mb-2">Phone Number</label>
                      <input 
                          type="tel" 
                          name="phone_number" 
                          className="form-control" 
                          onChange={handleFormChange} 
                          value={formData.phoneNumber} 
                          required 
                      />
                  </div>
                  <div className="mb-4">
                      <label className="block text-sm font-bold text-gray-700 mb-2">Seat Number</label>
                      <input 
                          type="text" 
                          name="seat_number" 
                          className="form-control" 
                          onChange={handleFormChange} 
                          value={formData.seatNumber} 
                          required 
                      />
                  </div>
  
                  <button
                      type="submit"
                      className="btn-gold w-full mt-4 py-3 text-lg"
                      disabled={isLoading}
                  >
                      {isLoading ? 'Booking...' : 'Confirm and Book'}
                  </button>
                  
                  {message && (
                      <div className={`mt-4 alert ${isError ? 'alert-danger' : 'alert-success'} text-center`}>
                          {message}
                      </div>
                  )}
              </form>
          </div>
      </Modal>
    );
};

export default BookingFormModal;
export { Modal };