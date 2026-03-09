import { useAtom } from 'jotai';
import { workoutsAtom } from '@/atoms';
import { Workout } from '@/types';
import { v4 as uuidv4 } from 'uuid';

export const useWorkouts = () => {
  const [workouts, setWorkouts] = useAtom(workoutsAtom);

  const addWorkout = (workout: Omit<Workout, 'id' | 'createdAt'>) => {
    const newWorkout: Workout = {
      ...workout,
      id: uuidv4(),
      createdAt: new Date(),
    };
    setWorkouts([...workouts, newWorkout]);
  };

  const updateWorkout = (id: string, updates: Partial<Workout>) => {
    setWorkouts(
      workouts.map((wk) => (wk.id === id ? { ...wk, ...updates } : wk))
    );
  };

  const deleteWorkout = (id: string) => {
    setWorkouts(workouts.filter((wk) => wk.id !== id));
  };

  const getWorkoutById = (id: string) => {
    return workouts.find((wk) => wk.id === id);
  };

  return {
    workouts,
    addWorkout,
    updateWorkout,
    deleteWorkout,
    getWorkoutById,
  };
};
