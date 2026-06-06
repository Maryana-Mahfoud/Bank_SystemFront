import React from "react";
import { Link } from "react-router-dom";
import { homeHeroData } from "../../sharedComponents/interfaces/Home";
import IconText from "../../sharedComponents/Icon Text/IconText";
import "./HomeHero.css";

const HomeHero: React.FC = () => {
  const {
    icon,
    iconText,
    title,
    description,
    buttonText,
    images,
  } = homeHeroData;

  return (
    <section className="ma-hero-container">
      {/* Left side */}
      <div className="ma-hero-left">
        <IconText icon={icon} text={iconText} />

        <h1
          className="ma-hero-title"
          dangerouslySetInnerHTML={{ __html: title }}
        />

        <p className="ma-hero-description">{description}</p>

        <Link to="/signup">
          <button className="ma-hero-btn">
            {buttonText}
          </button>
        </Link>
      </div>

      {/* Right side */}
      <div className="ma-hero-right">
        {images.map((img: string, index: number) => (
          <img
            key={index}
            src={img}
            alt={`hero-${index}`}
            className={`ma-hero-image-${index}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HomeHero;