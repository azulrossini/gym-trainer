import Link from 'next/link';
import Navigation from '@/components/Navigation';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Navigation />
      
      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold text-gray-800 dark:text-white mb-4">
            Welcome to <span className="text-primary-600 dark:text-primary-400">Gym Trainer</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Your ultimate workout management system. Create exercises, build routines, and design complete workouts tailored to your fitness goals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <Link
            href="/exercises"
            className="group bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border-t-4 border-primary-500 hover:shadow-2xl transition-all hover:-translate-y-2"
          >
            <div className="text-5xl mb-4">🏋️</div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
              Exercises
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Create and manage your exercise library with categories, difficulty levels, and detailed descriptions.
            </p>
          </Link>

          <Link
            href="/routines"
            className="group bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border-t-4 border-accent-500 hover:shadow-2xl transition-all hover:-translate-y-2"
          >
            <div className="text-5xl mb-4">📋</div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-3 group-hover:text-accent-600 dark:group-hover:text-accent-400 transition-colors">
              Routines
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Build EMOM, AMRAP, or timed routines by combining your exercises into effective training sequences.
            </p>
          </Link>

          <Link
            href="/workouts"
            className="group bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border-t-4 border-success-500 hover:shadow-2xl transition-all hover:-translate-y-2"
          >
            <div className="text-5xl mb-4">🔥</div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-3 group-hover:text-success-600 dark:group-hover:text-success-400 transition-colors">
              Workouts
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Design complete 30-40 minute workouts by combining at least 3 routines for a full training session.
            </p>
          </Link>
        </div>

        <div className="mt-16 text-center">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">How It Works</h3>
            <div className="space-y-4 text-left">
              <div className="flex items-start gap-4">
                <span className="flex-shrink-0 w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center font-bold">1</span>
                <div>
                  <h4 className="font-semibold text-gray-800 dark:text-white">Create Exercises</h4>
                  <p className="text-gray-600 dark:text-gray-300">Build your exercise library with different categories (abs, legs, cardio, etc.) and difficulty levels.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="flex-shrink-0 w-8 h-8 bg-accent-500 text-white rounded-full flex items-center justify-center font-bold">2</span>
                <div>
                  <h4 className="font-semibold text-gray-800 dark:text-white">Build Routines</h4>
                  <p className="text-gray-600 dark:text-gray-300">Combine exercises into EMOM, AMRAP, or timed routines with specific reps and durations.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="flex-shrink-0 w-8 h-8 bg-success-500 text-white rounded-full flex items-center justify-center font-bold">3</span>
                <div>
                  <h4 className="font-semibold text-gray-800 dark:text-white">Design Workouts</h4>
                  <p className="text-gray-600 dark:text-gray-300">Create full workouts by selecting at least 3 routines that total 30-40 minutes of training.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
