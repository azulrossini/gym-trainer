export type ExerciseCategory = 'abs' | 'core' | 'legs' | 'chest' | 'back' | 'arms' | 'shoulders' | 'cardio';

export type ExerciseDifficulty = 'beginner' | 'intermediate' | 'advanced';

export type RoutineType = 'EMOM' | 'AMRAP' | 'Just Minutes';

export interface Exercise {
  id: string;
  name: string;
  description: string;
  category: ExerciseCategory;
  difficulty: ExerciseDifficulty;
}

export interface RoutineExercise {
  exerciseId: string;
  reps?: number;
  duration?: number; // in seconds
  notes?: string;
}

export interface Routine {
  id: string;
  name: string;
  type: RoutineType;
  duration: number; // in minutes
  exercises: RoutineExercise[];
  description?: string;
}

export interface Workout {
  id: string;
  name: string;
  description?: string;
  routines: string[]; // routine IDs (must have at least 3)
  totalDuration: number; // in minutes (30-40)
  createdAt: Date;
}
