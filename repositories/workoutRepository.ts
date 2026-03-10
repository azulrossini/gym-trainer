import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { Workout } from '@/types';

export class WorkoutRepository {
  private useSupabase: boolean;

  constructor() {
    this.useSupabase = isSupabaseConfigured();
  }

  async findAll(): Promise<Workout[]> {
    if (!this.useSupabase) {
      throw new Error('Supabase not configured');
    }

    const { data, error } = await supabase
      .from('workouts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error(`Failed to fetch workouts: ${error.message}`);
    }

    // Convert snake_case to camelCase
    const workouts = (data || []).map(workout => ({
      id: workout.id,
      name: workout.name,
      description: workout.description,
      routines: workout.routines,
      totalDuration: workout.total_duration,
      createdAt: new Date(workout.created_at),
    }));

    return workouts;
  }

  async findById(id: string): Promise<Workout | null> {
    if (!this.useSupabase) {
      throw new Error('Supabase not configured');
    }

    const { data, error } = await supabase
      .from('workouts')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null; // Not found
      throw new Error(`Failed to fetch workout: ${error.message}`);
    }

    return {
      id: data.id,
      name: data.name,
      description: data.description,
      routines: data.routines,
      totalDuration: data.total_duration,
      createdAt: new Date(data.created_at),
    };
  }

  async create(workout: Workout): Promise<Workout> {
    if (!this.useSupabase) {
      throw new Error('Supabase not configured');
    }

    const dbWorkout = {
      id: workout.id,
      name: workout.name,
      description: workout.description,
      routines: workout.routines,
      total_duration: workout.totalDuration,
      created_at: workout.createdAt.toISOString(),
    };

    const { data, error } = await supabase
      .from('workouts')
      .insert([dbWorkout])
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to create workout: ${error.message}`);
    }

    return {
      id: data.id,
      name: data.name,
      description: data.description,
      routines: data.routines,
      totalDuration: data.total_duration,
      createdAt: new Date(data.created_at),
    };
  }

  async update(id: string, updates: Partial<Workout>): Promise<Workout> {
    if (!this.useSupabase) {
      throw new Error('Supabase not configured');
    }

    const dbUpdates: any = {
      updated_at: new Date().toISOString(),
    };
    
    if (updates.name) dbUpdates.name = updates.name;
    if (updates.description) dbUpdates.description = updates.description;
    if (updates.routines) dbUpdates.routines = updates.routines;
    if (updates.totalDuration) dbUpdates.total_duration = updates.totalDuration;

    const { data, error } = await supabase
      .from('workouts')
      .update(dbUpdates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to update workout: ${error.message}`);
    }

    return {
      id: data.id,
      name: data.name,
      description: data.description,
      routines: data.routines,
      totalDuration: data.total_duration,
      createdAt: new Date(data.created_at),
    };
  }

  async delete(id: string): Promise<void> {
    if (!this.useSupabase) {
      throw new Error('Supabase not configured');
    }

    const { error } = await supabase
      .from('workouts')
      .delete()
      .eq('id', id);

    if (error) {
      throw new Error(`Failed to delete workout: ${error.message}`);
    }
  }
}

export const workoutRepository = new WorkoutRepository();
