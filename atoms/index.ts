import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { Exercise, Routine, Workout } from '@/types';
import { mockExercises, mockRoutines, mockWorkouts } from '@/data/mockData';

// Use atomWithStorage to persist data to localStorage
export const exercisesAtom = atomWithStorage<Exercise[]>('exercises', mockExercises);
export const routinesAtom = atomWithStorage<Routine[]>('routines', mockRoutines);
export const workoutsAtom = atomWithStorage<Workout[]>('workouts', mockWorkouts);

// Modal state atoms
export const isExerciseModalOpenAtom = atom<boolean>(false);
export const isRoutineModalOpenAtom = atom<boolean>(false);
export const isWorkoutModalOpenAtom = atom<boolean>(false);

// Edit state atoms
export const editingExerciseAtom = atom<Exercise | null>(null);
export const editingRoutineAtom = atom<Routine | null>(null);
export const editingWorkoutAtom = atom<Workout | null>(null);

// Theme atom - 'light' | 'dark'
export const themeAtom = atomWithStorage<'light' | 'dark'>('theme', 'dark');
