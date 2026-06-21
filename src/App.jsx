import React, { useState, useEffect } from 'react';
import { 
  Dumbbell, 
  LogOut, 
  LayoutDashboard, 
  Calendar, 
  Award, 
  Users, 
  ChevronDown 
} from 'lucide-react';
import { db } from './utils/db';
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';
import WeeklyPlanner from './components/WeeklyPlanner';
import ExerciseLogger from './components/ExerciseLogger';
import Recommendations from './components/Recommendations';

export default function App() {
  const [currentUsername, setCurrentUsername] = useState(() => db.getCurrentUser());
  const [activeTab, setActiveTab] = useState('dashboard');
  const [activeDay, setActiveDay] = useState(() => {
    return new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(new Date());
  });
  const [userData, setUserData] = useState(null);
  const [userMetadata, setUserMetadata] = useState(null);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [allUsers, setAllUsers] = useState([]);

  // Load user data when username changes
  useEffect(() => {
    const list = db.getUsers();
    setAllUsers(list);

    if (currentUsername) {
      const data = db.getUserData(currentUsername);
      setUserData(data);
      
      const meta = list.find(u => u.username.toLowerCase() === currentUsername.toLowerCase());
      setUserMetadata(meta || null);
    } else {
      setUserData(null);
      setUserMetadata(null);
    }
  }, [currentUsername]);

  const handleLoginSuccess = (username) => {
    setCurrentUsername(username);
    setActiveTab('dashboard');
  };

  const handleLogout = () => {
    db.setCurrentUser(null);
    setCurrentUsername(null);
    setShowProfileMenu(false);
  };

  const handleSwitchUser = (username) => {
    db.setCurrentUser(username);
    setCurrentUsername(username);
    setShowProfileMenu(false);
    setActiveTab('dashboard');
  };

  // Modify schedule exercises for a day
  const handleUpdateExercises = (day, newExercises) => {
    if (!currentUsername || !userData) return;
    
    const updatedData = {
      ...userData,
      schedule: {
        ...userData.schedule,
        [day]: {
          ...userData.schedule[day],
          exercises: newExercises
        }
      }
    };
    
    setUserData(updatedData);
    db.saveUserData(currentUsername, updatedData);
  };

  // Modify focus of a day
  const handleUpdateFocus = (day, newFocus) => {
    if (!currentUsername || !userData) return;

    // Reset exercises if changing to Rest Day
    const isRest = newFocus.trim().toLowerCase() === 'rest day';
    const newExercises = isRest ? [] : userData.schedule[day]?.exercises || [];

    const updatedData = {
      ...userData,
      schedule: {
        ...userData.schedule,
        [day]: {
          focus: newFocus,
          exercises: newExercises
        }
      }
    };

    setUserData(updatedData);
    db.saveUserData(currentUsername, updatedData);
  };

  // Copy routine from one day to another
  const handleCopyDay = (sourceDay, destDay) => {
    if (!currentUsername || !userData) return;

    const sourceData = userData.schedule[sourceDay];
    if (!sourceData) return;

    // Deep copy exercises and duplicate the focus
    const copiedExercises = JSON.parse(JSON.stringify(sourceData.exercises));

    const updatedData = {
      ...userData,
      schedule: {
        ...userData.schedule,
        [destDay]: {
          focus: sourceData.focus,
          exercises: copiedExercises
        }
      }
    };

    setUserData(updatedData);
    db.saveUserData(currentUsername, updatedData);
    alert(`Successfully copied ${sourceDay}'s schedule to ${destDay}!`);
  };

  // Import recommended routine
  const handleImportSuccess = (daysRoutine) => {
    if (!currentUsername) return;
    const updatedData = db.importRoutine(currentUsername, daysRoutine);
    setUserData(updatedData);
    setActiveTab('planner');
  };

  // Log completed workout to history
  const handleLogCompletion = (day) => {
    if (!currentUsername || !userData) return;
    
    const daySchedule = userData.schedule[day];
    if (!daySchedule) return;

    const updatedData = db.logWorkoutCompletion(
      currentUsername,
      day,
      daySchedule.focus,
      daySchedule.exercises
    );
    setUserData(updatedData);
  };

  // Delete specific history item
  const handleDeleteHistoryItem = (id) => {
    if (!currentUsername || !userData) return;
    
    const updatedHistory = userData.history.filter(log => log.id !== id);
    const updatedData = {
      ...userData,
      history: updatedHistory
    };

    setUserData(updatedData);
    db.saveUserData(currentUsername, updatedData);
  };

  // Quick navigation helper
  const handleNavigateToTab = (tab, day = null) => {
    setActiveTab(tab);
    if (day) {
      setActiveDay(day);
    }
  };

  // If not logged in, show auth screens
  if (!currentUsername || !userData || !userMetadata) {
    return <Auth onLoginSuccess={handleLoginSuccess} />;
  }

  const otherUsers = allUsers.filter(u => u.username.toLowerCase() !== currentUsername.toLowerCase());

  return (
    <div className="app-shell">
      {/* Top Navbar */}
      <header className="navbar glass-panel">
        <div className="nav-container">
          <div className="nav-logo" onClick={() => setActiveTab('dashboard')}>
            <Dumbbell className="logo-icon text-primary animate-pulse-slow" size={24} />
            <span className="logo-title font-header">IronPulse</span>
          </div>

          <nav className="nav-links">
            <button 
              className={`nav-link ${activeTab === 'dashboard' ? 'active' : ''}`}
              onClick={() => setActiveTab('dashboard')}
            >
              <LayoutDashboard size={18} />
              <span>Dashboard</span>
            </button>
            <button 
              className={`nav-link ${activeTab === 'planner' ? 'active' : ''}`}
              onClick={() => setActiveTab('planner')}
            >
              <Calendar size={18} />
              <span>Weekly Planner</span>
            </button>
            <button 
              className={`nav-link ${activeTab === 'recommendations' ? 'active' : ''}`}
              onClick={() => setActiveTab('recommendations')}
            >
              <Award size={18} />
              <span>Recommended Splits</span>
            </button>
          </nav>

          {/* Profile Switcher Menu */}
          <div className="nav-profile-section">
            <button 
              className="profile-menu-trigger glass-panel flex-center"
              onClick={() => setShowProfileMenu(!showProfileMenu)}
            >
              <span className="profile-badge-avatar">{userMetadata.avatar}</span>
              <span className="profile-badge-name">{userMetadata.username}</span>
              <ChevronDown size={14} className={`arrow-icon ${showProfileMenu ? 'open' : ''}`} />
            </button>

            {showProfileMenu && (
              <div className="profile-dropdown-menu glass-panel animate-zoom-in">
                <div className="dropdown-section">
                  <span className="dropdown-label">Active User</span>
                  <div className="current-user-info">
                    <span className="user-avatar">{userMetadata.avatar}</span>
                    <div className="user-details">
                      <strong>{userMetadata.username}</strong>
                      <span>{userMetadata.goal} Goal</span>
                    </div>
                  </div>
                </div>
                
                {otherUsers.length > 0 && (
                  <div className="dropdown-section border-top">
                    <span className="dropdown-label flex-center">
                      <Users size={12} className="mr-1" /> Switch Friends Profile
                    </span>
                    <div className="other-users-list">
                      {otherUsers.map(u => (
                        <button 
                          key={u.username}
                          className="switch-user-btn"
                          onClick={() => handleSwitchUser(u.username)}
                        >
                          <span>{u.avatar}</span>
                          <span>{u.username}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="dropdown-section border-top">
                  <button className="dropdown-action-btn text-danger flex-center" onClick={handleLogout}>
                    <LogOut size={14} className="mr-2" /> Log Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="app-main-content">
        {activeTab === 'dashboard' && (
          <Dashboard 
            currentUsername={currentUsername}
            userData={userData}
            userMetadata={userMetadata}
            onNavigateToTab={handleNavigateToTab}
            onDeleteHistoryItem={handleDeleteHistoryItem}
          />
        )}

        {activeTab === 'planner' && (
          <div className="planner-tab-layout container">
            <div className="planner-column-left">
              <WeeklyPlanner 
                schedule={userData.schedule}
                activeDay={activeDay}
                onSelectDay={setActiveDay}
                onChangeFocus={handleUpdateFocus}
                onCopyDay={handleCopyDay}
              />
            </div>
            
            <div className="planner-column-right">
              <ExerciseLogger 
                activeDay={activeDay}
                dayData={userData.schedule[activeDay]}
                onUpdateExercises={handleUpdateExercises}
                onLogCompletion={handleLogCompletion}
                unit={userMetadata.unit}
              />
            </div>
          </div>
        )}

        {activeTab === 'recommendations' && (
          <Recommendations 
            currentUsername={currentUsername}
            onImportSuccess={handleImportSuccess}
          />
        )}
      </main>

      {/* Aesthetic Background Orbs */}
      <div className="bg-orb orb-1"></div>
      <div className="bg-orb orb-2"></div>
    </div>
  );
}
