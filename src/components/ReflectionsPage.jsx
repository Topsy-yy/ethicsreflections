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
    const reflectionTexts = [
      `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.\n\nExcepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.\n\nNemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.`,
      
      `Sometimes I pause and truly ponder what it means to be free. We hear it constantly: "You have the freedom to choose." But does that truly resonate? It often feels as though the very framework of my choices was set long before I understood what a choice even was. I had once questioned myself if choosing to study in Kenya was really what I wanted?\n\nAs the layers of expectation begin to peel away with age, I've started to glimpse freedom not as an absence of limits, but as a presence of truth. To understand that the choices that I'm likely going to make is because of what it is confirmed to be true more about aligning my actions with the quiet, insistent voice of my inner self. This pursuit of truth is what perfects freedom, elevating choices from arbitrary decisions to meaningful, self-determined acts.\n\nThe path to authentic freedom is inherently challenging, marked by the weighty realization that every free act is a responsible act. This principle profoundly shapes my decision-making, imbuing each choice with a recognition of its broader implications. The lessons learned through my own experiences, even the imperfect ones, are paramount, for they are the foundation of a life undeniably my own, lived with full responsibility.`,
      
      `My lifelong aspiration has been for profound happiness, yes, playing video games, going out with friends, trying new things, achieving some goal, having tons of money. But after the Happiness and Virtues chapter all these changed. Here's what I learned;\n\nTrue happiness emerges in the bonds of friendship. Simple, shared moments: laughter, meals, stories, and the quiet presence of loved ones. These are the instances where everything aligns, bringing a sense of rightness.\n\nApart from friendship being source of happiness, virtues is also a key aspect. Virtue being a habit, and habits build by practice then, practicing the different types of virtues brings happiness.\n\nI was impressed by the virtue "Fortitude" that it enables people act well even in difficult times. The aspect "resist" that it inclines more to, to resist temptations, bigger temptations that seem difficult to resist. This made me remember some achievement I have done and didn't notice how big it was.\n\nThrough that I've learned that happiness is not a distant goal to be chased, but a delicate bloom to be recognized, nurtured, and protected. It resides in everyday memories, small gestures, shared laughter, and meaningful embraces.`,
      
      `Doing a bad thing for the right course should be accepted. Yeah, that was how I answered when this question was posed out to us in our maisha class back in first year first semester. The question was "Can the end justify the means?". I can't remember if there was anyone who said NO, but I particularly defended the motion.\n\nTo my surprise, the end can never justify the means. It even gets worse when the fonts were introduced. "Circumstances" one of the fonts that determine the intensity of the action. Measuring how good or evil an action can be.\n\nMy key takeaway in this chapter is that for an action to be morally acceptable, then all the fonts must be good.`,
      
      `There is this famous saying that "Show me your friends and I'll tell you who you are". There is this other one which says when you put the good dog together with several bad ones then, the dog will become a bad dog.\n\nAll these sayings are being supported by cooperation with other people's actions. This clicked in my mind after noticing how remarks are given to the most insignificant people in any event, not knowing that even their contributions help in actions done by people.\n\nThis has made me to look keenly the people around me, how my contributions to their actions helping them achieve some goal whether evil or good, how I benefit from it.\n\nThis made me vow not to do anything because my friends do it but examining their ultimate good of their actions.`
    ];
    
    return reflectionTexts[index] || reflectionTexts[0];
  };

  const reflections = reflectionTopics.map((unit, index) => ({
    unitId: index + 1,
    unitName: unit.name,
    title: unit.title,
    icon: unit.icon,
    color: unit.color,
    description: unit.description,
    content: index < 5 ? getReflectionContent(index) : null,
    lastModified: index < 5 ? `2025-07-${String(index + 1).padStart(2, '0')}` : null,
    wordCount: index < 5 ? [185, 247, 194, 116, 149][index] : 0, // Updated word counts for personal reflections
    hasReflection: index < 5
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
      // Use the beautiful lush green forest image you selected
      return 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80';
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
