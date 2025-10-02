import React from 'react';



// Helper component for a single flight card
const FlightCard = ({ flight, onBookClick }) => {
    const formatDuration = (isoDuration) => {
      const regex = /PT(?:(\d+)H)?(?:(\d+)M)?/;
      const matches = isoDuration.match(regex);
      if (!matches) return isoDuration;
      const hours = matches[1] ? parseInt(matches[1], 10) : 0;
      const minutes = matches[2] ? parseInt(matches[2], 10) : 0;
      return `${hours}h ${minutes}m`;
    };

    return (
      <div style={{ border: '1px solid #e9ecef', borderRadius: '8px', boxShadow: '0 0.125rem 0.25rem rgba(0,0,0,.075)', margin: '1rem 0' }}>
        <div style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h5 style={{ fontWeight: 'bold', margin: 0, color: '#002147' }}>
              {flight.airline}
            </h5>
            <span style={{ backgroundColor: '#6c757d', color: 'white', padding: '.35em .65em', borderRadius: '.25rem' }}>{flight.flight_number}</span>
          </div>
          <hr />
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
            <div style={{ flex: '1 1 0%' }}>
              <p style={{ fontWeight: 'bold', marginBottom: 0 }}>{new Date(flight.departure_time).toLocaleTimeString()}</p>
              <p style={{ color: '#6c757d', marginBottom: 0, fontSize: '0.875em' }}>{flight.departure_airport_name}</p>
            </div>
            <div style={{ flex: '0 0 auto', width: '25%' }}>
              <span style={{ color: '#6c757d', fontSize: '0.875em' }}>{formatDuration(flight.duration)}</span>
              <div style={{ borderBottom: '1px solid #6c757d', width: '100%', margin: '0.5rem 0' }}></div>
            </div>
            <div style={{ flex: '1 1 0%' }}>
              <p style={{ fontWeight: 'bold', marginBottom: 0 }}>{new Date(flight.arrival_time).toLocaleTimeString()}</p>
              <p style={{ color: '#6c757d', marginBottom: 0, fontSize: '0.875em' }}>{flight.arrival_airport_name}</p>
            </div>
            <div style={{ flex: '0 0 auto', width: '25%', padding: '1rem', textAlign: 'left' }}>
              {flight.class_details.map(detail => (
                <div key={detail.flight_class} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '0.5rem 0' }}>
                  <span style={{ fontWeight: 'bold' }}>{detail.flight_class.charAt(0).toUpperCase() + detail.flight_class.slice(1)}</span>
                  <div>
                    <span style={{ color: '#198754', fontWeight: 'bold', marginRight: '0.5rem' }}>${detail.price}</span>
                    <button 
                        style={{ backgroundColor: '#ffc107', color: '#212529', border: '1px solid #ffc107', padding: '.25rem .5rem', borderRadius: '.25rem', fontWeight: 'bold' }}
                        onClick = {() => onBookClick(flight)}
                    >
                      Book
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
};

export default FlightCard;