import React, { useEffect, useRef, useState } from 'react';
import './Slider.css';
import { type SliderProps } from '../../sharedComponents/interfaces/Home';

import leftArrowIcon from '../../../images/homeImages/LeftArrow.png';
import rightArrowIcon from '../../../images/homeImages/RightArrow.png';

const Slider: React.FC<SliderProps> = ({ children, totalItems }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [cardWidth, setCardWidth] = useState<number>(0);
  const [cardGap, setCardGap] = useState<number>(0);
  const [visibleCards, setVisibleCards] = useState<number>(3);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateSliderMetrics = () => {
      const width = window.innerWidth;
      if (width <= 700) setVisibleCards(1);
      else if (width <= 992) setVisibleCards(2);
      else setVisibleCards(3);

      if (containerRef.current && containerRef.current.children.length > 0) {
        const firstCard = containerRef.current.children[0] as HTMLElement;
        setCardWidth(firstCard.offsetWidth);

        const containerStyle = window.getComputedStyle(containerRef.current);
        const gapValue = parseInt(containerStyle.gap) || 0;
        setCardGap(gapValue);
      }
    };

    const timer = setTimeout(updateSliderMetrics, 100);
    window.addEventListener('resize', updateSliderMetrics);

    return () => {
      window.removeEventListener('resize', updateSliderMetrics);
      clearTimeout(timer);
    };
  }, [children]);

  const nextSlide = (): void => {
    if (currentIndex < totalItems - visibleCards) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const prevSlide = (): void => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  return (
    <div className="ma-container-slider">
      <div className="ma-fcontrols">
        <button onClick={prevSlide} disabled={currentIndex === 0} className='ma-leftbtn border'>
          {/* استخدام المتغير المستورد */}
          <img src={leftArrowIcon} alt="prev" />
        </button>
      </div>

      <div className="ma-slider-wrapper-parent">
        <div className="ma-slider-wrapper">
          <div className="fade-left"></div>
          <div className="fade-right"></div>
          <div
            className="slider-container"
            ref={containerRef}
            style={{
              display: 'flex',
              transform: `translateX(-${currentIndex * (cardWidth + cardGap)}px)`,
              transition: 'transform 0.5s ease-in-out'
            }}
          >
            {children}
          </div>
        </div>
      </div>

      <div className='ma-scontrols'>
        <button onClick={nextSlide} disabled={currentIndex >= totalItems - visibleCards} className='ma-rightbtn border'>
          {/* استخدام المتغير المستورد */}
          <img src={rightArrowIcon} alt="next" />
        </button>
      </div>
    </div>
  );
};

export default Slider;