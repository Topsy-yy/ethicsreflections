import React from 'react';

const PlanetCard = ({ planet, position }) => {
  const handleExplore = () => {
    alert(`Exploring ${planet.name}...`);
  };

  return (
    <div className={`card ${position}`}>
      <div className="planet-visual">
        <div 
          className="planet-sphere" 
          style={{ 
            background: `radial-gradient(circle at 30% 30%, ${planet.color}aa, ${planet.color}22)` 
          }}
        >
          <span className="planet-icon-large">{planet.icon}</span>
        </div>
      </div>
      <h2>{planet.name}</h2>
      <p className="planet-description">{planet.text}</p>
      <p className="planet-details">{planet.description}</p>
      <button onClick={handleExplore}>EXPLORE</button>
    </div>
  );
};

export default PlanetCard;
