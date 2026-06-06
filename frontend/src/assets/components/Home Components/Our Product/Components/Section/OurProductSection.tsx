import React, { useEffect, useState } from "react";
// نستورد البيانات والواجهات من ملف واحد
import { 
  OurProductsHeaderData, 
  OurProductsData, 
 type Product
} from "../../../../sharedComponents/interfaces/Home"; 

import './OurProductSection.css';
import ProductCard from "../ProductCard/ProductCard";
import OurProductHeader from "../Header/OurProductHeader";

const OurProductSection: React.FC = () => {
  const storageKey = "tableData-1-0";
  const [category, setCategory] = useState<'individual' | 'businesses'>('individual');
  
  const [products] = useState<Product[]>(() => {
    const savedData = localStorage.getItem(storageKey);
    return savedData ? JSON.parse(savedData) : OurProductsData;
  });

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(products));
  }, [products]);

  const filteredProducts = products.filter(product => product.category === category);

    return (
        <section className="hs-op-section hs-section-margin">
        <OurProductHeader
            Headerdata={OurProductsHeaderData}
            activeCategory={category}
            setCategory={setCategory}
        />
        <div className="hs-products-container hs-flex-sm-col">
            {filteredProducts.map((product) => (
            <ProductCard key={product.id} card={product} />
            ))}
        </div>
        </section>
    );
};

export default OurProductSection;