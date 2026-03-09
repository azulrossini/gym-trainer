'use client';

import { useState, useEffect } from 'react';
import { Routine, RoutineType, RoutineExercise } from '@/types';
import { useExercises } from '@/hooks/useExercises';
import { FORMS, ROUTINE_TYPES } from '@/constants';

interface RoutineFormProps {
  routine?: Routine | null;
  onSave: (routine: Omit<Routine, 'id'>) => void;
  onCancel: () => void;
}

const routineTypes: RoutineType[] = Object.values(ROUTINE_TYPES) as RoutineType[];

export default function RoutineForm({ routine, onSave, onCancel }: RoutineFormProps) {
  const { exercises } = useExercises();
  const [formData, setFormData] = useState({
    name: '',
    type: ROUTINE_TYPES.EMOM as RoutineType,
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
      alert(FORMS.ROUTINE.MESSAGE_ADD_EXERCISE_FIRST);
      return;
    }
    onSave(formData);
  };

  const addExercise = () => {
    if (exercises.length === 0) {
      alert(FORMS.ROUTINE.MESSAGE_CREATE_EXERCISES_FIRST);
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
    <div 
      className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center z-50 p-4 overflow-y-auto"
      onClick={onCancel}
    >
      <div 
        className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full p-6 my-8"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
          {routine ? FORMS.ROUTINE.TITLE_EDIT : FORMS.ROUTINE.TITLE_NEW}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {FORMS.ROUTINE.FIELD_NAME}
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder={FORMS.ROUTINE.FIELD_NAME_PLACEHOLDER}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {FORMS.ROUTINE.FIELD_TYPE}
              </label>
              <select
                value={formData.type}
                onChange={(e) =>
                  setFormData({ ...formData, type: e.target.value as RoutineType })
                }
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
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
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {FORMS.ROUTINE.FIELD_DURATION}
            </label>
            <input
              type="number"
              required
              min="1"
              value={formData.duration}
              onChange={(e) =>
                setFormData({ ...formData, duration: parseInt(e.target.value) })
              }
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {FORMS.ROUTINE.FIELD_DESCRIPTION}
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              rows={2}
              placeholder={FORMS.ROUTINE.FIELD_DESCRIPTION_PLACEHOLDER}
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-3">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                {FORMS.ROUTINE.FIELD_EXERCISES}
              </label>
              <button
                type="button"
                onClick={addExercise}
                className="px-3 py-1 bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium rounded transition-colors"
              >
                {FORMS.ROUTINE.BUTTON_ADD_EXERCISE}
              </button>
            </div>

            <div className="space-y-3 max-h-64 overflow-y-auto">
              {formData.exercises.map((ex, index) => (
                <div key={index} className="border border-gray-200 dark:border-gray-700 dark:bg-gray-700/30 rounded-lg p-3">
                  <div className="flex gap-2 items-start">
                    <select
                      value={ex.exerciseId}
                      onChange={(e) =>
                        updateExercise(index, { exerciseId: e.target.value })
                      }
                      className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      {exercises.map((exercise) => (
                        <option key={exercise.id} value={exercise.id}>
                          {exercise.name}
                        </option>
                      ))}
                    </select>

                    <input
                      type="number"
                      placeholder={FORMS.ROUTINE.PLACEHOLDER_REPS}
                      value={ex.reps || ''}
                      onChange={(e) =>
                        updateExercise(index, {
                          reps: e.target.value ? parseInt(e.target.value) : undefined,
                        })
                      }
                      className="w-20 px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />

                    <input
                      type="number"
                      placeholder={FORMS.ROUTINE.PLACEHOLDER_SECONDS}
                      value={ex.duration || ''}
                      onChange={(e) =>
                        updateExercise(index, {
                          duration: e.target.value ? parseInt(e.target.value) : undefined,
                        })
                      }
                      className="w-24 px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />

                    <button
                      type="button"
                      onClick={() => removeExercise(index)}
                      className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 font-medium text-sm px-2"
                    >
                      {FORMS.ROUTINE.BUTTON_REMOVE}
                    </button>
                  </div>
                </div>
              ))}

              {formData.exercises.length === 0 && (
                <p className="text-gray-500 dark:text-gray-400 text-sm text-center py-4">
                  {FORMS.ROUTINE.MESSAGE_NO_EXERCISES}
                </p>
              )}
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="flex-1 bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              {routine ? FORMS.ROUTINE.BUTTON_UPDATE : FORMS.ROUTINE.BUTTON_CREATE}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-medium py-2 px-4 rounded-lg transition-colors"
            >
              {FORMS.ROUTINE.BUTTON_CANCEL}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
