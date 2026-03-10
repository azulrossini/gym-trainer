import { exerciseRepository } from '@/repositories/exerciseRepository';
import { Exercise } from '@/types';
import { v4 as uuidv4 } from 'uuid';

export class ExerciseService {
  async getAllExercises(): Promise<Exercise[]> {
    return await exerciseRepository.findAll();
  }

  async getExerciseById(id: string): Promise<Exercise | null> {
    return await exerciseRepository.findById(id);
  }

  async createExercise(exerciseData: Omit<Exercise, 'id'>): Promise<Exercise> {
    // Business logic: Generate ID
    const exercise: Exercise = {
      ...exerciseData,
      id: uuidv4(),
    };

    // Business logic: Validate exercise data
    this.validateExercise(exercise);

    return await exerciseRepository.create(exercise);
  }

  async updateExercise(id: string, updates: Partial<Exercise>): Promise<Exercise> {
    // Business logic: Check if exercise exists
    const existing = await exerciseRepository.findById(id);
    if (!existing) {
      throw new Error('Exercise not found');
    }

    // Business logic: Validate updates
    if (updates.name || updates.category || updates.difficulty) {
      this.validateExercise({ ...existing, ...updates });
    }

    return await exerciseRepository.update(id, updates);
  }

  async deleteExercise(id: string): Promise<void> {
    // Business logic: Check if exercise exists
    const existing = await exerciseRepository.findById(id);
    if (!existing) {
      throw new Error('Exercise not found');
    }

    // Business logic: Could check if exercise is used in routines
    // For now, we'll just delete it
    await exerciseRepository.delete(id);
  }

  private validateExercise(exercise: Exercise): void {
    if (!exercise.name || exercise.name.trim() === '') {
      throw new Error('Exercise name is required');
    }

    if (!exercise.description || exercise.description.trim() === '') {
      throw new Error('Exercise description is required');
    }

    const validCategories = ['abs', 'core', 'legs', 'chest', 'back', 'arms', 'shoulders', 'cardio'];
    if (!validCategories.includes(exercise.category)) {
      throw new Error('Invalid exercise category');
    }

    const validDifficulties = ['beginner', 'intermediate', 'advanced'];
    if (!validDifficulties.includes(exercise.difficulty)) {
      throw new Error('Invalid exercise difficulty');
    }
  }
}

export const exerciseService = new ExerciseService();
