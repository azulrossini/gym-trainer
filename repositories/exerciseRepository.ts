import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { Exercise } from '@/types';

export class ExerciseRepository {
  private useSupabase: boolean;

  constructor() {
    this.useSupabase = isSupabaseConfigured();
  }

  async findAll(): Promise<Exercise[]> {
    if (!this.useSupabase) {
      throw new Error('Supabase not configured');
    }

    const { data, error } = await supabase
      .from('exercises')
      .select('*')
      .order('created_at', { ascending: true });

    if (error) {
      throw new Error(`Failed to fetch exercises: ${error.message}`);
    }

    return data || [];
  }

  async findById(id: string): Promise<Exercise | null> {
    if (!this.useSupabase) {
      throw new Error('Supabase not configured');
    }

    const { data, error } = await supabase
      .from('exercises')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null; // Not found
      throw new Error(`Failed to fetch exercise: ${error.message}`);
    }

    return data;
  }

  async create(exercise: Exercise): Promise<Exercise> {
    if (!this.useSupabase) {
      throw new Error('Supabase not configured');
    }

    const { data, error } = await supabase
      .from('exercises')
      .insert([exercise])
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to create exercise: ${error.message}`);
    }

    return data;
  }

  async update(id: string, updates: Partial<Exercise>): Promise<Exercise> {
    if (!this.useSupabase) {
      throw new Error('Supabase not configured');
    }

    const { data, error } = await supabase
      .from('exercises')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to update exercise: ${error.message}`);
    }

    return data;
  }

  async delete(id: string): Promise<void> {
    if (!this.useSupabase) {
      throw new Error('Supabase not configured');
    }

    const { error } = await supabase
      .from('exercises')
      .delete()
      .eq('id', id);

    if (error) {
      throw new Error(`Failed to delete exercise: ${error.message}`);
    }
  }
}

export const exerciseRepository = new ExerciseRepository();
