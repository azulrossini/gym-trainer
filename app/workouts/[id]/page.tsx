'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Navigation from '@/components/Navigation';
import WorkoutDetail from '@/components/WorkoutDetail';
import WorkoutSession from '@/components/WorkoutSession';
import { useWorkouts } from '@/hooks/useWorkouts';

export default function WorkoutDetailPage() {
  const params = useParams();
  const { getWorkoutById } = useWorkouts();
  const workout = getWorkoutById(params.id as string);
  const [isSessionActive, setIsSessionActive] = useState(false);

  if (!workout) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <Navigation />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">Workout Not Found</h1>
            <p className="text-gray-600 dark:text-gray-300">The workout youre looking for doesnt exist.</p>
          </div>
        </main>
      </div>
    );
  }

  if (isSessionActive) {
    return <WorkoutSession workout={workout} onExit={() => setIsSessionActive(false)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <WorkoutDetail workout={workout} onStartWorkout={() => setIsSessionActive(true)} />
      </main>
    </div>
  );
}
