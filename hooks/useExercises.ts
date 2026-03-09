import { useAtom } from 'jotai';
import { exercisesAtom } from '@/atoms';
import { Exercise } from '@/types';
import { v4 as uuidv4 } from 'uuid';

export const useExercises = () => {
  const [exercises, setExercises] = useAtom(exercisesAtom);

  const addExercise = (exercise: Omit<Exercise, 'id'>) => {
    const newExercise: Exercise = {
      ...exercise,
      id: uuidv4(),
    };
    setExercises([...exercises, newExercise]);
  };

  const updateExercise = (id: string, updates: Partial<Exercise>) => {
    setExercises(
      exercises.map((ex) => (ex.id === id ? { ...ex, ...updates } : ex))
    );
  };

  const deleteExercise = (id: string) => {
    setExercises(exercises.filter((ex) => ex.id !== id));
  };

  const getExerciseById = (id: string) => {
    return exercises.find((ex) => ex.id === id);
  };

  return {
    exercises,
    addExercise,
    updateExercise,
    deleteExercise,
    getExerciseById,
  };
};
