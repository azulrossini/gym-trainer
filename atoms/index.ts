import { atomWithStorage } from 'jotai/utils';
import { Exercise, Routine, Workout } from './types';

// Data atoms with localStorage persistence
export const exercisesAtom = atomWithStorage<Exercise[]>('exercises', []);
export const routinesAtom = atomWithStorage<Routine[]>('routines', []);
export const workoutsAtom = atomWithStorage<Workout[]>('workouts', []);

// Theme atom - default to dark
export const themeAtom = atomWithStorage<'light' | 'dark'>('theme', 'dark');
