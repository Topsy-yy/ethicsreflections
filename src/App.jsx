import React, { useState, useEffect, useCallback } from 'react';
import Sidebar from './components/Sidebar';
import PlanetCard from './components/PlanetCard';
import ReflectionsPage from './components/ReflectionsPage';
import { reflectionTopics } from './data/planets';
import './App.css';

const App = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [currentView, setCurrentView] = useState('units'); // 'units' or 'reflections'

  const getCardPosition = useCallback((index) => {
    if (index === currentIndex) return 'active';
    if (index === currentIndex - 1 || (currentIndex === 0 && index === reflectionTopics.length - 1)) {
      return 'prev';
    }
    if (index === currentIndex + 1 || (currentIndex === reflectionTopics.length - 1 && index === 0)) {
      return 'next';
    }
    return '';
  }, [currentIndex]);

  const showCard = useCallback((index) => {
    if (index < 0) index = reflectionTopics.length - 1;
    if (index >= reflectionTopics.length) index = 0;
    setCurrentIndex(index);
  }, []);

  const handlePlanetSelect = useCallback((index) => {
    showCard(index);
  }, [showCard]);

  const handleViewReflections = useCallback(() => {
    setCurrentView('reflections');
  }, []);

  const handleBackToUnits = useCallback(() => {
    setCurrentView('units');
  }, []);

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

    // Add event listeners
    window.addEventListener('wheel', handleWheel);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentIndex, isScrolling, showCard]);

  // Touch gesture handling for mobile
  const minSwipeDistance = 50;

  const handleTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientY);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientY);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isUpSwipe = distance > minSwipeDistance;
    const isDownSwipe = distance < -minSwipeDistance;

    if (isUpSwipe) {
      showCard(currentIndex + 1);
    } else if (isDownSwipe) {
      showCard(currentIndex - 1);
    }
  };

  return (
    <div className="app">
      {currentView === 'reflections' ? (
        <ReflectionsPage onBack={handleBackToUnits} />
      ) : (
        <>
          <div className="grid-background"></div>
          
          <div className="header">
            <h1>ETHICS REFLECTIONS</h1>
            <p className="subtitle">Exploring Moral Philosophy Through Personal Reflection</p>
          </div>

          <Sidebar 
            planets={reflectionTopics}
            currentIndex={currentIndex}
            onPlanetSelect={handlePlanetSelect}
          />

          <div className="card-container"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {reflectionTopics.map((topic, index) => (
              <PlanetCard
                key={topic.name}
                planet={topic}
                position={getCardPosition(index)}
                onViewReflections={handleViewReflections}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default App;
