'use client';

import { Workout, Routine } from '@/types';
import { useRoutines } from '@/hooks/useRoutines';
import { useExercises } from '@/hooks/useExercises';
import Link from 'next/link';
import './WorkoutDetail.css';

interface WorkoutDetailProps {
  workout: Workout;
}

const routineTypeColors = {
  'EMOM': 'bg-primary-500',
  'AMRAP': 'bg-accent-500',
  'Just Minutes': 'bg-success-500',
};

export default function WorkoutDetail({ workout }: WorkoutDetailProps) {
  const { getRoutineById } = useRoutines();
  const { getExerciseById } = useExercises();

  const routinesData: (Routine | undefined)[] = workout.routines.map((id) =>
    getRoutineById(id)
  );

  const validRoutines = routinesData.filter((r): r is Routine => r !== undefined);

  return (
    <div className="workout-detail-container">
      <div className="mb-8">
        <Link
          href="/workouts"
          className="text-primary-600 hover:text-primary-800 font-medium mb-4 inline-block"
        >
          ← Back to Workouts
        </Link>
        <h1 className="text-4xl font-bold text-gray-800 mb-2">{workout.name}</h1>
        {workout.description && (
          <p className="text-gray-600 text-lg mb-2">{workout.description}</p>
        )}
        <p className="text-gray-500">
          Total Duration: <span className="font-semibold text-success-600">{workout.totalDuration} minutes</span>
        </p>
      </div>

      {validRoutines.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No routines found for this workout</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {validRoutines.map((routine) => (
            <div
              key={routine.id}
              className="routine-column bg-white rounded-lg shadow-lg border-t-4 overflow-hidden"
              style={{ borderTopColor: routineTypeColors[routine.type] }}
            >
              <div className={`${routineTypeColors[routine.type]} text-white p-4`}>
                <h2 className="text-2xl font-bold mb-1">{routine.name}</h2>
                <div className="flex justify-between items-center text-sm">
                  <span className="font-medium">{routine.type}</span>
                  <span className="font-semibold">{routine.duration} min</span>
                </div>
                {routine.description && (
                  <p className="text-white/90 text-sm mt-2">{routine.description}</p>
                )}
              </div>

              <div className="p-4">
                <h3 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
                  Exercises ({routine.exercises.length})
                </h3>
                <div className="space-y-2">
                  {routine.exercises.map((ex, idx) => {
                    const exercise = getExerciseById(ex.exerciseId);
                    if (!exercise) return null;

                    return (
                      <div
                        key={idx}
                        className="exercise-item p-3 rounded border border-gray-200"
                      >
                        <div className="font-medium text-gray-800 mb-1">
                          {idx + 1}. {exercise.name}
                        </div>
                        <div className="text-sm text-gray-600 mb-2">
                          {exercise.description}
                        </div>
                        <div className="flex gap-2 flex-wrap">
                          {ex.reps && (
                            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded font-medium">
                              {ex.reps} reps
                            </span>
                          )}
                          {ex.duration && (
                            <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded font-medium">
                              {ex.duration}s
                            </span>
                          )}
                          <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                            {exercise.category}
                          </span>
                          <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                            {exercise.difficulty}
                          </span>
                        </div>
                        {ex.notes && (
                          <div className="text-xs text-gray-500 mt-2 italic">
                            Note: {ex.notes}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
