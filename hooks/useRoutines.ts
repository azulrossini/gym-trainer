import { useState, useEffect } from 'react';
import { useAtom } from 'jotai';
import { routinesAtom } from '@/atoms';
import { Routine } from '@/types';
import { isSupabaseConfigured } from '@/lib/supabase';

export const useRoutines = () => {
  const [routines, setRoutines] = useAtom(routinesAtom);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const useAPI = isSupabaseConfigured();

  // Fetch routines on mount
  useEffect(() => {
    if (useAPI) {
      fetchRoutines();
    }
  }, [useAPI]);

  const fetchRoutines = async () => {
    if (!useAPI) return;
    
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/routines');
      if (!response.ok) {
        throw new Error('Failed to fetch routines');
      }
      const data = await response.json();
      setRoutines(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch routines');
      console.error('Error fetching routines:', err);
    } finally {
      setLoading(false);
    }
  };

  const addRoutine = async (routine: Omit<Routine, 'id'>) => {
    if (useAPI) {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('/api/routines', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(routine),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to add routine');
        }

        const newRoutine = await response.json();
        setRoutines([...routines, newRoutine]);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to add routine');
        console.error('Error adding routine:', err);
        throw err;
      } finally {
        setLoading(false);
      }
    } else {
      // localStorage fallback
      const newRoutine: Routine = {
        ...routine,
        id: crypto.randomUUID(),
      };
      setRoutines([...routines, newRoutine]);
    }
  };

  const updateRoutine = async (id: string, updates: Partial<Routine>) => {
    if (useAPI) {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/routines/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updates),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to update routine');
        }

        const updatedRoutine = await response.json();
        setRoutines(
          routines.map((rt) => (rt.id === id ? updatedRoutine : rt))
        );
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to update routine');
        console.error('Error updating routine:', err);
        throw err;
      } finally {
        setLoading(false);
      }
    } else {
      // localStorage fallback
      setRoutines(
        routines.map((rt) => (rt.id === id ? { ...rt, ...updates } : rt))
      );
    }
  };

  const deleteRoutine = async (id: string) => {
    if (useAPI) {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/routines/${id}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to delete routine');
        }

        setRoutines(routines.filter((rt) => rt.id !== id));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to delete routine');
        console.error('Error deleting routine:', err);
        throw err;
      } finally {
        setLoading(false);
      }
    } else {
      // localStorage fallback
      setRoutines(routines.filter((rt) => rt.id !== id));
    }
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
    loading,
    error,
    refresh: fetchRoutines,
  };
};
