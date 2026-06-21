import React from 'react';
import { Calendar, Copy, ChevronRight, CheckCircle2, Circle, AlertCircle } from 'lucide-react';
import { BODY_PARTS } from '../utils/constants';

export default function WeeklyPlanner({ 
  schedule, 
  activeDay, 
  onSelectDay, 
  onChangeFocus, 
  onCopyDay 
}) {
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const todayName = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(new Date());

  const getCompletionStats = (dayData) => {
    const exercises = dayData?.exercises || [];
    if (exercises.length === 0) return { total: 0, completed: 0, percent: 0 };
    
    // An exercise is completed if all its sets are completed
    let totalSets = 0;
    let completedSets = 0;

    exercises.forEach(ex => {
      ex.sets.forEach(set => {
        totalSets++;
        if (set.completed) completedSets++;
      });
    });

    const percent = totalSets > 0 ? Math.round((completedSets / totalSets) * 100) : 0;
    return {
      total: exercises.length,
      completedSets,
      totalSets,
      percent
    };
  };

  const handleCopyClick = (e, destDay) => {
    e.stopPropagation();
    const sourceDay = prompt(
      `Copy exercises from which day? (Enter: Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, or Sunday)`
    );
    if (!sourceDay) return;

    const formattedSource = sourceDay.trim();
    const capitalizedSource = formattedSource.charAt(0).toUpperCase() + formattedSource.slice(1).toLowerCase();

    if (!daysOfWeek.includes(capitalizedSource)) {
      alert(`Invalid day entered: "${sourceDay}". Please enter a valid weekday.`);
      return;
    }

    if (capitalizedSource === destDay) {
      alert('Cannot copy a day to itself!');
      return;
    }

    onCopyDay(capitalizedSource, destDay);
  };

  return (
    <div className="weekly-planner-container">
      <div className="planner-header">
        <Calendar size={20} className="text-primary mr-2" />
        <h3>Weekly Workout Schedule</h3>
      </div>
      <p className="section-subtitle">Select a day to log your exercises. Change the muscle focus or copy layouts between days.</p>

      <div className="planner-grid">
        {daysOfWeek.map((day) => {
          const dayData = schedule[day];
          const focus = dayData?.focus || 'Rest Day';
          const { total, percent, completedSets, totalSets } = getCompletionStats(dayData);
          const isToday = day === todayName;
          const isActive = day === activeDay;
          const isRest = focus.trim().toLowerCase() === 'rest day';

          return (
            <div 
              key={day} 
              className={`day-card glass-panel hover-glow ${isToday ? 'today-highlight' : ''} ${isActive ? 'active-highlight' : ''}`}
              onClick={() => onSelectDay(day)}
            >
              <div className="day-card-header">
                <div>
                  <span className="day-title">{day}</span>
                  {isToday && <span className="today-badge">TODAY</span>}
                </div>
                
                <button 
                  className="copy-btn" 
                  title={`Copy another day's schedule to ${day}`}
                  onClick={(e) => handleCopyClick(e, day)}
                >
                  <Copy size={14} />
                </button>
              </div>

              {/* Day focus input with suggestions (Allows custom multiple parts!) */}
              <div className="focus-select-wrapper" onClick={(e) => e.stopPropagation()}>
                <input
                  type="text"
                  value={focus}
                  onChange={(e) => onChangeFocus(day, e.target.value)}
                  className={`focus-input ${isRest ? 'input-rest' : 'input-work'}`}
                  placeholder="e.g. Chest & Triceps"
                  list="focus-options"
                />
              </div>

              {/* Exercise stats and progress */}
              <div className="day-card-body">
                {isRest ? (
                  <div className="rest-day-message">
                    <span>Rest & Recover</span>
                  </div>
                ) : (
                  <>
                    <div className="exercise-count-row">
                      <span>{total} {total === 1 ? 'exercise' : 'exercises'}</span>
                      {total > 0 && (
                        <span className="completion-sets-text">
                          {completedSets}/{totalSets} sets
                        </span>
                      )}
                    </div>
                    
                    {total > 0 ? (
                      <div className="progress-bar-container">
                        <div 
                          className="progress-bar" 
                          style={{ width: `${percent}%` }}
                        ></div>
                      </div>
                    ) : (
                      <div className="no-exercises-text flex-center">
                        <AlertCircle size={12} className="mr-1" />
                        <span>No exercises added yet</span>
                      </div>
                    )}
                  </>
                )}
              </div>

              <div className="day-card-footer">
                <span className="action-link flex-center">
                  {isRest ? 'Configure' : 'Log / Edit'} <ChevronRight size={14} />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Datalist of suggestions for focus */}
      <datalist id="focus-options">
        <option value="Chest & Triceps" />
        <option value="Back & Biceps" />
        <option value="Legs & Core" />
        <option value="Shoulders & Arms" />
        <option value="Chest & Back" />
        <option value="Chest" />
        <option value="Back" />
        <option value="Legs" />
        <option value="Shoulders" />
        <option value="Arms" />
        <option value="Core" />
        <option value="Cardio" />
        <option value="Rest Day" />
      </datalist>
    </div>
  );
}
