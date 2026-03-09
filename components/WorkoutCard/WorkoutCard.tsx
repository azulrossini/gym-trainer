'use client';

import { Workout } from '@/types';
import { useRoutines } from '@/hooks/useRoutines';
import { useRouter } from 'next/navigation';
import './WorkoutCard.css';

interface WorkoutCardProps {
  workout: Workout;
  onEdit: (workout: Workout) => void;
  onDelete: (workout: Workout) => void;
}

export default function WorkoutCard({ workout, onEdit, onDelete }: WorkoutCardProps) {
  const { getRoutineById } = useRoutines();
  const router = useRouter();

  const getDurationColor = (duration: number) => {
    if (duration >= 30 && duration <= 40) {
      return 'text-success-600';
    }
    return 'text-gray-600';
  };

  const handleCardClick = (e: React.MouseEvent) => {
    // Don't trigger if clicking on buttons
    const target = e.target as HTMLElement;
    if (target.tagName === 'BUTTON' || target.closest('button')) {
      return;
    }
    router.push(`/workouts/${workout.id}`);
  };

  return (
    <div 
      className="workout-card bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700 cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="text-xl font-bold text-gray-800 dark:text-white">{workout.name}</h3>
          <p className={`text-sm font-semibold mt-1 ${getDurationColor(workout.totalDuration)}`}>
            {workout.totalDuration} minutes
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(workout)}
            className="text-primary-600 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-300 font-medium text-sm"
          >
            {CARDS.WORKOUT.BUTTON_EDIT}
          </button>
          <button
            onClick={() => onDelete(workout)}
            className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 font-medium text-sm"
          >
            {CARDS.WORKOUT.BUTTON_DELETE}
          </button>
        </div>
      </div>
      
      {workout.description && (
        <p className="text-gray-600 dark:text-gray-300 mb-3">{workout.description}</p>
      )}

      <div className="border-t border-gray-200 dark:border-gray-700 pt-3 mb-4">
        <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          {CARDS.WORKOUT.LABEL_ROUTINES} ({workout.routines.length})
        </h4>
        <ul className="space-y-1">
          {workout.routines.map((routineId) => {
            const routine = getRoutineById(routineId);
            return (
              <li key={routineId} className="text-sm text-gray-600 dark:text-gray-400">
                • {routine?.name || 'Unknown'} ({routine?.type})
              </li>
            );
          })}
        </ul>
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation();
          router.push(`/workouts/${workout.id}`);
        }}
        className="block w-full text-center px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors"
      >
        {CARDS.WORKOUT.BUTTON_VIEW}
      </button>
    </div>
  );
}
