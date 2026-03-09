'use client';

import { useState, useEffect } from 'react';
import { Routine, RoutineType, RoutineExercise } from '@/types';
import { useExercises } from '@/hooks/useExercises';

interface RoutineFormProps {
  routine?: Routine | null;
  onSave: (routine: Omit<Routine, 'id'>) => void;
  onCancel: () => void;
}

const routineTypes: RoutineType[] = ['EMOM', 'AMRAP', 'Just Minutes'];

export default function RoutineForm({ routine, onSave, onCancel }: RoutineFormProps) {
  const { exercises } = useExercises();
  const [formData, setFormData] = useState({
    name: '',
    type: 'EMOM' as RoutineType,
    duration: 10,
    description: '',
    exercises: [] as RoutineExercise[],
  });

  useEffect(() => {
    if (routine) {
      setFormData({
        name: routine.name,
        type: routine.type,
        duration: routine.duration,
        description: routine.description || '',
        exercises: routine.exercises,
      });
    }
  }, [routine]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.exercises.length === 0) {
      alert('Please add at least one exercise to the routine');
      return;
    }
    onSave(formData);
  };

  const addExercise = () => {
    if (exercises.length === 0) {
      alert('Please create some exercises first');
      return;
    }
    setFormData({
      ...formData,
      exercises: [
        ...formData.exercises,
        { exerciseId: exercises[0].id, reps: 10 },
      ],
    });
  };

  const removeExercise = (index: number) => {
    setFormData({
      ...formData,
      exercises: formData.exercises.filter((_, i) => i !== index),
    });
  };

  const updateExercise = (index: number, updates: Partial<RoutineExercise>) => {
    setFormData({
      ...formData,
      exercises: formData.exercises.map((ex, i) =>
        i === index ? { ...ex, ...updates } : ex
      ),
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full p-6 my-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          {routine ? 'Edit Routine' : 'Add New Routine'}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Routine Name
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="e.g., Morning Cardio"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Type
              </label>
              <select
                value={formData.type}
                onChange={(e) =>
                  setFormData({ ...formData, type: e.target.value as RoutineType })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                {routineTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Duration (minutes)
            </label>
            <input
              type="number"
              required
              min="1"
              value={formData.duration}
              onChange={(e) =>
                setFormData({ ...formData, duration: parseInt(e.target.value) })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description (optional)
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              rows={2}
              placeholder="Describe this routine..."
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-3">
              <label className="block text-sm font-medium text-gray-700">
                Exercises
              </label>
              <button
                type="button"
                onClick={addExercise}
                className="px-3 py-1 bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium rounded transition-colors"
              >
                Add Exercise
              </button>
            </div>

            <div className="space-y-3 max-h-64 overflow-y-auto">
              {formData.exercises.map((ex, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-3">
                  <div className="flex gap-2 items-start">
                    <select
                      value={ex.exerciseId}
                      onChange={(e) =>
                        updateExercise(index, { exerciseId: e.target.value })
                      }
                      className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      {exercises.map((exercise) => (
                        <option key={exercise.id} value={exercise.id}>
                          {exercise.name}
                        </option>
                      ))}
                    </select>

                    <input
                      type="number"
                      placeholder="Reps"
                      value={ex.reps || ''}
                      onChange={(e) =>
                        updateExercise(index, {
                          reps: e.target.value ? parseInt(e.target.value) : undefined,
                        })
                      }
                      className="w-20 px-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />

                    <input
                      type="number"
                      placeholder="Seconds"
                      value={ex.duration || ''}
                      onChange={(e) =>
                        updateExercise(index, {
                          duration: e.target.value ? parseInt(e.target.value) : undefined,
                        })
                      }
                      className="w-24 px-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />

                    <button
                      type="button"
                      onClick={() => removeExercise(index)}
                      className="text-red-600 hover:text-red-800 font-medium text-sm px-2"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
              {formData.exercises.length === 0 && (
                <p className="text-gray-500 text-sm text-center py-4">
                  No exercises added yet
                </p>
              )}
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="flex-1 bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              {routine ? 'Update' : 'Create'}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-lg transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
