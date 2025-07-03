import React, { useState, useEffect } from 'react';
import { reflectionTopics } from '../data/planets';

const ReflectionsPage = ({ onBack, selectedUnitIndex }) => {
  const [selectedUnit, setSelectedUnit] = useState(null);

  // If selectedUnitIndex is provided, show that unit's reflection directly
  useEffect(() => {
    if (selectedUnitIndex !== null && selectedUnitIndex !== undefined) {
      const unitReflection = reflections[selectedUnitIndex];
      if (unitReflection) {
        setSelectedUnit(unitReflection);
      }
    }
  }, [selectedUnitIndex]);

  // Sample reflection data with Lorem ipsum content - using actual unit data
  const getReflectionContent = (index) => {
    const loremTexts = [
      `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.\n\nExcepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.\n\nNemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.`,
      
      `At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.\n\nEt harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.\n\nTemporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae.`,
      
      `Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.\n\nQuis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam.\n\nNisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.`
    ];
    
    return loremTexts[index] || loremTexts[0];
  };

  const reflections = reflectionTopics.map((unit, index) => ({
    unitId: index + 1,
    unitName: unit.name,
    title: unit.title,
    icon: unit.icon,
    color: unit.color,
    description: unit.description,
    content: index < 3 ? getReflectionContent(index) : null,
    lastModified: index < 3 ? `2025-07-${String(index + 1).padStart(2, '0')}` : null,
    wordCount: index < 3 ? [185, 164, 178][index] : 0, // More realistic word counts
    hasReflection: index < 3
  }));

  const handleUnitClick = (unit) => {
    setSelectedUnit(unit);
  };

  const handleBackToList = () => {
    // If we came directly from a unit (selectedUnitIndex exists), go back to units
    if (selectedUnitIndex !== null && selectedUnitIndex !== undefined) {
      onBack();
    } else {
      setSelectedUnit(null);
    }
  };

  if (selectedUnit) {
    // Determine background image based on unit
    const getBackgroundImage = () => {
      if (selectedUnit.unitId === 1) {
        return '/images/Textured.jpeg';
      }
      // Default background for other units
      return 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=2070&auto=format&fit=crop';
    };

    const backgroundStyle = {
      backgroundImage: `linear-gradient(135deg, 
        rgba(10, 15, 25, 0.3) 0%,
        rgba(15, 20, 30, 0.25) 50%,
        rgba(20, 25, 35, 0.2) 100%
      ), url('${getBackgroundImage()}')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    };

    return (
      <div className="winter-card-view" style={backgroundStyle}>
        <div className="winter-background"></div>
        
        <div className="winter-header">
          <button className="winter-back-btn" onClick={handleBackToList}>
            <span>←</span> Back
          </button>
          <button className="winter-home-btn" onClick={onBack}>
            <span>⌂</span> Home
          </button>
        </div>

        <div className="winter-card">
          <div className="winter-card-header">
            <div className="winter-unit-badge" style={{ backgroundColor: selectedUnit.color }}>
              <span className="winter-unit-icon">{selectedUnit.icon}</span>
            </div>
            <div className="winter-title-section">
              <h1 className="winter-title">{selectedUnit.title}</h1>
              <p className="winter-unit-name">{selectedUnit.unitName}</p>
              <p className="winter-description">{selectedUnit.description}</p>
            </div>
          </div>

          <div className="winter-meta">
            <span>{selectedUnit.wordCount} words</span>
            <span>•</span>
            <span>Last modified: {selectedUnit.lastModified}</span>
          </div>

          <div className="winter-content">
            {selectedUnit.content.split('\n\n').map((paragraph, index) => (
              <p key={index} className="winter-paragraph">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="reflections-page">
      <div className="reflections-header">
        <button className="back-button" onClick={onBack}>
          <span className="back-icon">←</span>
          Back to Units
        </button>
        <h1 className="page-title">My Reflections</h1>
        <div className="reflections-summary">
          <span className="total-reflections">{reflections.filter(r => r.hasReflection).length} of {reflections.length} reflections available</span>
        </div>
      </div>

      <div className="reflections-grid">
        {reflections.map((reflection) => (
          reflection.hasReflection ? (
            <div 
              key={reflection.unitId}
              className="reflection-card"
              onClick={() => handleUnitClick(reflection)}
              style={{ 
                borderLeftColor: reflection.color,
                '--hover-glow': reflection.color 
              }}
            >
              <div className="reflection-card-header">
                <div className="unit-badge-small" style={{ backgroundColor: reflection.color }}>
                  <span className="unit-icon-small">{reflection.icon}</span>
                </div>
                <div className="reflection-info">
                  <h3 className="reflection-card-title">{reflection.title}</h3>
                  <span className="unit-label-small">{reflection.unitName}</span>
                </div>
              </div>
              
              <div className="reflection-preview">
                <p className="preview-text">
                  {reflection.content.substring(0, 150)}...
                </p>
              </div>
              
              <div className="reflection-card-footer">
                <span className="word-count-small">{reflection.wordCount} words</span>
                <span className="date-small">{reflection.lastModified}</span>
              </div>
            </div>
          ) : (
            <div key={reflection.unitId} className="reflection-card empty-card">
              <div className="empty-state">
                <div className="unit-badge-small" style={{ backgroundColor: reflection.color, opacity: 0.3 }}>
                  <span className="unit-icon-small">{reflection.icon}</span>
                </div>
                <h3 className="empty-title">{reflection.title}</h3>
                <p className="empty-text">No reflection available</p>
                <p className="empty-description">{reflection.description.substring(0, 100)}...</p>
              </div>
            </div>
          )
        ))}
      </div>
    </div>
  );
};

export default ReflectionsPage;
