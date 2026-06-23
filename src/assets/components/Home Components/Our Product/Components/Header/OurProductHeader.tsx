import React from "react";
import "./OurProductHeader.css";
import type { HeaderData } from "../../../../sharedComponents/interfaces/Home";

interface Props {
  Headerdata: HeaderData;
  activeCategory: "individual" | "businesses";
  setCategory: (cat: "individual" | "businesses") => void;
}

const OurProductHeader: React.FC<Props> = ({ Headerdata, activeCategory, setCategory }) => {
  return (
    <div className="hs-product-header flex-between">
      <div className="hs-header-text">
        <h1>{Headerdata.titleOne} <span>{Headerdata.titleTwo}</span></h1>
        <p className='hs-description'>{Headerdata.description}</p>
      </div>

      <div className="hs-toggle-container border">
        <button
          className={`hs-btn-text ${activeCategory === 'individual' ? 'hs-active-btn' : 'hs-not-active-btn'}`}
          onClick={() => setCategory('individual')}
        >
          {Headerdata.individualBtn}
        </button>
        <button 
          className={`hs-btn-text ${activeCategory === 'businesses' ? 'hs-active-btn' : 'hs-not-active-btn'} `} 
          onClick={() => setCategory('businesses')}
        >
          {Headerdata.businessesBtn}
        </button>
      </div>
    </div>
  );
};

export default OurProductHeader;