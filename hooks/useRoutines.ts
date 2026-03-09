import { useAtom } from 'jotai';
import { routinesAtom } from '@/atoms';
import { Routine } from '@/types';
import { v4 as uuidv4 } from 'uuid';

export const useRoutines = () => {
  const [routines, setRoutines] = useAtom(routinesAtom);

  const addRoutine = (routine: Omit<Routine, 'id'>) => {
    const newRoutine: Routine = {
      ...routine,
      id: uuidv4(),
    };
    setRoutines([...routines, newRoutine]);
  };

  const updateRoutine = (id: string, updates: Partial<Routine>) => {
    setRoutines(
      routines.map((rt) => (rt.id === id ? { ...rt, ...updates } : rt))
    );
  };

  const deleteRoutine = (id: string) => {
    setRoutines(routines.filter((rt) => rt.id !== id));
  };

  const getRoutineById = (id: string) => {
    return routines.find((rt) => rt.id === id);
  };

  return {
    routines,
    addRoutine,
    updateRoutine,
    deleteRoutine,
    getRoutineById,
  };
};
