import React, { useState } from 'react';
import { reflectionTopics } from '../data/planets';

const ReflectionsPage = ({ onBack }) => {
  const [selectedUnit, setSelectedUnit] = useState(null);

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
    setSelectedUnit(null);
  };

  const handleWriteNow = (unit) => {
    // For now, we'll just show an alert. In a real app, this would open an editor
    alert(`Starting reflection for ${unit.title}...\n\nIn a full implementation, this would open a text editor where you could write your reflection on: ${unit.description}`);
  };

  if (selectedUnit) {
    return (
      <div className="reflections-page reflection-detail-view">
        <div className="reflection-background">
          <div className="reflection-overlay"></div>
        </div>
        
        <div className="reflection-header-minimal">
          <button className="back-button-minimal" onClick={handleBackToList}>
            <span className="back-icon">←</span>
            Back
          </button>
          <button className="home-button-minimal" onClick={onBack}>
            <span className="home-icon">⌂</span>
            Home
          </button>
        </div>

        <div className="reflection-card-large">
          <div className="reflection-card-header-detail">
            <div className="unit-badge-detail" style={{ backgroundColor: selectedUnit.color }}>
              <span className="unit-icon-detail">{selectedUnit.icon}</span>
            </div>
            <div className="reflection-title-section">
              <h1 className="reflection-title-large">{selectedUnit.title}</h1>
              <p className="unit-name-detail">{selectedUnit.unitName}</p>
              <p className="reflection-description">{selectedUnit.description}</p>
            </div>
          </div>

          <div className="reflection-meta-bar">
            <span className="word-count-detail">{selectedUnit.wordCount} words</span>
            <span className="separator">•</span>
            <span className="last-modified-detail">Last modified: {selectedUnit.lastModified}</span>
          </div>

          <div className="reflection-content-scrollable">
            <div className="reflection-text">
              {selectedUnit.content.split('\n\n').map((paragraph, index) => (
                <p key={index} className="reflection-paragraph-large">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          <div className="reflection-actions-minimal">
            <button className="action-button edit-button-minimal">
              <span className="btn-icon">✏️</span>
              Edit
            </button>
            <button className="action-button export-button-minimal">
              <span className="btn-icon">↗</span>
              Export
            </button>
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
          <span className="total-reflections">{reflections.filter(r => r.hasReflection).length} of {reflections.length} reflections written</span>
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
                <p className="empty-text">No reflection written yet</p>
                <p className="empty-description">{reflection.description.substring(0, 100)}...</p>
                <button 
                  className="write-now-button" 
                  style={{ borderColor: reflection.color, color: reflection.color }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleWriteNow(reflection);
                  }}
                >
                  Write Now
                </button>
              </div>
            </div>
          )
        ))}
      </div>
    </div>
  );
};

export default ReflectionsPage;
