'use client';

import { Workout } from '@/types';
import { useRoutines } from '@/hooks/useRoutines';
import { useRouter } from 'next/navigation';
import './WorkoutCard.css';

interface WorkoutCardProps {
  workout: Workout;
  onEdit: (workout: Workout) => void;
  onDelete: (id: string) => void;
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
      className="workout-card bg-white rounded-lg shadow-md p-6 border border-gray-200 cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="text-xl font-bold text-gray-800">{workout.name}</h3>
          <p className={`text-sm font-semibold mt-1 ${getDurationColor(workout.totalDuration)}`}>
            {workout.totalDuration} minutes
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(workout)}
            className="text-primary-600 hover:text-primary-800 font-medium text-sm"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(workout.id)}
            className="text-red-600 hover:text-red-800 font-medium text-sm"
          >
            Delete
          </button>
        </div>
      </div>
      
      {workout.description && (
        <p className="text-gray-600 mb-3">{workout.description}</p>
      )}

      <div className="border-t pt-3 mb-4">
        <h4 className="text-sm font-semibold text-gray-700 mb-2">
          Routines ({workout.routines.length})
        </h4>
        <ul className="space-y-1">
          {workout.routines.map((routineId) => {
            const routine = getRoutineById(routineId);
            return (
              <li key={routineId} className="text-sm text-gray-600">
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
        View Workout
      </button>
    </div>
  );
}
