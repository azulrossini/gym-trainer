'use client';

import { useState, useEffect } from 'react';
import { Exercise, ExerciseCategory, ExerciseDifficulty } from '@/types';
import { FORMS, EXERCISE_CATEGORIES, EXERCISE_DIFFICULTIES } from '@/constants';

interface ExerciseFormProps {
  exercise?: Exercise | null;
  onSave: (exercise: Omit<Exercise, 'id'>) => void;
  onCancel: () => void;
}

const categories: ExerciseCategory[] = Object.values(EXERCISE_CATEGORIES) as ExerciseCategory[];
const difficulties: ExerciseDifficulty[] = Object.values(EXERCISE_DIFFICULTIES) as ExerciseDifficulty[];

export default function ExerciseForm({ exercise, onSave, onCancel }: ExerciseFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: EXERCISE_CATEGORIES.CORE as ExerciseCategory,
    difficulty: EXERCISE_DIFFICULTIES.BEGINNER as ExerciseDifficulty,
  });

  useEffect(() => {
    if (exercise) {
      setFormData({
        name: exercise.name,
        description: exercise.description,
        category: exercise.category,
        difficulty: exercise.difficulty,
      });
    }
  }, [exercise]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 dark:bg-black/70 flex items-center justify-center z-50 p-4"
      onClick={onCancel}
    >
      <div 
        className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
          {exercise ? FORMS.EXERCISE.TITLE_EDIT : FORMS.EXERCISE.TITLE_NEW}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {FORMS.EXERCISE.FIELD_NAME}
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder={FORMS.EXERCISE.FIELD_NAME_PLACEHOLDER}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {FORMS.EXERCISE.FIELD_DESCRIPTION}
            </label>
            <textarea
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              rows={3}
              placeholder={FORMS.EXERCISE.FIELD_DESCRIPTION_PLACEHOLDER}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {FORMS.EXERCISE.FIELD_CATEGORY}
              </label>
              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value as ExerciseCategory })
                }
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {FORMS.EXERCISE.FIELD_DIFFICULTY}
              </label>
              <select
                value={formData.difficulty}
                onChange={(e) =>
                  setFormData({ ...formData, difficulty: e.target.value as ExerciseDifficulty })
                }
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                {difficulties.map((diff) => (
                  <option key={diff} value={diff}>
                    {diff}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="flex-1 bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              {exercise ? FORMS.EXERCISE.BUTTON_UPDATE : FORMS.EXERCISE.BUTTON_CREATE}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-medium py-2 px-4 rounded-lg transition-colors"
            >
              {FORMS.EXERCISE.BUTTON_CANCEL}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
