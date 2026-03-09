import Link from 'next/link';
import Navigation from '@/components/Navigation';
import { APP_CONSTANTS, PAGES } from '@/constants';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Navigation />
      
      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 dark:text-white mb-4">
            {APP_CONSTANTS.APP_WELCOME}
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {APP_CONSTANTS.APP_FULL_DESCRIPTION}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <Link
            href="/exercises"
            className="group bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border-t-4 border-primary-500 hover:shadow-2xl transition-all hover:-translate-y-2"
          >
            <div className="text-5xl mb-4">{PAGES.HOME.EXERCISES_CARD.EMOJI}</div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
              {PAGES.HOME.EXERCISES_CARD.TITLE}
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              {PAGES.HOME.EXERCISES_CARD.DESCRIPTION}
            </p>
          </Link>

          <Link
            href="/routines"
            className="group bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border-t-4 border-accent-500 hover:shadow-2xl transition-all hover:-translate-y-2"
          >
            <div className="text-5xl mb-4">{PAGES.HOME.ROUTINES_CARD.EMOJI}</div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-3 group-hover:text-accent-600 dark:group-hover:text-accent-400 transition-colors">
              {PAGES.HOME.ROUTINES_CARD.TITLE}
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              {PAGES.HOME.ROUTINES_CARD.DESCRIPTION}
            </p>
          </Link>

          <Link
            href="/workouts"
            className="group bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border-t-4 border-success-500 hover:shadow-2xl transition-all hover:-translate-y-2"
          >
            <div className="text-5xl mb-4">{PAGES.HOME.WORKOUTS_CARD.EMOJI}</div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-3 group-hover:text-success-600 dark:group-hover:text-success-400 transition-colors">
              {PAGES.HOME.WORKOUTS_CARD.TITLE}
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              {PAGES.HOME.WORKOUTS_CARD.DESCRIPTION}
            </p>
          </Link>
        </div>

        <div className="mt-16 text-center">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">{PAGES.HOME.HOW_IT_WORKS.TITLE}</h3>
            <div className="space-y-4 text-left">
              <div className="flex items-start gap-4">
                <span className="flex-shrink-0 w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center font-bold">1</span>
                <div>
                  <h4 className="font-semibold text-gray-800 dark:text-white">{PAGES.HOME.HOW_IT_WORKS.STEP_1.TITLE}</h4>
                  <p className="text-gray-600 dark:text-gray-300">{PAGES.HOME.HOW_IT_WORKS.STEP_1.DESCRIPTION}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="flex-shrink-0 w-8 h-8 bg-accent-500 text-white rounded-full flex items-center justify-center font-bold">2</span>
                <div>
                  <h4 className="font-semibold text-gray-800 dark:text-white">{PAGES.HOME.HOW_IT_WORKS.STEP_2.TITLE}</h4>
                  <p className="text-gray-600 dark:text-gray-300">{PAGES.HOME.HOW_IT_WORKS.STEP_2.DESCRIPTION}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="flex-shrink-0 w-8 h-8 bg-success-500 text-white rounded-full flex items-center justify-center font-bold">3</span>
                <div>
                  <h4 className="font-semibold text-gray-800 dark:text-white">{PAGES.HOME.HOW_IT_WORKS.STEP_3.TITLE}</h4>
                  <p className="text-gray-600 dark:text-gray-300">{PAGES.HOME.HOW_IT_WORKS.STEP_3.DESCRIPTION}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
