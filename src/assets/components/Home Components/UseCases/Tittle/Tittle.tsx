import React from 'react';
import './Tittle.css';
import {type TittleProps } from '../../../sharedComponents/interfaces/Home';

const Tittle: React.FC<TittleProps> = ({ tittle, description, className }) => {
  return (
    <section className={`ak_tittle ${className || ""}`}>
      <h1>{tittle}</h1>
      <p>{description}</p>
    </section>
  );
};

export default Tittle;