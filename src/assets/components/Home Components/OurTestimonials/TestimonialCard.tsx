import React from 'react';
import {type TestimonialCardProps } from '../../sharedComponents/interfaces/Home';

const TestimonialCard: React.FC<TestimonialCardProps> = ({ image, clientOpinen, clientName }) => {
    return (
        <div className="card">
            <div className="img-container">
                <img src={image} alt="cardicon" className="image2" />
            </div>
            <div className="paragraph">
                <p>{clientOpinen}</p>
            </div>
            <div className="name">
                <span>{clientName}</span>
            </div>
        </div>
    );
};
export default TestimonialCard;