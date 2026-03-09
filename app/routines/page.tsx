import Navigation from '@/components/Navigation';
import RoutineList from '@/components/RoutineList';

export default function RoutinesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Routines</h1>
          <p className="text-gray-600">
            Create and manage your workout routines. Combine exercises into EMOM, AMRAP, or timed routines.
          </p>
        </div>
        
        <RoutineList />
      </main>
    </div>
  );
}
