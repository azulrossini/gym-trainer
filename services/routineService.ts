import { routineRepository } from '@/repositories/routineRepository';
import { Routine } from '@/types';
import { v4 as uuidv4 } from 'uuid';

export class RoutineService {
  async getAllRoutines(): Promise<Routine[]> {
    return await routineRepository.findAll();
  }

  async getRoutineById(id: string): Promise<Routine | null> {
    return await routineRepository.findById(id);
  }

  async createRoutine(routineData: Omit<Routine, 'id'>): Promise<Routine> {
    // Business logic: Generate ID
    const routine: Routine = {
      ...routineData,
      id: uuidv4(),
    };

    // Business logic: Validate routine data
    this.validateRoutine(routine);

    return await routineRepository.create(routine);
  }

  async updateRoutine(id: string, updates: Partial<Routine>): Promise<Routine> {
    // Business logic: Check if routine exists
    const existing = await routineRepository.findById(id);
    if (!existing) {
      throw new Error('Routine not found');
    }

    // Business logic: Validate updates
    const updated = { ...existing, ...updates };
    this.validateRoutine(updated);

    return await routineRepository.update(id, updates);
  }

  async deleteRoutine(id: string): Promise<void> {
    // Business logic: Check if routine exists
    const existing = await routineRepository.findById(id);
    if (!existing) {
      throw new Error('Routine not found');
    }

    // Business logic: Could check if routine is used in workouts
    // For now, we'll just delete it
    await routineRepository.delete(id);
  }

  private validateRoutine(routine: Routine): void {
    if (!routine.name || routine.name.trim() === '') {
      throw new Error('Routine name is required');
    }

    if (!routine.description || routine.description.trim() === '') {
      throw new Error('Routine description is required');
    }

    const validTypes = ['EMOM', 'AMRAP', 'Just Minutes'];
    if (!validTypes.includes(routine.type)) {
      throw new Error('Invalid routine type');
    }

    if (!routine.duration || routine.duration <= 0) {
      throw new Error('Routine duration must be greater than 0');
    }

    if (!routine.exercises || routine.exercises.length === 0) {
      throw new Error('Routine must have at least one exercise');
    }

    // Validate exercise structure
    routine.exercises.forEach((ex, index) => {
      if (!ex.exerciseId) {
        throw new Error(`Exercise at position ${index + 1} is missing exerciseId`);
      }

      if (!ex.reps && !ex.duration) {
        throw new Error(`Exercise at position ${index + 1} must have either reps or duration`);
      }
    });
  }
}

export const routineService = new RoutineService();
