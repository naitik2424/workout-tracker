const USERS_KEY = 'ironpulse_users';
const CURRENT_USER_KEY = 'ironpulse_current_user';
const DATA_PREFIX = 'ironpulse_data_';

const DEFAULT_DAYS = {
  'Monday': { focus: 'Rest Day', exercises: [] },
  'Tuesday': { focus: 'Rest Day', exercises: [] },
  'Wednesday': { focus: 'Rest Day', exercises: [] },
  'Thursday': { focus: 'Rest Day', exercises: [] },
  'Friday': { focus: 'Rest Day', exercises: [] },
  'Saturday': { focus: 'Rest Day', exercises: [] },
  'Sunday': { focus: 'Rest Day', exercises: [] }
};

export const db = {
  // Get all registered users
  getUsers() {
    const usersJson = localStorage.getItem(USERS_KEY);
    return usersJson ? JSON.parse(usersJson) : [];
  },

  // Get current active username
  getCurrentUser() {
    return localStorage.getItem(CURRENT_USER_KEY) || null;
  },

  // Set active user
  setCurrentUser(username) {
    if (username) {
      localStorage.setItem(CURRENT_USER_KEY, username);
    } else {
      localStorage.removeItem(CURRENT_USER_KEY);
    }
  },

  // Create a new user account
  createUser(username, { goal = 'Strength', unit = 'kg', avatar = '⚡' } = {}) {
    const users = this.getUsers();
    
    // Check if user already exists
    if (users.some(u => u.username.toLowerCase() === username.toLowerCase())) {
      throw new Error('User already exists!');
    }

    const newUser = {
      username,
      goal,
      unit,
      avatar,
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));

    // Initialize default workout data for the user
    const defaultData = {
      schedule: JSON.parse(JSON.stringify(DEFAULT_DAYS)),
      history: [], // Completed sessions log
      streak: 0,
      lastActive: null
    };
    localStorage.setItem(`${DATA_PREFIX}${username}`, JSON.stringify(defaultData));
    
    return newUser;
  },

  // Update user profile metadata
  updateUserProfile(username, updates) {
    const users = this.getUsers();
    const index = users.findIndex(u => u.username.toLowerCase() === username.toLowerCase());
    if (index !== -1) {
      users[index] = { ...users[index], ...updates };
      localStorage.setItem(USERS_KEY, JSON.stringify(users));
      return users[index];
    }
    return null;
  },

  // Get data for a user
  getUserData(username) {
    const dataJson = localStorage.getItem(`${DATA_PREFIX}${username}`);
    if (dataJson) {
      return JSON.parse(dataJson);
    }
    // Fallback if user key exists but data is missing
    const defaultData = {
      schedule: JSON.parse(JSON.stringify(DEFAULT_DAYS)),
      history: [],
      streak: 0,
      lastActive: null
    };
    localStorage.setItem(`${DATA_PREFIX}${username}`, JSON.stringify(defaultData));
    return defaultData;
  },

  // Save data for a user
  saveUserData(username, data) {
    localStorage.setItem(`${DATA_PREFIX}${username}`, JSON.stringify(data));
  },

  // Import a workout routine into user's schedule
  importRoutine(username, daysRoutine) {
    const userData = this.getUserData(username);
    
    // Map over days and override with routine
    const newSchedule = JSON.parse(JSON.stringify(DEFAULT_DAYS));
    Object.keys(daysRoutine).forEach(day => {
      if (newSchedule[day]) {
        newSchedule[day] = {
          focus: daysRoutine[day].focus,
          exercises: daysRoutine[day].exercises.map(ex => ({
            name: ex.name,
            // Pre-fill sets. If none, add an empty default set
            sets: ex.sets && ex.sets.length > 0 
              ? ex.sets.map(s => ({ ...s, completed: false }))
              : [{ weight: 0, reps: 0, targetWeight: 0, targetReps: 0, completed: false }]
          }))
        };
      }
    });

    userData.schedule = newSchedule;
    this.saveUserData(username, userData);
    return userData;
  },

  // Record a completed workout day into history
  logWorkoutCompletion(username, dayName, focus, exercises) {
    const userData = this.getUserData(username);
    
    // Create history item
    const completedWorkout = {
      id: Math.random().toString(36).substring(2, 9),
      date: new Date().toISOString(),
      dayName,
      focus,
      exercises: JSON.parse(JSON.stringify(exercises)) // Deep copy
    };

    userData.history.unshift(completedWorkout); // Newest first

    // Update streak logic
    const todayStr = new Date().toDateString();
    if (userData.lastActive) {
      const lastActiveDate = new Date(userData.lastActive);
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      
      if (lastActiveDate.toDateString() === yesterday.toDateString()) {
        userData.streak += 1;
      } else if (lastActiveDate.toDateString() !== todayStr) {
        userData.streak = 1; // Reset to 1 if streak was broken
      }
    } else {
      userData.streak = 1;
    }
    userData.lastActive = todayStr;

    // Reset completion checkboxes on active schedule for next week
    const daySchedule = userData.schedule[dayName];
    if (daySchedule) {
      daySchedule.exercises.forEach(ex => {
        ex.sets.forEach(set => {
          // Carry target weight/reps as the base weight/reps for next time
          if (set.completed) {
            set.weight = set.targetWeight || set.weight;
            set.reps = set.targetReps || set.reps;
          }
          set.completed = false;
        });
      });
    }

    this.saveUserData(username, userData);
    return userData;
  }
};
