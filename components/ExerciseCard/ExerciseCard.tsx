import { Exercise } from '@/types';
import './ExerciseCard.css';

interface ExerciseCardProps {
  exercise: Exercise;
  onEdit: (exercise: Exercise) => void;
  onDelete: (exercise: Exercise) => void;
}

const difficultyColors = {
  beginner: 'bg-success-100 text-success-800 dark:bg-success-900/50 dark:text-success-300',
  intermediate: 'bg-primary-100 text-primary-800 dark:bg-primary-900/50 dark:text-primary-300',
  advanced: 'bg-accent-100 text-accent-800 dark:bg-accent-900/50 dark:text-accent-300',
};

const categoryColors = {
  abs: 'bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300',
  core: 'bg-pink-100 text-pink-800 dark:bg-pink-900/50 dark:text-pink-300',
  legs: 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300',
  chest: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/50 dark:text-cyan-300',
  back: 'bg-teal-100 text-teal-800 dark:bg-teal-900/50 dark:text-teal-300',
  arms: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-300',
  shoulders: 'bg-violet-100 text-violet-800 dark:bg-violet-900/50 dark:text-violet-300',
  cardio: 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300',
};

export default function ExerciseCard({ exercise, onEdit, onDelete }: ExerciseCardProps) {
  const handleCardClick = (e: React.MouseEvent) => {
    // Don't trigger if clicking on buttons
    const target = e.target as HTMLElement;
    if (target.tagName === 'BUTTON' || target.closest('button')) {
      return;
    }
    onEdit(exercise);
  };

  return (
    <div 
      className="exercise-card bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700 cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-xl font-bold text-gray-800 dark:text-white">{exercise.name}</h3>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(exercise)}
            className="text-primary-600 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-300 font-medium text-sm"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(exercise)}
            className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 font-medium text-sm"
          >
            Delete
          </button>
        </div>
      </div>
      
      <p className="text-gray-600 dark:text-gray-300 mb-4">{exercise.description}</p>
      
      <div className="flex gap-2 flex-wrap">
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${categoryColors[exercise.category]}`}>
          {exercise.category}
        </span>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${difficultyColors[exercise.difficulty]}`}>
          {exercise.difficulty}
        </span>
      </div>
    </div>
  );
}
