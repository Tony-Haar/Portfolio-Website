import React from 'react'
import { offers } from '../assets/assets';
import { FaPlane, FaDollarSign, FaCar } from 'react-icons/fa';
const icons = {
    FaPlane: FaPlane,
    FaCar: FaCar,
    FaDollarSign: FaDollarSign
};

const Offers = () => {
    return (
        <>
            <div className="text-center my-5" style={{ color: 'var(--prussian-blue)' }}>
                <h2 className="fw-bold"> Our offerings
                </h2>
                <div
                    className="mx-auto mt-2"
                    style={{
                        width: '80px',
                        height: '3px',
                        backgroundColor: 'var(--satin-sheen-gold)',
                    }}
                ></div>
                <p className="text-muted mt-3"> A portfolio of services designed to meet the highest standards of quality and discretion.
                </p>
            </div>

            <div className="row g-4 mx-5">
                {offers.map((item) => {
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
                                <h5 className="fw-bold" style={{ color: 'var(--prussian-blue)' }}>
                                    {item.title}
                                </h5>
                                <p className="mb-0">{item.description}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    )
}

export default Offers
