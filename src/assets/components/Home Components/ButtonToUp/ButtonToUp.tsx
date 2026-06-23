import React, { useState, useEffect } from 'react';
import './ButtonToUp.css';

import arrowUpIcon from '../../../images/homeImages/ArrowUpWarm.svg';

const ButtonToUp: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const scrollToTop = (): void => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const toggleVisibility = (): void => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <div className="button-to-up">
      <button
        onClick={scrollToTop}
        className={isVisible ? 'visible' : ''}
        aria-label="Scroll to top"
      >
        <img 
          src={arrowUpIcon} // استخدام المتغير المستورد هنا
          alt="Up Arrow" 
          className="UpArrow" 
        />
      </button>
    </div>
  );
};

export default ButtonToUp;