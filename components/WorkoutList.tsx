'use client';

import { useState } from 'react';
import { useWorkouts } from '@/hooks/useWorkouts';
import { Workout } from '@/types';
import WorkoutCard from './WorkoutCard';
import WorkoutForm from './WorkoutForm';

export default function WorkoutList() {
  const { workouts, addWorkout, updateWorkout, deleteWorkout } = useWorkouts();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingWorkout, setEditingWorkout] = useState<Workout | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSave = (workoutData: Omit<Workout, 'id' | 'createdAt'>) => {
    if (editingWorkout) {
      updateWorkout(editingWorkout.id, workoutData);
    } else {
      addWorkout(workoutData);
    }
    setIsFormOpen(false);
    setEditingWorkout(null);
  };

  const handleEdit = (workout: Workout) => {
    setEditingWorkout(workout);
    setIsFormOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this workout?')) {
      deleteWorkout(id);
    }
  };

  const handleCancel = () => {
    setIsFormOpen(false);
    setEditingWorkout(null);
  };

  const filteredWorkouts = workouts.filter((wk) =>
    wk.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedWorkouts = [...filteredWorkouts].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <div>
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          placeholder="Search workouts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
        <button
          onClick={() => setIsFormOpen(true)}
          className="px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors"
        >
          Add Workout
        </button>
      </div>

      {sortedWorkouts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No workouts found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedWorkouts.map((workout) => (
            <WorkoutCard
              key={workout.id}
              workout={workout}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {isFormOpen && (
        <WorkoutForm
          workout={editingWorkout}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
}
