import { workoutRepository } from '@/repositories/workoutRepository';
import { Workout } from '@/types';
import { v4 as uuidv4 } from 'uuid';

export class WorkoutService {
  async getAllWorkouts(): Promise<Workout[]> {
    return await workoutRepository.findAll();
  }

  async getWorkoutById(id: string): Promise<Workout | null> {
    return await workoutRepository.findById(id);
  }

  async createWorkout(workoutData: Omit<Workout, 'id' | 'createdAt'>): Promise<Workout> {
    // Business logic: Generate ID and timestamp
    const workout: Workout = {
      ...workoutData,
      id: uuidv4(),
      createdAt: new Date(),
    };

    // Business logic: Validate workout data
    this.validateWorkout(workout);

    return await workoutRepository.create(workout);
  }

  async updateWorkout(id: string, updates: Partial<Workout>): Promise<Workout> {
    // Business logic: Check if workout exists
    const existing = await workoutRepository.findById(id);
    if (!existing) {
      throw new Error('Workout not found');
    }

    // Business logic: Validate updates
    const updated = { ...existing, ...updates };
    this.validateWorkout(updated);

    return await workoutRepository.update(id, updates);
  }

  async deleteWorkout(id: string): Promise<void> {
    // Business logic: Check if workout exists
    const existing = await workoutRepository.findById(id);
    if (!existing) {
      throw new Error('Workout not found');
    }

    await workoutRepository.delete(id);
  }

  private validateWorkout(workout: Workout): void {
    if (!workout.name || workout.name.trim() === '') {
      throw new Error('Workout name is required');
    }

    if (!workout.description || workout.description.trim() === '') {
      throw new Error('Workout description is required');
    }

    if (!workout.routines || workout.routines.length < 3) {
      throw new Error('Workout must have at least 3 routines');
    }

    if (!workout.totalDuration || workout.totalDuration < 30 || workout.totalDuration > 40) {
      throw new Error('Workout total duration must be between 30 and 40 minutes');
    }
  }
}

export const workoutService = new WorkoutService();
