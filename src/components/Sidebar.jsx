import React from 'react';

const Sidebar = ({ planets, currentIndex, onPlanetSelect }) => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h3>Course Units</h3>
        <div className="progress-indicator">
          <span>{currentIndex + 1}</span>/<span>{planets.length}</span>
        </div>
      </div>
      
      {planets.map((topic, index) => (
        <button
          key={topic.name}
          className={`unit-button ${index === currentIndex ? 'active' : ''}`}
          onClick={() => onPlanetSelect(index)}
        >
          <span 
            className="unit-dot" 
            style={{ backgroundColor: topic.color }}
          ></span>
          <div className="unit-info">
            <span className="unit-number">{topic.name}</span>
            <span className="unit-title">{topic.title}</span>
          </div>
          <span className="unit-icon">{topic.icon}</span>
        </button>
      ))}
    </div>
  );
};

export default Sidebar;
