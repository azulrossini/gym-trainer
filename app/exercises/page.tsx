import Navigation from '@/components/Navigation';
import ExerciseList from '@/components/ExerciseList';

export default function ExercisesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-2">Exercises</h1>
          <p className="text-base md:text-lg text-gray-600 dark:text-gray-300">
            Manage your exercise library. Create, edit, and organize exercises by category and difficulty.
          </p>
        </div>
        
        <ExerciseList />
      </main>
    </div>
  );
}
