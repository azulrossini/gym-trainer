import { useState, useEffect } from 'react';
import { useAtom } from 'jotai';
import { exercisesAtom } from '@/atoms';
import { Exercise } from '@/types';
import { isSupabaseConfigured } from '@/lib/supabase';

export const useExercises = () => {
  const [exercises, setExercises] = useAtom(exercisesAtom);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const useAPI = isSupabaseConfigured();

  // Fetch exercises on mount
  useEffect(() => {
    if (useAPI) {
      fetchExercises();
    }
  }, [useAPI]);

  const fetchExercises = async () => {
    if (!useAPI) return;
    
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/exercises');
      if (!response.ok) {
        throw new Error('Failed to fetch exercises');
      }
      const data = await response.json();
      setExercises(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch exercises');
      console.error('Error fetching exercises:', err);
    } finally {
      setLoading(false);
    }
  };

  const addExercise = async (exercise: Omit<Exercise, 'id'>) => {
    if (useAPI) {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('/api/exercises', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(exercise),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to add exercise');
        }

        const newExercise = await response.json();
        setExercises([...exercises, newExercise]);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to add exercise');
        console.error('Error adding exercise:', err);
        throw err;
      } finally {
        setLoading(false);
      }
    } else {
      // localStorage fallback
      const newExercise: Exercise = {
        ...exercise,
        id: crypto.randomUUID(),
      };
      setExercises([...exercises, newExercise]);
    }
  };

  const updateExercise = async (id: string, updates: Partial<Exercise>) => {
    if (useAPI) {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/exercises/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updates),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to update exercise');
        }

        const updatedExercise = await response.json();
        setExercises(
          exercises.map((ex) => (ex.id === id ? updatedExercise : ex))
        );
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to update exercise');
        console.error('Error updating exercise:', err);
        throw err;
      } finally {
        setLoading(false);
      }
    } else {
      // localStorage fallback
      setExercises(
        exercises.map((ex) => (ex.id === id ? { ...ex, ...updates } : ex))
      );
    }
  };

  const deleteExercise = async (id: string) => {
    if (useAPI) {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/exercises/${id}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to delete exercise');
        }

        setExercises(exercises.filter((ex) => ex.id !== id));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to delete exercise');
        console.error('Error deleting exercise:', err);
        throw err;
      } finally {
        setLoading(false);
      }
    } else {
      // localStorage fallback
      setExercises(exercises.filter((ex) => ex.id !== id));
    }
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
    loading,
    error,
    refresh: fetchExercises,
  };
};
