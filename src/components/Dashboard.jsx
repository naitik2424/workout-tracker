import React, { useState } from 'react';
import { Flame, Target, Calendar, Award, ChevronDown, ChevronUp, Trash2, Clock, Dumbbell } from 'lucide-react';

const MOTIVATIONS = [
  "No matter how slow you go, you are still lapping everyone on the couch.",
  "The only bad workout is the one that didn't happen.",
  "Strength does not come from physical capacity. It comes from an indomitable will.",
  "Your body can stand almost anything. It's your mind that you have to convince.",
  "Progress, not perfection. Keep pushing!",
  "Consistency is the key that unlocks all fitness goals."
];

export default function Dashboard({ 
  currentUsername, 
  userData, 
  userMetadata, 
  onNavigateToTab, 
  onDeleteHistoryItem 
}) {
  const [expandedLogId, setExpandedLogId] = useState(null);
  const { history = [], streak = 0, schedule = {} } = userData;
  const { goal = 'Strength', unit = 'kg', avatar = '💪' } = userMetadata || {};

  const todayName = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(new Date());
  const todaySchedule = schedule[todayName] || { focus: 'Rest Day', exercises: [] };

  const randomQuote = useState(() => MOTIVATIONS[Math.floor(Math.random() * MOTIVATIONS.length)])[0];

  const calculateTotalVolume = (log) => {
    let volume = 0;
    log.exercises.forEach(ex => {
      ex.sets.forEach(s => {
        if (s.completed) {
          volume += (s.weight || 0) * (s.reps || 0);
        }
      });
    });
    return volume;
  };

  const toggleExpandLog = (id) => {
    setExpandedLogId(expandedLogId === id ? null : id);
  };

  const formatDate = (isoString) => {
    const d = new Date(isoString);
    return d.toLocaleDateString(undefined, { 
      month: 'short', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="dashboard-container container">
      {/* Welcome Banner */}
      <div className="welcome-banner glass-panel animate-fade-in">
        <div className="welcome-text">
          <span className="avatar-huge">{avatar}</span>
          <div>
            <h2>Welcome back, {currentUsername}!</h2>
            <p className="motivation-quote">"{randomQuote}"</p>
          </div>
        </div>
        
        {/* Streak counter */}
        <div className="streak-container hover-glow">
          <Flame className="streak-icon animate-pulse" size={24} />
          <div className="streak-info">
            <span className="streak-number">{streak}</span>
            <span className="streak-label">Day Streak</span>
          </div>
        </div>
      </div>

      {/* Stats Widgets */}
      <div className="stats-row animate-slide-up" style={{ animationDelay: '0.1s' }}>
        <div className="stat-card glass-panel">
          <div className="stat-icon-wrapper goal">
            <Target size={20} />
          </div>
          <div className="stat-details">
            <span className="stat-value">{goal}</span>
            <span className="stat-label">Fitness Goal</span>
          </div>
        </div>

        <div className="stat-card glass-panel">
          <div className="stat-icon-wrapper history">
            <Award size={20} />
          </div>
          <div className="stat-details">
            <span className="stat-value">{history.length}</span>
            <span className="stat-label">Logged Workouts</span>
          </div>
        </div>

        <div className="stat-card glass-panel">
          <div className="stat-icon-wrapper unit">
            <Dumbbell size={20} />
          </div>
          <div className="stat-details">
            <span className="stat-value">{unit.toUpperCase()}</span>
            <span className="stat-label">Weight Unit</span>
          </div>
        </div>
      </div>

      {/* Main Dashboard split layout */}
      <div className="dashboard-layout animate-slide-up" style={{ animationDelay: '0.2s' }}>
        {/* Today's Action Card */}
        <div className="dashboard-column">
          <h3 className="column-title">Today's Session</h3>
          <div className="today-action-card glass-panel hover-glow">
            <div className="today-header">
              <Calendar size={18} className="text-primary" />
              <span className="today-day-name">{todayName}</span>
            </div>
            
            <div className="today-body">
              <div className="focus-display">
                <span className="focus-title">Planned Focus</span>
                <span className={`focus-value ${todaySchedule.focus === 'Rest Day' ? 'text-muted' : 'text-primary-glow'}`}>
                  {todaySchedule.focus}
                </span>
              </div>

              {todaySchedule.focus !== 'Rest Day' && (
                <div className="today-exercise-summary">
                  <strong>Exercises planned:</strong> {todaySchedule.exercises?.length || 0}
                  <ul className="mini-exercise-list">
                    {todaySchedule.exercises?.slice(0, 3).map((ex, i) => (
                      <li key={i}>{ex.name}</li>
                    ))}
                    {(todaySchedule.exercises?.length || 0) > 3 && (
                      <li className="text-muted">+{todaySchedule.exercises.length - 3} more...</li>
                    )}
                  </ul>
                </div>
              )}
            </div>

            <div className="today-footer">
              <button 
                className="btn btn-primary btn-full flex-center"
                onClick={() => onNavigateToTab('planner', todayName)}
              >
                {todaySchedule.focus === 'Rest Day' ? 'Configure Weekly Schedule' : 'Start Logging Workout'}
              </button>
            </div>
          </div>
        </div>

        {/* History Log list */}
        <div className="dashboard-column">
          <h3 className="column-title">Recent History Logs</h3>
          <div className="history-logs-container">
            {history.length === 0 ? (
              <div className="empty-history-card glass-panel text-center">
                <Clock size={32} className="text-muted mb-2" />
                <p>You haven't completed any workouts yet!</p>
                <p className="small text-muted">Plan your week and press "Log Workout Done" to see logs here.</p>
              </div>
            ) : (
              <div className="history-list">
                {history.map((log) => {
                  const isExpanded = expandedLogId === log.id;
                  const totalVolume = calculateTotalVolume(log);
                  
                  return (
                    <div key={log.id} className="history-item glass-panel">
                      <div 
                        className="history-item-summary"
                        onClick={() => toggleExpandLog(log.id)}
                      >
                        <div className="history-meta">
                          <span className="history-date">{formatDate(log.date)}</span>
                          <span className="history-focus">{log.focus}</span>
                        </div>

                        <div className="history-stats-preview">
                          {totalVolume > 0 && (
                            <span className="volume-stat">
                              {totalVolume} {unit} lifted
                            </span>
                          )}
                          <span className="exercises-count">
                            {log.exercises.length} ex
                          </span>
                          <button className="expand-arrow-btn">
                            {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                          </button>
                        </div>
                      </div>

                      {isExpanded && (
                        <div className="history-item-details animate-slide-down">
                          <div className="divider mb-2"></div>
                          <ul className="details-exercise-list">
                            {log.exercises.map((ex, exIdx) => (
                              <li key={exIdx} className="details-exercise-item">
                                <span className="ex-name">{ex.name}</span>
                                <div className="ex-sets">
                                  {ex.sets.map((set, setIdx) => (
                                    <span key={setIdx} className="ex-set-pill">
                                      Set {setIdx + 1}: {set.weight}{unit} x {set.reps} reps
                                    </span>
                                  ))}
                                </div>
                              </li>
                            ))}
                          </ul>
                          <div className="details-footer mt-3 flex-end">
                            <button 
                              className="btn btn-danger-outline btn-small flex-center"
                              onClick={() => {
                                if (confirm('Are you sure you want to delete this workout log?')) {
                                  onDeleteHistoryItem(log.id);
                                }
                              }}
                            >
                              <Trash2 size={12} className="mr-1" /> Delete Log
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
