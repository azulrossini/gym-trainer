'use client';

import { useState } from 'react';
import { useExercises } from '@/hooks/useExercises';
import { Exercise } from '@/types';
import ExerciseCard from '@/components/ExerciseCard';
import ExerciseForm from '@/components/ExerciseForm';
import ConfirmDialog from '@/components/ConfirmDialog';

export default function ExerciseList() {
  const { exercises, addExercise, updateExercise, deleteExercise } = useExercises();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingExercise, setEditingExercise] = useState<Exercise | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [deleteConfirm, setDeleteConfirm] = useState<{ isOpen: boolean; exercise: Exercise | null }>({
    isOpen: false,
    exercise: null,
  });

  const handleSave = (exerciseData: Omit<Exercise, 'id'>) => {
    if (editingExercise) {
      updateExercise(editingExercise.id, exerciseData);
    } else {
      addExercise(exerciseData);
    }
    setIsFormOpen(false);
    setEditingExercise(null);
  };

  const handleEdit = (exercise: Exercise) => {
    setEditingExercise(exercise);
    setIsFormOpen(true);
  };

  const handleDelete = (exercise: Exercise) => {
    setDeleteConfirm({ isOpen: true, exercise });
  };

  const confirmDelete = () => {
    if (deleteConfirm.exercise) {
      deleteExercise(deleteConfirm.exercise.id);
    }
    setDeleteConfirm({ isOpen: false, exercise: null });
  };

  const cancelDelete = () => {
    setDeleteConfirm({ isOpen: false, exercise: null });
  };

  const handleCancel = () => {
    setIsFormOpen(false);
    setEditingExercise(null);
  };

  const filteredExercises = exercises.filter((ex) => {
    const matchesSearch = ex.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || ex.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div>
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          placeholder="Search exercises..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        >
          <option value="all">All Categories</option>
          <option value="abs">Abs</option>
          <option value="core">Core</option>
          <option value="legs">Legs</option>
          <option value="chest">Chest</option>
          <option value="back">Back</option>
          <option value="arms">Arms</option>
          <option value="shoulders">Shoulders</option>
          <option value="cardio">Cardio</option>
        </select>
        <button
          onClick={() => setIsFormOpen(true)}
          className="px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors"
        >
          Add Exercise
        </button>
      </div>

      {filteredExercises.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400 text-lg">No exercises found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredExercises.map((exercise) => (
            <ExerciseCard
              key={exercise.id}
              exercise={exercise}
              onEdit={handleEdit}
              onDelete={() => handleDelete(exercise)}
            />
          ))}
        </div>
      )}

      {isFormOpen && (
        <ExerciseForm
          exercise={editingExercise}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      )}

      <ConfirmDialog
        isOpen={deleteConfirm.isOpen}
        title="Delete Exercise"
        message={`Are you sure you want to delete "${deleteConfirm.exercise?.name}"? This action cannot be undone.`}
        confirmLabel="Delete"
        cancelLabel="Cancel"
        type="danger"
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
    </div>
  );
}
