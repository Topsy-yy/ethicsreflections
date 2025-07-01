import React from 'react';

const Sidebar = ({ planets, currentIndex, onPlanetSelect }) => {
  return (
    <div className="sidebar">
      {planets.map((planet, index) => (
        <button
          key={planet.name}
          className={index === currentIndex ? 'active' : ''}
          onClick={() => onPlanetSelect(index)}
        >
          <span 
            className="planet-dot" 
            style={{ backgroundColor: planet.color }}
          ></span>
          <span className="title">{planet.name}</span>
        </button>
      ))}
    </div>
  );
};

export default Sidebar;
