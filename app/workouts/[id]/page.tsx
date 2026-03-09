'use client';

import { useParams } from 'next/navigation';
import Navigation from '@/components/Navigation';
import WorkoutDetail from '@/components/WorkoutDetail';
import { useWorkouts } from '@/hooks/useWorkouts';

export default function WorkoutDetailPage() {
  const params = useParams();
  const { getWorkoutById } = useWorkouts();
  const workout = getWorkoutById(params.id as string);

  if (!workout) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50">
        <Navigation />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Workout Not Found</h1>
            <p className="text-gray-600">The workout you're looking for doesn't exist.</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <WorkoutDetail workout={workout} />
      </main>
    </div>
  );
}
