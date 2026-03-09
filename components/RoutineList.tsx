'use client';

import { useState } from 'react';
import { useRoutines } from '@/hooks/useRoutines';
import { Routine } from '@/types';
import RoutineCard from './RoutineCard';
import RoutineForm from './RoutineForm';

export default function RoutineList() {
  const { routines, addRoutine, updateRoutine, deleteRoutine } = useRoutines();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingRoutine, setEditingRoutine] = useState<Routine | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');

  const handleSave = (routineData: Omit<Routine, 'id'>) => {
    if (editingRoutine) {
      updateRoutine(editingRoutine.id, routineData);
    } else {
      addRoutine(routineData);
    }
    setIsFormOpen(false);
    setEditingRoutine(null);
  };

  const handleEdit = (routine: Routine) => {
    setEditingRoutine(routine);
    setIsFormOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this routine?')) {
      deleteRoutine(id);
    }
  };

  const handleCancel = () => {
    setIsFormOpen(false);
    setEditingRoutine(null);
  };

  const filteredRoutines = routines.filter((rt) => {
    const matchesSearch = rt.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || rt.type === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <div>
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          placeholder="Search routines..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        >
          <option value="all">All Types</option>
          <option value="EMOM">EMOM</option>
          <option value="AMRAP">AMRAP</option>
          <option value="Just Minutes">Just Minutes</option>
        </select>
        <button
          onClick={() => setIsFormOpen(true)}
          className="px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors"
        >
          Add Routine
        </button>
      </div>

      {filteredRoutines.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No routines found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRoutines.map((routine) => (
            <RoutineCard
              key={routine.id}
              routine={routine}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {isFormOpen && (
        <RoutineForm
          routine={editingRoutine}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
}
