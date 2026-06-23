import React, { useState, useEffect } from 'react';
import './OurFeatures.css';
import FeatureCard from './FeatureCard';
import {type Feature,type Category, defaultFeatures } from '../../sharedComponents/interfaces/Home';

const STORAGE_KEY = "tableData-1-1";

const OurFeatures: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category>("Online Banking");

  const [features] = useState<Feature[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : defaultFeatures;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(features));
  }, [features]);

  const categories: Category[] = ["Online Banking", "Financial Tools", "Customer Support"];

  return (
    <section className="mh-features-section">
      <div className="mh-features-header">
        <h1>Our <span>Features</span></h1>
        <p>Experience a host of powerful features at YourBank...</p>
      </div>

      <div className="mh-features-content">
        <aside className="mh-features-sidebar">
          {categories.map(category => (
            <button
              key={category}
              className={`mh-feature-btn ${selectedCategory === category ? "mh-feature-active" : ""}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </aside>

        <div className="mh-features-cards">
          {features
            .filter(feature => feature.category === selectedCategory)
            .map(feature => (
              <FeatureCard
                key={feature.id}
                title={feature.title}
                description={feature.description}
              />
            ))
          }
        </div>
      </div>
    </section>
  );
};

export default OurFeatures;