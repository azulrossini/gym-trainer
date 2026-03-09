import { atomWithStorage } from 'jotai/utils';
import { Exercise, Routine, Workout } from '@/types';
import { mockExercises, mockRoutines, mockWorkouts } from '@/data/mockData';

// Data atoms with localStorage persistence - initialized with mock data
export const exercisesAtom = atomWithStorage<Exercise[]>('exercises', mockExercises);
export const routinesAtom = atomWithStorage<Routine[]>('routines', mockRoutines);
export const workoutsAtom = atomWithStorage<Workout[]>('workouts', mockWorkouts);

// Theme atom - default to dark
export const themeAtom = atomWithStorage<'light' | 'dark'>('theme', 'dark');
