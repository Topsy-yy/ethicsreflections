import React, { useState, useEffect, useCallback } from 'react';
import Sidebar from './components/Sidebar';
import PlanetCard from './components/PlanetCard';
import { planetsData } from './data/planets';
import './App.css';

const App = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);

  const getCardPosition = useCallback((index) => {
    if (index === currentIndex) return 'active';
    if (index === currentIndex - 1 || (currentIndex === 0 && index === planetsData.length - 1)) {
      return 'prev';
    }
    if (index === currentIndex + 1 || (currentIndex === planetsData.length - 1 && index === 0)) {
      return 'next';
    }
    return '';
  }, [currentIndex]);

  const showCard = useCallback((index) => {
    if (index < 0) index = planetsData.length - 1;
    if (index >= planetsData.length) index = 0;
    setCurrentIndex(index);
  }, []);

  const handlePlanetSelect = useCallback((index) => {
    showCard(index);
  }, [showCard]);

  useEffect(() => {
    const handleWheel = (e) => {
      if (isScrolling) return;
      setIsScrolling(true);
      
      if (e.deltaY > 0) {
        showCard(currentIndex + 1);
      } else {
        showCard(currentIndex - 1);
      }

      setTimeout(() => {
        setIsScrolling(false);
      }, 800);
    };

    const handleKeyDown = (e) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        showCard(currentIndex + 1);
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        showCard(currentIndex - 1);
      }
    };

    window.addEventListener('wheel', handleWheel);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentIndex, isScrolling, showCard]);

  return (
    <div className="app">
      <div className="grid-background"></div>
      
      <div className="header">
        <h1>SOLAR EXPLORER</h1>
      </div>

      <Sidebar 
        planets={planetsData}
        currentIndex={currentIndex}
        onPlanetSelect={handlePlanetSelect}
      />

      <div className="card-container">
        {planetsData.map((planet, index) => (
          <PlanetCard
            key={planet.name}
            planet={planet}
            position={getCardPosition(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
