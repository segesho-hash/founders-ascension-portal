// src/App.jsx - COMPLETE VERSION
import React from 'react';
import { useState } from 'react';
import { assignmentsData } from './assignmentsData';
import './App.css';

function App() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [currentAssignment, setCurrentAssignment] = useState(1);

  // If assignmentsData didn't load properly
  if (!assignmentsData || assignmentsData.length === 0) {
    return (
      <div className="app">
        <h1>Loading...</h1>
        <p>If this doesn't go away, check your assignmentsData.js file</p>
      </div>
    );
  }

  const completedAssignments = assignmentsData.filter(a => a.status === 'completed').length;
  const totalAssignments = assignmentsData.length;
  const progressPercentage = (completedAssignments / totalAssignments) * 100;

  const handleAssignmentClick = (assignmentId) => {
    setCurrentAssignment(assignmentId);
    setCurrentView('assignment');
  };

  const handleBackToDashboard = () => {
    setCurrentView('dashboard');
  };

  // Dashboard View
  if (currentView === 'dashboard') {
    return (
      <div className="app">
        <header className="app-header">
          <h1>🚀 Founder's Ascension Dashboard</h1>
          <p>Your transformation journey to becoming a visionary founder</p>
        </header>

        <div className="stats-grid">
          <div className="stat-card">
            <h3>📈 Program Progress</h3>
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{width: `${progressPercentage}%`}}
              ></div>
            </div>
            <p>{Math.round(progressPercentage)}%</p>
            <small>{completedAssignments} of {totalAssignments} assignments complete</small>
          </div>

          <div className="stat-card">
            <h3>🎯 Confidence Level</h3>
            <p className="confidence-score">7.5/10</p>
            <small>+3.2 points from start</small>
          </div>
        </div>

        <div className="assignments-section">
          <h2>Your 8-Week Transformation Journey</h2>
          <div className="assignments-grid">
            {assignmentsData.map(assignment => (
              <div 
                key={assignment.id}
                className={`assignment-card ${assignment.status}`}
                onClick={() => handleAssignmentClick(assignment.id)}
              >
                <div className="assignment-header">
                  <span className="week-badge">Week {assignment.week}</span>
                  <span className="time-estimate">{assignment.estimatedTime}</span>
                </div>
                <h3>{assignment.title}</h3>
                <p>{assignment.description}</p>
                <div className="assignment-status">
                  {assignment.status === 'completed' && '✅ Completed'}
                  {assignment.status === 'in-progress' && '🟡 In Progress'} 
                  {assignment.status === 'not-started' && '⚪ Not Started'}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Assignment Detail View
  const assignment = assignmentsData.find(a => a.id === currentAssignment);
  
  if (!assignment) {
    return (
      <div className="app">
        <button onClick={handleBackToDashboard} className="back-button">
          ← Back to Dashboard
        </button>
        <h1>Assignment not found</h1>
      </div>
    );
  }
  
  return (
    <div className="app">
      <button onClick={handleBackToDashboard} className="back-button">
        ← Back to Dashboard
      </button>

      <div className="assignment-header">
        <div className="assignment-meta">
          <span>Week {assignment.week} • {assignment.estimatedTime}</span>
        </div>
        <h1>{assignment.title}</h1>
        <div className="progress-indicator">
          Assignment {assignment.id} of {totalAssignments}
        </div>
      </div>

      <div className="assignment-description">
        <h2>🎯 Your Mission</h2>
        <p>{assignment.description}</p>
      </div>

      <div className="instructions-section">
        <h2>📝 Step-by-Step Instructions:</h2>
        <ol className="instructions-list">
          {assignment.instructions.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>
      </div>

      <div className="resources-section">
        <h2>📚 Resources to Help You:</h2>
        <ul className="resources-list">
          {assignment.resources.map((resource, index) => (
            <li key={index}>• {resource}</li>
          ))}
        </ul>
      </div>

      <div className="submission-section">
        <h2>✅ Submit Your Work</h2>
        <textarea 
          placeholder="Type your response here... Don't overthink it! Just get your thoughts down."
          rows="6"
          className="submission-textarea"
        />
        <button className="submit-button">
          {assignment.id === totalAssignments ? 'Complete Program!' : 'Mark Complete & Continue'}
        </button>
      </div>
    </div>
  );
}

export default App;
