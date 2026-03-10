import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { Routine } from '@/types';

export class RoutineRepository {
  private useSupabase: boolean;

  constructor() {
    this.useSupabase = isSupabaseConfigured();
  }

  async findAll(): Promise<Routine[]> {
    if (!this.useSupabase) {
      throw new Error('Supabase not configured');
    }

    const { data, error } = await supabase
      .from('routines')
      .select('*')
      .order('created_at', { ascending: true });

    if (error) {
      throw new Error(`Failed to fetch routines: ${error.message}`);
    }

    return data || [];
  }

  async findById(id: string): Promise<Routine | null> {
    if (!this.useSupabase) {
      throw new Error('Supabase not configured');
    }

    const { data, error } = await supabase
      .from('routines')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null; // Not found
      throw new Error(`Failed to fetch routine: ${error.message}`);
    }

    return data;
  }

  async create(routine: Routine): Promise<Routine> {
    if (!this.useSupabase) {
      throw new Error('Supabase not configured');
    }

    const { data, error } = await supabase
      .from('routines')
      .insert([routine])
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to create routine: ${error.message}`);
    }

    return data;
  }

  async update(id: string, updates: Partial<Routine>): Promise<Routine> {
    if (!this.useSupabase) {
      throw new Error('Supabase not configured');
    }

    const { data, error } = await supabase
      .from('routines')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to update routine: ${error.message}`);
    }

    return data;
  }

  async delete(id: string): Promise<void> {
    if (!this.useSupabase) {
      throw new Error('Supabase not configured');
    }

    const { error } = await supabase
      .from('routines')
      .delete()
      .eq('id', id);

    if (error) {
      throw new Error(`Failed to delete routine: ${error.message}`);
    }
  }
}

export const routineRepository = new RoutineRepository();
