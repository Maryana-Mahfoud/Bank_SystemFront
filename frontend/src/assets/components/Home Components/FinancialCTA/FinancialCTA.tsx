import React from 'react';
import { Link } from "react-router-dom";
import "./FinancialCTA.css";
import {financialCTAData} from "../../sharedComponents/interfaces/Home";

const FinancialCTA: React.FC = () => {
  // TypeScript يعرف الآن هيكل البيانات بفضل الـ interface السابقة
  const { title, description, buttonText, image } = financialCTAData;

  return (
    <div className="ma-financial-cta">
      {/* عرض الصورة إذا كانت موجودة */}
      {image && (
        <img
          src={image}
          alt="cta"
          className="ma-cta-image"
        />
      )}

      {/* المحتوى النصي */}
      <div className="ma-text-overlay">
        <h1
          className="ma-card-titlee"
          dangerouslySetInnerHTML={{ __html: title }}
        />
        <p className="ma-card-description">
          {description}
        </p>
      </div>

      {/* زر الـ CTA */}
      <Link to="/signup">
        <button className="ma-finical-btn">
          {buttonText}
        </button>
      </Link>
    </div>
  );
};

export default FinancialCTA;