import { Exercise, Routine, Workout } from '@/types';

export const mockExercises: Exercise[] = [
  // Abs
  {
    id: 'ex-1',
    name: 'Crunches',
    description: 'Basic ab exercise lying on your back',
    category: 'abs',
    difficulty: 'beginner',
  },
  {
    id: 'ex-2',
    name: 'Plank',
    description: 'Hold a push-up position on your forearms',
    category: 'core',
    difficulty: 'beginner',
  },
  {
    id: 'ex-3',
    name: 'Mountain Climbers',
    description: 'Dynamic core and cardio exercise',
    category: 'core',
    difficulty: 'intermediate',
  },
  {
    id: 'ex-4',
    name: 'Russian Twists',
    description: 'Seated oblique rotation exercise',
    category: 'abs',
    difficulty: 'intermediate',
  },
  // Legs
  {
    id: 'ex-5',
    name: 'Squats',
    description: 'Basic lower body exercise',
    category: 'legs',
    difficulty: 'beginner',
  },
  {
    id: 'ex-6',
    name: 'Lunges',
    description: 'Single-leg lower body exercise',
    category: 'legs',
    difficulty: 'beginner',
  },
  {
    id: 'ex-7',
    name: 'Jump Squats',
    description: 'Explosive squat variation',
    category: 'legs',
    difficulty: 'advanced',
  },
  // Upper Body
  {
    id: 'ex-8',
    name: 'Push-ups',
    description: 'Classic chest and tricep exercise',
    category: 'chest',
    difficulty: 'beginner',
  },
  {
    id: 'ex-9',
    name: 'Pull-ups',
    description: 'Back and bicep exercise',
    category: 'back',
    difficulty: 'advanced',
  },
  {
    id: 'ex-10',
    name: 'Dumbbell Curls',
    description: 'Bicep isolation exercise',
    category: 'arms',
    difficulty: 'beginner',
  },
  {
    id: 'ex-11',
    name: 'Shoulder Press',
    description: 'Overhead pressing movement',
    category: 'shoulders',
    difficulty: 'intermediate',
  },
  // Cardio
  {
    id: 'ex-12',
    name: 'Burpees',
    description: 'Full body cardio exercise',
    category: 'cardio',
    difficulty: 'intermediate',
  },
  {
    id: 'ex-13',
    name: 'Jumping Jacks',
    description: 'Simple cardio warm-up',
    category: 'cardio',
    difficulty: 'beginner',
  },
];

export const mockRoutines: Routine[] = [
  {
    id: 'rt-1',
    name: 'Core Blast EMOM',
    type: 'EMOM',
    duration: 12,
    description: 'Every minute on the minute core workout',
    exercises: [
      { exerciseId: 'ex-1', reps: 20 },
      { exerciseId: 'ex-2', duration: 30 },
      { exerciseId: 'ex-4', reps: 15 },
    ],
  },
  {
    id: 'rt-2',
    name: 'Lower Body AMRAP',
    type: 'AMRAP',
    duration: 10,
    description: 'As many rounds as possible in 10 minutes',
    exercises: [
      { exerciseId: 'ex-5', reps: 15 },
      { exerciseId: 'ex-6', reps: 10 },
      { exerciseId: 'ex-7', reps: 8 },
    ],
  },
  {
    id: 'rt-3',
    name: 'Upper Body Circuit',
    type: 'Just Minutes',
    duration: 15,
    description: 'Timed upper body workout',
    exercises: [
      { exerciseId: 'ex-8', reps: 12 },
      { exerciseId: 'ex-10', reps: 15 },
      { exerciseId: 'ex-11', reps: 10 },
    ],
  },
  {
    id: 'rt-4',
    name: 'Cardio Finisher',
    type: 'AMRAP',
    duration: 8,
    description: 'High intensity cardio',
    exercises: [
      { exerciseId: 'ex-12', reps: 10 },
      { exerciseId: 'ex-13', reps: 20 },
      { exerciseId: 'ex-3', reps: 15 },
    ],
  },
  {
    id: 'rt-5',
    name: 'Full Body EMOM',
    type: 'EMOM',
    duration: 10,
    description: 'Every minute mixed movements',
    exercises: [
      { exerciseId: 'ex-5', reps: 12 },
      { exerciseId: 'ex-8', reps: 10 },
      { exerciseId: 'ex-2', duration: 30 },
    ],
  },
  {
    id: 'rt-6',
    name: 'Quick Abs',
    type: 'Just Minutes',
    duration: 8,
    description: 'Quick ab workout',
    exercises: [
      { exerciseId: 'ex-1', reps: 25 },
      { exerciseId: 'ex-4', reps: 20 },
      { exerciseId: 'ex-2', duration: 45 },
    ],
  },
];

export const mockWorkouts: Workout[] = [
  {
    id: 'wk-1',
    name: 'Full Body Burner',
    description: 'Complete full body workout',
    routines: ['rt-1', 'rt-2', 'rt-3'],
    totalDuration: 37,
    createdAt: new Date('2026-03-01'),
  },
  {
    id: 'wk-2',
    name: 'Power Hour',
    description: 'High intensity training session',
    routines: ['rt-4', 'rt-5', 'rt-6'],
    totalDuration: 26,
    createdAt: new Date('2026-03-05'),
  },
];
