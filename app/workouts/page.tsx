import Navigation from '@/components/Navigation';
import WorkoutList from '@/components/WorkoutList';
import { PAGES } from '@/constants';

export default function WorkoutsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-2">{PAGES.WORKOUTS.TITLE}</h1>
          <p className="text-base md:text-lg text-gray-600 dark:text-gray-300">
            {PAGES.WORKOUTS.DETAIL_DESCRIPTION}
          </p>
        </div>
        
        <WorkoutList />
      </main>
    </div>
  );
}
