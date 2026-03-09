import { Routine } from '@/types';
import { useExercises } from '@/hooks/useExercises';
import './RoutineCard.css';

interface RoutineCardProps {
  routine: Routine;
  onEdit: (routine: Routine) => void;
  onDelete: (id: string) => void;
}

const routineTypeColors = {
  'EMOM': 'bg-primary-100 text-primary-800',
  'AMRAP': 'bg-accent-100 text-accent-800',
  'Just Minutes': 'bg-success-100 text-success-800',
};

export default function RoutineCard({ routine, onEdit, onDelete }: RoutineCardProps) {
  const { getExerciseById } = useExercises();

  const handleCardClick = (e: React.MouseEvent) => {
    // Don't trigger if clicking on buttons
    const target = e.target as HTMLElement;
    if (target.tagName === 'BUTTON' || target.closest('button')) {
      return;
    }
    onEdit(routine);
  };

  return (
    <div 
      className="routine-card bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700 cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="text-xl font-bold text-gray-800 dark:text-white">{routine.name}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{routine.duration} minutes</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(routine)}
            className="text-primary-600 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-300 font-medium text-sm"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(routine.id)}
            className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 font-medium text-sm"
          >
            Delete
          </button>
        </div>
      </div>
      
      {routine.description && (
        <p className="text-gray-600 dark:text-gray-300 mb-3">{routine.description}</p>
      )}
      
      <div className="mb-4">
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${routineTypeColors[routine.type]}`}>
          {routine.type}
        </span>
      </div>

      <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
        <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          Exercises ({routine.exercises.length})
        </h4>
        <ul className="space-y-1">
          {routine.exercises.slice(0, 3).map((ex, idx) => {
            const exercise = getExerciseById(ex.exerciseId);
            return (
              <li key={idx} className="text-sm text-gray-600 dark:text-gray-400">
                • {exercise?.name || 'Unknown'} 
                {ex.reps && ` - ${ex.reps} reps`}
                {ex.duration && ` - ${ex.duration}s`}
              </li>
            );
          })}
          {routine.exercises.length > 3 && (
            <li className="text-sm text-gray-500 dark:text-gray-400 italic">
              +{routine.exercises.length - 3} more...
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
