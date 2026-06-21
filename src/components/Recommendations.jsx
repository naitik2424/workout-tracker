import React, { useState } from 'react';
import { Flame, Info, Check, ShieldAlert, Dumbbell, Award, ArrowRight } from 'lucide-react';
import { RECOMMENDED_ROUTINES } from '../utils/constants';

export default function Recommendations({ currentUsername, onImportSuccess }) {
  const [selectedRoutine, setSelectedRoutine] = useState(null);
  const [confirmImport, setConfirmImport] = useState(false);
  const [justImported, setJustImported] = useState(null);

  const handlePreview = (routine) => {
    setSelectedRoutine(routine);
    setConfirmImport(false);
  };

  const handleImport = () => {
    if (!selectedRoutine) return;
    
    // Call the parent callback to import the routine
    onImportSuccess(selectedRoutine.days);
    
    // Trigger success animations and notifications
    setConfirmImport(false);
    setJustImported(selectedRoutine.id);
    setTimeout(() => setJustImported(null), 3000);
    setSelectedRoutine(null);
  };

  const getDifficultyColor = (diff) => {
    switch (diff.toLowerCase()) {
      case 'beginner-friendly': return 'diff-beginner';
      case 'intermediate': return 'diff-intermediate';
      case 'advanced': return 'diff-advanced';
      default: return '';
    }
  };

  return (
    <div className="recommendations-container container">
      <div className="section-header animate-slide-up">
        <h2>Recommended Workout Routines</h2>
        <p>Don't know where to start? Choose a scientifically backed split and import it directly into your weekly planner.</p>
      </div>

      <div className="routines-grid animate-slide-up" style={{ animationDelay: '0.1s' }}>
        {RECOMMENDED_ROUTINES.map((routine) => {
          const isSuccess = justImported === routine.id;
          return (
            <div key={routine.id} className="routine-card glass-panel hover-glow">
              <div className="routine-card-header">
                <span className={`difficulty-badge ${getDifficultyColor(routine.difficulty)}`}>
                  {routine.difficulty}
                </span>
                <span className="routine-days-count">
                  {Object.values(routine.days).filter(d => d.focus !== 'Rest Day').length} Workout Days
                </span>
              </div>
              
              <h3>{routine.name}</h3>
              <p className="routine-desc">{routine.description}</p>
              
              <div className="routine-preview-tags">
                <strong>Schedule: </strong>
                <div className="day-tags-row">
                  {Object.entries(routine.days).map(([day, data]) => (
                    <span 
                      key={day} 
                      className={`day-mini-tag ${data.focus === 'Rest Day' ? 'rest' : 'work'}`}
                      title={`${day}: ${data.focus}`}
                    >
                      {day.substring(0, 1)}
                    </span>
                  ))}
                </div>
              </div>

              <div className="routine-card-footer">
                <button 
                  className="btn btn-outline btn-full flex-center"
                  onClick={() => handlePreview(routine)}
                >
                  <Info size={16} className="mr-1" /> View Split & Info
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Preview Modal */}
      {selectedRoutine && (
        <div className="modal-backdrop flex-center animate-fade-in">
          <div className="modal-content glass-panel animate-zoom-in">
            <div className="modal-header">
              <div>
                <h2>{selectedRoutine.name}</h2>
                <span className={`difficulty-badge ${getDifficultyColor(selectedRoutine.difficulty)}`}>
                  {selectedRoutine.difficulty}
                </span>
              </div>
              <button className="close-btn" onClick={() => setSelectedRoutine(null)}>&times;</button>
            </div>

            <div className="modal-body">
              <p className="routine-full-desc">{selectedRoutine.description}</p>
              
              <div className="routine-weekly-breakdown">
                <h4>Weekly Schedule Overview</h4>
                <div className="schedule-list">
                  {Object.entries(selectedRoutine.days).map(([day, data]) => (
                    <div key={day} className="schedule-day-item">
                      <div className="day-name">{day}</div>
                      <div className="day-focus">
                        <span className={`focus-dot ${data.focus === 'Rest Day' ? 'rest' : 'work'}`}></span>
                        {data.focus}
                      </div>
                      <div className="day-exercise-summary">
                        {data.focus === 'Rest Day' ? (
                          <span className="text-muted">No lifting scheduled</span>
                        ) : (
                          `${data.exercises.length} Exercises (${data.exercises.map(e => e.name.split(' (')[0]).slice(0, 3).join(', ')}${data.exercises.length > 3 ? '...' : ''})`
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {confirmImport && (
                <div className="alert alert-warning animate-slide-up">
                  <ShieldAlert className="alert-icon" />
                  <div>
                    <strong>Warning!</strong> Importing this routine will overwrite your current weekly planner schedule. All current exercises for the week will be replaced.
                  </div>
                </div>
              )}
            </div>

            <div className="modal-footer">
              {!confirmImport ? (
                <>
                  <button 
                    className="btn btn-outline" 
                    onClick={() => setSelectedRoutine(null)}
                  >
                    Cancel
                  </button>
                  <button 
                    className="btn btn-primary flex-center"
                    onClick={() => setConfirmImport(true)}
                  >
                    Import Routine <ArrowRight size={16} className="ml-1" />
                  </button>
                </>
              ) : (
                <>
                  <button 
                    className="btn btn-outline" 
                    onClick={() => setConfirmImport(false)}
                  >
                    Go Back
                  </button>
                  <button 
                    className="btn btn-danger flex-center"
                    onClick={handleImport}
                  >
                    <Check size={16} className="mr-1" /> Yes, Import & Overwrite
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Global Import Notification toast */}
      {justImported && (
        <div className="toast toast-success animate-slide-up">
          <Award className="toast-icon animate-bounce" />
          <span>Routine imported successfully! Go to the Planner tab to see your schedule.</span>
        </div>
      )}
    </div>
  );
}
