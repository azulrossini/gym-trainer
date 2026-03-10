import { useState, useEffect } from 'react';
import { useAtom } from 'jotai';
import { workoutsAtom } from '@/atoms';
import { Workout } from '@/types';
import { isSupabaseConfigured } from '@/lib/supabase';

export const useWorkouts = () => {
  const [workouts, setWorkouts] = useAtom(workoutsAtom);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const useAPI = isSupabaseConfigured();

  // Fetch workouts on mount
  useEffect(() => {
    if (useAPI) {
      fetchWorkouts();
    }
  }, [useAPI]);

  const fetchWorkouts = async () => {
    if (!useAPI) return;
    
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/workouts');
      if (!response.ok) {
        throw new Error('Failed to fetch workouts');
      }
      const data = await response.json();
      
      // Convert created_at string to Date object
      const workoutsWithDates = data.map((workout: any) => ({
        ...workout,
        createdAt: new Date(workout.createdAt),
      }));
      
      setWorkouts(workoutsWithDates);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch workouts');
      console.error('Error fetching workouts:', err);
    } finally {
      setLoading(false);
    }
  };

  const addWorkout = async (workout: Omit<Workout, 'id' | 'createdAt'>) => {
    if (useAPI) {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('/api/workouts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(workout),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to add workout');
        }

        const newWorkout = await response.json();
        setWorkouts([
          { ...newWorkout, createdAt: new Date(newWorkout.createdAt) },
          ...workouts
        ]);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to add workout');
        console.error('Error adding workout:', err);
        throw err;
      } finally {
        setLoading(false);
      }
    } else {
      // localStorage fallback
      const newWorkout: Workout = {
        ...workout,
        id: crypto.randomUUID(),
        createdAt: new Date(),
      };
      setWorkouts([newWorkout, ...workouts]);
    }
  };

  const updateWorkout = async (id: string, updates: Partial<Workout>) => {
    if (useAPI) {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/workouts/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updates),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to update workout');
        }

        const updatedWorkout = await response.json();
        setWorkouts(
          workouts.map((wk) => 
            wk.id === id 
              ? { ...updatedWorkout, createdAt: new Date(updatedWorkout.createdAt) }
              : wk
          )
        );
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to update workout');
        console.error('Error updating workout:', err);
        throw err;
      } finally {
        setLoading(false);
      }
    } else {
      // localStorage fallback
      setWorkouts(
        workouts.map((wk) => (wk.id === id ? { ...wk, ...updates } : wk))
      );
    }
  };

  const deleteWorkout = async (id: string) => {
    if (useAPI) {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/workouts/${id}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to delete workout');
        }

        setWorkouts(workouts.filter((wk) => wk.id !== id));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to delete workout');
        console.error('Error deleting workout:', err);
        throw err;
      } finally {
        setLoading(false);
      }
    } else {
      // localStorage fallback
      setWorkouts(workouts.filter((wk) => wk.id !== id));
    }
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
    loading,
    error,
    refresh: fetchWorkouts,
  };
};
