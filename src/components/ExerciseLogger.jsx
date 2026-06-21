import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Check, CheckSquare, Square, Award, Target, HelpCircle, Save, PlusCircle, Dumbbell } from 'lucide-react';
import { PRESET_EXERCISES } from '../utils/constants';

export default function ExerciseLogger({ 
  activeDay, 
  dayData, 
  onUpdateExercises, 
  onLogCompletion, 
  unit 
}) {
  const [selectedPreset, setSelectedPreset] = useState('');
  const [customName, setCustomName] = useState('');
  const [showAddCustom, setShowAddCustom] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);

  const focus = dayData?.focus || 'Rest Day';
  const exercises = dayData?.exercises || [];

  // Get options for preset exercises based on current day's focus
  const getPresetOptions = (dayFocus) => {
    if (!dayFocus) return [];
    
    // Split on &, +, or comma
    const parts = dayFocus.split(/[&+,]/).map(p => p.trim());
    const allPresets = new Set();
    
    parts.forEach(part => {
      let normalizedPart = part.toLowerCase();
      // Map synonyms to match keys in PRESET_EXERCISES
      if (normalizedPart.includes('bicep') || normalizedPart.includes('tricep') || normalizedPart.includes('arm')) {
        normalizedPart = 'arms';
      }
      
      const matchingKey = Object.keys(PRESET_EXERCISES).find(
        key => key.toLowerCase() === normalizedPart
      );
      
      if (matchingKey && PRESET_EXERCISES[matchingKey]) {
        PRESET_EXERCISES[matchingKey].forEach(ex => allPresets.add(ex));
      }
    });
    
    // Fallback: if nothing matched, check if any preset key is a substring of the focus
    if (allPresets.size === 0) {
      Object.keys(PRESET_EXERCISES).forEach(key => {
        if (dayFocus.toLowerCase().includes(key.toLowerCase())) {
          PRESET_EXERCISES[key].forEach(ex => allPresets.add(ex));
        }
      });
    }
    
    return Array.from(allPresets);
  };

  const presetOptions = getPresetOptions(focus);

  const handleAddPreset = (e) => {
    e.preventDefault();
    if (!selectedPreset) return;

    const newExercise = {
      name: selectedPreset,
      sets: [{ weight: 0, reps: 0, targetWeight: 0, targetReps: 0, completed: false }]
    };

    onUpdateExercises(activeDay, [...exercises, newExercise]);
    setSelectedPreset('');
  };

  const handleAddCustom = (e) => {
    e.preventDefault();
    const name = customName.trim();
    if (!name) return;

    const newExercise = {
      name: name,
      sets: [{ weight: 0, reps: 0, targetWeight: 0, targetReps: 0, completed: false }]
    };

    onUpdateExercises(activeDay, [...exercises, newExercise]);
    setCustomName('');
    setShowAddCustom(false);
  };

  const handleRemoveExercise = (indexToRemove) => {
    const updated = exercises.filter((_, idx) => idx !== indexToRemove);
    onUpdateExercises(activeDay, updated);
  };

  const handleUpdateSet = (exIdx, setIdx, field, value) => {
    const updatedExercises = JSON.parse(JSON.stringify(exercises));
    updatedExercises[exIdx].sets[setIdx][field] = value;
    onUpdateExercises(activeDay, updatedExercises);
  };

  const handleAddSet = (exIdx) => {
    const updatedExercises = JSON.parse(JSON.stringify(exercises));
    const sets = updatedExercises[exIdx].sets;
    const lastSet = sets[sets.length - 1];
    
    // Copy weight/reps/target from the last set to make entry faster
    const newSet = lastSet 
      ? { ...lastSet, completed: false }
      : { weight: 0, reps: 0, targetWeight: 0, targetReps: 0, completed: false };
      
    sets.push(newSet);
    onUpdateExercises(activeDay, updatedExercises);
  };

  const handleRemoveSet = (exIdx, setIdx) => {
    const updatedExercises = JSON.parse(JSON.stringify(exercises));
    if (updatedExercises[exIdx].sets.length <= 1) {
      // Remove exercise if only one set was left
      handleRemoveExercise(exIdx);
      return;
    }
    updatedExercises[exIdx].sets = updatedExercises[exIdx].sets.filter((_, idx) => idx !== setIdx);
    onUpdateExercises(activeDay, updatedExercises);
  };

  const handleFinishWorkout = () => {
    // Record to history and trigger celebration
    onLogCompletion(activeDay);
    setShowCelebration(true);
  };

  // Auto-hide celebration modal after 4 seconds
  useEffect(() => {
    if (showCelebration) {
      const timer = setTimeout(() => setShowCelebration(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [showCelebration]);

  if (focus.trim().toLowerCase() === 'rest day') {
    return (
      <div className="logger-panel glass-panel text-center p-5">
        <Dumbbell size={48} className="text-muted mb-3 mx-auto" />
        <h3>{activeDay} is a Rest Day</h3>
        <p className="text-muted">Relax, stretch, let your muscles recover, and prepare for your next heavy session!</p>
        <span className="info-badge">Tip: Recovery is where muscle growth actually happens.</span>
      </div>
    );
  }

  return (
    <div className="logger-panel glass-panel animate-fade-in">
      <div className="logger-header">
        <div>
          <h3>Log Workout: {activeDay}</h3>
          <span className="muscle-badge">{focus} Session</span>
        </div>

        {exercises.length > 0 && (
          <button 
            className="btn btn-success flex-center"
            onClick={handleFinishWorkout}
          >
            <CheckSquare size={16} className="mr-1" /> Log Workout Done
          </button>
        )}
      </div>

      {/* Exercises Log Listing */}
      {exercises.length === 0 ? (
        <div className="empty-logger flex-center flex-column">
          <Dumbbell size={32} className="text-muted mb-2 animate-bounce-slow" />
          <p>No exercises listed for today. Select or create one below to start listing sets!</p>
        </div>
      ) : (
        <div className="exercises-log-list">
          {exercises.map((ex, exIdx) => (
            <div key={exIdx} className="exercise-log-item glass-panel">
              <div className="exercise-item-header">
                <h4>{ex.name}</h4>
                <button 
                  className="btn-icon text-danger" 
                  onClick={() => handleRemoveExercise(exIdx)}
                  title="Remove Exercise"
                >
                  <Trash2 size={16} />
                </button>
              </div>

              {/* Set logging table */}
              <div className="sets-table">
                <div className="sets-header-row">
                  <div className="col-set">Set</div>
                  <div className="col-weight">Weight ({unit})</div>
                  <div className="col-reps">Reps</div>
                  <div className="col-target">Next Target ({unit} x Reps)</div>
                  <div className="col-status">Status</div>
                  <div className="col-delete"></div>
                </div>

                {ex.sets.map((set, setIdx) => (
                  <div 
                    key={setIdx} 
                    className={`set-row ${set.completed ? 'set-completed' : ''}`}
                  >
                    <div className="col-set">{setIdx + 1}</div>
                    
                    <div className="col-weight">
                      <input
                        type="number"
                        className="set-input"
                        placeholder="0"
                        value={set.weight || ''}
                        onChange={(e) => handleUpdateSet(exIdx, setIdx, 'weight', parseFloat(e.target.value) || 0)}
                        min={0}
                        disabled={set.completed}
                      />
                    </div>

                    <div className="col-reps">
                      <input
                        type="number"
                        className="set-input"
                        placeholder="0"
                        value={set.reps || ''}
                        onChange={(e) => handleUpdateSet(exIdx, setIdx, 'reps', parseInt(e.target.value) || 0)}
                        min={0}
                        disabled={set.completed}
                      />
                    </div>

                    <div className="col-target">
                      <div className="target-input-group">
                        <input
                          type="number"
                          className="set-input target-weight"
                          placeholder={`Weight`}
                          value={set.targetWeight || ''}
                          onChange={(e) => handleUpdateSet(exIdx, setIdx, 'targetWeight', parseFloat(e.target.value) || 0)}
                          min={0}
                          disabled={set.completed}
                        />
                        <span className="target-sep">x</span>
                        <input
                          type="number"
                          className="set-input target-reps"
                          placeholder="Reps"
                          value={set.targetReps || ''}
                          onChange={(e) => handleUpdateSet(exIdx, setIdx, 'targetReps', parseInt(e.target.value) || 0)}
                          min={0}
                          disabled={set.completed}
                        />
                      </div>
                    </div>

                    <div className="col-status">
                      <button
                        className={`status-checkbox-btn ${set.completed ? 'checked' : ''}`}
                        onClick={() => handleUpdateSet(exIdx, setIdx, 'completed', !set.completed)}
                      >
                        {set.completed ? <CheckSquare size={16} /> : <Square size={16} />}
                      </button>
                    </div>

                    <div className="col-delete">
                      <button 
                        className="btn-icon-small text-muted" 
                        onClick={() => handleRemoveSet(exIdx, setIdx)}
                        title="Delete Set"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="exercise-item-footer">
                <button 
                  className="btn btn-outline-small flex-center"
                  onClick={() => handleAddSet(exIdx)}
                >
                  <Plus size={14} className="mr-1" /> Add Set
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add exercise selection interface */}
      <div className="add-exercise-section border-top">
        {!showAddCustom ? (
          <form onSubmit={handleAddPreset} className="add-preset-form">
            <div className="form-group flex-grow">
              <label>Select Exercise ({focus} presets)</label>
              <div className="select-row">
                <select
                  value={selectedPreset}
                  onChange={(e) => setSelectedPreset(e.target.value)}
                  className="input-field"
                >
                  <option value="">-- Choose {focus} Exercise --</option>
                  {presetOptions.map((exName) => (
                    <option key={exName} value={exName}>
                      {exName}
                    </option>
                  ))}
                </select>
                <button 
                  type="submit" 
                  className="btn btn-primary flex-center"
                  disabled={!selectedPreset}
                >
                  <Plus size={16} className="mr-1" /> Add
                </button>
              </div>
            </div>
            <div className="or-divider">
              <span>or</span>
            </div>
            <button
              type="button"
              className="btn btn-outline flex-center self-end"
              style={{ height: '42px', marginTop: '20px' }}
              onClick={() => setShowAddCustom(true)}
            >
              <PlusCircle size={16} className="mr-1" /> Create Custom Exercise
            </button>
          </form>
        ) : (
          <form onSubmit={handleAddCustom} className="add-custom-form animate-slide-up">
            <div className="form-group flex-grow">
              <label>Enter Custom Exercise Name</label>
              <div className="select-row">
                <input
                  type="text"
                  placeholder="e.g. Incline Cable Flyes"
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  className="input-field"
                  required
                />
                <button type="submit" className="btn btn-primary flex-center">
                  <Plus size={16} className="mr-1" /> Add Custom
                </button>
              </div>
            </div>
            <button
              type="button"
              className="btn btn-link mt-2"
              onClick={() => {
                setShowAddCustom(false);
                setCustomName('');
              }}
            >
              Cancel and select from presets
            </button>
          </form>
        )}
      </div>

      {/* Custom Celebration Modal */}
      {showCelebration && (
        <div className="celebration-overlay flex-center animate-fade-in">
          <div className="celebration-card glass-panel text-center animate-zoom-in">
            <Award className="trophy-icon animate-bounce text-primary mb-3" size={64} />
            <h2 className="glow-text">Workout Logged!</h2>
            <p className="mt-2 text-glow">Incredible effort! Your session details have been saved to your profile history.</p>
            <div className="streak-badge mt-3">
              🔥 Keep the momentum going!
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
