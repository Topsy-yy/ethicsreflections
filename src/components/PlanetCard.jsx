import React from 'react';

const PlanetCard = ({ planet, position }) => {
  const handleReflect = () => {
    // TODO: Open reflection editor
    alert(`Opening reflection editor for ${planet.title}...`);
  };

  return (
    <div className={`card ${position}`}>
      <div className="topic-visual">
        <div 
          className="topic-icon-container" 
          style={{ 
            background: `linear-gradient(135deg, ${planet.color}22, ${planet.color}44)`,
            borderColor: planet.color
          }}
        >
          <span className="topic-icon-large">{planet.icon}</span>
          <div className="glow-effect" style={{ backgroundColor: planet.color }}></div>
        </div>
      </div>
      
      <div className="card-content">
        <div className="unit-label">{planet.name}</div>
        <h2>{planet.title}</h2>
        <p className="topic-description">{planet.text}</p>
        <p className="topic-details">{planet.description}</p>
        
        <div className="action-buttons">
          <button className="reflect-btn" onClick={handleReflect}>
            <span className="btn-icon">✍️</span>
            WRITE REFLECTION
          </button>
          <button className="view-btn">
            <span className="btn-icon">👁️</span>
            VIEW NOTES
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlanetCard;
