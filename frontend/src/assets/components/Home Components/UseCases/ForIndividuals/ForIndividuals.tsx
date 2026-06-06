import React from 'react';
import CardAndButton from "../CardAndButton/CardAndButton";
import CardContiner from "../CardContiner/CardContiner";

import './ForIndividuals.css';
import {type ForIndividualsProps } from '../../../sharedComponents/interfaces/Home';
import Tittle from '../Tittle/Tittle';

const ForIndividuals: React.FC<ForIndividualsProps> = ({ 
  revers, 
  tittle, 
  description, 
  data, 
  datas 
}) => {
  return (
    <div className={`ak_for_individuals ${revers ? "revers" : ''}`}>
      {/* القسم الأول (يسار أو يمين حسب الـ revers) */}
      <div className="ak_productdata">
        {data && data.map((item, index) => (
          <CardContiner
            key={index}
            icon={item.icon}
            tittle={item.tittle}
          />
        ))}
      </div>

      {/* القسم الثاني */}
      <div className="ak_countinar">
        <Tittle
          tittle={tittle}
          description={description}
          className="tittle_variant"
        />
        <div className="ak_card_grids">
          {datas && datas.map((item, index) => (
            <CardAndButton
              key={index}
              icon={item.icon}
              tittle={item.tittle}
            />
          ))}
        </div>
        <button className="ak_button">Learn More</button>
      </div>
    </div>
  );
};

export default ForIndividuals;