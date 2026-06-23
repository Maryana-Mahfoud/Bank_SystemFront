import React from 'react';

interface FeatureCardProps {
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description }) => {
  return (
    <div className="mh-feature-card">
      <div className="mh-card-header">
        <h3>{title}</h3>
        <img src="../../../images/homeImages/Arrow.png" className="mh-arrow" alt="" />
      </div>
      <p>{description}</p>
    </div>
  );
};

export default FeatureCard;