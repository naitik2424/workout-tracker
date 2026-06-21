import React, { useState } from 'react';
import { UserPlus, LogIn, Dumbbell, Award, Flame } from 'lucide-react';
import { db } from '../utils/db';

const AVATARS = ['💪', '🏋️‍♂️', '🏃‍♂️', '🥊', '🚴‍♀️', '🧘‍♂️', '🏆', '🔥', '⚡', '🤖'];
const GOALS = [
  { name: 'Strength Training', value: 'Strength', desc: 'Focus on heavy lifts & power' },
  { name: 'Muscle Gain (Hypertrophy)', value: 'Hypertrophy', desc: 'Focus on volume & muscle growth' },
  { name: 'Weight Loss / Definition', value: 'Fat Loss', desc: 'High intensity & conditioning' },
  { name: 'General Health & Fitness', value: 'General', desc: 'Balanced health & longevity' }
];

export default function Auth({ onLoginSuccess }) {
  const [users, setUsers] = useState(() => db.getUsers());
  const [isRegistering, setIsRegistering] = useState(users.length === 0);
  const [username, setUsername] = useState('');
  const [goal, setGoal] = useState('Strength');
  const [unit, setUnit] = useState('kg');
  const [avatar, setAvatar] = useState('💪');
  const [error, setError] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();
    setError('');
    
    const trimmedName = username.trim();
    if (!trimmedName) {
      setError('Please enter a username.');
      return;
    }

    try {
      db.createUser(trimmedName, { goal, unit, avatar });
      const updatedUsers = db.getUsers();
      setUsers(updatedUsers);
      db.setCurrentUser(trimmedName);
      onLoginSuccess(trimmedName);
    } catch (err) {
      setError(err.message || 'An error occurred during sign up.');
    }
  };

  const handleSelectUser = (name) => {
    db.setCurrentUser(name);
    onLoginSuccess(name);
  };

  return (
    <div className="auth-container">
      <div className="auth-card glass-panel animate-fade-in">
        <div className="auth-header">
          <div className="logo-badge">
            <Dumbbell className="logo-icon animate-pulse-slow" />
          </div>
          <h1>IronPulse</h1>
          <p className="subtitle">Premium Workout Planner & Logger</p>
        </div>

        {error && <div className="auth-error">{error}</div>}

        {isRegistering ? (
          <form onSubmit={handleRegister} className="auth-form">
            <div className="form-group">
              <label htmlFor="username">Create Username</label>
              <input
                type="text"
                id="username"
                className="input-field"
                placeholder="e.g. Naitik"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                maxLength={15}
                required
              />
            </div>

            <div className="form-group">
              <label>Select Fitness Goal</label>
              <div className="goals-grid">
                {GOALS.map((g) => (
                  <button
                    type="button"
                    key={g.value}
                    className={`goal-btn ${goal === g.value ? 'active' : ''}`}
                    onClick={() => setGoal(g.value)}
                  >
                    <span className="goal-title">{g.name}</span>
                    <span className="goal-desc">{g.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group half">
                <label>Preferred Unit</label>
                <div className="toggle-group">
                  <button
                    type="button"
                    className={`toggle-btn ${unit === 'kg' ? 'active' : ''}`}
                    onClick={() => setUnit('kg')}
                  >
                    Metric (kg)
                  </button>
                  <button
                    type="button"
                    className={`toggle-btn ${unit === 'lbs' ? 'active' : ''}`}
                    onClick={() => setUnit('lbs')}
                  >
                    Imperial (lbs)
                  </button>
                </div>
              </div>

              <div className="form-group half">
                <label>Choose Avatar</label>
                <div className="avatar-selector">
                  <div className="selected-avatar">{avatar}</div>
                  <div className="avatar-dropdown glass-panel">
                    {AVATARS.map((av) => (
                      <button
                        type="button"
                        key={av}
                        className={`avatar-option ${avatar === av ? 'selected' : ''}`}
                        onClick={() => setAvatar(av)}
                      >
                        {av}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <button type="submit" className="btn btn-primary btn-full flex-center">
              <UserPlus size={18} className="mr-2" /> Create Profile
            </button>

            {users.length > 0 && (
              <button
                type="button"
                className="btn btn-link btn-full mt-2"
                onClick={() => setIsRegistering(false)}
              >
                Back to Profile Selection
              </button>
            )}
          </form>
        ) : (
          <div className="profile-selection">
            <h3 className="section-title text-center">Who is lifting today?</h3>
            <div className="profiles-grid">
              {users.map((u) => (
                <button
                  key={u.username}
                  className="profile-card glass-panel hover-glow"
                  onClick={() => handleSelectUser(u.username)}
                >
                  <div className="profile-avatar">{u.avatar}</div>
                  <div className="profile-info">
                    <span className="profile-name">{u.username}</span>
                    <span className="profile-goal-badge">{u.goal}</span>
                  </div>
                </button>
              ))}
            </div>

            <div className="auth-footer-actions">
              <button
                className="btn btn-outline btn-full flex-center"
                onClick={() => setIsRegistering(true)}
              >
                <UserPlus size={18} className="mr-2" /> Add Friend's Profile
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
