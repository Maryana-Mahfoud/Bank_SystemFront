import React, { useState, useEffect } from 'react';
import './FAQs.css';
import { js_data_faqs, type FAQItem } from '../../sharedComponents/interfaces/Home';

import downArrowIcon from '../../../images/homeImages/DownArrow.png';
import upArrowIcon from '../../../images/homeImages/UpArrow.png';

const STORAGE_KEY = "tableData-1-2";

const FAQs: React.FC = () => {
  // حالة البيانات
  const [faqs] = useState<FAQItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : js_data_faqs;
  });

  // حالة التحكم في العرض (مفتوح/مغلق)
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(faqs));
  }, [faqs]);

  // منطق العرض
  const visibleFAQs = isOpen ? faqs : faqs.slice(0, 4);

  return (
    <section className="js_FAQs_section">
      <h1><span>Frequently</span> Asked Questions</h1>
      <p>Still you have any questions? Contact our Team via support@yourbank.com</p>

      <div className="js-faqs-cont">
        {visibleFAQs.map((faq, index) => (
          <div className="js-faqs-card-cont" key={index}>
            <h2 className='js-faqs-card-header'>{faq.question}</h2>
            <p className='js-faqs-card-paragraph'>{faq.answer}</p>
          </div>
        ))}
        
        {/* الظل يظهر فقط في حالة الـ collapse */}
        {!isOpen && <div className="js-black-shadow-cont" />}
      </div>

      {/* زر Load All */}
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)} 
          className="js-faqs-loadall-btn border flex-center"
        >
          Load All FAQs
          <img src={downArrowIcon} alt="arrow down" />
        </button>
      )}

      {/* زر See Less */}
      {isOpen && (
        <button 
          onClick={() => setIsOpen(false)} 
          className="js-faqs-loadall-btn border flex-center"
        >
          See Less FAQs
          <img src={upArrowIcon} alt="arrow up" />
        </button>
      )}
    </section>
  );
};

export default FAQs;