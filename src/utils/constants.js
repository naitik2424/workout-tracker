export const BODY_PARTS = [
  'Chest',
  'Back',
  'Legs',
  'Shoulders',
  'Arms',
  'Core',
  'Cardio',
  'Rest Day'
];

export const PRESET_EXERCISES = {
  'Chest': [
    'Flat Bench Press (Barbell)',
    'Incline Dumbbell Press',
    'Decline Bench Press',
    'Cable Chest Crossover',
    'Dumbbell Chest Fly',
    'Weighted Chest Dips',
    'Push-Ups'
  ],
  'Back': [
    'Conventional Deadlift',
    'Pull-Ups (Wide Grip)',
    'Lat Pulldown (Cable)',
    'Bent Over Barbell Row',
    'Seated Cable Row',
    'Single-Arm Dumbbell Row',
    'Face Pulls'
  ],
  'Legs': [
    'Barbell Back Squat',
    'Leg Press (45 Degree)',
    'Romanian Deadlift (Dumbbell)',
    'Lying Leg Curl',
    'Leg Extensions',
    'Standing Calf Raises',
    'Walking Dumbbell Lunges'
  ],
  'Shoulders': [
    'Overhead Barbell Press',
    'Seated Dumbbell Shoulder Press',
    'Dumbbell Lateral Raise',
    'Dumbbell Front Raise',
    'Rear Delt Dumbbell Fly',
    'Barbell Shrugs'
  ],
  'Arms': [
    'Dumbbell Bicep Curl',
    'Incline Dumbbell Curl',
    'Barbell Preacher Curl',
    'Triceps Rope Pushdown',
    'Overhead Dumbbell Triceps Extension',
    'Lying Triceps Extension (Skull Crusher)',
    'Close-Grip Barbell Bench Press'
  ],
  'Core': [
    'Abdominal Crunch',
    'Hanging Knee Raise',
    'Plank (Hold for Time)',
    'Russian Twist',
    'Ab Wheel Rollout'
  ],
  'Cardio': [
    'Treadmill Running',
    'Stationary Cycling',
    'Elliptical Trainer',
    'Rowing Machine',
    'Jump Rope'
  ],
  'Rest Day': [
    'Active Stretching',
    'Foam Rolling',
    'Light Walking',
    'Complete Rest'
  ]
};

export const RECOMMENDED_ROUTINES = [
  {
    id: 'ppl',
    name: 'Push-Pull-Legs (PPL) Split',
    description: 'A classic 6-day split designed to build muscle mass. Alternates between pushing muscles, pulling muscles, and legs.',
    difficulty: 'Intermediate',
    days: {
      'Monday': {
        focus: 'Chest & Shoulders',
        exercises: [
          { name: 'Flat Bench Press (Barbell)', sets: [{ weight: 60, reps: 8, targetWeight: 62.5, targetReps: 8, completed: false }] },
          { name: 'Overhead Barbell Press', sets: [{ weight: 40, reps: 8, targetWeight: 42.5, targetReps: 8, completed: false }] },
          { name: 'Incline Dumbbell Press', sets: [{ weight: 22, reps: 10, targetWeight: 24, targetReps: 10, completed: false }] },
          { name: 'Dumbbell Lateral Raise', sets: [{ weight: 10, reps: 12, targetWeight: 12, targetReps: 12, completed: false }] },
          { name: 'Triceps Rope Pushdown', sets: [{ weight: 20, reps: 12, targetWeight: 22.5, targetReps: 12, completed: false }] }
        ]
      },
      'Tuesday': {
        focus: 'Back & Biceps',
        exercises: [
          { name: 'Pull-Ups (Wide Grip)', sets: [{ weight: 0, reps: 8, targetWeight: 0, targetReps: 10, completed: false }] },
          { name: 'Bent Over Barbell Row', sets: [{ weight: 50, reps: 8, targetWeight: 55, targetReps: 8, completed: false }] },
          { name: 'Lat Pulldown (Cable)', sets: [{ weight: 45, reps: 10, targetWeight: 50, targetReps: 10, completed: false }] },
          { name: 'Dumbbell Bicep Curl', sets: [{ weight: 12, reps: 10, targetWeight: 14, targetReps: 10, completed: false }] },
          { name: 'Face Pulls', sets: [{ weight: 15, reps: 15, targetWeight: 17.5, targetReps: 15, completed: false }] }
        ]
      },
      'Wednesday': {
        focus: 'Legs & Core',
        exercises: [
          { name: 'Barbell Back Squat', sets: [{ weight: 80, reps: 8, targetWeight: 85, targetReps: 8, completed: false }] },
          { name: 'Romanian Deadlift (Dumbbell)', sets: [{ weight: 24, reps: 10, targetWeight: 26, targetReps: 10, completed: false }] },
          { name: 'Leg Press (45 Degree)', sets: [{ weight: 120, reps: 10, targetWeight: 130, targetReps: 10, completed: false }] },
          { name: 'Plank (Hold for Time)', sets: [{ weight: 0, reps: 60, targetWeight: 0, targetReps: 90, completed: false }] }
        ]
      },
      'Thursday': {
        focus: 'Rest Day',
        exercises: [
          { name: 'Active Stretching', sets: [{ weight: 0, reps: 15, targetWeight: 0, targetReps: 20, completed: false }] }
        ]
      },
      'Friday': {
        focus: 'Chest & Shoulders',
        exercises: [
          { name: 'Incline Dumbbell Press', sets: [{ weight: 24, reps: 8, targetWeight: 26, targetReps: 8, completed: false }] },
          { name: 'Dumbbell Chest Fly', sets: [{ weight: 14, reps: 10, targetWeight: 16, targetReps: 10, completed: false }] },
          { name: 'Seated Dumbbell Shoulder Press', sets: [{ weight: 18, reps: 10, targetWeight: 20, targetReps: 10, completed: false }] },
          { name: 'Triceps Rope Pushdown', sets: [{ weight: 22.5, reps: 10, targetWeight: 25, targetReps: 10, completed: false }] }
        ]
      },
      'Saturday': {
        focus: 'Back & Biceps',
        exercises: [
          { name: 'Conventional Deadlift', sets: [{ weight: 100, reps: 5, targetWeight: 105, targetReps: 5, completed: false }] },
          { name: 'Seated Cable Row', sets: [{ weight: 50, reps: 10, targetWeight: 55, targetReps: 10, completed: false }] },
          { name: 'Incline Dumbbell Curl', sets: [{ weight: 12, reps: 10, targetWeight: 14, targetReps: 10, completed: false }] },
          { name: 'Hanging Knee Raise', sets: [{ weight: 0, reps: 12, targetWeight: 0, targetReps: 15, completed: false }] }
        ]
      },
      'Sunday': {
        focus: 'Rest Day',
        exercises: [
          { name: 'Complete Rest', sets: [{ weight: 0, reps: 1, targetWeight: 0, targetReps: 1, completed: false }] }
        ]
      }
    }
  },
  {
    id: 'arnold',
    name: 'Arnold Golden Era Split',
    description: 'The famous high-volume split popularized by Arnold Schwarzenegger. Focuses on chest/back pairing for incredible pumps.',
    difficulty: 'Advanced',
    days: {
      'Monday': {
        focus: 'Chest & Back',
        exercises: [
          { name: 'Flat Bench Press (Barbell)', sets: [{ weight: 70, reps: 8, targetWeight: 75, targetReps: 8, completed: false }] },
          { name: 'Bent Over Barbell Row', sets: [{ weight: 60, reps: 8, targetWeight: 65, targetReps: 8, completed: false }] },
          { name: 'Incline Dumbbell Press', sets: [{ weight: 26, reps: 8, targetWeight: 28, targetReps: 8, completed: false }] },
          { name: 'Pull-Ups (Wide Grip)', sets: [{ weight: 0, reps: 8, targetWeight: 0, targetReps: 10, completed: false }] }
        ]
      },
      'Tuesday': {
        focus: 'Shoulders & Arms',
        exercises: [
          { name: 'Seated Dumbbell Shoulder Press', sets: [{ weight: 20, reps: 8, targetWeight: 22, targetReps: 8, completed: false }] },
          { name: 'Dumbbell Bicep Curl', sets: [{ weight: 14, reps: 10, targetWeight: 16, targetReps: 10, completed: false }] },
          { name: 'Lying Triceps Extension (Skull Crusher)', sets: [{ weight: 25, reps: 10, targetWeight: 27.5, targetReps: 10, completed: false }] },
          { name: 'Dumbbell Lateral Raise', sets: [{ weight: 12, reps: 12, targetWeight: 14, targetReps: 12, completed: false }] }
        ]
      },
      'Wednesday': {
        focus: 'Legs',
        exercises: [
          { name: 'Barbell Back Squat', sets: [{ weight: 90, reps: 8, targetWeight: 95, targetReps: 8, completed: false }] },
          { name: 'Romanian Deadlift (Dumbbell)', sets: [{ weight: 26, reps: 10, targetWeight: 28, targetReps: 10, completed: false }] },
          { name: 'Standing Calf Raises', sets: [{ weight: 40, reps: 15, targetWeight: 45, targetReps: 15, completed: false }] }
        ]
      },
      'Thursday': {
        focus: 'Chest & Back',
        exercises: [
          { name: 'Dumbbell Chest Fly', sets: [{ weight: 16, reps: 10, targetWeight: 18, targetReps: 10, completed: false }] },
          { name: 'Seated Cable Row', sets: [{ weight: 55, reps: 10, targetWeight: 60, targetReps: 10, completed: false }] },
          { name: 'Weighted Chest Dips', sets: [{ weight: 10, reps: 8, targetWeight: 12.5, targetReps: 8, completed: false }] },
          { name: 'Lat Pulldown (Cable)', sets: [{ weight: 50, reps: 10, targetWeight: 55, targetReps: 10, completed: false }] }
        ]
      },
      'Friday': {
        focus: 'Shoulders & Arms',
        exercises: [
          { name: 'Overhead Barbell Press', sets: [{ weight: 45, reps: 8, targetWeight: 47.5, targetReps: 8, completed: false }] },
          { name: 'Barbell Preacher Curl', sets: [{ weight: 25, reps: 10, targetWeight: 27.5, targetReps: 10, completed: false }] },
          { name: 'Triceps Rope Pushdown', sets: [{ weight: 22.5, reps: 12, targetWeight: 25, targetReps: 12, completed: false }] },
          { name: 'Rear Delt Dumbbell Fly', sets: [{ weight: 10, reps: 15, targetWeight: 12, targetReps: 15, completed: false }] }
        ]
      },
      'Saturday': {
        focus: 'Legs & Core',
        exercises: [
          { name: 'Leg Press (45 Degree)', sets: [{ weight: 140, reps: 10, targetWeight: 150, targetReps: 10, completed: false }] },
          { name: 'Lying Leg Curl', sets: [{ weight: 35, reps: 12, targetWeight: 40, targetReps: 12, completed: false }] },
          { name: 'Ab Wheel Rollout', sets: [{ weight: 0, reps: 10, targetWeight: 0, targetReps: 12, completed: false }] }
        ]
      },
      'Sunday': {
        focus: 'Rest Day',
        exercises: [
          { name: 'Complete Rest', sets: [{ weight: 0, reps: 1, targetWeight: 0, targetReps: 1, completed: false }] }
        ]
      }
    }
  },
  {
    id: 'upperlower',
    name: 'Upper / Lower Split',
    description: 'An efficient 4-day split that balances chest/back and lower body training. Perfect for busy schedules.',
    difficulty: 'Beginner-Friendly',
    days: {
      'Monday': {
        focus: 'Upper Body',
        exercises: [
          { name: 'Flat Bench Press (Barbell)', sets: [{ weight: 50, reps: 10, targetWeight: 52.5, targetReps: 10, completed: false }] },
          { name: 'Bent Over Barbell Row', sets: [{ weight: 40, reps: 10, targetWeight: 45, targetReps: 10, completed: false }] },
          { name: 'Overhead Barbell Press', sets: [{ weight: 30, reps: 10, targetWeight: 32.5, targetReps: 10, completed: false }] },
          { name: 'Dumbbell Bicep Curl', sets: [{ weight: 10, reps: 12, targetWeight: 12, targetReps: 12, completed: false }] }
        ]
      },
      'Tuesday': {
        focus: 'Lower Body',
        exercises: [
          { name: 'Barbell Back Squat', sets: [{ weight: 60, reps: 10, targetWeight: 65, targetReps: 10, completed: false }] },
          { name: 'Romanian Deadlift (Dumbbell)', sets: [{ weight: 20, reps: 10, targetWeight: 22, targetReps: 10, completed: false }] },
          { name: 'Lying Leg Curl', sets: [{ weight: 30, reps: 12, targetWeight: 32.5, targetReps: 12, completed: false }] },
          { name: 'Plank (Hold for Time)', sets: [{ weight: 0, reps: 45, targetWeight: 0, targetReps: 60, completed: false }] }
        ]
      },
      'Wednesday': {
        focus: 'Rest Day',
        exercises: [
          { name: 'Light Walking', sets: [{ weight: 0, reps: 30, targetWeight: 0, targetReps: 45, completed: false }] }
        ]
      },
      'Thursday': {
        focus: 'Upper Body',
        exercises: [
          { name: 'Incline Dumbbell Press', sets: [{ weight: 18, reps: 10, targetWeight: 20, targetReps: 10, completed: false }] },
          { name: 'Lat Pulldown (Cable)', sets: [{ weight: 40, reps: 10, targetWeight: 45, targetReps: 10, completed: false }] },
          { name: 'Dumbbell Lateral Raise', sets: [{ weight: 8, reps: 15, targetWeight: 10, targetReps: 15, completed: false }] },
          { name: 'Triceps Rope Pushdown', sets: [{ weight: 15, reps: 12, targetWeight: 17.5, targetReps: 12, completed: false }] }
        ]
      },
      'Friday': {
        focus: 'Lower Body',
        exercises: [
          { name: 'Leg Press (45 Degree)', sets: [{ weight: 100, reps: 12, targetWeight: 110, targetReps: 12, completed: false }] },
          { name: 'Walking Dumbbell Lunges', sets: [{ weight: 12, reps: 10, targetWeight: 14, targetReps: 10, completed: false }] },
          { name: 'Standing Calf Raises', sets: [{ weight: 30, reps: 15, targetWeight: 35, targetReps: 15, completed: false }] },
          { name: 'Abdominal Crunch', sets: [{ weight: 0, reps: 15, targetWeight: 0, targetReps: 20, completed: false }] }
        ]
      },
      'Saturday': {
        focus: 'Rest Day',
        exercises: [
          { name: 'Foam Rolling', sets: [{ weight: 0, reps: 15, targetWeight: 0, targetReps: 20, completed: false }] }
        ]
      },
      'Sunday': {
        focus: 'Rest Day',
        exercises: [
          { name: 'Complete Rest', sets: [{ weight: 0, reps: 1, targetWeight: 0, targetReps: 1, completed: false }] }
        ]
      }
    }
  },
  {
    id: 'fullbody',
    name: 'Full Body Novice Program',
    description: 'A 3-day workout focusing on major compound movements. Highly recommended for absolute beginners.',
    difficulty: 'Beginner-Friendly',
    days: {
      'Monday': {
        focus: 'Full Body A',
        exercises: [
          { name: 'Barbell Back Squat', sets: [{ weight: 50, reps: 8, targetWeight: 55, targetReps: 8, completed: false }] },
          { name: 'Flat Bench Press (Barbell)', sets: [{ weight: 40, reps: 8, targetWeight: 42.5, targetReps: 8, completed: false }] },
          { name: 'Bent Over Barbell Row', sets: [{ weight: 30, reps: 8, targetWeight: 35, targetReps: 8, completed: false }] },
          { name: 'Plank (Hold for Time)', sets: [{ weight: 0, reps: 45, targetWeight: 0, targetReps: 60, completed: false }] }
        ]
      },
      'Tuesday': {
        focus: 'Rest Day',
        exercises: [
          { name: 'Light Walking', sets: [{ weight: 0, reps: 20, targetWeight: 0, targetReps: 30, completed: false }] }
        ]
      },
      'Wednesday': {
        focus: 'Full Body B',
        exercises: [
          { name: 'Conventional Deadlift', sets: [{ weight: 60, reps: 5, targetWeight: 65, targetReps: 5, completed: false }] },
          { name: 'Overhead Barbell Press', sets: [{ weight: 25, reps: 8, targetWeight: 27.5, targetReps: 8, completed: false }] },
          { name: 'Lat Pulldown (Cable)', sets: [{ weight: 35, reps: 10, targetWeight: 40, targetReps: 10, completed: false }] },
          { name: 'Russian Twist', sets: [{ weight: 0, reps: 12, targetWeight: 0, targetReps: 15, completed: false }] }
        ]
      },
      'Thursday': {
        focus: 'Rest Day',
        exercises: [
          { name: 'Light Walking', sets: [{ weight: 0, reps: 20, targetWeight: 0, targetReps: 30, completed: false }] }
        ]
      },
      'Friday': {
        focus: 'Full Body C',
        exercises: [
          { name: 'Barbell Back Squat', sets: [{ weight: 52.5, reps: 8, targetWeight: 55, targetReps: 8, completed: false }] },
          { name: 'Incline Dumbbell Press', sets: [{ weight: 14, reps: 10, targetWeight: 16, targetReps: 10, completed: false }] },
          { name: 'Pull-Ups (Wide Grip)', sets: [{ weight: 0, reps: 6, targetWeight: 0, targetReps: 8, completed: false }] },
          { name: 'Dumbbell Bicep Curl', sets: [{ weight: 8, reps: 12, targetWeight: 10, targetReps: 12, completed: false }] }
        ]
      },
      'Saturday': {
        focus: 'Rest Day',
        exercises: [
          { name: 'Complete Rest', sets: [{ weight: 0, reps: 1, targetWeight: 0, targetReps: 1, completed: false }] }
        ]
      },
      'Sunday': {
        focus: 'Rest Day',
        exercises: [
          { name: 'Complete Rest', sets: [{ weight: 0, reps: 1, targetWeight: 0, targetReps: 1, completed: false }] }
        ]
      }
    }
  }
];
