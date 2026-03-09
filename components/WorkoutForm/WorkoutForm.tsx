'use client';

import { useState, useEffect } from 'react';
import { Workout } from '@/types';
import { useRoutines } from '@/hooks/useRoutines';
import { FORMS } from '@/constants';

interface WorkoutFormProps {
  workout?: Workout | null;
  onSave: (workout: Omit<Workout, 'id' | 'createdAt'>) => void;
  onCancel: () => void;
}

export default function WorkoutForm({ workout, onSave, onCancel }: WorkoutFormProps) {
  const { routines } = useRoutines();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    routines: [] as string[],
  });

  useEffect(() => {
    if (workout) {
      setFormData({
        name: workout.name,
        description: workout.description || '',
        routines: workout.routines,
      });
    }
  }, [workout]);

  const calculateTotalDuration = () => {
    return formData.routines.reduce((total, routineId) => {
      const routine = routines.find((r) => r.id === routineId);
      return total + (routine?.duration || 0);
    }, 0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.routines.length < 3) {
      alert(FORMS.WORKOUT.MESSAGE_MIN_ROUTINES);
      return;
    }

    const totalDuration = calculateTotalDuration();
    if (totalDuration < 30 || totalDuration > 40) {
      alert(`${FORMS.WORKOUT.MESSAGE_DURATION_ERROR} ${totalDuration} minutes`);
      return;
    }

    onSave({
      ...formData,
      totalDuration,
    });
  };

  const toggleRoutine = (routineId: string) => {
    setFormData({
      ...formData,
      routines: formData.routines.includes(routineId)
        ? formData.routines.filter((id) => id !== routineId)
        : [...formData.routines, routineId],
    });
  };

  const totalDuration = calculateTotalDuration();
  const durationValid = totalDuration >= 30 && totalDuration <= 40;

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
          {workout ? FORMS.WORKOUT.TITLE_EDIT : FORMS.WORKOUT.TITLE_NEW}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {FORMS.WORKOUT.FIELD_NAME}
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder={FORMS.WORKOUT.FIELD_NAME_PLACEHOLDER}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {FORMS.WORKOUT.FIELD_DESCRIPTION}
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              rows={2}
              placeholder={FORMS.WORKOUT.FIELD_DESCRIPTION_PLACEHOLDER}
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-3">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                {FORMS.WORKOUT.FIELD_ROUTINES}
              </label>
              <div className="text-sm">
                <span className={`font-semibold ${durationValid ? 'text-success-600 dark:text-success-400' : 'text-red-600 dark:text-red-400'}`}>
                  {FORMS.WORKOUT.LABEL_TOTAL_DURATION}: {totalDuration} min
                </span>
                <span className="text-gray-500 dark:text-gray-400 ml-2">{FORMS.WORKOUT.LABEL_REQUIRED_DURATION}</span>
              </div>
            </div>

            <div className="space-y-2 max-h-80 overflow-y-auto border border-gray-200 dark:border-gray-700 dark:bg-gray-700/30 rounded-lg p-3">
              {routines.length === 0 ? (
                <p className="text-gray-500 dark:text-gray-400 text-sm text-center py-4">
                  {FORMS.WORKOUT.MESSAGE_NO_ROUTINES}
                </p>
              ) : (
                routines.map((routine) => (
                  <label
                    key={routine.id}
                    className={`flex items-center p-3 rounded border cursor-pointer transition-colors ${
                      formData.routines.includes(routine.id)
                        ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/30 dark:border-primary-400'
                        : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={formData.routines.includes(routine.id)}
                      onChange={() => toggleRoutine(routine.id)}
                      className="mr-3 h-4 w-4 text-primary-600 focus:ring-primary-500 rounded"
                    />
                    <div className="flex-1">
                      <div className="font-medium text-gray-800 dark:text-white">{routine.name}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {routine.type} • {routine.duration} min • {routine.exercises.length} {FORMS.WORKOUT.LABEL_ROUTINE_INFO}
                      </div>
                    </div>
                  </label>
                ))
              )}
            </div>
          </div>

          {formData.routines.length > 0 && formData.routines.length < 3 && (
            <div className="text-sm text-red-600 dark:text-red-400">
              {FORMS.WORKOUT.MESSAGE_SELECT_MINIMUM} {formData.routines.length})
            </div>
          )}

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              disabled={formData.routines.length < 3 || !durationValid}
              className="flex-1 bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-lg transition-colors disabled:bg-gray-300 dark:disabled:bg-gray-700 disabled:cursor-not-allowed"
            >
              {workout ? FORMS.WORKOUT.BUTTON_UPDATE : FORMS.WORKOUT.BUTTON_CREATE}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-medium py-2 px-4 rounded-lg transition-colors"
            >
              {FORMS.WORKOUT.BUTTON_CANCEL}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
