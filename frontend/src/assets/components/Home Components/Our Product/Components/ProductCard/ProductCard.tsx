import React from "react";
import "./ProductCard.css";
import type { Product } from"../../../../sharedComponents/interfaces/Home";

interface Props {
  card: Product;
}

const ProductCard: React.FC<Props> = ({ card }) => {
  return (
    <div className="hs-product-card flex-col">
      <div>
        <div className='bg-icon hs-outer-circle flex-center'>
          <div className='bg-icon hs-inner-circle flex-center hs-glow-border hs-op-card-icon'>
            <img src={card.icon} alt={card.title} />
          </div>
        </div>
      </div>
      <div className="hs-product-info">
        <h3>{card.title}</h3>
        <p>{card.description}</p>
      </div>
    </div>
  );
};

export default ProductCard;